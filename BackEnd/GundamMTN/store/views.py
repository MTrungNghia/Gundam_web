from __future__ import unicode_literals
from django.http import HttpResponse
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import ProductImageSerializers, ProductSerializers, ProductSerializer
from .models import Product, ProductImage
from rest_framework.pagination import PageNumberPagination
from rest_framework.pagination import LimitOffsetPagination
# Create your views here.
from util.views import CustomPagination


@api_view(['GET'])
def apiOverView(request):
    api_urls = {
        'List': 'list/',
        'Create product': 'product_create/',
        'Product Detail': 'product-detail/<str:slug>/',
        'Update product': 'product-update/<str:pk>/',
        'Delete product': 'product-delete/<str:pk>/',
    }
    return Response(api_urls)


def create_product(p_id, image_file):
    PImage = ProductImage(product=p_id, Images=image_file)
    PImage.save()
    return PImage


@api_view(['POST'])
def ProductCreate(request):
    data = request.data
    ImageList = request.data.getlist('ImageList')
    serializer = ProductSerializer(data=data)
    # product = Product.objects.filter(product_name=data['product_name'])
    ImageList = list(filter(lambda x: x != 'null', ImageList))

    if serializer.is_valid():
        serializer.save()
        product = Product.objects.get(product_name=data['product_name'])
        # proDerializer = ProductSerializers(product, many=False)
        # pID = int(proDerializer.data['id'])
        for imageItem in ImageList:
            create_product(p_id=product, image_file=imageItem)

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


@api_view(['GET'])
def ProductList(request):
    paginator = PageNumberPagination()
    paginator.page_size = 8  # Số lượng bản ghi trên mỗi trang

    products = Product.objects.all()
    paginated_products = paginator.paginate_queryset(products, request)
    serializer = ProductSerializers(products, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def ProductDetail(request, slug):
    product = Product.objects.get(slug=slug)
    proDerializer = ProductSerializers(product, many=False)
    pDetail = proDerializer.data
    pDetail['category_name'] = product.category.category_name
    pDetail['category_slug'] = product.category.slug
    proImgs = ProductImage.objects.filter(product=product)
    imageDerializer = ProductImageSerializers(proImgs, many=True)
    pDetail['images'] = imageDerializer.data

    return Response(pDetail)


@api_view(['GET'])
def ProductSearch(request, text):
    paginator = CustomPagination()
    paginator.page_size = 16  # Số lượng bản ghi trên mỗi trang
    products = Product.objects.filter(product_name__icontains=text)
    paginated_products = paginator.paginate_queryset(products, request)
    serializer = ProductSerializers(paginated_products, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
def ProductUpdate(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializers(instance=product, data=request.data)
    if serializer.is_valid():
        serializer.save()
    print(serializer.data)
    return Response(serializer.data)


@api_view(['DELETE'])
def ProductDelete(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()

    return Response("Product succesfully delete")
