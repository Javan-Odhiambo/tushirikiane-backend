from project_management.models import Workspace


def create_default_workspace(sender, **kwargs):
	""" Creates a default workspace each time a new user is added to the system.
		Sends an error email incase it fails.

	:param sender: The model sending the signal: (CustomUserModel)
	:param kwargs:
	:return: None
	"""
	if kwargs.get("created", False):
		user = kwargs.get("instance")
		workspace = Workspace.objects.create(name=f"{user.first_name}'s Workspace", owner=user)

		if not workspace:
			# TODO: Add error tracking
			print("Error creating workspace")
