from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status

import os
import cv2
import numpy as np
import pytesseract
import re
import json
import urllib.request
import ssl
import boto3
import base64
from pprint import pprint

from rest_framework.views import APIView
from rest_framework.response import Response
import requests # to get image from the web
import shutil # to save it locally
from OCR.serializer import UrlSerializer

AWS_ACCESS_KEY_ID = "AKIAI57OTFAAN6JU7AAA"
AWS_SECRET_ACCESS_KEY = "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"
AWS_DEFAULT_REGION = "ap-northeast-2"
AWS_BUCKET_NAME = "frecipe-pjt"


@api_view(['POST'])
def ocr(request):
    """
    코드 조각을 모두 보여주거나 새 코드 조각을 만듭니다.
    """
    if request.method == 'POST':
        serializer = UrlSerializer(data=request.data)
        print(1111111111)
        if serializer.is_valid():
            image_bytes = serializer.initial_data['url']
            print(image_bytes)
            temp_filename = serializer.initial_data['filename']
            imgdata = base64.b64decode(image_bytes)

            filename = "../ai_server/static/" + temp_filename
            with open(filename, 'wb') as f:
                f.write(imgdata)

            img = cv2.imread(filename)
            img = cv2.resize(img, None, fx=1, fy=1)

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            denoised = cv2.fastNlMeansDenoising(gray, h=10, searchWindowSize=21, templateWindowSize=7)
            adaptive_threshold = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 85, 31)

            config = "--psm 3"
            text = pytesseract.image_to_string(adaptive_threshold, config=config, lang='kor')

            text = text.replace(" ", "")
            temp_list = text.split("\n")
            text_list = []
            for i, line in enumerate(temp_list):
                if len(line) == 0:
                    continue
                text_list.append(line)
            text_list.pop()

            new_text = []
            for i, line in enumerate(text_list):
                if line[-1].isdecimal():
                    temp = re.sub('[^가-힣]', '', line)
                    if(temp != ''):
                        if('번호' in temp or '대표' in temp or '주소' in temp):
                            continue
                        new_text.append(temp)

            data = dict()
            data["foods"] = new_text
            print(data)
            return Response(data, status=status.HTTP_201_CREATED)