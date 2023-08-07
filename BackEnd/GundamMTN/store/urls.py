from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api-list/', views.apiOverView, name='apiOverView'),
    path('list/', views.ProductList, name='CategoryList'),
    path('create/', views.ProductCreate, name='create_product'),
    path('detail/<str:slug>/', views.ProductDetail, name='CategoryCreate'),
    path('search/<str:text>/', views.ProductSearch, name='ProductSearch'),
    path('update/<str:pk>/',
         views.ProductUpdate, name='ProductUpdate'),
    path('delete/<str:pk>/',
         views.ProductDelete, name='ProductDelete'),
]
