// Vercel Serverless Function — Student Cloud Data Sync & Persistence
// Route: /api/sync


// In-memory cloud database for sync during serverless lifecycle
const cloudDatabase = new Map();

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
      message: "Campus AI Cloud Sync Engine is operational.",
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const { action, email, payload } = req.body || {};
    const normalizedEmail = (email || "").trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({ error: "Student email is required for cloud sync." });
    }

    // 1. PULL CLOUD DATA
    if (action === "pull") {
      const stored = cloudDatabase.get(normalizedEmail);
      if (!stored) {
        return res.status(200).json({
          status: "not_found",
          message: "No remote cloud data found for this account. Will use local device cache.",
          syncedAt: new Date().toISOString(),
        });
      }

      return res.status(200).json({
        status: "synced",
        data: stored,
        syncedAt: stored.syncedAt || new Date().toISOString(),
      });
    }

    // 2. PUSH SYNC DATA (UPDATE CLOUD PERSISTENCE)
    if (action === "push") {
      if (!payload) {
        return res.status(400).json({ error: "Sync payload missing." });
      }

      const existing = cloudDatabase.get(normalizedEmail) || {};
      const updatedRecord = {
        ...existing,
        ...payload,
        email: normalizedEmail,
        syncedAt: new Date().toISOString(),
        deviceUserAgent: req.headers["user-agent"] || "Web Browser",
      };

      cloudDatabase.set(normalizedEmail, updatedRecord);

      return res.status(200).json({
        success: true,
        message: "Academic progress and smart study notes synced to cloud.",
        syncedAt: updatedRecord.syncedAt,
        recordSummary: {
          degree: updatedRecord.student?.degree,
          quizScore: updatedRecord.student?.quizScore,
          streakDays: updatedRecord.student?.streakDays,
          completedModulesCount: (updatedRecord.student?.completedModules || []).length,
          notesCount: (updatedRecord.notes || []).length,
        },
      });
    }

    return res.status(400).json({ error: "Invalid sync action specified." });
  } catch (err) {
    console.error("Cloud Sync API Error:", err);
    return res.status(500).json({ error: "Internal Cloud Sync Server Error." });
  }
}
