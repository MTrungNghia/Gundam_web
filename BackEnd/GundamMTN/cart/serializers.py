from rest_framework import serializers
from .models import Cart, CartItem


class CartSerializers(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

# class CartItemSerializers(serializers.ModelSerializer):
#     product_name = serializers.SerializerMethodField()
#     product_slug = serializers.SerializerMethodField()
#     product_price = serializers.SerializerMethodField()
#     product_image = serializers.SerializerMethodField()
#     product_inventory = serializers.SerializerMethodField()

#     class Meta:
#         model = CartItem
#         fields = ['id', 'product', 'quantity', 'is_active', 'product_name',
#                   'product_slug', 'product_price', 'product_image', 'product_inventory']

#     def get_product_name(self, obj):
#         return obj.product.product_name

#     def get_product_slug(self, obj):
#         return obj.product.slug

#     def get_product_price(self, obj):
#         return obj.product.price

#     def get_product_image(self, obj):
#         # Logic to get the image URL or base64 encoded image
#         return obj.product.image

#     def get_product_inventory(self, obj):
#         return obj.product.inventory
