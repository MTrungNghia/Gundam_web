from django.db import models
from django.urls import reverse
import uuid
from django.utils import timezone
from category.models import Category
from django.utils.text import slugify

# Create your models here.


def generate_filename(instance, filename):
    # Tạo tên tệp duy nhất bằng cách sử dụng uuid4
    unique_filename = f"{uuid.uuid4().hex}_{timezone.now().strftime('%Y%m%d%H%M%S')}"

    # Trả về đường dẫn tệp mới
    return f"photo/products/{unique_filename}.png"


def generate_slug(name):
    # Sử dụng slugify để chuyển đổi giá trị thành dạng slug
    slug = slugify(name)
    return slug


class Product(models.Model):
    product_name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(max_length=2000, blank=True)
    price = models.IntegerField()
    inventory = models.IntegerField()
    image = models.ImageField(upload_to=generate_filename, blank=True)
    is_available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now_add=True)

    def get_url(self):
        return reverse('product_detail', args=[self.category.slug, self.slug])

    def save(self, *args, **kwargs):
        # Tạo giá trị slug từ product_name
        self.slug = slugify(self.product_name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.product_name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    Images = models.ImageField(upload_to=generate_filename, blank=True)

    def __str__(self):
        return str(self.product)
