from rest_framework import viewsets, serializers, response
from rest_framework.permissions import IsAuthenticated
from django.db import models

from .permissions import IsMemberOrOwnerFull, IsMemberReadOrOwnerFull


from .models import Workspace, Board, WorkspaceMember, Task
from .serializers import (
    WorkspaceSerializer,
    BoardSerializer,
    WorkspaceMemberSerializer,
    TaskSerializer,
)


class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer

    permission_classes = [IsMemberReadOrOwnerFull, IsAuthenticated]

    def get_queryset(self):

        if self.request.user.is_anonymous:
            return Workspace.objects.none()

        return Workspace.objects.filter(
            models.Q(owner_id=self.request.user.id)
            | models.Q(members__member_id=self.request.user.id)
        ).distinct()

    def perform_create(self, serializer):
        # Automatically set the owner to the current user when creating a workspace
        serializer.save(owner_id=self.request.user.id)


class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    permission_classes = [IsMemberOrOwnerFull, IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_anonymous:
            return Board.objects.none()

        workspace_pk = self.kwargs.get("workspace_pk", None)
        if not workspace_pk:
            return Board.objects.none()

        if Workspace.objects.filter(id=workspace_pk).exists():
            return Board.objects.filter(workspace_id=workspace_pk)

        return (
            Board.objects.filter(
                models.Q(workspace__members__member_id=self.request.user)
                | models.Q(workspace__owner_id=self.request.user)
            )
            .distinct()
            .order_by("position")
        )

    def perform_create(self, serializer):
        workspace_pk = self.kwargs.get("workspace_pk")

        try:
            workspace = Workspace.objects.get(id=workspace_pk)
        except Workspace.DoesNotExist:
            return response.Response("Workspace does not exist", status=400)

        # Determine the position based on the existing count
        position = Board.objects.filter(workspace_id=workspace.id).count()

        # Save the board with the Workspace instance
        serializer.save(workspace_id=workspace, position=position)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TaskListViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


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
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


# WorkspaceMemberViewSet
class WorkspaceMemberViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WorkspaceMemberSerializer
    permission_classes = [IsMemberReadOrOwnerFull]

    def get_queryset(self):
        return WorkspaceMember.objects.filter(member=self.request.user.id)
