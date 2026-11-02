// Client-side Cloud Sync & Auth Service
// Connects to /api/auth and /api/sync with graceful offline localStorage fallback

const AUTH_API_URL = "/api/auth";
const SYNC_API_URL = "/api/sync";

export const DEMO_SCHOLAR_KEYS = [
  {
    key: "mbbs-scholar@campus.edu",
    name: "Dr. Shardul Bhale",
    degreeId: "mbbs",
    degree: "MBBS (Medicine & Surgery)",
    career: "Clinical Cardiothoracic Specialist",
    avatar: "🩺",
    color: "#ff2a5f",
    stats: "15 Modules · 520 XP · 6d Streak",
  },
  {
    key: "btech-engineer@campus.edu",
    name: "Aarav Sharma",
    degreeId: "btech-cs",
    degree: "BTech / BS (Computer Science & AI)",
    career: "AI Systems & Full-Stack Architect",
    avatar: "👨‍💻",
    color: "#00f0ff",
    stats: "12 Modules · 450 XP · 12d Streak",
  },
  {
    key: "llb-jurist@campus.edu",
    name: "Adv. Ananya Iyer",
    degreeId: "llb",
    degree: "LLB (Law & Jurisprudence)",
    career: "Constitutional & Corporate Counsel",
    avatar: "⚖️",
    color: "#a855f7",
    stats: "8 Modules · 320 XP · 4d Streak",
  },
  {
    key: "mba-analyst@campus.edu",
    name: "Rohan Mehta",
    degreeId: "mba",
    degree: "MBA / BBA (Business & Finance)",
    career: "Equity Research & Financial Modeling",
    avatar: "💼",
    color: "#eab308",
    stats: "6 Modules · 240 XP · 5d Streak",
  },
];

export async function loginWithCredentials(email, password, profileFallback) {
  try {
    const res = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "login",
        email,
        password,
        profile: profileFallback,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("campus-ai-token", data.token);
        localStorage.setItem("campus-ai-last-sync", data.syncedAt || new Date().toISOString());
      }
      return data;
    }
  } catch (err) {
    console.warn("Auth endpoint offline or unreachable; using local auth fallback:", err);
  }

  // Graceful offline fallback
  const fallbackUser = {
    id: `local-${Date.now()}`,
    name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    email,
    degreeId: profileFallback?.degreeId || "mbbs",
    degree: profileFallback?.degree || "MBBS (Medicine & Surgery)",
    careerPath: profileFallback?.careerPath || "clinical-cardiothoracic",
    gradYear: profileFallback?.gradYear || "2027",
    avatar: profileFallback?.avatar || "🎓",
    streakDays: 1,
    quizScore: 100,
    completedModules: [],
  };

  return {
    success: true,
    user: fallbackUser,
    notes: [],
    syncedAt: new Date().toISOString(),
    isOffline: true,
  };
}

export async function registerNewStudent(fullName, email, password, degreeInfo) {
  try {
    const res = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "register",
        email,
        password,
        profile: {
          name: fullName,
          degreeId: degreeInfo.degreeId,
          degree: degreeInfo.degree,
          careerPath: degreeInfo.careerPath,
          gradYear: degreeInfo.gradYear,
          avatar: degreeInfo.avatar || "🎓",
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("campus-ai-token", data.token);
        localStorage.setItem("campus-ai-last-sync", data.syncedAt || new Date().toISOString());
      }
      return data;
    }
  } catch (err) {
    console.warn("Register endpoint unreachable; using local register fallback:", err);
  }

  const fallbackUser = {
    id: `reg-${Date.now()}`,
    name: fullName,
    email,
    degreeId: degreeInfo.degreeId,
    degree: degreeInfo.degree,
    careerPath: degreeInfo.careerPath,
    gradYear: degreeInfo.gradYear,
    avatar: degreeInfo.avatar || "🎓",
    streakDays: 1,
    quizScore: 150,
    completedModules: [],
  };

  return {
    success: true,
    user: fallbackUser,
    notes: [
      {
        id: `note-${Date.now()}`,
        title: `Welcome to ${degreeInfo.degree || "Campus AI"}`,
        subject: "Orientation",
        content: `Welcome **${fullName}**!\n\nYour account is set up for **${degreeInfo.degree}**.\nExplore your subjects, interactive 3D/Code labs, and AI tutor.`,
        updatedAt: new Date().toISOString(),
      },
    ],
    syncedAt: new Date().toISOString(),
    isOffline: true,
  };
}

