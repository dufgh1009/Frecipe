from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status

import cv2
import numpy as np
import pytesseract
import re
import json
import urllib.request
import ssl
from pprint import pprint

from rest_framework.views import APIView
from rest_framework.response import Response
import requests # to get image from the web
import shutil # to save it locally
from OCR.serializer import UrlSerializer



@api_view(['POST'])
def ocr(request):
    """
    코드 조각을 모두 보여주거나 새 코드 조각을 만듭니다.
    """
    if request.method == 'POST':
        serializer = UrlSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer)
            # image_url = serializer.initial_data['url']
            # image_url = "https://picsum.photos/200/300"
            filename = "./OCR/data/images/img.jpg"

            ssl._create_default_https_context = ssl._create_unverified_context
            urllib.request.urlretrieve(image_url, filename)

    
            img = cv2.imread("./OCR/data/images/img.jpg")
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
            data["food"] = new_text
            json_data = json.dumps(data, indent='\t')
            return Response(json_data, status=status.HTTP_201_CREATED)