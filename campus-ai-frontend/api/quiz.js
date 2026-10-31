// Vercel Serverless Function — Dynamic AI Quiz Generator
// Route: /api/quiz

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
      message: "Campus AI Quiz Generator API is operational.",
    });
  }

  try {
    const { topic, degree, degreeId, count = 3, difficulty = "Intermediate" } =
      req.body || {};

    const cleanTopic = (topic && topic.trim()) || "General Academic Foundations";
    const cleanDegree = degree || "Higher Education Degree";

    const prompt = `You are Campus AI, an expert university professor creating practice exam questions.
Generate ${count} high-yield multiple-choice questions for the following curriculum:
Program: ${cleanDegree} (ID: ${degreeId || "general"})
Topic: "${cleanTopic}"
Difficulty: ${difficulty}

Rules:
1. Provide realistic academic multiple-choice questions suitable for university exams.
2. Each question MUST have exactly 4 distinct options.
3. Indicate the correctIndex (0, 1, 2, or 3).
4. Provide a thorough, educational explanation explaining why the correct answer is right and why other options are pitfalls.

Return ONLY valid JSON matching this exact schema:
{
  "topic": "${cleanTopic}",
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed academic reasoning here."
    }
  ]
}`;

    if (!DEFAULT_API_KEY) {
      return res.status(200).json({
        topic: cleanTopic,
        questions: getFallbackQuestions(cleanTopic, degreeId),
        source: "fallback",
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
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiResponse.ok) {
      console.error("Gemini Quiz API Error:", await geminiResponse.text());
      return res.status(200).json({
        topic: cleanTopic,
        questions: getFallbackQuestions(cleanTopic, degreeId),
        source: "fallback",
      });
    }

    const data = await geminiResponse.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    try {
      const parsed = JSON.parse(rawText);
      return res.status(200).json({
        topic: cleanTopic,
        questions: parsed.questions || [],
        source: "gemini-3.5-flash-lite",
      });
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr, rawText);
      return res.status(200).json({
        topic: cleanTopic,
        questions: getFallbackQuestions(cleanTopic, degreeId),
        source: "fallback",
      });
    }
  } catch (error) {
    console.error("Quiz API Fatal Error:", error);
    return res.status(500).json({
      error: `Server Error: ${error.message || "Failed to generate quiz"}`,
    });
  }
}

function getFallbackQuestions(topic, degreeId) {
  if (degreeId === "btech-cs") {
    return [
      {
        question: `In ${topic}, what is the fundamental trade-off when optimizing data structures?`,
        options: [
          "Time Complexity vs Space Complexity",
          "CPU Frequency vs Monitor Refresh Rate",
          "Disk RPM vs RAM Volatility",
          "Bandwidth vs Latency in local cache",
        ],
        correctIndex: 0,
        explanation:
          "Almost all algorithmic optimizations trade additional auxiliary memory (space) to reduce time complexity from O(N^2) to O(N) or O(log N).",
      },
      {
        question: `Which architectural property ensures reliable transaction processing in database systems for ${topic}?`,
        options: [
          "ACID Guarantees",
          "DNS Load Balancing",
          "CSS Grid Positioning",
          "JWT Token Expiry",
        ],
        correctIndex: 0,
        explanation:
          "ACID (Atomicity, Consistency, Isolation, Durability) guarantees that database transactions are processed reliably.",
      },
    ];
  }

  return [
    {
      question: `Which fundamental principle governs systematic mastery in ${topic}?`,
      options: [
        "First-principles causal mechanism analysis",
        "Passive rereading without practice questions",
        "Superficial terminology memorization",
        "Ignoring foundational prerequisite theorems",
      ],
      correctIndex: 0,
      explanation:
        "First-principles reasoning and deliberate retrieval practice are the highest-yield study methods in higher education.",
    },
  ];
}
