from rest_framework import serializers
from .models import User, UserAddress


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        # fields = ['first_name', 'last_name',
        #           'email', 'password', 'is_admin']


class UserDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'email', 'is_admin']


class UserAddressSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['user', 'full_name',
                  'phone_number', 'address', 'province', 'district', 'wards', 'is_default']
