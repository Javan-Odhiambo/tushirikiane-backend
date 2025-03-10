import uuid
from django.db import models

from core.models import BaseModel

class Workspace(BaseModel):
    """
    Workspace model to represent a workspace in the project management system.
    Attributes:
        name (CharField): The name of the workspace.
        owner_id (ForeignKey): The user who created the workspace.
    """
    
    name = models.CharField(max_length=255)
    owner_id = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE, related_name="workspaces")

    def __str__(self):
        """
        Returns a string representation of the workspace.
        Overrides the default __str__ method.
        Returns:
            str: The name of the workspace.
        """
        return self.name
    

class WorkspaceMember(BaseModel):
    """
    WorkspaceMember model to represent a member in a workspace.
    Attributes:
        workspace_id (ForeignKey): The workspace to which the member belongs.
        member_id (ForeignKey): The user who is a member of the workspace.
    """
    
    workspace_id = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="members")
    member_id = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE, related_name="workspace_members")


    def __str__(self):
        """
        Returns a string representation of the workspace member.
        Overrides the default __str__ method.
        Returns:
            str: The name of the workspace member.
        """
        return self.member
    

class Board(BaseModel):
    """
    Board model to represent a board in a workspace.
    Attributes:
        name (CharField): The name of the board.
        description (TextField): A description of the board.
        workspace_id (ForeignKey): The workspace to which the board belongs.
    """
    
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    workspace_id = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="boards")
    position = models.PositiveIntegerField()
    
    def __str__(self):
        """
        Returns a string representation of the board.
        Overrides the default __str__ method.
        Returns:
            str: The name of the board.
        """
        return self.name
    
class TaskList(BaseModel):
    """
    TaskList model to represent a list of tasks in a board.
    Attributes:
        name (CharField): The name of the list.
        board_id (ForeignKey): The board to which the list belongs.
        position (PositiveIntegerField): The position of the list in the board.
        description (TextField): A description of the list.
    """
    
    name = models.CharField(max_length=255)
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="task_lists")
    position = models.PositiveIntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        """
        Returns a string representation of the list.
        Overrides the default __str__ method.
        Returns:
            str: The name of the list.
        """
        return self.name
    

class Task(BaseModel):
    """
    Task model to represent a task or item in a list.
    Attributes:
        name (CharField): The name of the task.
        description (TextField): A description of the task.
        task_list_id (ForeignKey): The list to which the task belongs.
        position (PositiveIntegerField): The position of the task in the list.
        due_date (DateField): The due date for the task.
        is_completed (BooleanField): Indicates whether the task is completed.
    """
    
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    task_list_id = models.ForeignKey(TaskList, on_delete=models.CASCADE, related_name="tasks")
    position = models.PositiveIntegerField()
    due_date = models.DateField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        """
        Returns a string representation of the task.
        Overrides the default __str__ method.
        Returns:
            str: The name of the task.
        """
        return self.name


class TaskAssignee(BaseModel):
    """
    TaskAssignee model to represent the assignment of a user to a task.
    Attributes:
        task_id (ForeignKey): The task to which the assignee is assigned.
        assignee_id (ForeignKey): The user who is assigned to the task.
    """
    
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="assignees")
    assignee_id = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE, related_name="assigned_tasks")

    def __str__(self):
        """
        Returns a string representation of the task assignee.
        Overrides the default __str__ method.
        Returns:
            str: The name of the task assignee.
        """
        return f"{self.assignee} assigned to {self.task}"
    

class CheckListItem(BaseModel):
    """
    CheckListItem model to represent a checklist item in a task.
    Attributes:
        name (CharField): The name of the checklist item.
        is_completed (BooleanField): Indicates whether the checklist item is completed.
        task_id (ForeignKey): The task to which the checklist item belongs.
        due_at (DateTimeField): The due date and time for the checklist item.
        assignee_id (ForeignKey): The user who is assigned to complete the checklist item.
    """
    
    name = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="checklist_items")
    due_at = models.DateTimeField(null=True, blank=True)
    assignee_id = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE, related_name="checklist_items")

    def __str__(self):
        """
        Returns a string representation of the checklist item.
        Overrides the default __str__ method.
        Returns:
            str: The name of the checklist item.
        """
        return self.name
    

class Label(BaseModel):
    """
    Label model to represent a label for categorizing tasks.
    Attributes:
        name (CharField): The name of the label.
        color (CharField): The color code for the label.
    """
    
    name = models.CharField(max_length=255)
    color = models.CharField(max_length=7)

    def __str__(self):
        """
        Returns a string representation of the label.
        Overrides the default __str__ method.
        Returns:
            str: The name of the label.
        """
        return self.name

class TaskLabel(BaseModel):
    """
    TaskLabel model to represent the assignment of a label to a task.
    Attributes:
        task_id (ForeignKey): The task to which the label is assigned.
        label_id (ForeignKey): The label assigned to the task.
    """
    
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="labels")
    label_id = models.ForeignKey(Label, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        """
        Returns a string representation of the task label.
        Overrides the default __str__ method.
        Returns:
            str: The name of the task label.
        """
        return f"{self.label} assigned to {self.task}"


class Invite(BaseModel):
    """
    Invite model to represent an invitation to join a workspace.
    Attributes:
        workspace_id (ForeignKey): The workspace for which the invite is sent.
        sender_id (ForeignKey): The user who sent the invite.
        recipient_email (EmailField): The email address of the recipient.
        token (UUIDField): The token used for accepting the invite.
        is_accepted (BooleanField): Indicates whether the invite has been accepted.
    """
    
    workspace_id = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="invites")
    sender_id = models.ForeignKey("accounts.CustomUser", on_delete=models.CASCADE, related_name="sent_invites")
    recipient_email = models.EmailField()

    # Internal fields
    token = models.UUIDField(default=uuid.uuid4, editable=False)
    is_accepted = models.BooleanField(default=False)

    def __str__(self):
        """
        Returns a string representation of the invite.
        Overrides the default __str__ method.
        Returns:
            str: The email address of the recipient.
        """
        return self.recipient_email
    
