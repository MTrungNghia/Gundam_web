from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api-list/', views.apiOverView, name='apiOverView'),
    path('list/', views.CategoryList, name='CategoryList'),
    path('listOther/<str:slug>/',
         views.CategoryListOther, name='CategoryListOther'),
    path('create/', views.CategoryCreate, name='CategoryCreate'),
    path('products/<str:slug>/', views.ProductsByCategory,
         name='ProductsByCategory'),
    path('products-by-categorys/<str:slug1>/<str:slug2>/',
         views.ProductsByCategorys, name='ProductsByCategorys'),
    path('update/<str:pk>/',
         views.CategoryUpdate, name='CategoryUpdate'),
    path('delete/<str:pk>/',
         views.CategoryDelete, name='CategoryDelete'),
]
