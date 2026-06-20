import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI
import PyPDF2

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

app = FastAPI(title="AI Resume Analyzer API")

# CORS (useful when React is added later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def extract_text(pdf_path: str) -> str:
    text = ""

    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)

        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    return text


@app.get("/")
async def home():
    return {
        "message": "AI Resume Analyzer API",
        "status": "running"
    }


@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...)
):
    try:
        file_path = os.path.join(UPLOAD_DIR, resume.filename)

        with open(file_path, "wb") as f:
            f.write(await resume.read())

        resume_text = extract_text(file_path)

        prompt = f"""
Analyze the following resume.

Resume:
{resume_text}

Return your response in markdown.

Use this format exactly:

ATS Score: X/100

# Summary

# Strengths

# Weaknesses

# Improvements

# Recruiter Perspective

Give detailed constructive feedback.
"""

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        result = response.choices[0].message.content

        return {
            "success": True,
            "filename": resume.filename,
            "analysis": result
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }