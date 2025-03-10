import uuid
from django.db import models
from django.utils import timezone


class CustomManager(models.Manager):
    """
    Custom manager to filter out deleted objects and order by creation date.

    Methods:
        get_queryset(): Returns a queryset ordered by creation date.
    """

    def get_queryset(self):
        """
        Returns a queryset of objects that are ordered by creation date.

        Overrides the default `get_queryset` method to order the results by the `created_at` field in ascending order.

        QuerySet: A Django QuerySet of objects that are not marked as deleted, ordered by creation date.
        """
        return super().get_queryset().order_by("created_at")


# Create your models here.
class BaseModel(models.Model):
    """
    BaseModel is an abstract base class that provides common fields and functionality for other models.
    Attributes:
        id (UUIDField): Primary key for the model, automatically generated as a UUID.
        created_at (DateTimeField): Timestamp indicating when the record was created.
        updated_at (DateTimeField): Timestamp indicating when the record was last updated.
        objects (CustomManager): Custom manager for handling model queries.
        all_objects (Manager): Default manager for handling model queries.
    Meta:
        abstract (bool): Indicates that this is an abstract base class and should not be used to create database tables.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomManager()
    # all_objects = models.Manager() //Not needed as we are using CustomManager

    class Meta:
        abstract = True
