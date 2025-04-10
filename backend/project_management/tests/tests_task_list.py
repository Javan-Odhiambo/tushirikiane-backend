from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import CustomUser
from project_management.models import Board, TaskList, Workspace, WorkspaceMember


class TaskListViewSetTestCase(APITestCase):
	def setUp(self):
		"""
		Set up test environment with users, workspaces, boards, and task lists
		"""
		TaskList.objects.all().delete()  # Clear task lists before each test

		# Create users
		self.user1 = CustomUser.objects.create_user(first_name="first", email="user1@test.com", password="testpass123")
		self.user2 = CustomUser.objects.create_user(first_name="second", email="user2@test.com", password="testpass123")

		# Create workspace and board
		self.workspace1 = Workspace.objects.create(name="Test Workspace", owner=self.user1)
		self.board1 = Board.objects.create(workspace=self.workspace1, name="Test Board", position=1)

		# Add user2 as a member of the workspace
		WorkspaceMember.objects.create(workspace=self.workspace1, member=self.user2)

		# Create task lists for the board
		self.task_list1 = TaskList.objects.create(board=self.board1, name="Task List 1", position=1)
		self.task_list2 = TaskList.objects.create(board=self.board1, name="Task List 2", position=2)

		# Set URLs
		self.task_list_url = f'/api/workspaces/{self.workspace1.id}/boards/{self.board1.id}/task-lists/'
		self.task_list_detail_url = f'/api/workspaces/{self.workspace1.id}/boards/{self.board1.id}/task-lists/{self.task_list1.id}/'

	def test_create_task_list_authenticated(self):
		"""
		Test creating a task list in a board
		"""
		self.client.force_authenticate(user=self.user1)
		response = self.client.post(self.task_list_url, data={"name": "New Task List"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response.data['name'], 'New Task List')
		self.assertEqual(response.data['board_id'], self.board1.id)

	def test_create_task_list_unauthenticated(self):
		"""
		Test creating a task list without authentication
		"""
		response = self.client.post(self.task_list_url, data={"name": "New Task List"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_create_task_list_not_a_member(self):
		"""
		Test that a user cannot create a task list in a board they are not a member of
		"""
		self.client.force_authenticate(user=self.user2)
		response = self.client.post(self.task_list_url, data={"name": "New Task List"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_update_task_list(self):
		"""
		Test updating a task list
		"""
		self.client.force_authenticate(user=self.user1)

		response = self.client.patch(self.task_list_detail_url, data={"name": "Updated Task List"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data['name'], 'Updated Task List')

	def test_delete_task_list(self):
		"""
		Test deleting a task list
		"""
		self.client.force_authenticate(user=self.user1)

		response = self.client.delete(self.task_list_detail_url)

		self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

	def test_delete_task_list_not_owner(self):
		"""
		Test that a non-owner cannot delete a task list
		"""
		self.client.force_authenticate(user=self.user2)

		response = self.client.delete(self.task_list_detail_url)

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TaskListReorderTestCase(APITestCase):
	def setUp(self):
		"""
		Set up test environment for reordering task lists
		"""
		TaskList.objects.all().delete()

		# Create users, workspace, board, and task lists
		self.user1 = CustomUser.objects.create_user(email="user1@test.com", password="testpass123")
		self.user2 = CustomUser.objects.create_user(email="user2@test.com", password="testpass123")

		self.workspace1 = Workspace.objects.create(name="Test Workspace", owner=self.user1)
		self.board1 = Board.objects.create(workspace=self.workspace1, name="Test Board", position=1)

		WorkspaceMember.objects.create(workspace=self.workspace1, member=self.user2)

		self.task_list1 = TaskList.objects.create(board=self.board1, name="Task List 1", position=1)
		self.task_list2 = TaskList.objects.create(board=self.board1, name="Task List 2", position=2)
		self.task_list3 = TaskList.objects.create(board=self.board1, name="Task List 3", position=3)

		# Set URL for reordering
		self.reorder_url = f'/api/workspaces/{self.workspace1.id}/boards/{self.board1.id}/task-lists/reorder/'

	def test_reorder_task_lists(self):
		"""
		Test that task lists can be reordered successfully
		"""
		self.client.force_authenticate(user=self.user1)

		ordered_ids = [str(self.task_list2.id), str(self.task_list1.id), str(self.task_list3.id)]
		response = self.client.patch(self.reorder_url, data={"ordered_ids": ordered_ids}, format="json")

		self.assertEqual(response.status_code, status.HTTP_200_OK)

		self.task_list1.refresh_from_db()
		self.task_list2.refresh_from_db()
		self.task_list3.refresh_from_db()

		self.assertEqual(self.task_list1.position, 2)
		self.assertEqual(self.task_list2.position, 1)
		self.assertEqual(self.task_list3.position, 3)

	def test_reorder_task_lists_unauthenticated(self):
		"""
		Test that an unauthenticated user cannot reorder task lists
		"""
		ordered_ids = [str(self.task_list2.id), str(self.task_list1.id), str(self.task_list3.id)]
		response = self.client.patch(self.reorder_url, data={"ordered_ids": ordered_ids}, format="json")

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_reorder_task_lists_not_a_member(self):
		"""
		Test that a non-member cannot reorder task lists
		"""
		self.client.force_authenticate(user=self.user2)

		ordered_ids = [str(self.task_list2.id), str(self.task_list1.id), str(self.task_list3.id)]
		response = self.client.patch(self.reorder_url, data={"ordered_ids": ordered_ids}, format="json")

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_reorder_task_lists_invalid_ids(self):
		"""
		Test that submitting invalid task list IDs returns a bad request
		"""
		self.client.force_authenticate(user=self.user1)

		ordered_ids = [str(self.task_list2.id), "invalid_id", str(self.task_list3.id)]
		response = self.client.patch(self.reorder_url, data={"ordered_ids": ordered_ids}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

	def test_reorder_task_lists_invalid_data(self):
		"""
		Test that incorrect data format returns a bad request
		"""
		self.client.force_authenticate(user=self.user1)

		response = self.client.patch(self.reorder_url, data={"ordered_ids": "invalid_format"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
