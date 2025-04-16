from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import CustomUser
from project_management.models import (Board, BoardMember, CheckListItem, Task, TaskList, Workspace, WorkspaceMember)


class CheckListItemViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(email="user1@test.com", password="testpass123")
        self.user2 = CustomUser.objects.create_user(email="user2@test.com", password="testpass123")
        self.user3 = CustomUser.objects.create_user(email="user3@test.com", password="testpass123")  # not a member

        self.workspace = Workspace.objects.create(name="Workspace", owner=self.user)
        self.board = Board.objects.create(name="Board", workspace=self.workspace, position=1)
        self.task_list = TaskList.objects.create(board=self.board, name="Task List")
        self.task = Task.objects.create(task_list=self.task_list, name="Test Task")

        BoardMember.objects.create(board=self.board, member=self.user2)
        WorkspaceMember.objects.create(workspace=self.workspace, member=self.user2)

        self.client.force_authenticate(user=self.user)

        self.base_url = f"/api/workspaces/{self.workspace.id}/boards/{self.board.id}/task-lists/{self.task_list.id}/tasks/{self.task.id}/checklist/"

    def test_create_checklist_item_successfully(self):
        data = {"name": "Test Checklist Item"}
        response = self.client.post(self.base_url, data=data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Test Checklist Item")

    def test_create_checklist_item_missing_name(self):
        response = self.client.post(self.base_url, data={}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

    def test_unauthenticated_user_cannot_create_checklist_item(self):
        self.client.logout()
        response = self.client.post(self.base_url, data={"name": "Unauth Checklist"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_non_board_member_cannot_create_checklist_item(self):
        self.client.force_authenticate(user=self.user3)
        response = self.client.post(self.base_url, data={"name": "Not Allowed"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_checklist_items(self):
        item1 = CheckListItem.objects.create(task=self.task, name="Item 1")
        item2 = CheckListItem.objects.create(task=self.task, name="Item 2")

        response = self.client.get(self.base_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        names = [item["name"] for item in response.data]

        self.assertIn("Item 1", names)
        self.assertIn("Item 2", names)

    def test_delete_checklist_item(self):
        item = CheckListItem.objects.create(task=self.task, name="To be deleted")
        url = self.base_url + f"{item.id}/"

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertEqual(response.data["id"], str(item.id))
        self.assertFalse(CheckListItem.objects.filter(id=item.id).exists())

    def test_update_checklist_item(self):
        item = CheckListItem.objects.create(task=self.task, name="Old Name")
        url = self.base_url + f"{item.id}/"
        response = self.client.patch(url, data={"name": "Updated Name"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        item.refresh_from_db()
        self.assertEqual(item.name, "Updated Name")

    def test_assign_checklist_item(self):
        item = CheckListItem.objects.create(task=self.task, name="Test Item")
        url = self.base_url + f"{item.id}/assign/"
        response = self.client.post(url, data={"assignee_id": self.user2.id}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        item.refresh_from_db()
        self.assertEqual(item.assignee, self.user2)

    def test_unassign_checklist_item(self):
        item = CheckListItem.objects.create(task=self.task, name="Test Item", assignee=self.user2)
        url = self.base_url + f"{item.id}/unassign/"
        response = self.client.post(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        item.refresh_from_db()
        self.assertIsNone(item.assignee)
