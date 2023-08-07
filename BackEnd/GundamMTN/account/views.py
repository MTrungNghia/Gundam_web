import random
import string
from django.shortcuts import render
from .serializers import UserSerializer, UserAddressSerializers
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from rest_framework import exceptions
import jwt
import datetime
from django.core.mail import send_mail
# Create your views here.

from rest_framework.views import APIView
from .models import Reset, User, UserToken, UserAddress
from .authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token, JWTAuthentication

from google.oauth2 import id_token
from google.auth.transport.requests import Request as GoogleRequest


class RegisterView(APIView):
    def post(seft, request):
        data = request.data

        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView1(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret',
                           algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response


class UserView1(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret',
                                 algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)


class LogoutView1(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }

        return response


# refresh token:
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        UserToken.objects.create(user_id=user.id, token=refresh_token,
                                 expired_at=datetime.datetime.utcnow() + datetime.timedelta(days=7))

        response = Response()

        response.set_cookie(key='refreshToken',
                            value=refresh_token, httponly=True)
        response.set_cookie(key='access_token',
                            value=access_token, httponly=True)
        response.data = {
            'token': access_token
        }

        return response


class UserDetailLoginView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()
        print(auth)

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()

            serializer = UserSerializer(user)

            return Response(serializer.data)
        raise AuthenticationFailed('Unauthenticated!')


class UserView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()
        print(auth)

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()

            serializer = UserSerializer(user)

            return Response(serializer.data)
        raise AuthenticationFailed('Unauthenticated!')


class RefreshView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)

        if not UserToken.objects.filter(
            user_id=id,
            token=refresh_token,
            expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
        ).exists():
            raise AuthenticationFailed('Unauthenticated!')

        access_token = create_access_token(id)

        return Response({
            'token': access_token
        })


class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')

        UserToken.objects.filter(token=refresh_token).delete()

        response = Response()
        response.delete_cookie(key='access_token')
        response.delete_cookie(key='refreshToken')
        response.data = {
            'message': 'success'
        }

        return response


class ForgotAPIView(APIView):
    def post(seft, request):
        email = request.data['email']
        token = ''.join(random.choice(string.ascii_lowercase +
                        string.digits) for _ in range(10))

        Reset.objects.create(
            email=email,
            token=token
        )

        url = 'http://localhost:3000/reset/' + token

        send_mail(
            subject='reset your password',
            message='Click <a href="%s"> here</a> to reset your password!' % url,
            from_email='from@example.com',
            recipient_list=[email]
        )

        return Response({
            "message": "success"
        })


class ResetAPIView(APIView):
    def post(seft, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match!')

        reset_password = Reset.objects.filter(token=data['token']).first()

        if not reset_password:
            raise exceptions.APIException('Invalid link!')

        user = User.objects.filter(email=reset_password.email).first()

        if not user:
            raise exceptions.APIException('User not found!')

        user.set_password(data['password'])
        user.save()

        return Response({
            "message": "success"
        })


class GoogleAuthAPIView(APIView):
    def post(seft, request):
        token = request.data['token']

        googleUser = id_token.verify_token(token, GoogleRequest())
        print(googleUser)
        if not googleUser:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(email=googleUser['email']).first()

        if not user:
            user = User.objects.create(
                name=googleUser['given_name'],
                email=googleUser['email'],
            )
            user.set_password(token)
            user.save()

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        UserToken.objects.create(user_id=user.id, token=refresh_token,
                                 expired_at=datetime.datetime.utcnow() + datetime.timedelta(days=7))

        response = Response()

        response.set_cookie(key='refreshToken',
                            value=refresh_token, httponly=True)
        response.set_cookie(key='access_token',
                            value=access_token, httponly=True)
        response.data = {
            'token': access_token
        }

        return response


# class UserAddressAPI(APIView):
#     def post(self, request):
#         data = request.data
#         serializer = UserAddressSerializers(data=data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
class UserAddressAPI(APIView):
    def get(self, request, user_id):
        addresses = UserAddress.objects.filter(user=user_id)
        serializer = UserAddressSerializers(addresses, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = UserAddressSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Address create successed!'}, status=201)
        return Response({'error': 'Address create failed!'}, status=400)
