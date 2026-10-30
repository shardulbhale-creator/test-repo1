import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="Campus AI API")

# Allow requests from the React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")

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


@app.get("/")
def home():
    return {"message": "Campus AI API is running!"}


@app.post("/chat")
def chat(request: ChatRequest):
    if not client:
        return {"error": "Gemini API key is missing in the .env file."}

    question = request.question.strip()

    if not question:
        return {"error": "Please enter a question."}

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=f"Answer briefly in simple English: {question}",
            config={"max_output_tokens": 256},
        )

        return {"answer": response.text or "No answer received."}

    except Exception as e:
        return {"error": f"AI request failed: {str(e)}"}
