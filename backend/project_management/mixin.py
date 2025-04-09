from django.db import transaction


class PositionReorderMixin:
	"""
	Reorders a queryset based on a list of IDs.
	Updates position values in order, atomically.
	"""

	def reorder_queryset(self, queryset, ordered_ids):
		ordered_ids = list(ordered_ids)

		objects = queryset.filter(id__in=ordered_ids)
		id_to_obj = {str(obj.id): obj for obj in objects}

		with transaction.atomic():
			for index, obj_id in enumerate(ordered_ids):
				obj = id_to_obj.get(obj_id)
				if obj:
					obj.position = index + 1
					obj.save()
