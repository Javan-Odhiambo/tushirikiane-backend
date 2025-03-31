import logging
from django.urls import include, path
from djoser.views import TokenCreateView
app_name = "accounts"


logger = logging.getLogger("djoser")

class CustomTokenCreateView(TokenCreateView):
    def post(self, request, *args, **kwargs):
        logger.info(f"Login Attempt - Payload: {request.data}")
        return super().post(request, *args, **kwargs)

urlpatterns = [
    path("auth/token/login/", CustomTokenCreateView.as_view(), name="token_create"),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),

]