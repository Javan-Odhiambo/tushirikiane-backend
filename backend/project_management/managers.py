from django.core.exceptions import ValidationError
from django.db import models
from rest_framework.exceptions import NotFound


class CustomWorkspaceManager(models.Manager):

	def get_by_id_or_slug_or_404(self, pk: str, queryset=None):
		if not queryset:
			queryset = self.get_queryset()

		try:
			_object = queryset.filter(id=pk).first()
		except ValidationError:
			_object = queryset.filter(slug=pk).first()

		if _object:
			return _object
		else:
			raise NotFound(detail="Workspace Not Found!")
