from django.contrib import admin
from .models import QAEntry


@admin.register(QAEntry)
class QAEntryAdmin(admin.ModelAdmin):
    list_display = ("user", "question_text", "plugin_source", "created_at")
    search_fields = ("question_text", "answer_text", "user__username")
    list_filter = ("plugin_source", "created_at")
