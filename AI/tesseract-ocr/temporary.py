import cv2
import numpy as np
import pytesseract
#참고 사이트
# https://bkshin.tistory.com/entry/OpenCV-10-%ED%9E%88%EC%8A%A4%ED%86%A0%EA%B7%B8%EB%9E%A8
# https://jongwony.github.io/blog/posts/2017-04-26-ocr-training/
# https://blog.naver.com/PostView.nhn?blogId=cjsal95&logNo=220915040360&parentCategoryNo=&categoryNo=22&viewDate=&isShowPopularPosts=true&from=search
# https://blog.naver.com/tommybee/221380482319
# https://github.com/parksunwoo/ocr_kor
# pytesseract.pytesseract.tesseract_cmd = r"C:\Users\multicampus\Desktop\2semester\Tesseract-ocr\tesseract.exe"

img = cv2.imread("7.jpg")
# img = cv2.bitwise_not(img_1) #색반전
# 너무 크거나 작은 jpg파일을 적절한 size로 변경해 준다. 
img = cv2.resize(img, None, fx=1, fy=1)
 
# 음영에 따른 인식률을 개선해 준다. 
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# height, width = gray.shape
# gray_enlarge = cv2.resize(gray, (1*width, 1*height), interpolation=cv2.INTER_LINEAR)
denoised = cv2.fastNlMeansDenoising(gray, h=10, searchWindowSize=21, templateWindowSize=7)
# 흑백이 된 사진을 좀 더 진하게? 해준다 Threshold가(내 눈에는 더 안보이는 듯?)
adaptive_threshold = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 85, 31)
# cv2.THRESH_BINARY뒤의 앞의 숫자를 조절하면 굵기를 조절 할 수 있다. 뒤의 숫자는 threshold이다 noise를 줄일 수 있다.
# 굴곡(wave)를 개선해 준다. + text가 없는 부분까지 tesseract가 인식하는 것을 방지해 준다. 


# PageSegMode values(PSM)
config = "--psm 3"
# text = pytesseract.image_to_string(gray, config=config, lang='kor')
text = pytesseract.image_to_string(adaptive_threshold, config=config, lang='kor+eng')
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

import re

new_text = []
for i, line in enumerate(text_list):
    if line[-1].isdecimal():
        temp = re.sub('[^가-힣]', '', line)
        new_text.append(temp)
print(new_text)
# cv2.imshow("gray", gray)
# cv2.imshow("adaptive th", adaptive_threshold)
# cv2.waitKey(0)