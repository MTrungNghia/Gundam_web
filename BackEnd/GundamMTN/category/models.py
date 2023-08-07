from django.db import models
from django.urls import reverse
import uuid
from django.utils import timezone
# Create your models here.


def generate_filename(instance, filename):
    # Tạo tên tệp duy nhất bằng cách sử dụng uuid4
    unique_filename = f"{uuid.uuid4().hex}_{timezone.now().strftime('%Y%m%d%H%M%S')}"

    # Trả về đường dẫn tệp mới
    return f"photo/categories/{unique_filename}.png"


class Category(models.Model):
    category_name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(max_length=255, blank=True)
    cate_image = models.ImageField(upload_to=generate_filename, blank=True)

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def get_url(self):
        return reverse('products_by_category', args=[self.slug])

    def __str__(self):
        return self.category_name
