// Vercel Serverless Function — Academic Timetable & Study Plan Generator
// Route: /api/studyplan

/* global process */

const DEFAULT_API_KEY =
  (typeof process !== "undefined" && process.env && process.env.GEMINI_API_KEY) ||
  "";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(200).json({
      status: "online",
      message: "Campus AI Study Plan Generator API is operational.",
    });
  }

  try {
    const {
      degree = "BTech / BS (Computer Science & AI)",
      days = 7,
      hoursPerDay = 3,
      focusTopic = "",
    } = req.body || {};

    const prompt = `You are Campus AI, an expert academic advisor and university learning coach.
Create a high-yield, structured ${days}-Day Intensive Exam Study Timetable for a student in:
Program: ${degree}
Target Study Time: ${hoursPerDay} hours per day
${focusTopic ? `Special Focus Area: "${focusTopic}"\n` : ""}

Structure your plan with:
1. ### 🎯 ${days}-Day Sprint Strategy & Target Milestone
2. ### 📅 Daily Study Schedule Breakdown (Day 1 through Day ${days})
   - For each day include:
     - Morning / Session 1 (Core Theory & Foundational Theorems)
     - Session 2 (Hands-on Practice Problems / Lab / Coding / Case Study)
     - Evening / Recall Checkpoint (Quick Self-Quiz & Review)
3. ### 🧠 High-Retention Revision Technique (Spaced Repetition & Feynman Technique)
4. ### 🏁 Exam-Day Success Checklist`;

    if (!DEFAULT_API_KEY) {
      return res.status(200).json({
        plan: `### 🎯 ${days}-Day Exam Timetable (${degree})\n\n**Focus Area**: ${focusTopic || "Core Curriculum"} | **Commitment**: ${hoursPerDay} hrs/day\n\n---\n\n#### 📅 Daily Schedule\n- **Day 1: Theoretical Primitives & Core Theorems**\n  - *Morning*: First-principles derivations and foundational axioms.\n  - *Afternoon*: Complete 3 structured problem sets in Study Hub.\n  - *Evening*: Active recall review & spaced flashcards.\n- **Day 2: Architecture & Algorithmic Problem Sets**\n  - *Morning*: In-depth case walkthrough and memory models.\n  - *Afternoon*: Implementation and boundary edge testing.\n- **Days 3-${days}: Deep Practice & Timed Mock Exam**\n  - Complete full exam simulation in Quiz Lab.`,
        degree: degree,
        days: days,
        model: "offline-fallback",
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${DEFAULT_API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
        },
      }),
    });

    if (!geminiResponse.ok) {
      console.error("Gemini Plan API Error:", await geminiResponse.text());
      return res.status(500).json({
        error: "Study plan service temporarily unavailable.",
      });
    }

    const data = await geminiResponse.json();
    const plan =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Study plan generated. Review daily goals.";

    return res.status(200).json({
      plan: plan,
      degree: degree,
      days: days,
      model: "gemini-3.5-flash-lite",
    });
  } catch (error) {
    console.error("Plan API Fatal Error:", error);
    return res.status(500).json({
      error: `Server Error: ${error.message || "Failed to generate study plan"}`,
    });
  }
}
