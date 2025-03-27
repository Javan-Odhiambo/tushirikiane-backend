from django.db import models
from rest_framework import response, status, viewsets
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Board, CheckListItem, Invite, Label, Task, TaskAssignee, TaskLabel, TaskList, Workspace, \
	WorkspaceMember
from .permissions import IsMemberReadOrOwnerFull
from .serializers import BoardSerializer, CheckListItemSerializer, InviteSerializer, LabelSerializer, \
	TaskAssigneeSerializer, TaskLabelSerializer, TaskListSerializer, TaskSerializer, WorkspaceMemberSerializer, \
	WorkspaceSerializer


class WorkspaceViewSet(viewsets.ModelViewSet):
	serializer_class = WorkspaceSerializer
	permission_classes = [IsMemberReadOrOwnerFull, IsAuthenticated]
	lookup_field = "pk_slug"

	def get_queryset(self):
		# Just a precaution
		if self.request.user.is_anonymous:
			return Workspace.objects.none()

		return Workspace.objects.filter(
			models.Q(owner_id=self.request.user.id) | models.Q(members__member_id=self.request.user.id)
		).distinct()

	def get_object(self):
		pk = self.kwargs.get("pk_slug")
		return Workspace.objects.get_by_id_or_slug_or_404(pk, queryset=self.get_queryset())

	def perform_create(self, serializer):
		# Automatically set the owner to the current user when creating a workspace
		serializer.save(owner=self.request.user)


class BoardViewSet(viewsets.ModelViewSet):
	serializer_class = BoardSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		if self.request.user.is_anonymous:
			return Board.objects.none()

		# If no workspace id is provided in the url, don't return any boards
		workspace_pk = self.kwargs.get("workspace_pk_slug", None)
		if not workspace_pk:
			return Board.objects.none()

		if Workspace.objects.filter(id=workspace_pk).exists():
			return Board.objects.filter(workspace_id=workspace_pk)

		return Board.objects.filter(
			models.Q(workspace__members__member=self.request.user) |
			models.Q(workspace__owner=self.request.user)
		).distinct().order_by("position")

	def create(self, request, *args, **kwargs):
		workspace_pk = self.kwargs.get("workspace_pk_slug")

		try:
			workspace = Workspace.objects.get_by_id_or_slug_or_404(pk=workspace_pk)
		except NotFound:
			return response.Response("Workspace does not exist", status=400)

		position = Board.objects.filter(workspace_id=workspace.id).count()
		board_obj = {
				"name": request.data.get("name"),
				"description": request.data.get("description"),
				"workspace": workspace, "position": position
		}
		board = Board.objects.create(**board_obj)
		serializer = self.get_serializer(board)
		headers = self.get_success_headers(serializer.data)

		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TaskViewSet(viewsets.ModelViewSet):
	serializer_class = TaskSerializer
	queryset = Task.objects.all()


class TaskListViewSet(viewsets.ModelViewSet):
	serializer_class = TaskListSerializer
	queryset = TaskList.objects.all()


# TaskAssigneeViewSet,
class TaskAssigneeViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

# CheckListItemViewSet,
class CheckListItemViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

# LabelViewSet,
class LabelViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

# TaskLabelViewSet,
class TaskLabelViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

# InviteViewSet,
class InviteViewSet(viewsets.ModelViewSet):
	serializer_class = InviteSerializer
	queryset = Invite.objects.all()


# WorkspaceMemberViewSet
class WorkspaceMemberViewSet(viewsets.ReadOnlyModelViewSet):
	serializer_class = WorkspaceMemberSerializer
	permission_classes = [IsMemberReadOrOwnerFull]

	def get_queryset(self):
		workspace_id = self.kwargs.get("workspace_pk")
		return WorkspaceMember.objects.filter(workspace_id=workspace_id)
