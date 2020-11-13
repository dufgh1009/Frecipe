from django.shortcuts import render
from rest_framework.decorators import api_view

import cv2
import numpy as np
import pytesseract
import re
import json
import urllib.request
import ssl

from rest_framework.views import APIView
from rest_framework.response import Response
import requests # to get image from the web
import shutil # to save it locally

# Create your views here.
# @api_view(['POST'])
# def ocr(request):
#     ## Set up the image URL and filename
#     image_url = "https://picsum.photos/200/300"
#     filename = image_url.split("/")[-1]

#     # Open the url image, set stream to True, this will return the stream content.
#     r = requests.get(image_url, stream = True)

#     # Check if the image was retrieved successfully
#     if r.status_code == 200:
#         # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
#         r.raw.decode_content = True
        
#         # Open a local file with wb ( write binary ) permission.
#         with open(filename,'wb') as f:
#             shutil.copyfileobj(r.raw, f)
            
#         print('Image sucessfully Downloaded: ',filename)
#     return Response({}, status=200)
    # img = cv2.imread("./data/images/img.jpg")
    # img = cv2.resize(img, None, fx=1, fy=1)
    
    # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # denoised = cv2.fastNlMeansDenoising(gray, h=10, searchWindowSize=21, templateWindowSize=7)
    # adaptive_threshold = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 85, 31)

    # config = "--psm 3"
    # text = pytesseract.image_to_string(adaptive_threshold, config=config, lang='kor')

    # print(text)
    # text = text.replace(" ", "")
    # temp_list = text.split("\n")
    # text_list = []
    # for i, line in enumerate(temp_list):
    #     if len(line) == 0:
    #         continue
    #     text_list.append(line)
    # text_list.pop()

    # new_text = []
    # for i, line in enumerate(text_list):
    #     if line[-1].isdecimal():
    #         temp = re.sub('[^가-힣]', '', line)
    #         if(temp != ''):
    #             if('번호' in temp or '대표' in temp or '주소' in temp):
    #                 continue
    #             new_text.append(temp)
    # # print(new_text)

    # data = dict()
    # data["food"] = new_text
    # print(type(data))
    # pprint(data)
    # json_data = json.dumps(data, indent='\t')
    # # pprint(json_data)
    # # print(type(json_data))

    # with open('./data/out/food.json', 'w', encoding='utf-8') as make_file:
    #     json.dump(data, make_file, ensure_ascii=False, indent='\t')

    # return json_data
    

class ocr(APIView):
    def get(self, request, **kwargs):
        print(kwargs.get('keyword'))
        image_url = "https://picsum.photos/200/300"
        filename = 'sunshine_dog.jpg'

        # Open the url image, set stream to True, this will return the stream content.
        # r = requests.get(image_url, stream = True)
        ssl._create_default_https_context = ssl._create_unverified_context
        urllib.request.urlretrieve(image_url, filename)

        # Check if the image was retrieved successfully
        # if r.status_code == 200:
        #     # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
        #     r.raw.decode_content = True
            
        #     # Open a local file with wb ( write binary ) permission.
        #     with open(filename,'wb') as f:
        #         shutil.copyfileobj(r.raw, f)
                
        #     print('Image sucessfully Downloaded: ',filename)
        return Response({}, status=200)
