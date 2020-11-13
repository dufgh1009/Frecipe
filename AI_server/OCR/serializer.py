from rest_framework import serializers
from . import models

class UrlSerializer(serializers.ModelSerializer) :
    class Meta :
        model = models.Url      # post 모델 사용
        fields = '__all__'        # 모든 필드 포함