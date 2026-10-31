import json
import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="Campus AI API")

# Allow requests from React development server and production Vercel domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY", "")

client = (
    genai.Client(
        api_key=api_key,
        http_options=types.HttpOptions(timeout=60000),
    )
    if api_key
    else None
)


class ChatRequest(BaseModel):
    question: str
    degree: Optional[str] = "Higher Education Degree"
    degreeId: Optional[str] = "btech-cs"
    career: Optional[str] = "Academic Study"
    discipline: Optional[str] = None


class QuizRequest(BaseModel):
    topic: str
    degree: Optional[str] = "Higher Education Degree"
    degreeId: Optional[str] = "btech-cs"
    count: Optional[int] = 3
    difficulty: Optional[str] = "Intermediate"


class CodeRequest(BaseModel):
    code: str
    language: Optional[str] = "python"
    context: Optional[str] = ""
    action: Optional[str] = "explain"


class StudyPlanRequest(BaseModel):
    degree: Optional[str] = "BTech / BS (Computer Science & AI)"
    days: Optional[int] = 7
    hoursPerDay: Optional[int] = 3
    focusTopic: Optional[str] = ""


@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Campus AI FastAPI backend is running!",
        "model": "gemini-3.5-flash-lite",
        "endpoints": ["/chat", "/quiz", "/code", "/studyplan"],
    }


@app.post("/chat")
def chat(request: ChatRequest):
    if not client:
        return {"error": "Gemini API key is missing in the .env file."}

    question = request.question.strip()
    if not question:
        return {"error": "Please enter a question."}

    role_instruction = (
        "You are Campus AI, an expert academic professor and private university study tutor."
    )
    if request.degreeId == "btech-cs" or (request.degree and "btech" in request.degree.lower()):
        role_instruction += (
            " Specialize in Computer Science & Engineering. Include code examples, Big-O complexities, "
            "and system architecture principles."
        )
    elif request.degreeId == "mbbs" or (request.degree and "mbbs" in request.degree.lower()):
        role_instruction += (
            " Specialize in Clinical Medicine & Surgery. Include clinical pathophysiology, diagnostic algorithms, "
            "and anatomical landmarks."
        )
    elif request.degreeId == "llb" or (request.degree and "law" in request.degree.lower()):
        role_instruction += (
            " Specialize in Law & Jurisprudence. Include statutory provisions, landmark cases, and the IRAC method."
        )

    full_prompt = (
        f"{role_instruction}\n\n"
        f"Student Program: {request.degree} ({request.career})\n"
        f"Question: {question}\n\n"
        f"Provide a structured, high-yield academic response with markdown headings and clear bullet points."
    )

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=full_prompt,
            config={"max_output_tokens": 1024},
        )
        return {
            "answer": response.text or "No answer received.",
            "model": "gemini-3.5-flash-lite",
            "degree": request.degree,
        }
    except Exception as e:
        return {"error": f"AI request failed: {str(e)}"}


@app.post("/quiz")
def generate_quiz(request: QuizRequest):
    if not client:
        return {"error": "Gemini API key is missing."}

    prompt = f"""You are Campus AI, an expert university professor creating practice exam questions.
Generate {request.count} high-yield multiple-choice questions for:
Program: {request.degree} (ID: {request.degreeId})
Topic: "{request.topic}"
Difficulty: {request.difficulty}

Return ONLY valid JSON matching this schema:
{{
  "topic": "{request.topic}",
  "questions": [
    {{
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed academic reasoning here."
    }}
  ]
}}"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
            config={
                "max_output_tokens": 1500,
                "response_mime_type": "application/json",
            },
        )
        return json.loads(response.text)
    except Exception as e:
        return {"error": f"Quiz generation failed: {str(e)}"}


@app.post("/code")
def explain_code(request: CodeRequest):
    if not client:
        return {"error": "Gemini API key is missing."}

    prompt = f"""You are Campus AI, an expert Senior Computer Science Professor and Code Reviewer.
Analyze this {request.language} code snippet:

```{request.language}
{request.code.strip()}
```
Task: {request.action} (Action: explain, debug, optimize).
Provide:
1. Executive Logic Analysis
2. Big-O Time & Space Complexity
3. Bugs, Pitfalls & Optimization
4. Production-Ready Refactored Code with types & comments
5. Senior Professor's Engineering Insights"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
            config={"max_output_tokens": 1500},
        )
        return {
            "analysis": response.text or "No analysis received.",
            "language": request.language,
            "action": request.action,
        }
    except Exception as e:
        return {"error": f"Code analysis failed: {str(e)}"}


@app.post("/studyplan")
def generate_study_plan(request: StudyPlanRequest):
    if not client:
        return {"error": "Gemini API key is missing."}

    prompt = f"""You are Campus AI, an expert university academic advisor.
Create a structured {request.days}-Day Study Timetable for a student in {request.degree}.
Target: {request.hoursPerDay} hours per day. Focus: {request.focusTopic or 'Comprehensive syllabus mastery'}.

Provide:
1. Sprint Strategy
2. Daily Breakdown (Morning, Afternoon, Evening) for all {request.days} days
3. High-Retention Recall Checkpoints
4. Exam Day Success Checklist"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt,
            config={"max_output_tokens": 1500},
        )
        return {
            "plan": response.text or "No plan received.",
            "degree": request.degree,
            "days": request.days,
        }
    except Exception as e:
        return {"error": f"Study plan generation failed: {str(e)}"}
