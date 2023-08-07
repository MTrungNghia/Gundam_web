from django.shortcuts import render

# Create your views here.
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
# Custom pagination


class CustomPagination(PageNumberPagination):
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'pages': self.page.paginator.num_pages,  # Thêm thông tin về số lượng trang
            'results': data
        })

    def get_page_numbers(self):
        # Tính toán số lượng trang có sẵn
        if self.page.paginator:
            return list(range(1, self.page.paginator.num_pages + 1))
        return []
