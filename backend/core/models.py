from django.db import models
from django.utils import timezone

class CustomManager(models.Manager):
    """
    Custom manager to filter out deleted objects and order by descending ID.

    Methods:
        get_queryset(): Returns a queryset filtered to exclude deleted objects and ordered by descending ID.
    """

    def get_queryset(self):
        """
        Returns a queryset of objects that are not marked as deleted, ordered by descending ID.
        Overrides the default `get_queryset` method to filter out objects where `is_deleted` is True and orders the results by the `id` field in descending order.
        Returns:
            QuerySet: A Django QuerySet of objects that are not marked as deleted, ordered by descending ID."""
        return super().get_queryset().filter(is_deleted=False).order_by("-id")


# Create your models here.
class BaseModel(models.Model):
    """
    BaseModel is an abstract base class for Django models that provides soft delete functionality.
    Attributes:
        is_deleted (BooleanField): Indicates whether the record is soft deleted. Defaults to False.
        created_at (DateTimeField): The timestamp when the record was created. Defaults to the current time.
        updated_at (DateTimeField): The timestamp when the record was last updated. Automatically updated to the current time.
        deleted_at (DateTimeField): The timestamp when the record was soft deleted. Can be null or blank.
    Managers:
        objects (CustomManager): Custom manager that can be used to filter out soft deleted records.
        all_objects (Manager): Default manager that includes all records, including soft deleted ones.
    Methods:
        delete(using=None, keep_parents=False):
            Soft deletes the record by setting the is_deleted attribute to True and saving the record.
        hard_delete(using=None, keep_parents=False):
            Permanently deletes the record from the database.
    """
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = CustomManager()
    all_objects = models.Manager()

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        """
        Marks the object as deleted by setting the `is_deleted` attribute to True
        and updating the `deleted_at` timestamp to the current time.

        Args:
            using (str, optional): The database alias to use. Defaults to None.
            keep_parents (bool, optional): Whether to keep the parent records. Defaults to False.
        """
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save()

    def hard_delete(self, using=None, keep_parents=False):
        """
        Permanently deletes the instance from the database.

        This method overrides the default delete method to perform a hard delete,
        which means the instance is completely removed from the database without
        any soft delete or archiving.

        Args:
            using (str, optional): The database alias to use for the deletion. Defaults to None.
            keep_parents (bool, optional): Whether to keep the parent instances. Defaults to False.
        """
        super().delete(using=using, keep_parents=keep_parents)