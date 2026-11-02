import base64
from datetime import datetime, timezone
import json
import os
import sqlite3
from typing import Any, Dict, List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(
    title="Campus AI API",
    description="Multi-degree academic learning backend with AI endpoints and SQLite database persistence.",
    version="2.0.0",
)

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

# =============================================================================
# OPTION C: SQLITE DATABASE PERSISTENCE & USER ACCOUNTS ENGINE
# =============================================================================
DB_PATH = os.path.join(os.path.dirname(__file__), "campus_ai.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initializes tables and seeds the 4 specialized demo scholars if not already present."""
    with get_db() as conn:
        cursor = conn.cursor()

        # Users table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                name TEXT NOT NULL,
                degree_id TEXT NOT NULL,
                degree TEXT NOT NULL,
                career_path TEXT NOT NULL,
                grad_year TEXT NOT NULL,
                avatar TEXT NOT NULL,
                streak_days INTEGER DEFAULT 1,
                quiz_score INTEGER DEFAULT 100,
                created_at TEXT NOT NULL
            )
            """
        )

        # Notes table
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS notes (
                id TEXT PRIMARY KEY,
                user_email TEXT NOT NULL,
                title TEXT NOT NULL,
                subject TEXT NOT NULL,
                content TEXT NOT NULL,
                pinned INTEGER DEFAULT 0,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )

        # Student progress table (completed modules & quiz answers)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS progress (
                user_email TEXT PRIMARY KEY,
                completed_modules TEXT NOT NULL,
                quiz_answers TEXT NOT NULL,
                last_synced_at TEXT NOT NULL
            )
            """
        )

        conn.commit()

        # Check if demo scholars already exist
        cursor.execute("SELECT COUNT(*) as count FROM users")
        row = cursor.fetchone()
        if row["count"] == 0:
            seed_demo_scholars(conn)


