from rest_framework import serializers

from accounts.models import CustomUser
from .models import (Board, CheckListItem, Label, Task, TaskAssignee, TaskLabel, TaskList, Workspace, WorkspaceInvite,
                     WorkspaceMember)


# Create serializers for all the models
class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = CustomUser
		fields = ["id", "first_name", "middle_name", "last_name"]


# Drf model serializer for Workspace
class WorkspaceSerializer(serializers.ModelSerializer):
	owner = serializers.PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = Workspace
		fields = ["id", "created_at", "updated_at", "name", "owner", "slug"]


# DRF model serializer
class WorkspaceMemberSerializer(serializers.ModelSerializer):
	workspace = serializers.PrimaryKeyRelatedField(read_only=True)
	member = MemberSerializer(read_only=True)

	class Meta:
		model = WorkspaceMember
		fields = ["id", "created_at", "updated_at", "workspace", "member"]


# DRF model serializer
class BoardMemberSerializer(serializers.ModelSerializer):
	board = serializers.PrimaryKeyRelatedField(read_only=True)
	member = MemberSerializer(read_only=True)

	class Meta:
		model = WorkspaceMember
		fields = ["id", "created_at", "updated_at", "board", "member"]


# DRF Board model serializer
class BoardSerializer(serializers.ModelSerializer):
	workspace = serializers.PrimaryKeyRelatedField(queryset=Workspace.objects.all(), required=False)
	position = serializers.IntegerField(required=False)

	class Meta:
		model = Board
		fields = ["id", "created_at", "updated_at", "name", "description", "workspace", "position", "slug"]


# DRF TaskAssignee model serializer
class TaskAssigneeSerializer(serializers.ModelSerializer):
	task = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())
	assignee = MemberSerializer(read_only=True)

	class Meta:
		model = TaskAssignee
		fields = ["id", "created_at", "updated_at", "task", "assignee"]


class TaskMemberSerializer(serializers.ModelSerializer):
	assignee = MemberSerializer(read_only=True)

	class Meta:
		model = TaskAssignee
		fields = ["assignee"]

# DRF Task model serializer
class TaskSerializer(serializers.ModelSerializer):
	labels = serializers.PrimaryKeyRelatedField(
		many=True,
		read_only=True
	)
	task_list = serializers.PrimaryKeyRelatedField(
		queryset=TaskList.objects.all(),
		required=False
	)
	members = TaskMemberSerializer(read_only=True, many=True, source="assignees")

	class Meta:
		model = Task
		read_only_fields = ["id", "created_at", "updated_at", "position", "labels"]

		fields = [
				"id",
				"created_at",
				"updated_at",
				"name",
				"description",
				"due_date",
				"task_list",
				"position",
				"is_completed",
				"labels",
				"members",
		]




# DRF TaskLabel model serializer
class TaskLabelSerializer(serializers.ModelSerializer):
	class Meta:
		model = TaskLabel
		fields = ["id", "created_at", "updated_at", "task", "label"]


# DRF TaskList model serializer
class TaskListSerializer(serializers.ModelSerializer):
	board = serializers.PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = TaskList
		read_only_fields = ["id", "created_at", "updated_at", "position"]
		fields = [
				"id",
				"created_at",
				"updated_at",
				"name",
				"board",
				"position",
				"description",
		]


# DRF Invite model serializer
class InviteSerializer(serializers.ModelSerializer):
	class Meta:
		model = WorkspaceInvite
		fields = [
				"id",
				"created_at",
				"updated_at",
				"workspace",
				"recipient_email",
				"sender",
		]


# DRF Label model serializer
class LabelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Label
		fields = ["id", "created_at", "updated_at", "name", "color"]


# DRF CheckListItem model serializer
class CheckListItemSerializer(serializers.ModelSerializer):
	class Meta:
		model = CheckListItem
		fields = [
				"id",
				"created_at",
				"updated_at",
				"task",
				"name",
				"is_completed",
				"due_at",
		]


class EmailInviteSerializer(serializers.Serializer):
	emails = serializers.ListField(
		child=serializers.EmailField(),
		required=True
	)


class InviteTokenSerializer(serializers.Serializer):
	token = serializers.UUIDField(required=True)
