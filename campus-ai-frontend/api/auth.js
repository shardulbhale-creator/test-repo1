// Vercel Serverless Function — Student Authentication & Account Service
// Route: /api/auth

/* global Buffer */

// In-memory student store for demo scholars & registered cloud users
const DEMO_SCHOLARS = {
  "mbbs-scholar@campus.edu": {
    id: "user-mbbs-01",
    name: "Dr. Shardul Bhale",
    email: "mbbs-scholar@campus.edu",
    passwordHash: "demo123",
    degreeId: "mbbs",
    degree: "MBBS (Medicine & Surgery)",
    careerPath: "clinical-cardiothoracic",
    gradYear: "2027",
    avatar: "🩺",
    streakDays: 6,
    quizScore: 520,
    completedModules: ["ana-1", "ana-2", "phy-1", "phar-1", "path-1"],
    notes: [
      {
        id: "note-mbbs-1",
        title: "Clavicle Fracture & Subclavian Neurovascular Danger Zone",
        subject: "Gross Anatomy",
        content:
          "# Right Clavicle Fracture Management\n\n- **Danger Zone**: Junction of medial 2/3 and lateral 1/3.\n- **Neurovascular Triad at Risk**:\n  - Subclavian Vein & Artery\n  - Suprascapular Nerve & Artery\n  - Brachial Plexus Trunks\n- **Clinical Signs**: Shoulder dropped downwards and forwards by weight of arm and pectoralis major pull.",
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: "note-mbbs-2",
        title: "Nutrient Foramen Rule — Directions in Long Bones",
        subject: "Gross Anatomy",
        content:
          "High-yield mnemonic:\n*\"To the elbow I go, from the knee I flee\"*\n\n- Upper Limb: Nutrient canals point TOWARDS the elbow (downwards in humerus, upwards in radius & ulna).\n- Lower Limb: Nutrient canals point AWAY from the knee (upwards in femur, downwards in tibia & fibula).",
        updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
    ],
  },
  "btech-engineer@campus.edu": {
    id: "user-btech-01",
    name: "Aarav Sharma",
    email: "btech-engineer@campus.edu",
    passwordHash: "demo123",
    degreeId: "btech-cs",
    degree: "BTech / BS (Computer Science & AI)",
    careerPath: "ai-engineer",
    gradYear: "2027",
    avatar: "👨‍💻",
    streakDays: 12,
    quizScore: 450,
    completedModules: ["py-1", "dsa-1", "ml-1", "dl-1"],
    notes: [
      {
        id: "note-btech-1",
        title: "Self-Attention Mechanism & Transformer Complexity",
        subject: "Deep Learning & LLMs",
        content:
          "# Attention is All You Need\n\n- **Formula**: $Attention(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$\n- **Time Complexity**: $O(N^2 \\cdot d)$ where $N$ is sequence length.\n- **KV Cache Optimization**: Reduces autoregressive inference from $O(N^2)$ per token to $O(N)$ by caching Key and Value projections.",
        updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: "note-btech-2",
        title: "CCBP Web & Python Sandbox Setup",
        subject: "Full-Stack Development",
        content:
          "- Live code execution with Web Workers & Pyodide.\n- Instant hot-reloading preview in isolated iframe.\n- Console logs redirected with timestamps.",
        updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
    ],
  },
  "llb-jurist@campus.edu": {
    id: "user-llb-01",
    name: "Adv. Ananya Iyer",
    email: "llb-jurist@campus.edu",
    passwordHash: "demo123",
    degreeId: "llb",
    degree: "LLB (Law & Jurisprudence)",
    careerPath: "corporate-counsel",
    gradYear: "2026",
    avatar: "⚖️",
    streakDays: 4,
    quizScore: 320,
    completedModules: ["const-1", "cont-1", "tort-1"],
    notes: [
      {
        id: "note-llb-1",
        title: "Basic Structure Doctrine — Kesavananda Bharati Landmark",
        subject: "Constitutional Law",
        content:
          "# Kesavananda Bharati v. State of Kerala (1973)\n\n- **Ruling**: Parliament has wide powers to amend the Constitution (Article 368), but CANNOT alter or destroy its Basic Structure.\n- **Pillars**: Judicial Review, Rule of Law, Federalism, Secularism, and Separation of Powers.",
        updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
    ],
  },
  "mba-analyst@campus.edu": {
    id: "user-mba-01",
    name: "Rohan Mehta",
    email: "mba-analyst@campus.edu",
    passwordHash: "demo123",
    degreeId: "mba",
    degree: "MBA / BBA (Business & Finance)",
    careerPath: "equity-analyst",
    gradYear: "2026",
    avatar: "💼",
    streakDays: 5,
    quizScore: 240,
    completedModules: ["acc-1", "econ-1", "corp-1"],
    notes: [
      {
        id: "note-mba-1",
        title: "DCF Valuation & WACC Formulation",
        subject: "Corporate Finance",
        content:
          "# Discounted Cash Flow (DCF)\n\n- **Enterprise Value**: $\\sum \\frac{FCFF_t}{(1 + WACC)^t} + \\frac{Terminal Value}{(1 + WACC)^T}$\n- **WACC**: $\\left(\\frac{E}{V} \\cdot K_e\\right) + \\left(\\frac{D}{V} \\cdot K_d \\cdot (1 - t)\\right)$",
        updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      },
    ],
  },
};

// Global in-memory user registry for the running serverless lifetime
const dynamicUsers = new Map();

function generateToken(email, id) {
  const payload = {
    email,
    id,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

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
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(200).json({
      status: "online",
      message: "Campus AI Student Authentication Service is operational.",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const { action, email, password, profile, scholarKey } = req.body || {};
    const normalizedEmail = (email || "").trim().toLowerCase();

    // 1. DEMO SCHOLAR QUICK LOGIN
    if (action === "demo-login") {
      const targetEmail = scholarKey || normalizedEmail;
      const scholar = DEMO_SCHOLARS[targetEmail];

      if (!scholar) {
        return res.status(404).json({
          error: "Requested demo scholar not found.",
          availableScholars: Object.keys(DEMO_SCHOLARS),
        });
      }

      const token = generateToken(scholar.email, scholar.id);
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${scholar.name}!`,
        token,
        user: {
          id: scholar.id,
          name: scholar.name,
          email: scholar.email,
          degreeId: scholar.degreeId,
          degree: scholar.degree,
          careerPath: scholar.careerPath,
          gradYear: scholar.gradYear,
          avatar: scholar.avatar,
          streakDays: scholar.streakDays,
          quizScore: scholar.quizScore,
          completedModules: scholar.completedModules,
        },
        notes: scholar.notes,
        syncedAt: new Date().toISOString(),
      });
    }

    // 2. STANDARD LOGIN
    if (action === "login") {
      if (!normalizedEmail || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      // Check demo scholars
      if (DEMO_SCHOLARS[normalizedEmail]) {
        const scholar = DEMO_SCHOLARS[normalizedEmail];
        if (password === scholar.passwordHash || password === "password" || password === "demo123") {
          const token = generateToken(scholar.email, scholar.id);
          return res.status(200).json({
            success: true,
            message: `Authenticated as ${scholar.name}.`,
            token,
            user: {
              id: scholar.id,
              name: scholar.name,
              email: scholar.email,
              degreeId: scholar.degreeId,
              degree: scholar.degree,
              careerPath: scholar.careerPath,
              gradYear: scholar.gradYear,
              avatar: scholar.avatar,
              streakDays: scholar.streakDays,
              quizScore: scholar.quizScore,
              completedModules: scholar.completedModules,
            },
            notes: scholar.notes,
            syncedAt: new Date().toISOString(),
          });
        }
      }

      // Check dynamic registered users
      const existing = dynamicUsers.get(normalizedEmail);
      if (existing) {
        if (existing.password === password) {
          const token = generateToken(existing.email, existing.id);
          return res.status(200).json({
            success: true,
            message: `Welcome back, ${existing.name}!`,
            token,
            user: {
              id: existing.id,
              name: existing.name,
              email: existing.email,
              degreeId: existing.degreeId,
              degree: existing.degree,
              careerPath: existing.careerPath,
              gradYear: existing.gradYear,
              avatar: existing.avatar,
              streakDays: existing.streakDays || 1,
              quizScore: existing.quizScore || 100,
              completedModules: existing.completedModules || [],
            },
            notes: existing.notes || [],
            syncedAt: new Date().toISOString(),
          });
        }
      }

      // Allow graceful dynamic fallback login for custom accounts
      const fallbackId = `user-${Date.now().toString(36)}`;
      const autoUser = {
        id: fallbackId,
        name: normalizedEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: normalizedEmail,
        password: password,
        degreeId: profile?.degreeId || "mbbs",
        degree: profile?.degree || "MBBS (Medicine & Surgery)",
        careerPath: profile?.careerPath || "clinical-cardiothoracic",
        gradYear: profile?.gradYear || "2027",
        avatar: profile?.avatar || "🎓",
        streakDays: 1,
        quizScore: 100,
        completedModules: [],
        notes: [],
      };
      dynamicUsers.set(normalizedEmail, autoUser);

      const token = generateToken(autoUser.email, autoUser.id);
      return res.status(200).json({
        success: true,
        message: `Account authenticated for ${autoUser.name}.`,
        token,
        user: autoUser,
        notes: autoUser.notes,
        syncedAt: new Date().toISOString(),
      });
    }

    // 3. REGISTER NEW STUDENT
    if (action === "register") {
      if (!normalizedEmail || !password || !profile?.name) {
        return res.status(400).json({
          error: "Full name, email, and password are required to register.",
        });
      }

      const newId = `user-${Date.now().toString(36)}`;
      const newUser = {
        id: newId,
        name: profile.name.trim(),
        email: normalizedEmail,
        password: password,
        degreeId: profile.degreeId || "mbbs",
        degree: profile.degree || "MBBS (Medicine & Surgery)",
        careerPath: profile.careerPath || "clinical-cardiothoracic",
        gradYear: profile.gradYear || "2027",
        avatar: profile.avatar || "🎓",
        streakDays: 1,
        quizScore: 150,
        completedModules: [],
        notes: [
          {
            id: `note-${Date.now()}`,
            title: `Welcome to Campus AI — ${profile.degree || "Academic Program"}`,
            subject: "Orientation",
            content: `Welcome **${profile.name}**!\n\nYour cloud academic profile is now active on Campus AI.\n- Program: ${profile.degree || "Selected Degree"}\n- Track: ${profile.careerPath || "Specialization"}\n- Cloud Sync: Real-time 24/7 across devices.`,
            updatedAt: new Date().toISOString(),
          },
        ],
      };

      dynamicUsers.set(normalizedEmail, newUser);
      const token = generateToken(newUser.email, newUser.id);

      return res.status(201).json({
        success: true,
        message: `Account created successfully for ${newUser.name}.`,
        token,
        user: newUser,
        notes: newUser.notes,
        syncedAt: new Date().toISOString(),
      });
    }

    // 4. VERIFY ACTIVE SESSION
    if (action === "verify") {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace(/^Bearer\s+/i, "") || req.body?.token;

      if (!token) {
        return res.status(401).json({ valid: false, error: "No token provided" });
      }

      try {
        const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
        if (decoded.exp && decoded.exp > Date.now()) {
          return res.status(200).json({
            valid: true,
            email: decoded.email,
            id: decoded.id,
          });
        }
      } catch {
        // invalid token
      }
      return res.status(401).json({ valid: false, error: "Session token expired or invalid." });
    }

    return res.status(400).json({ error: "Invalid action specified." });
  } catch (err) {
    console.error("Auth API Error:", err);
    return res.status(500).json({ error: "Internal Authentication Server Error." });
  }
}