export async function loginDemoScholar(scholarKey) {
  try {
    const res = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "demo-login",
        scholarKey,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("campus-ai-token", data.token);
        localStorage.setItem("campus-ai-last-sync", data.syncedAt || new Date().toISOString());
      }
      return data;
    }
  } catch (err) {
    console.warn("Demo login endpoint offline; using built-in presets:", err);
  }

  // Built-in presets fallback
  const preset = DEMO_SCHOLAR_KEYS.find((s) => s.key === scholarKey) || DEMO_SCHOLAR_KEYS[0];
  return {
    success: true,
    user: {
      id: `demo-${preset.degreeId}`,
      name: preset.name,
      email: preset.key,
      degreeId: preset.degreeId,
      degree: preset.degree,
      careerPath: preset.degreeId === "btech-cs" ? "ai-engineer" : "clinical-cardiothoracic",
      gradYear: "2027",
      avatar: preset.avatar,
      streakDays: preset.degreeId === "btech-cs" ? 12 : 6,
      quizScore: preset.degreeId === "btech-cs" ? 450 : 520,
      completedModules: preset.degreeId === "btech-cs" ? ["py-1", "dsa-1"] : ["ana-1", "ana-2"],
    },
    notes: [
      {
        id: `note-demo-${Date.now()}`,
        title: `High-Yield Review: ${preset.degree}`,
        subject: preset.degreeId === "mbbs" ? "Gross Anatomy" : "CS & Algorithms",
        content:
          preset.degreeId === "mbbs"
            ? "# Clavicle & Neurovascular Triad\n\n- Subclavian vessels lie directly deep to middle 1/3.\n- Brachial plexus trunks pass inferolateral."
            : "# Transformer Key-Value Attention\n\n- Attention(Q,K,V) scaled dot-product.\n- $O(N)$ inference complexity with KV caching.",
        updatedAt: new Date().toISOString(),
      },
    ],
    syncedAt: new Date().toISOString(),
    isOffline: true,
  };
}

export async function pushCloudData(email, student, notes) {
  if (!email) return { success: false, reason: "No email" };

  try {
    const res = await fetch(SYNC_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "push",
        email,
        payload: {
          student,
          notes,
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("campus-ai-last-sync", data.syncedAt || new Date().toISOString());
      return { success: true, syncedAt: data.syncedAt, cloud: true };
    }
  } catch (err) {
    console.warn("Cloud push sync failed; saved locally to device:", err);
  }

  // Local device sync confirmation
  const now = new Date().toISOString();
  localStorage.setItem("campus-ai-last-sync", now);
  return { success: true, syncedAt: now, cloud: false };
}

export function exportUserDataJson(student, notes) {
  const exportBlob = new Blob(
    [
      JSON.stringify(
        {
          appName: "Campus AI Academic Learning Platform",
          exportedAt: new Date().toISOString(),
          student,
          notes,
        },
        null,
        2
      ),
    ],
    { type: "application/json" }
  );
  const downloadUrl = URL.createObjectURL(exportBlob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `campus-ai-backup-${student.name.replace(/\s+/g, "_")}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}

export function exportNotesMarkdown(student, notes) {
  let md = `# 🎓 Campus AI — Study Notes Archive\n`;
  md += `**Student**: ${student.name} (${student.email})\n`;
  md += `**Degree**: ${student.degree} | **XP**: ${student.quizScore} | **Streak**: ${student.streakDays} Days\n`;
  md += `**Exported**: ${new Date().toLocaleString()}\n\n---\n\n`;

  notes.forEach((note, index) => {
    md += `## ${index + 1}. ${note.title}\n`;
    md += `*Subject*: ${note.subject} | *Last Updated*: ${new Date(note.updatedAt || Date.now()).toLocaleDateString()}\n\n`;
    md += `${note.content}\n\n---\n\n`;
  });

  const exportBlob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(exportBlob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `study-notes-${student.name.replace(/\s+/g, "_")}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
