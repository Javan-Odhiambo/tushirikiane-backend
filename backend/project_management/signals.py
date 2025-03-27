# from .models import Board
#
#
# def add_position_to_board(sender, **kwargs):
# 	if kwargs.get("created", True):
# 		board = kwargs.get("instance")
# 		workspace_pk = board.workspace.id
# 		position = Board.objects.filter(workspace_id=workspace_pk).count()
#
#
# 		if not workspace:
# 			# TODO: Add error tracking
# 			print("Error creating workspace")
