from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import CustomUser
from project_management.models import (Board, BoardMember, Task, TaskAssignee, TaskList, Workspace, WorkspaceMember)


class TaskViewSetTestCase(APITestCase):
	def setUp(self):
		"""
		Set up test environment with users, workspace, board, task list, and task
		"""
		self.user = CustomUser.objects.create_user(email="user1@test.com", password="testpass123")
		self.user2 = CustomUser.objects.create_user(email="user2@test.com", password="testpass123")
		self.user3 = CustomUser.objects.create_user(email="user3@test.com", password="testpass123")  # not a member

		self.workspace = Workspace.objects.create(name="Workspace", owner=self.user)
		self.board = Board.objects.create(name="Board", workspace=self.workspace, position=1)
		self.task_list = TaskList.objects.create(board=self.board, name="Task List")
		self.task = Task.objects.create(task_list=self.task_list, name="Test Task")

		BoardMember.objects.create(board=self.board, member=self.user2)
		WorkspaceMember.objects.create(workspace=self.workspace, member=self.user2)

		self.assignees_url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assignees/"

		self.client.force_authenticate(user=self.user)

	def test_create_task_successfully(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/"
		response = self.client.post(url, data={"name": "New Task"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response.data["name"], "New Task")

	def test_create_task_missing_name(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/"
		response = self.client.post(url, data={}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn("name", response.data)

	def test_unauthenticated_user_cannot_create_task(self):
		self.client.logout()
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/"
		response = self.client.post(url, data={"name": "Test"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_non_board_member_cannot_create_task(self):
		self.client.force_authenticate(user=self.user3)  # not a board member
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/"
		response = self.client.post(url, data={"name": "Task"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_retrieve_task(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/"
		response = self.client.get(url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data["id"], str(self.task.id))

	def test_update_task_name(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/"
		response = self.client.patch(url, data={"name": "Updated Task"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.task.refresh_from_db()
		self.assertEqual(self.task.name, "Updated Task")

	def test_delete_task(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/"
		response = self.client.delete(url)

		self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
		self.assertFalse(Task.objects.filter(id=self.task.id).exists())

	def test_assign_board_members_to_task(self):
		"""
		Test that board members can be assigned to a task
		"""
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"

		response = self.client.post(url, data={"member_ids": [self.user2.id]}, format="json")
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(TaskAssignee.objects.filter(task=self.task, assignee=self.user2).exists())

	def test_assign_task_rejects_non_board_members(self):
		"""
		Test that users who are not board members cannot be assigned
		"""
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"

		response = self.client.post(url, data={"member_ids": [self.user3.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn("invalid_ids", response.data)
		self.assertFalse(TaskAssignee.objects.filter(task=self.task, assignee=self.user3).exists())

	def test_assign_task_with_no_member_ids(self):
		"""
		Test that assigning a task without member_ids returns 400
		"""
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"

		response = self.client.post(url, data={}, format="json")
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

	def test_unassign_board_members_from_task(self):
		"""
		Test that board members can be unassigned from a task
		"""
		TaskAssignee.objects.create(task=self.task, assignee=self.user2)

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/unassign/"

		response = self.client.post(url, data={"member_ids": [self.user2.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertFalse(TaskAssignee.objects.filter(task=self.task, assignee=self.user2).exists())

	def test_unassign_task_with_invalid_members(self):
		"""
		Test that trying to unassign users who aren't board members fails
		"""
		TaskAssignee.objects.create(task=self.task, assignee=self.user3)

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/unassign/"

		response = self.client.post(url, data={"member_ids": [self.user3.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertTrue(TaskAssignee.objects.filter(task=self.task, assignee=self.user3).exists())

	def test_assign_same_member_twice_does_not_duplicate(self):
		TaskAssignee.objects.create(task=self.task, assignee=self.user2)

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"
		response = self.client.post(url, data={"member_ids": [self.user2.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(TaskAssignee.objects.filter(task=self.task, assignee=self.user2).count(), 1)

	def test_assign_task_mixed_valid_and_invalid_ids(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"
		response = self.client.post(url, data={"member_ids": [self.user2.id, self.user3.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertFalse(TaskAssignee.objects.filter(task=self.task, assignee=self.user2).exists())

	def test_unauthenticated_user_cannot_assign_task(self):
		self.client.logout()

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"
		response = self.client.post(url, data={"member_ids": [self.user2.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_unauthenticated_user_cannot_unassign_task(self):
		TaskAssignee.objects.create(task=self.task, assignee=self.user2)
		self.client.logout()

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/unassign/"
		response = self.client.post(url, data={"member_ids": [self.user2.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_assign_with_empty_member_ids_list(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"
		response = self.client.post(url, data={"member_ids": []}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

	def test_workspace_member_not_board_member_cannot_be_assigned(self):
		# user3 is not a board member but will be added to workspace
		WorkspaceMember.objects.create(workspace=self.workspace, member=self.user3)

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"
		response = self.client.post(url, data={"member_ids": [self.user3.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertFalse(TaskAssignee.objects.filter(task=self.task, assignee=self.user3).exists())

	def test_assign_fails_if_task_does_not_belong_to_board(self):
		other_board = Board.objects.create(name="Other Board", workspace=self.workspace, position=2)
		other_task_list = TaskList.objects.create(name="Other List", board=other_board)
		wrong_task = Task.objects.create(name="Wrong Task", task_list=other_task_list)

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{wrong_task.id}/assign/"
		response = self.client.post(url, data={"member_ids": [self.user2.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

	def test_unassign_board_member_not_assigned(self):
		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/unassign/"
		response = self.client.post(url, data={"member_ids": [self.user2.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertFalse(TaskAssignee.objects.filter(task=self.task, assignee=self.user2).exists())

	def test_assign_additional_member_preserves_existing_assignees(self):
		TaskAssignee.objects.create(task=self.task, assignee=self.user2)
		new_member = CustomUser.objects.create_user(email="user4@test.com", password="testpass123")
		WorkspaceMember.objects.create(workspace=self.workspace, member=new_member)
		BoardMember.objects.create(board=self.board, member=new_member)

		url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/assign/"
		response = self.client.post(url, data={"member_ids": [new_member.id]}, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertTrue(TaskAssignee.objects.filter(task=self.task, assignee=self.user2).exists())
		self.assertTrue(TaskAssignee.objects.filter(task=self.task, assignee=new_member).exists())

	def test_get_assignees_returns_correct_users(self):
		TaskAssignee.objects.create(task=self.task, assignee=self.user2)
		response = self.client.post(self.assignees_url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 1)
		self.assertEqual(response.data[0]['assignee']["id"], str(self.user2.id))

	def test_get_assignees_empty_when_none_assigned(self):
		response = self.client.post(self.assignees_url)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, [])

	def test_get_assignees_unauthenticated(self):
		self.client.logout()
		response = self.client.post(self.assignees_url)

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_get_assignees_forbidden_for_non_board_members(self):
		self.client.force_authenticate(user=self.user3)  # Not in board
		response = self.client.post(self.assignees_url)

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
