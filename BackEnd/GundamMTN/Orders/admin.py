from django.contrib import admin
from .models import OrderItem, Order, DiscountCode
# Register your models here.
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(DiscountCode)
