from rest_framework.decorators import api_view
from rest_framework.response import Response
from account.models import User
from store.models import Product
from django.contrib.auth.decorators import login_required
from account.authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token, JWTAuthentication
from rest_framework.authentication import get_authorization_header
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from .models import Order, OrderItem, DiscountCode
from account.serializers import UserSerializer
from .serializers import OrderSerializers, OrderItemSerializers, DiscountCodeSerializers
import base64


class DiscountCodeCreateAPIView(APIView):
    def get(self, request):
        sale_code = request.GET.get("sale_code", "")
        if not sale_code:
            return Response({"error": "Sale code is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            discount_code = DiscountCode.objects.get(name_code=sale_code)
            serializer = DiscountCodeSerializers(discount_code)
            return Response(serializer.data)
        except DiscountCode.DoesNotExist:
            return Response({"error": "Discount code not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        serializer = DiscountCodeSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def create_order_item(pro, order, quantity, price):
    order_Item = OrderItem(pro, order, quantity, price)
    order_Item.save()
    return order_Item


class OrderCodeCreateAPIView(APIView):
    def post(self, request):
        data = request.data
        userAddress_id = data['userAddress_id']
        if data['discount_code']:
            discount_code = data['discount_id']
        note = data['note']
        proList = data.getlist('ProList')
        quantity = data['quantity']
        order_status = data['order_status']
        payment_method = data['payment_method']
        total_price = data['total_price']
        serializer = OrderSerializers(data=data)
        if (serializer.is_valid()):
            order = serializer.save()
            for pro in proList:
                create_order_item(pro, order, pro.quantity, pro.price)


# class OrderAPIView(APIView):
#     def get(self, request):
#         auth = get_authorization_header(request).split()

#         if auth and len(auth) == 2:
#             token = auth[1].decode('utf-8')
#             id = decode_access_token(token)

#             user = User.objects.filter(pk=id).first()
#             try:

#                 cart = Cart.objects.get(user=user)
#                 serializer = CartSerializers(instance=cart)
#                 # get cart item in cart:

#             except Cart.DoesNotExist:
#                 cart = Cart.objects.create(user=user)
#                 serializer = CartSerializers(instance=cart)
#             print(cart.quantity)
#             cartItems = CartItem.objects.filter(cart=cart)
#             itemSerializer = CartItemSerializers(instance=cartItems, many=True)
#             listP = []
#             for PItem in cartItems:
#                 p_name = PItem.product.product_name
#                 p_slug = PItem.product.slug
#                 p_price = PItem.product.price
#                 p_image = PItem.product.image
#                 print(str(p_image))
#                 p_invetory = PItem.product.inventory
#                 product = {
#                     'product_name': p_name,
#                     'slug': p_slug,
#                     'price': p_price,
#                     'image': str(p_image),
#                     'inventory': p_invetory,
#                     'quantity': PItem.quantity
#                 }

#                 listP.append(product)

#             cart = {
#                 'cart': serializer.data,
#                 'item_cart': itemSerializer.data,
#                 'list_product': listP,
#             }

#             return Response({"cart_detail": cart})
#         raise AuthenticationFailed('Unauthenticated!')
