# your_app_name/views.py
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
<<<<<<< HEAD
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

=======
>>>>>>> main
from .models import User, Note, Tag
from .serializers import UserSerializer, NoteSerializer, TagSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-created_at')
    serializer_class = NoteSerializer

    @action(detail=False, methods=['get'], url_path='by-tag/(?P<tag_name>[^/.]+)')
    def notes_by_tag(self, request, tag_name=None):
        tag = get_object_or_404(Tag, name=tag_name)
        notes = self.queryset.filter(tags=tag)
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        query = request.query_params.get('title', '')
        notes = self.queryset.filter(title__icontains=query)
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)

<<<<<<< HEAD

@csrf_exempt
@require_http_methods(["GET"])
def notes_by_tag(request, tag_name):
    """
    以標籤名稱查詢所有含該標籤的筆記
    URL 範例: GET /app01/notes/tag/python/
    """
    # 1. 取得 Tag，不存在自動 404
    tag = get_object_or_404(Tag, name=tag_name)
    # 2. 透過 related_name 拿到所有關聯的 Note
    notes = tag.notes.all().order_by("-created_at")
    data = [{
        "id":         n.id,
        "user_id":    n.user_id,
        "title":      n.title,
        "content":    n.content,
        "parent_id":  n.parent_id,
        "tags":       [t.name for t in n.tags.all()],
        "created_at": n.created_at,
    } for n in notes]
    return JsonResponse(data, safe=False)
@csrf_exempt
@require_http_methods(["GET"])
def search_notes(request):
    """
    以 title 關鍵字做模糊搜尋
    URL 範例: GET /app01/notes/search/?title=測試
    """
    q = request.GET.get("title", "")
    # __icontains 不分大小寫模糊比對
    notes = Note.objects.filter(title__icontains=q).order_by("-created_at")
    data = [{
        "id":         n.id,
        "user_id":    n.user_id,
        "title":      n.title,
        "content":    n.content,
        "parent_id":  n.parent_id,
        "tags":       [t.name for t in n.tags.all()],
        "created_at": n.created_at,
    } for n in notes]
    return JsonResponse(data, safe=False)


@csrf_exempt
def login_view(request):
    """
    使用者登入：
    接收 POST 請求（JSON 格式）包含 username 和 password
    驗證成功則登入並回傳成功訊息
    失敗則回傳錯誤訊息
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'message': '登入成功'})
        else:
            return JsonResponse({'success': False, 'message': '帳號或密碼錯誤'}, status=401)

    return JsonResponse({'message': '請使用 POST 請求'}, status=405)

def logout_view(request):
    """
    使用者登出：
    清除目前登入的 session
    回傳成功訊息
    """
    logout(request)
    return JsonResponse({'success': True, 'message': '已登出'})

def check_login(request):
    """
    檢查使用者登入：
    若已登入，回傳 True 與使用者帳號
    若未登入，回傳 False
    """
    if request.user.is_authenticated:
        return JsonResponse({'logged_in': True, 'username': request.user.username})
    else:
        return JsonResponse({'logged_in': False})
    
@csrf_exempt
def register_view(request):
    """
    使用者註冊：
    接收 POST 請求（JSON 格式）包含 username、password、email（可選）
    檢查使用者是否已存在
    建立帳號後自動登入並回傳成功訊息
    """
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email', '')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'success': False, 'message': '帳號已存在'}, status=400)

        # 建立使用者
        user = User.objects.create_user(username=username, password=password, email=email)
        login(request, user)  # 註冊後直接登入
        return JsonResponse({'success': True, 'message': '註冊成功並已登入'})

    return JsonResponse({'message': '請使用 POST 請求'}, status=405)
=======
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
>>>>>>> main
