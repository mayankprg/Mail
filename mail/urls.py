from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


from . import views

urlpatterns = [

    path("", views.index, name="index"),

    # API Routes
    path("api/emails", views.compose, name="compose"),
    path("api/emails/<int:email_id>", views.email, name="email"),
    path("api/emails/<str:mailbox>", views.mailbox, name="mailbox"),

    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/', views.signup, name='signup'),

]
