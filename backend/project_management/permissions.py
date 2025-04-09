from rest_framework import permissions
from rest_framework.exceptions import NotFound

from project_management.models import Board


class IsOwnerOrReadOnly(permissions.BasePermission):
	"""
	Custom permission to allow:
	- Owners to perform any action (read, update, delete).
	- Members to only read (view) the workspace.
	"""

	def has_object_permission(self, request, view, obj):
		# Allow read-only access for all requests (GET, HEAD, OPTIONS)
		if request.method in permissions.SAFE_METHODS:
			return True

		# Allow full access only if the user is the owner
		return obj.owner == request.user


class IsOwner(permissions.BasePermission):
	"""
	Custom permission to allow only the owner to perform any action (read, update, delete).
	"""

	def has_object_permission(self, request, view, obj):
		return obj.owner == request.user


class IsMemberOrOwnerFull(permissions.BasePermission):
	"""
	Custom permission to allow:
	- Members to perform any action (read, update, delete).
	- Owners to perform any action (read, update, delete).
	"""

	def has_object_permission(self, request, view, obj):
		return obj.owner == request.user or obj.members.filter(member=request.user).exists()


class IsMemberReadOrOwnerFull(permissions.BasePermission):
	"""
	Permission class to grant read-only access to members and full access to the owner.
	Methods:
		has_object_permission(request, view, obj):
			Checks if the user has permission to access the object.
			- Returns True if the user is a member and the request method is safe (read-only).
			- Returns True if the user is the owner of the object.
			- Otherwise, returns False.
	"""

	def has_object_permission(self, request, view, obj):
		if obj.members.filter(member=request.user).exists() and request.method in permissions.SAFE_METHODS:
			return True

		return obj.owner == request.user


class IsWorkspaceOwnerOrBoardMember(permissions.BasePermission):
	"""
	Allows access only to workspace owners or members of the board.
	Designed to be reusable across views that provide a `board_pk_slug` in kwargs.
	"""

	board_lookup_kwarg = "board_pk_slug"

	def has_permission(self, request, view):
		board_id_or_slug = view.kwargs.get(self.board_lookup_kwarg)

		if not board_id_or_slug:
			return False  # Board ID or slug must be provided in URL

		try:
			board = Board.objects.get_by_id_or_slug_or_404(board_id_or_slug)
		except NotFound:
			return False

		user = request.user

		# Allow access if the user is the workspace owner
		if board.workspace.owner == user:
			return True

		# Or if the user is a board member
		if board.members.filter(member=user).exists():
			return True

		return False


class IsTaskListOwnerOrBoardMember(permissions.BasePermission):
	"""
	Custom object-level permission:
	- Allow if user is workspace owner
	- Or is a member of the board
	"""

	def has_object_permission(self, request, view, obj):
		user = request.user
		board = obj.board
		is_owner = board.workspace.owner == user
		is_board_member = board.members.filter(member=user).exists()

		return is_owner or is_board_member
