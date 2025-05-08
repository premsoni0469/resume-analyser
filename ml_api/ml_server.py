from flask import Flask, request, jsonify
import joblib
import numpy as np
import PyPDF2
import docx
import re
import pytesseract
from pdf2image import convert_from_path
from PIL import Image
import os

app = Flask(__name__)

# Load trained model and vectorizer
model = joblib.load("ats_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

def extract_text(file_path):
    """Extract text from PDF, DOCX, or image files."""
    text = ""
    print(file_path)
    try:
        if file_path.endswith(".pdf"):
            text = extract_text_from_pdf(file_path) or extract_text_ocr_from_pdf(file_path)
        elif file_path.endswith(".docx"):
            text = extract_text_from_docx(file_path)
        elif file_path.endswith((".png", ".jpg", ".jpeg")):
            text = extract_text_from_image(file_path)
        else:
            return None
    except Exception as e:
        print(f"Error extracting text: {e}")
    return text.strip()

def extract_text_from_pdf(file_path):
    text = ""
    try:
        with open(file_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text.strip()

def extract_text_ocr_from_pdf(file_path):
    images = convert_from_path(file_path)
    return "".join([pytesseract.image_to_string(img) for img in images]).strip()

def extract_text_from_docx(file_path):
    try:
        doc = docx.Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs]).strip()
    except Exception as e:
        print(f"Error reading DOCX: {e}")
        return ""

def extract_text_from_image(file_path):
    try:
        return pytesseract.image_to_string(Image.open(file_path)).strip()
    except Exception as e:
        print(f"Error reading image: {e}")
        return ""

def clean_text(text):
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^\w\s]", "", text)
    return text.lower()

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        file_path = data.get("file_path")

        if not file_path or not os.path.exists(file_path):
            return jsonify({"error": "Invalid file path"}), 400

        resume_text = extract_text(file_path)
        if not resume_text:
            return jsonify({"error": "No text extracted from resume"}), 400

        cleaned_text = clean_text(resume_text)
        resume_vector = vectorizer.transform([cleaned_text])
        prediction = model.predict(resume_vector)[0]

        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
