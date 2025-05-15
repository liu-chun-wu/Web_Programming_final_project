# your_app_name/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, NoteViewSet, TagViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'tags', TagViewSet)

from django.contrib.auth import views as auth_views

urlpatterns = [
<<<<<<< HEAD
    # CRUD for Note
    path('notes/',                   views.list_notes,    name='list_notes'),
    path('notes/create/',            views.create_note,   name='create_note'),
    path('notes/<int:note_id>/',     views.retrieve_note, name='retrieve_note'),
    path('notes/<int:note_id>/update/', views.update_note, name='update_note'),
    path('notes/<int:note_id>/delete/', views.delete_note, name='delete_note'),
    # --- 新增的查詢功能 ---
    # 以 tag 查筆記
    path('notes/tag/<str:tag_name>/',       views.notes_by_tag, name='notes_by_tag'),
    # 以 title 關鍵字模糊查筆記
    path('notes/search/',                   views.search_notes, name='search_notes'),


    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('check-login/', views.check_login, name='check_login'),
    path('register/', views.register_view, name='register'),

 ]

=======
    path('', include(router.urls)),
]
>>>>>>> main
