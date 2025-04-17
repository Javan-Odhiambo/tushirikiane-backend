from rest_framework import serializers

from accounts.models import CustomUser
from .models import (Board, CheckListItem, Label, Task, TaskMember, TaskList, Workspace, WorkspaceInvite,
                     WorkspaceMember)


# Create serializers for all the models
class MemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = CustomUser
		fields = ["id", "first_name", "middle_name", "last_name", "email"]


# Drf model serializer for Workspace
class WorkspaceSerializer(serializers.ModelSerializer):
	owner_id = serializers.PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = Workspace
		fields = ["id", "created_at", "updated_at", "name", "owner_id", "slug"]


# DRF model serializer
class WorkspaceMemberSerializer(serializers.ModelSerializer):
	workspace_id = serializers.PrimaryKeyRelatedField(read_only=True)
	member = MemberSerializer(read_only=True)

	class Meta:
		model = WorkspaceMember
		fields = ["id", "created_at", "updated_at", "workspace_id", "member"]


# DRF Label model serializer
class LabelSerializer(serializers.ModelSerializer):
	board_id = serializers.PrimaryKeyRelatedField(read_only=True, source="board")

	class Meta:
		model = Label
		fields = ["id", "created_at", "updated_at", "name", "color", "board_id"]


# DRF model serializer
class BoardMemberSerializer(serializers.ModelSerializer):
	board_id = serializers.PrimaryKeyRelatedField(read_only=True)
	member = MemberSerializer(read_only=True)

	class Meta:
		model = WorkspaceMember
		fields = ["id", "created_at", "updated_at", "board_id", "member"]


# DRF Board model serializer
class BoardSerializer(serializers.ModelSerializer):
	workspace_id = serializers.PrimaryKeyRelatedField(required=False, read_only=True, source="workspace")
	position = serializers.IntegerField(required=False)
	labels = LabelSerializer(read_only=True, many=True)

	class Meta:
		model = Board
		fields = ["id", "created_at", "updated_at", "name", "description", "workspace_id", "position", "slug", "labels"]


# DRF TaskAssignee model serializer
class TaskMemberSerializer(serializers.ModelSerializer):
	task_id = serializers.PrimaryKeyRelatedField(queryset=Task.objects.all())
	member = MemberSerializer(read_only=True)

	class Meta:
		model = TaskMember
		fields = ["id", "created_at", "updated_at", "task_id", "member"]


class TaskMemberSerializer(serializers.ModelSerializer):
	member = MemberSerializer(read_only=True)

	class Meta:
		model = TaskMember
		fields = ["member"]

# DRF Task model serializer
class TaskSerializer(serializers.ModelSerializer):
	label_id = serializers.PrimaryKeyRelatedField(
		source="label",
		queryset=Label.objects.all(),
		required=False,
		allow_null=True
	)
	task_list_id = serializers.PrimaryKeyRelatedField(
		queryset=TaskList.objects.all(),
		required=False,
		source="task_list",
		allow_empty=True,
	)
	members = TaskMemberSerializer(read_only=True, many=True, source="assignees")


	class Meta:
		model = Task
		read_only_fields = ["id", "created_at", "updated_at", "position", "label_id"]

		fields = [
				"id",
				"created_at",
				"updated_at",
				"name",
				"description",
				"notes",
				"due_date",
				"task_list_id",
				"position",
				"is_completed",
				"label_id",
				"members",
		]

# DRF TaskList model serializer
class TaskListSerializer(serializers.ModelSerializer):
	board_id = serializers.PrimaryKeyRelatedField(read_only=True)

	class Meta:
		model = TaskList
		read_only_fields = ["id", "created_at", "updated_at", "position"]
		fields = [
				"id",
				"created_at",
				"updated_at",
				"name",
				"board_id",
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



# DRF CheckListItem model serializer
class CheckListItemSerializer(serializers.ModelSerializer):
	task_id = serializers.PrimaryKeyRelatedField(source="task", read_only=True)
	assignee_id = serializers.PrimaryKeyRelatedField(
		source="assignee",
		queryset=CustomUser.objects.all(),
		required=False,
		allow_null=True
	)

	class Meta:
		model = CheckListItem
		read_only_fields = ["id", "created_at", "updated_at"]
		fields = [
				"id",
				"created_at",
				"updated_at",
				"task_id",
				"name",
				"is_completed",
				"due_at",
				"assignee_id",
		]


class EmailInviteSerializer(serializers.Serializer):
	emails = serializers.ListField(
		child=serializers.EmailField(),
		required=True
	)


class InviteTokenSerializer(serializers.Serializer):
	token = serializers.UUIDField(required=True)
