from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('cart_detail/',
         views.CartDetailAPIView.as_view(), name='cart_detail'),
    path('add_item_cart/', views.AddCartView.as_view(), name='add_item_cart'),
    path('update_cart_item/', views.UpdateCartItemAPI.as_view(),
         name='update_cart_item'),
    path('remove_item_in_cart/', views.RemoveCartItemAPI.as_view(),
         name='remove_item_in_cart'),
    path('remove_cart_item/', views.remove_cart, name='remove_cart_item'),
    # path('get_cart/<int:cart_id>/', views.get_cart_items, name='get_cart_items'),
]
