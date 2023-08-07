# Generated by Django 4.1.6 on 2023-07-18 09:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('account', '0006_user_is_admin'),
        ('cart', '0005_cart_quantity'),
        ('store', '0005_alter_product_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscountCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('name_code', models.CharField(max_length=50, unique=True)),
                ('discount', models.IntegerField()),
                ('quantity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('is_active', models.BooleanField(default=True)),
                ('cart', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='cart.cart')),
                ('product', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='store.product')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('date_added', models.DateField(auto_now_add=True)),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('order_status', models.CharField(choices=[('PENDING', 'Đang chờ xử lý'), ('SHIPPED', 'Đã giao hàng'), (
                    'DELIVERED', 'Đã nhận hàng'), ('CANCELLED', 'Đã hủy')], default='PENDING', max_length=20)),
                ('payment_method', models.CharField(choices=[('CREDIT_CARD', 'Thẻ tín dụng'), (
                    'BANK_TRANSFER', 'Chuyển khoản ngân hàng'), ('COD', 'Thanh toán khi nhận hàng')], default='COD', max_length=20)),
                ('user_address', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE, to='account.useraddress')),
            ],
        ),
    ]
