from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, redirect, render
from .models import CartItem, Cart
from django.core.exceptions import ObjectDoesNotExist
from account.models import User
from store.models import Product
from django.contrib.auth.decorators import login_required
from account.authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token, JWTAuthentication
from rest_framework.authentication import get_authorization_header
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

from account.serializers import UserSerializer
from .serializers import CartSerializers, CartItemSerializers
import base64


class CartDetailAPIView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()
            try:

                cart = Cart.objects.get(user=user)
                serializer = CartSerializers(instance=cart)
                # get cart item in cart:

            except Cart.DoesNotExist:
                cart = Cart.objects.create(user=user)
                serializer = CartSerializers(instance=cart)
            print(cart.quantity)
            cartItems = CartItem.objects.filter(cart=cart)
            itemSerializer = CartItemSerializers(instance=cartItems, many=True)
            listP = []
            for PItem in cartItems:
                p_name = PItem.product.product_name
                p_slug = PItem.product.slug
                p_price = PItem.product.price
                p_image = PItem.product.image
                print(str(p_image))
                p_invetory = PItem.product.inventory
                product = {
                    'product_name': p_name,
                    'slug': p_slug,
                    'price': p_price,
                    'image': str(p_image),
                    'inventory': p_invetory,
                    'quantity': PItem.quantity
                }

                listP.append(product)

            cart = {
                'cart': serializer.data,
                'item_cart': itemSerializer.data,
                'list_product': listP,
            }

            return Response({"cart_detail": cart})
        raise AuthenticationFailed('Unauthenticated!')


class AddCartView(APIView):
    def post(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()
            product_slug = request.data.get('product_slug')
            p_quantity = request.data.get('p_quantity')
            cart = Cart.objects.get(user=user)
            product = Product.objects.get(slug=product_slug)

            if (int(p_quantity) <= int(product.inventory)):
                try:
                    cart_item = CartItem.objects.get(
                        cart=cart, product=product)
                    cart_item.quantity += int(p_quantity)
                    cart_item.save()
                except CartItem.DoesNotExist:
                    cart_item = CartItem.objects.create(
                        cart=cart,
                        product=product,
                        quantity=int(p_quantity),
                    )
                    cart_item.save()
            else:
                return Response({'error': 'Product added to cart failed'})

            # Trả về response dạng JSON
            return Response({'message': 'Product added to cart successfully'})
        raise AuthenticationFailed('Unauthenticated!')


class UpdateCartItemAPI(APIView):
    def post(self, request):
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()
            product_slug = request.data.get('product_slug')
            p_quantity = request.data.get('p_quantity')
            cart = Cart.objects.get(user=user)
            product = Product.objects.get(slug=product_slug)
            if (int(p_quantity) <= int(product.inventory)):
                cart_item = CartItem.objects.get(cart=cart, product=product)
                cart_item.quantity = int(p_quantity)
                cart_item.save()
            else:
                return Response({'error': 'Product added to cart failed'})

    # Trả về response dạng JSON
            return Response({'message': 'Product added to cart successfully'})
        raise AuthenticationFailed('Unauthenticated!')


class RemoveCartItemAPI(APIView):
    def post(self, request):
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()
            product_slug = request.data.get('product_slug')
            cart = Cart.objects.get(user=user)
            product = Product.objects.get(slug=product_slug)
            cart_item = CartItem.objects.filter(
                cart=cart, product=product).first()
            cart_item.delete()
    # Trả về response dạng JSON
            return Response({'message': 'Product removed'})
        raise AuthenticationFailed('Unauthenticated!')


def remove_cart(request, product_id):
    cart = Cart.objects.get(cart_id=_cart_id(request))
    product = get_object_or_404(Product, id=product_id)
    cart_item = CartItem.objects.get(product=product, cart=cart)
    if (cart_item.quantity > 1):
        cart_item.quantity -= 1
        cart_item.save()
    else:
        cart_item.delete()
    return redirect('cart')


def remove_cart_item(request, product_id):
    cart = Cart.objects.get(cart_id=_cart_id(request))
    product = get_object_or_404(Product, id=product_id)
    cart_item = CartItem.objects.get(product=product, cart=cart)
    cart_item.delete()
    return redirect('cart')

# Create your views here.


def cart(request, total=0, quantity=0, cart_item=None):
    cart_items = None
    try:
        tax = 0
        grand_total = 0
        cart = Cart.objects.get(cart_id=_cart_id(request))
        cart_items = CartItem.objects.filter(cart=cart, is_active=True)
        for cart_item in cart_items:
            total += (cart_item.product.price * cart_item.quantity)
            quantity += cart_item.quantity
        tax = (2 * total)/100
        grand_total = total + tax
    except ObjectDoesNotExist:
        pass
    context = {
        'total': total,
        'quantity': quantity,
        'cart_items': cart_items,
        'tax': tax,
        'grand_total': grand_total,
    }
    return render(request, 'store/cart.html', context)


@login_required(login_url='login')
def checkout(request, total=0, quantity=0, cart_item=None):
    try:
        tax = 0
        grand_total = 0
        cart = Cart.objects.get(cart_id=_cart_id(request))
        cart_items = CartItem.objects.filter(cart=cart, is_active=True)
        for cart_item in cart_items:
            total += (cart_item.product.price * cart_item.quantity)
            quantity += cart_item.quantity
        tax = (2 * total)/100
        grand_total = total + tax
    except ObjectDoesNotExist:
        pass
    context = {
        'total': total,
        'quantity': quantity,
        'cart_items': cart_items,
        'tax': tax,
        'grand_total': grand_total,
    }
    return render(request, 'store/checkout.html', context)
