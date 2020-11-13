import cv2
import numpy as np
import pytesseract

# pytesseract.pytesseract.tesseract_cmd = r"C:\Users\multicampus\Desktop\2semester\Tesseract-ocr\tesseract.exe"

img = cv2.imread("17.jpg", 0)
# 너무 크거나 작은 jpg파일을 적절한 size로 변경해 준다. 
# img = cv2.resize(img, None, fx=1, fy=1)
#OTSU
img_blur = cv2.GaussianBlur(img, (5,5), 0)
ret, img_result3 = cv2.threshold(img_blur,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)

# 음영에 따른 인식률을 개선해 준다. 
# 필요 gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# 흑백이 된 사진을 좀 더 진하게? 해준다 Threshold가(내 눈에는 더 안보이는 듯?)

# 필요 denoised = cv2.fastNlMeansDenoising(gray, h=10, searchWindowSize=21, templateWindowSize=7)

# adaptive_threshold = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 91, 31)

# 필요 adaptive_threshold = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 21, 5)

# adaptive_threshold_3 = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 11)
# adaptive_threshold_1 = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 85, 30)
# cv2.THRESH_BINARY뒤의 앞의 숫자를 조절하면 굵기를 조절 할 수 있다. 뒤의 숫자는 threshold이다 noise를 줄일 수 있다.
# 굴곡(wave)를 개선해 준다. + text가 없는 부분까지 tesseract가 인식하는 것을 방지해 준다. 


# PageSegMode values(PSM)
config = "--psm 3"
# 필요 text_1 = pytesseract.image_to_string(adaptive_threshold, config=config, lang='kor+eng')
text = pytesseract.image_to_string(img_result3, config=config, lang='kor')
print(text)

# ---
# text = text.replace(" ", "")
# temp_list = text.split("\n")
# text_list = []
# for i, line in enumerate(temp_list):
#     if len(line) == 0:
#         continue
#     text_list.append(line)
# text_list.pop()

# import re

# new_text = []
# for i, line in enumerate(text_list):
#     if line[-1].isdecimal():
#         temp = re.sub('[^가-힣]', '', line)
#         if temp != '':
#             new_text.append(temp)
# print(new_text)
# ---

cv2.imshow("THRESH_OTSU+Gaussian filtering", img_result3)
# cv2.imshow("gray", gray)
# cv2.imshow("adaptive th", adaptive_threshold)
# cv2.imshow("adaptive_threshold_2", adaptive_threshold_2)
# cv2.imshow("adaptive_threshold_3", adaptive_threshold_3)
cv2.waitKey(0)
