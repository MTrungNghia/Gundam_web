from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name="Register"),
    path('login/', views.LoginView.as_view(), name="Login"),
    path('google-auth/', views.GoogleAuthAPIView.as_view(),
         name="GoogleAuthAPIView"),
    path('user-login-detail/', views.UserDetailLoginView.as_view(),
         name="UserDetailLoginView"),
    path('user/', views.UserView.as_view(), name="UserView"),
    path('logout/', views.LogoutView.as_view(), name="LogoutView"),
    path('refresh/', views.RefreshView.as_view(), name="RefreshView"),
    path('forgot/', views.ForgotAPIView.as_view(), name="ForgotAPIView"),
    path('reset/', views.ResetAPIView.as_view(), name="ResetAPIView"),

    # User address:
    path('list_user_address/<str:user_id>',
         views.UserAddressAPI.as_view(), name="UserAddressAPI"),
    path('create_address/', views.UserAddressAPI.as_view(), name="UserAddressAPI"),

]
