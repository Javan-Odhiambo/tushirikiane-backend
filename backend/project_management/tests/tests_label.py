from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import CustomUser
from project_management.models import Board, BoardMember, Workspace, WorkspaceMember


class TaskLabelViewSetTestCase(APITestCase):
	def setUp(self):
		self.user = CustomUser.objects.create_user(email="labeluser@test.com", password="testpass123")
		self.board_member = CustomUser.objects.create_user(email="boardmember@test.com", password="testpass123")
		self.non_member = CustomUser.objects.create_user(email="outsider@test.com", password="testpass123")

		self.workspace = Workspace.objects.create(name="Label Workspace", owner=self.user)
		self.board = Board.objects.create(name="Label Board", workspace=self.workspace, position=1)

		WorkspaceMember.objects.create(workspace=self.workspace, member=self.board_member)
		BoardMember.objects.create(board=self.board, member=self.board_member)

		self.label_url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/labels/"

		self.client.force_authenticate(user=self.user)

	def test_create_label_successfully(self):
		response = self.client.post(self.label_url, data={"name": "Urgent", "color": "#FF0000"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response.data["name"], "Urgent")
		self.assertEqual(response.data["color"], "#FF0000")

	def test_create_label_missing_name(self):
		response = self.client.post(self.label_url, data={"color": "#00FF00"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn("name", response.data)

	def test_unauthenticated_user_cannot_create_label(self):
		self.client.logout()
		response = self.client.post(self.label_url, data={"name": "Bug", "color": "#0000FF"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_non_board_member_cannot_create_label(self):
		self.client.force_authenticate(user=self.non_member)
		response = self.client.post(self.label_url, data={"name": "Bug", "color": "#0000FF"}, format="json")

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

	def test_get_labels(self):
		# create label
		self.client.post(self.label_url, data={"name": "Feature", "color": "#123456"}, format="json")

		response = self.client.get(self.label_url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 1)
		self.assertEqual(response.data[0]["name"], "Feature")

	def test_delete_label(self):
		create_resp = self.client.post(self.label_url, data={"name": "To Delete", "color": "#333333"}, format="json")
		label_id = create_resp.data["id"]

		delete_url = f"{self.label_url}{label_id}/"
		response = self.client.delete(delete_url)

		self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

	def test_delete_label_unauthenticated(self):
		create_resp = self.client.post(self.label_url, data={"name": "Delete Fail", "color": "#555555"}, format="json")
		label_id = create_resp.data["id"]
		self.client.logout()

		delete_url = f"{self.label_url}{label_id}/"
		response = self.client.delete(delete_url)

		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

	def test_delete_label_by_non_member(self):
		create_resp = self.client.post(self.label_url, data={"name": "Not Yours", "color": "#888888"}, format="json")
		label_id = create_resp.data["id"]
		self.client.force_authenticate(user=self.non_member)

		delete_url = f"{self.label_url}{label_id}/"
		response = self.client.delete(delete_url)

		self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
