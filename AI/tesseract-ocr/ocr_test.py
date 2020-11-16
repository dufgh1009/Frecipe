import cv2
import numpy as np
import pytesseract

# pytesseract.pytesseract.tesseract_cmd = r"C:\Users\multicampus\Desktop\2semester\Tesseract-ocr\tesseract.exe"

img = cv2.imread("5.jpg")
# 너무 크거나 작은 jpg파일을 적절한 size로 변경해 준다. 
img = cv2.resize(img, None, fx=1, fy=0.5)
 
# 음영에 따른 인식률을 개선해 준다. 
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# 흑백이 된 사진을 좀 더 진하게? 해준다 Threshold가(내 눈에는 더 안보이는 듯?)
adaptive_threshold = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 115, 50)
# cv2.THRESH_BINARY뒤의 앞의 숫자를 조절하면 굵기를 조절 할 수 있다. 뒤의 숫자는 threshold이다 noise를 줄일 수 있다.
# 굴곡(wave)를 개선해 준다. + text가 없는 부분까지 tesseract가 인식하는 것을 방지해 준다. 

# PageSegMode values(PSM)
config = "--psm 3"
# text = pytesseract.image_to_string(img, config=config, lang='kor')
text = pytesseract.image_to_string(adaptive_threshold, config=config, lang='kor')
print(text)


cv2.imshow("gray", gray)
cv2.imshow("adaptive th", adaptive_threshold)
cv2.waitKey(0)