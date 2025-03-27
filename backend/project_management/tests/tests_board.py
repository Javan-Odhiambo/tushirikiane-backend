from accounts.models import CustomUser
from project_management.models import Board, Workspace
from rest_framework import status
from rest_framework.test import APITestCase


class BoardViewSetTestCase(APITestCase):
	def setUp(self):
		"""
		Set up test environment with users, workspaces, and boards
		"""
		self.user1 = CustomUser.objects.create_user(
			email="user1@test.com",
			password="testpass123"
		)
		self.workspace1 = Workspace.objects.create(
			name="Test Workspace",
			owner=self.user1
		)

	def test_create_board(self):
		"""
		Test creating a board in a workspace using the id and slug
		"""
		self.client.force_authenticate(user=self.user1)

		response1 = self.client.post(f'/api/workspaces/{self.workspace1.id}/boards/', {
				'name': 'New Test Board',
		})

		self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response1.data['name'], 'New Test Board')
		self.assertEqual(response1.data['workspace'], self.workspace1.id)

		response2 = self.client.post(f'/api/workspaces/{self.workspace1.slug}/boards/', {
				'name': 'New Test Board 2',
		})
		self.assertEqual(response2.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response2.data['name'], 'New Test Board 2')
		self.assertEqual(response2.data['workspace'], self.workspace1.id)

	def test_update_board(self):
		board = Board.objects.create(workspace=self.workspace1, name="board1", position=0)

		self.client.force_authenticate(user=self.user1)

		response = self.client.put(f"/api/workspaces/{self.workspace1.id}/boards/{board.id}/",
								   data={"name": "new name"})
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data["id"], str(board.id))
		self.assertEqual(response.data["name"], "new name")

	def test_board_positioning(self):
		"""
		Test that boards are automatically positioned
		"""
		self.client.force_authenticate(user=self.user1)

		# Create first board
		board1 = self.client.post(f'/api/workspaces/{self.workspace1.id}/boards/', {
				'name': 'First Board',
				'description': 'Board Description'
		})
		self.assertEqual(board1.status_code, status.HTTP_201_CREATED)

		# Create second board
		board2 = self.client.post(f'/api/workspaces/{self.workspace1.id}/boards/', {
				'name': 'Second Board',
		})
		self.assertEqual(board2.status_code, status.HTTP_201_CREATED)

		self.assertEqual(board1.data['position'], 0)
		self.assertEqual(board2.data['position'], 1)

	def test_cannot_create_board_in_non_existent_workspace(self):
		"""
		Test creating a board in a non-existent workspace
		"""
		self.client.force_authenticate(user=self.user1)

		response = self.client.post('/api/workspaces/9999/boards/', {
				'name': 'Impossible Board'
		})

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
