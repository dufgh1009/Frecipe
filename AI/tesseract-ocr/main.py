import cv2
import numpy as np
import pytesseract
import re
import json
from pprint import pprint

img = cv2.imread("./data/images/img.jpg")
# img = cv2.bitwise_not(img_1) #색반전
# 너무 크거나 작은 jpg파일을 적절한 size로 변경해 준다. 
img = cv2.resize(img, None, fx=1, fy=1)
 
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
denoised = cv2.fastNlMeansDenoising(gray, h=10, searchWindowSize=21, templateWindowSize=7)
adaptive_threshold = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 85, 31)
# cv2.THRESH_BINARY뒤의 앞의 숫자를 조절하면 굵기를 조절 할 수 있다. 뒤의 숫자는 thresho. 

# PageSegMode values(PSM)
config = "--psm 3"
text = pytesseract.image_to_string(adaptive_threshold, config=config, lang='kor')

# print(text)
text = text.replace(" ", "")
temp_list = text.split("\n")
text_list = []
for i, line in enumerate(temp_list):
    if len(line) == 0:
        continue
    text_list.append(line)
text_list.pop()
# for i, line in enumerate(text_list):
#     print(i+1, ':', line)

new_text = []
for i, line in enumerate(text_list):
    if line[-1].isdecimal():
        temp = re.sub('[^가-힣]', '', line)
        if(temp != ''):
            if('번호' in temp or '대표' in temp or '주소' in temp):
                continue
            new_text.append(temp)
# print(new_text)

data = dict()
data["food"] = new_text
print(type(data))
pprint(data)
json_data = json.dumps(data, indent='\t')
# pprint(json_data)
# print(type(json_data))

with open('./data/out/food.json', 'w', encoding='utf-8') as make_file:
    json.dump(data, make_file, ensure_ascii=False, indent='\t')
