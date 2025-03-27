from django.contrib import admin

from .models import Board, Workspace


# Register your models here.
class WorkspaceAdmin(admin.ModelAdmin):
    list_display = ("id",)


class BoardAdmin(admin.ModelAdmin):
    list_display = ("id",)


admin.site.register(Workspace, WorkspaceAdmin)
admin.site.register(Board, BoardAdmin)