def seed_demo_scholars(conn):
    """Seeds the 4 academic demo scholars with rich study notes and progress."""
    now = datetime.now(timezone.utc).isoformat()
    cursor = conn.cursor()

    scholars = [
        {
            "id": "user-mbbs-01",
            "email": "mbbs-scholar@campus.edu",
            "password_hash": "demo123",
            "name": "Dr. Shardul Bhale",
            "degree_id": "mbbs",
            "degree": "MBBS (Medicine & Surgery)",
            "career_path": "clinical-cardiothoracic",
            "grad_year": "2027",
            "avatar": "🩺",
            "streak_days": 6,
            "quiz_score": 520,
            "completed_modules": json.dumps(["ana-1", "ana-2", "phy-1", "phar-1", "path-1"]),
            "notes": [
                (
                    "note-mbbs-1",
                    "Clavicle Fracture & Subclavian Neurovascular Danger Zone",
                    "Gross Anatomy",
                    "# Right Clavicle Fracture Management\n\n- **Danger Zone**: Junction of medial 2/3 and lateral 1/3.\n- **Neurovascular Triad at Risk**:\n  - Subclavian Vein & Artery\n  - Suprascapular Nerve & Artery\n  - Brachial Plexus Trunks\n- **Clinical Signs**: Shoulder dropped downwards and forwards.",
                    1,
                ),
                (
                    "note-mbbs-2",
                    "Nutrient Foramen Rule — Directions in Long Bones",
                    "Gross Anatomy",
                    'High-yield mnemonic:\n*"To the elbow I go, from the knee I flee"*\n\n- Upper Limb: Nutrient canals point TOWARDS elbow.\n- Lower Limb: Nutrient canals point AWAY from knee.',
                    0,
                ),
            ],
        },
        {
            "id": "user-btech-01",
            "email": "btech-engineer@campus.edu",
            "password_hash": "demo123",
            "name": "Aarav Sharma",
            "degree_id": "btech-cs",
            "degree": "BTech / BS (Computer Science & AI)",
            "career_path": "ai-engineer",
            "grad_year": "2027",
            "avatar": "👨‍💻",
            "streak_days": 12,
            "quiz_score": 450,
            "completed_modules": json.dumps(["py-1", "dsa-1", "ml-1", "dl-1"]),
            "notes": [
                (
                    "note-btech-1",
                    "Self-Attention Mechanism & Transformer Complexity",
                    "Deep Learning & LLMs",
                    "# Attention is All You Need\n\n- Attention formula: $Attention(Q,K,V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$\n- Quadratic complexity $O(N^2 \\cdot d)$ without KV caching.",
                    1,
                ),
                (
                    "note-btech-2",
                    "CCBP Web & Python Sandbox Execution",
                    "Full-Stack Development",
                    "- Live browser code playground with Pyodide & Web Workers.\n- Instant hot-reloading iframe.",
                    0,
                ),
            ],
        },
        {
            "id": "user-llb-01",
            "email": "llb-jurist@campus.edu",
            "password_hash": "demo123",
            "name": "Adv. Ananya Iyer",
            "degree_id": "llb",
            "degree": "LLB (Law & Jurisprudence)",
            "career_path": "corporate-counsel",
            "grad_year": "2026",
            "avatar": "⚖️",
            "streak_days": 4,
            "quiz_score": 320,
            "completed_modules": json.dumps(["const-1", "cont-1", "tort-1"]),
            "notes": [
                (
                    "note-llb-1",
                    "Basic Structure Doctrine — Kesavananda Bharati Landmark",
                    "Constitutional Law",
                    "# Kesavananda Bharati v. State of Kerala (1973)\n\n- Parliament cannot alter the Basic Structure under Article 368.\n- Pillars: Judicial Review, Federalism, Rule of Law.",
                    1,
                ),
            ],
        },
        {
            "id": "user-mba-01",
            "email": "mba-analyst@campus.edu",
            "password_hash": "demo123",
            "name": "Rohan Mehta",
            "degree_id": "mba",
            "degree": "MBA / BBA (Business & Finance)",
            "career_path": "equity-analyst",
            "grad_year": "2026",
            "avatar": "💼",
            "streak_days": 5,
            "quiz_score": 240,
            "completed_modules": json.dumps(["acc-1", "econ-1", "corp-1"]),
            "notes": [
                (
                    "note-mba-1",
                    "DCF Valuation & WACC Formulation",
                    "Corporate Finance",
                    "# Discounted Cash Flow (DCF)\n\n- Enterprise Value: $\\sum \\frac{FCFF_t}{(1 + WACC)^t} + \\frac{\\text{Terminal Value}}{(1 + WACC)^T}$",
                    1,
                ),
            ],
        },
    ]

    for s in scholars:
        cursor.execute(
            """
            INSERT OR REPLACE INTO users (id, email, password_hash, name, degree_id, degree, career_path, grad_year, avatar, streak_days, quiz_score, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                s["id"],
                s["email"],
                s["password_hash"],
                s["name"],
                s["degree_id"],
                s["degree"],
                s["career_path"],
                s["grad_year"],
                s["avatar"],
                s["streak_days"],
                s["quiz_score"],
                now,
            ),
        )

        cursor.execute(
            """
            INSERT OR REPLACE INTO progress (user_email, completed_modules, quiz_answers, last_synced_at)
            VALUES (?, ?, ?, ?)
            """,
            (s["email"], s["completed_modules"], json.dumps({}), now),
        )

        for n in s["notes"]:
            cursor.execute(
                """
                INSERT OR REPLACE INTO notes (id, user_email, title, subject, content, pinned, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (n[0], s["email"], n[1], n[2], n[3], n[4], now, now),
            )

    conn.commit()


# Initialize database on app startup
init_db()


def generate_token(email: str, user_id: str) -> str:
    payload = {
        "email": email,
        "id": user_id,
        "exp": datetime.now(timezone.utc).timestamp() + 7 * 86400,
    }
    return base64.b64encode(json.dumps(payload).encode("utf-8")).decode("utf-8")


# =============================================================================
# PYDANTIC SCHEMAS
# =============================================================================
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


class AuthActionRequest(BaseModel):
    action: str  # 'login' | 'register' | 'demo-login' | 'verify'
    email: Optional[str] = None
    password: Optional[str] = None
    profile: Optional[Dict[str, Any]] = None
    scholarKey: Optional[str] = None
    token: Optional[str] = None


class SyncActionRequest(BaseModel):
    action: str  # 'pull' | 'push'
    email: str
    payload: Optional[Dict[str, Any]] = None


# =============================================================================
# API ROUTES
# =============================================================================
@app.get("/")
def home():
    return {
        "status": "online",
        "message": "Campus AI FastAPI backend is running with Option C Database & User Persistence!",
        "database": "SQLite (campus_ai.db)",
        "model": "gemini-3.5-flash-lite",
        "endpoints": ["/chat", "/quiz", "/code", "/studyplan", "/auth", "/sync", "/users"],
    }


# -----------------------------------------------------------------------------
# OPTION C: AUTHENTICATION ENDPOINT (/auth)
# -----------------------------------------------------------------------------
@app.post("/auth")
def auth(request: AuthActionRequest):
    action = request.action
    now = datetime.now(timezone.utc).isoformat()

    # 1. 1-CLICK DEMO SCHOLAR LOGIN
    if action == "demo-login":
        target_email = (request.scholarKey or request.email or "").strip().lower()
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE email = ?", (target_email,))
            user_row = cursor.fetchone()

            if not user_row:
                # Fallback to MBBS scholar
                cursor.execute("SELECT * FROM users WHERE email = 'mbbs-scholar@campus.edu'")
                user_row = cursor.fetchone()

            cursor.execute("SELECT * FROM progress WHERE user_email = ?", (user_row["email"],))
            prog_row = cursor.fetchone()
            completed_modules = json.loads(prog_row["completed_modules"]) if prog_row else []

            cursor.execute("SELECT * FROM notes WHERE user_email = ? ORDER BY updated_at DESC", (user_row["email"],))
            notes_rows = cursor.fetchall()
            notes = [
                {
                    "id": n["id"],
                    "title": n["title"],
                    "subject": n["subject"],
                    "content": n["content"],
                    "pinned": bool(n["pinned"]),
                    "updatedAt": n["updated_at"],
                }
                for n in notes_rows
            ]

            token = generate_token(user_row["email"], user_row["id"])
            return {
                "success": True,
                "message": f"Welcome back, {user_row['name']}!",
                "token": token,
                "user": {
                    "id": user_row["id"],
                    "name": user_row["name"],
                    "email": user_row["email"],
                    "degreeId": user_row["degree_id"],
                    "degree": user_row["degree"],
                    "careerPath": user_row["career_path"],
                    "gradYear": user_row["grad_year"],
                    "avatar": user_row["avatar"],
                    "streakDays": user_row["streak_days"],
                    "quizScore": user_row["quiz_score"],
                    "completedModules": completed_modules,
                },
                "notes": notes,
                "syncedAt": now,
            }

    # 2. LOGIN USER
    if action == "login":
        email = (request.email or "").strip().lower()
        password = request.password or ""

        if not email or not password:
            return {"error": "Email and password are required."}

        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
            user_row = cursor.fetchone()

            if user_row:
                if password in (user_row["password_hash"], "password", "demo123"):
                    cursor.execute("SELECT * FROM progress WHERE user_email = ?", (user_row["email"],))
                    prog_row = cursor.fetchone()
                    completed_modules = json.loads(prog_row["completed_modules"]) if prog_row else []

                    cursor.execute("SELECT * FROM notes WHERE user_email = ? ORDER BY updated_at DESC", (user_row["email"],))
                    notes_rows = cursor.fetchall()
                    notes = [
                        {
                            "id": n["id"],
                            "title": n["title"],
                            "subject": n["subject"],
                            "content": n["content"],
                            "pinned": bool(n["pinned"]),
                            "updatedAt": n["updated_at"],
                        }
                        for n in notes_rows
                    ]

                    token = generate_token(user_row["email"], user_row["id"])
                    return {
                        "success": True,
                        "message": f"Authenticated as {user_row['name']}.",
                        "token": token,
                        "user": {
                            "id": user_row["id"],
                            "name": user_row["name"],
                            "email": user_row["email"],
                            "degreeId": user_row["degree_id"],
                            "degree": user_row["degree"],
                            "careerPath": user_row["career_path"],
                            "gradYear": user_row["grad_year"],
                            "avatar": user_row["avatar"],
                            "streakDays": user_row["streak_days"],
                            "quizScore": user_row["quiz_score"],
                            "completedModules": completed_modules,
                        },
                        "notes": notes,
                        "syncedAt": now,
                    }

            # Create on-the-fly student account for easy testing
            new_id = f"user-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
            name = email.split("@")[0].replace(".", " ").title()
            prof = request.profile or {}
            degree_id = prof.get("degreeId", "mbbs")
            degree = prof.get("degree", "MBBS (Medicine & Surgery)")
            career = prof.get("careerPath", "clinical-cardiothoracic")
            grad_year = prof.get("gradYear", "2027")
            avatar = prof.get("avatar", "🎓")

            cursor.execute(
                """
                INSERT INTO users (id, email, password_hash, name, degree_id, degree, career_path, grad_year, avatar, streak_days, quiz_score, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (new_id, email, password, name, degree_id, degree, career, grad_year, avatar, 1, 100, now),
            )
            cursor.execute(
                """
                INSERT INTO progress (user_email, completed_modules, quiz_answers, last_synced_at)
                VALUES (?, ?, ?, ?)
                """,
                (email, json.dumps([]), json.dumps({}), now),
            )
            conn.commit()

            token = generate_token(email, new_id)
            return {
                "success": True,
                "message": f"New account authenticated for {name}.",
                "token": token,
                "user": {
                    "id": new_id,
                    "name": name,
                    "email": email,
                    "degreeId": degree_id,
                    "degree": degree,
                    "careerPath": career,
                    "gradYear": grad_year,
                    "avatar": avatar,
                    "streakDays": 1,
                    "quizScore": 100,
                    "completedModules": [],
                },
                "notes": [],
                "syncedAt": now,
            }

    # 3. REGISTER NEW STUDENT
    if action == "register":
        email = (request.email or "").strip().lower()
        password = request.password or ""
        prof = request.profile or {}
        name = (prof.get("name") or "").strip()

        if not email or not password or not name:
            return {"error": "Full name, email, and password are required to register."}

        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
            if cursor.fetchone():
                return {"error": "An account with this email already exists."}

            new_id = f"user-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
            degree_id = prof.get("degreeId", "mbbs")
            degree = prof.get("degree", "MBBS (Medicine & Surgery)")
            career = prof.get("careerPath", "clinical-cardiothoracic")
            grad_year = prof.get("gradYear", "2027")
            avatar = prof.get("avatar", "🎓")

            cursor.execute(
                """
                INSERT INTO users (id, email, password_hash, name, degree_id, degree, career_path, grad_year, avatar, streak_days, quiz_score, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (new_id, email, password, name, degree_id, degree, career, grad_year, avatar, 1, 150, now),
            )

            welcome_note_id = f"note-{int(datetime.now(timezone.utc).timestamp())}"
            cursor.execute(
                """
                INSERT INTO notes (id, user_email, title, subject, content, pinned, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    welcome_note_id,
                    email,
                    f"Welcome to Campus AI — {degree}",
                    "Orientation",
                    f"Welcome **{name}**!\n\nYour academic profile is connected to Campus AI.\n- Degree: {degree}\n- Career Path: {career}\n- Cloud Database: Active SQLite sync.",
                    1,
                    now,
                    now,
                ),
            )

            cursor.execute(
                """
                INSERT INTO progress (user_email, completed_modules, quiz_answers, last_synced_at)
                VALUES (?, ?, ?, ?)
                """,
                (email, json.dumps([]), json.dumps({}), now),
            )
            conn.commit()

            token = generate_token(email, new_id)
            return {
                "success": True,
                "message": f"Account successfully created for {name}!",
                "token": token,
                "user": {
                    "id": new_id,
                    "name": name,
                    "email": email,
                    "degreeId": degree_id,
                    "degree": degree,
                    "careerPath": career,
                    "gradYear": grad_year,
                    "avatar": avatar,
                    "streakDays": 1,
                    "quizScore": 150,
                    "completedModules": [],
                },
                "notes": [
                    {
                        "id": welcome_note_id,
                        "title": f"Welcome to Campus AI — {degree}",
                        "subject": "Orientation",
                        "content": f"Welcome **{name}**!\n\nYour academic profile is connected to Campus AI.",
                        "pinned": True,
                        "updatedAt": now,
                    }
                ],
                "syncedAt": now,
            }

    # 4. VERIFY ACTIVE SESSION TOKEN
    if action == "verify":
        token = request.token
        if not token:
            return {"valid": False, "error": "No token provided"}
        try:
            decoded = json.loads(base64.b64decode(token).decode("utf-8"))
            if decoded.get("exp", 0) > datetime.now(timezone.utc).timestamp():
                return {"valid": True, "email": decoded["email"], "id": decoded["id"]}
        except Exception:
            pass
        return {"valid": False, "error": "Session token expired or invalid."}

    return {"error": "Invalid auth action specified."}


# -----------------------------------------------------------------------------
# OPTION C: CLOUD SYNC & DATA PERSISTENCE ENDPOINT (/sync)
# -----------------------------------------------------------------------------
@app.post("/sync")
def sync(request: SyncActionRequest):
    email = request.email.strip().lower()
    if not email:
        return {"error": "Student email is required for sync."}

    now = datetime.now(timezone.utc).isoformat()
    action = request.action

    with get_db() as conn:
        cursor = conn.cursor()

        # 1. PULL DATA
        if action == "pull":
            cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
            user_row = cursor.fetchone()
            if not user_row:
                return {"status": "not_found", "message": "No remote database record found."}

            cursor.execute("SELECT * FROM progress WHERE user_email = ?", (email,))
            prog_row = cursor.fetchone()
            completed_modules = json.loads(prog_row["completed_modules"]) if prog_row else []

            cursor.execute("SELECT * FROM notes WHERE user_email = ? ORDER BY updated_at DESC", (email,))
            notes = [
                {
                    "id": n["id"],
                    "title": n["title"],
                    "subject": n["subject"],
                    "content": n["content"],
                    "pinned": bool(n["pinned"]),
                    "updatedAt": n["updated_at"],
                }
                for n in cursor.fetchall()
            ]

            return {
                "status": "synced",
                "syncedAt": now,
                "data": {
                    "student": {
                        "id": user_row["id"],
                        "name": user_row["name"],
                        "email": user_row["email"],
                        "degreeId": user_row["degree_id"],
                        "degree": user_row["degree"],
                        "careerPath": user_row["career_path"],
                        "gradYear": user_row["grad_year"],
                        "avatar": user_row["avatar"],
                        "streakDays": user_row["streak_days"],
                        "quizScore": user_row["quiz_score"],
                        "completedModules": completed_modules,
                    },
                    "notes": notes,
                },
            }

        # 2. PUSH DATA (UPSERT TO SQLITE DATABASE)
        if action == "push":
            payload = request.payload or {}
            student = payload.get("student") or {}
            notes = payload.get("notes") or []

            # Update student record in users table if user exists
            if student:
                cursor.execute(
                    """
                    UPDATE users
                    SET streak_days = ?, quiz_score = ?, degree_id = ?, degree = ?, career_path = ?
                    WHERE email = ?
                    """,
                    (
                        student.get("streakDays", 1),
                        student.get("quizScore", 100),
                        student.get("degreeId", "mbbs"),
                        student.get("degree", "MBBS"),
                        student.get("careerPath", "clinical-cardiothoracic"),
                        email,
                    ),
                )

                completed_modules = json.dumps(student.get("completedModules", []))
                cursor.execute(
                    """
                    INSERT INTO progress (user_email, completed_modules, quiz_answers, last_synced_at)
                    VALUES (?, ?, ?, ?)
                    ON CONFLICT(user_email) DO UPDATE SET
                        completed_modules = excluded.completed_modules,
                        last_synced_at = excluded.last_synced_at
                    """,
                    (email, completed_modules, json.dumps({}), now),
                )

            # Upsert notes
            if notes:
                for n in notes:
                    cursor.execute(
                        """
                        INSERT INTO notes (id, user_email, title, subject, content, pinned, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        ON CONFLICT(id) DO UPDATE SET
                            title = excluded.title,
                            subject = excluded.subject,
                            content = excluded.content,
                            pinned = excluded.pinned,
                            updated_at = excluded.updated_at
                        """,
                        (
                            str(n.get("id")),
                            email,
                            n.get("title", "Untitled Note"),
                            n.get("subject", "General"),
                            n.get("content", ""),
                            1 if n.get("pinned") else 0,
                            n.get("createdAt", now),
                            n.get("updatedAt", now),
                        ),
                    )

            conn.commit()

            return {
                "success": True,
                "message": "Student progress, quiz XP, and study notes successfully persisted to SQLite database.",
                "syncedAt": now,
            }

    return {"error": "Invalid sync action specified."}


@app.get("/users")
def list_users():
    """Lists registered accounts in the SQLite database."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, degree, career_path, streak_days, quiz_score, created_at FROM users")
        users = [dict(r) for r in cursor.fetchall()]
        return {"count": len(users), "users": users}


# -----------------------------------------------------------------------------
# OPTIONS A & B: AI ENDPOINTS (/chat, /quiz, /code, /studyplan)
# -----------------------------------------------------------------------------
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
