from PIL import Image
from pytesseract import *
import configparser
import os
import cv2
import numpy as np


# Config Parser 초기화
config = configparser.ConfigParser()
# Config file 읽기
# config.read(os.path.dirname(os.path.realpath(__file__)) + os.sep + 'envs' + os.sep + 'property.ini')


# 이미지 -> 텍스트 추출
def img_to_str(path, save_path, file_name):

    # pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

    # 이미지 경로
    img = Image.open(path)
    file_name = os.path.join(save_path, file_name.split('.')[0])

    image = cv2.imread(path)
    # image = cv2.resize(image, None, fx=0.5, fy=0.5)

    # 이미지 전처리
    # gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # cv2.imshow('gray', gray)
    # gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    # cv2.imshow('thre', gray)
    # cv2.waitKey(0)
    # gray = cv2.medianBlur(gray, 3)

    # 추출(이미지파일, 추출언어, 옵션)
    # preserve_interword_spaces : 단어 간격 옵션을 조절하면서 추출 정확도 확인
    # psm(페이지 세그먼트 모드) : 이미지 영역안에서 텍스트 추출 범위 모드
    text = image_to_string(image, lang='kor+eng', config='--oem 3 --psm 1 -c preserve_interword_spaces=1')
    # text = image_to_string(gray, lang='kor', config='--oem 3 --psm 4 -c preserve_interword_spaces=1')
    # text = image_to_string(gray, lang='kor', config='--oem 3 --psm 11')
    # text = image_to_string(img, lang="kor")
    text = text.replace(" ", "")
    # print('Extract FileName : ', file_name, '\n')
    # print(text)

    str_to_txt(file_name, text)

# 추출된 텍스트 .txt 파일 저장
def str_to_txt(file_name, text):
    with open(file_name + '.txt', 'w', encoding='utf-8') as f:
        f.write(text)

if __name__ == "__main__":

    # 텍스트 파일 저장 경로
    save_path = "./data/out/"
    img_path = "./data/images/"

    # OCR 추출 작업
    for root, dirs, files in os.walk(os.path.dirname(os.path.realpath(__file__)) + img_path):
        for fname in files:
            path = os.path.join(root, fname)
            img_to_str(path, save_path, fname)
