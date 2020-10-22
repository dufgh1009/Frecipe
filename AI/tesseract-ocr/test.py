from PIL import Image
import pytesseract

img_path = "./data/images/"
save_path ="./data/out/"

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
text = pytesseract.image_to_string(Image.open("./data/images/1.jpg"), lang="kor+eng")
print(text)
print(text.replace(" ", ""))
