// Vercel Serverless Function — Campus AI Real-Time Gemini Assistant
// Route: /api/chat

/* global process */

const DEFAULT_API_KEY =
  (typeof process !== "undefined" && process.env && process.env.GEMINI_API_KEY) ||
  "";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle CORS Preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(200).json({
      status: "online",
      message: "Campus AI Serverless API is operational.",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const { question, degree, degreeId, career, discipline } = req.body || {};

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Please provide a valid question." });
    }

    const trimmedQuestion = question.trim();
    const activeDegree = degree || "Higher Education Degree";
    const activeCareer = career || "Academic Study";
    const activeDiscipline = discipline || "";

    // Build intelligent academic system persona based on degree
    let roleInstructions = "You are Campus AI, an expert university academic professor and private study tutor.";

    if (degreeId === "btech-cs" || (activeDegree && activeDegree.toLowerCase().includes("btech"))) {
      roleInstructions += ` The student is enrolled in B.Tech / Computer Science & AI. Specialize in algorithms, data structures, system architecture, programming, and AI/ML. Provide clean formatted code snippets with syntax highlighting, time & space complexities (Big-O), and real-world system design considerations.`;
    } else if (degreeId === "mbbs" || (activeDegree && activeDegree.toLowerCase().includes("mbbs"))) {
      roleInstructions += ` The student is enrolled in MBBS (Medicine & Surgery). Specialize in clinical pathology, anatomical landmarks, pharmacology mechanisms, and emergency diagnostic algorithms.`;
    } else if (degreeId === "llb" || (activeDegree && activeDegree.toLowerCase().includes("law"))) {
      roleInstructions += ` The student is enrolled in LLB (Law & Jurisprudence). Specialize in legal doctrines, statutory interpretation, constitutional articles, and the IRAC method (Issue, Rule, Application, Conclusion).`;
    } else if (degreeId === "mba" || (activeDegree && activeDegree.toLowerCase().includes("mba"))) {
      roleInstructions += ` The student is enrolled in MBA/BBA (Business & Finance). Specialize in financial valuation (DCF, WACC), corporate strategy, unit economics, and executive frameworks.`;
    } else if (degreeId === "psychology" || (activeDegree && activeDegree.toLowerCase().includes("psychology"))) {
      roleInstructions += ` The student is enrolled in Psychology & Behavioral Science. Specialize in cognitive neuroscience, DSM-5 clinical criteria, and evidence-based therapeutic models.`;
    }

    const fullPrompt = `${roleInstructions}\n\nStudent Program: ${activeDegree} (${activeCareer} - ${activeDiscipline})\nStudent Question: "${trimmedQuestion}"\n\nPlease provide a clear, comprehensive, highly-structured academic breakdown. Use Markdown headings, bullet points, and code/formulas where appropriate to make it easy to study.`;

    if (!DEFAULT_API_KEY) {
      return res.status(200).json({
        answer: generateDisciplineFallback(trimmedQuestion, activeCareer, activeDiscipline),
        source: "fallback",
      });
    }

    // Call Google Gemini REST API using gemini-3.5-flash-lite
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${DEFAULT_API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: fullPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("Gemini API error:", errorText);

      // Attempt fallback with gemini-3.8-flash if available
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${DEFAULT_API_KEY}`;
      const fallbackResp = await fetch(fallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      });

      if (fallbackResp.ok) {
        const fallbackData = await fallbackResp.json();
        const text =
          fallbackData.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Here is what I found for you.";
        return res.status(200).json({ answer: text, model: "gemini-3.8-flash" });
      }

      return res.status(500).json({
        error: "AI service temporarily unavailable. Please try again in a moment.",
      });
    }

    const data = await geminiResponse.json();
    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Here is the study breakdown for your inquiry.";

    return res.status(200).json({
      answer: answer,
      model: "gemini-3.5-flash-lite",
      program: activeDegree,
    });
  } catch (error) {
    console.error("Backend error:", error);
    return res.status(500).json({
      error: `Server Error: ${error.message || "Unknown error occurred"}`,
    });
  }
}
