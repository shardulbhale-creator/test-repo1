import { useState } from "react";
import {
  DEMO_SCHOLAR_KEYS,
  loginWithCredentials,
  registerNewStudent,
  loginDemoScholar,
  exportUserDataJson,
  exportNotesMarkdown,
  pushCloudData,
} from "../../services/cloudSyncService";

export default function AuthAccountModal({
  isOpen,
  onClose,
  student,
  notes,
  degreePrograms,
  careerPaths,
  onAccountUpdate,
  syncStatus,
  lastSyncedAt,
}) {
  const [activeTab, setActiveTab] = useState("sync"); // "signin" | "register" | "scholars" | "sync"
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState(student?.email || "");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regDegreeId, setRegDegreeId] = useState(student?.degreeId || "mbbs");
  const [regCareerPath, setRegCareerPath] = useState(student?.careerPath || "clinical-cardiothoracic");
  const [regGradYear, setRegGradYear] = useState("2027");

  if (!isOpen) return null;

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithCredentials(loginEmail, loginPassword, student);
      if (res.user) {
        setSuccessMsg(res.message || "Successfully authenticated!");
        setTimeout(() => {
          onAccountUpdate(res.user, res.notes || notes);
          onClose();
        }, 600);
      } else {
        setErrorMsg(res.error || "Authentication failed. Please verify credentials.");
      }
    } catch {
      setErrorMsg("Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setErrorMsg("Please fill in all required registration fields.");
      return;
    }

    setLoading(true);
    try {
      const selectedProg = degreePrograms.find((dp) => dp.id === regDegreeId);
      const degreeInfo = {
        degreeId: regDegreeId,
        degree: selectedProg ? selectedProg.title : "MBBS (Medicine & Surgery)",
        careerPath: regCareerPath,
        gradYear: regGradYear,
        avatar: selectedProg ? selectedProg.icon : "🎓",
      };

      const res = await registerNewStudent(regName, regEmail, regPassword, degreeInfo);
      if (res.user) {
        setSuccessMsg(`Welcome to Campus AI, ${res.user.name}!`);
        setTimeout(() => {
          onAccountUpdate(res.user, res.notes || []);
          onClose();
        }, 700);
      } else {
        setErrorMsg(res.error || "Failed to create account.");
      }
    } catch {
      setErrorMsg("Registration error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSwitchScholar(scholarKey) {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await loginDemoScholar(scholarKey);
      if (res.user) {
        setSuccessMsg(`Switched active scholar to ${res.user.name}!`);
        setTimeout(() => {
          onAccountUpdate(res.user, res.notes || []);
          onClose();
        }, 500);
      }
    } catch {
      setErrorMsg("Could not switch scholar account.");
    } finally {
      setLoading(false);
    }
  }

  async function handleTriggerCloudSync() {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await pushCloudData(student.email, student, notes);
      if (res.success) {
        setSuccessMsg("Cloud synchronization completed successfully!");
        onAccountUpdate(student, notes, res.syncedAt);
      }
    } catch {
      setErrorMsg("Cloud sync failed. Data remains cached locally.");
    } finally {
      setLoading(false);
    }
  }

  function handleSignOut() {
    if (window.confirm("Are you sure you want to sign out? Your notes and progress are backed up.")) {
      localStorage.removeItem("campus-ai-token");
      const guestStudent = {
        name: "Guest Student",
        email: "guest@campus.edu",
        careerPath: "ai-engineer",
        degree: "BTech / BS (Computer Science & AI)",
        degreeId: "btech-cs",
        gradYear: "2027",
        completedModules: [],
        quizScore: 0,
        streakDays: 1,
        avatar: "🎓",
      };
      onAccountUpdate(guestStudent, []);
      onClose();
    }
  }

  return (
    <div className="note-modal-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* MODAL HEADER */}
        <div className="auth-modal-header">
          <div className="auth-modal-title-box">
            <div className="auth-brand-logo">
              <span className="auth-logo-dot" />
              <span>campus<strong>ai</strong></span>
            </div>
            <h2>Student Account & Cloud Sync Hub</h2>
            <p>Persistent cloud profiles, cross-device sync, and academic progress.</p>
          </div>
          <button
            type="button"
            className="note-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* TAB STRIP */}
        <div className="auth-tab-strip">
          <button
            type="button"
            className={`auth-tab-pill ${activeTab === "sync" ? "active" : ""}`}
            onClick={() => setActiveTab("sync")}
          >
            ☁️ Cloud Profile & Sync
          </button>
          <button
            type="button"
            className={`auth-tab-pill ${activeTab === "scholars" ? "active" : ""}`}
            onClick={() => setActiveTab("scholars")}
          >
            ⚡ 1-Click Scholars (Demo)
          </button>
          <button
            type="button"
            className={`auth-tab-pill ${activeTab === "signin" ? "active" : ""}`}
            onClick={() => setActiveTab("signin")}
          >
            🔐 Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-pill ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            ✍️ Create Account
          </button>
        </div>

        {/* FEEDBACK MESSAGES */}
        {errorMsg && <div className="auth-alert error">⚠️ {errorMsg}</div>}
        {successMsg && <div className="auth-alert success">✓ {successMsg}</div>}

        {/* =====================================================================
            TAB 1: CLOUD PROFILE & SYNC
            ===================================================================== */}
        {activeTab === "sync" && (
          <div className="auth-tab-content">
            {/* CURRENT PROFILE CARD */}
            <div className="auth-current-profile-banner">
              <div className="auth-profile-avatar-large">{student.avatar}</div>
              <div className="auth-profile-meta">
                <div className="auth-profile-name-row">
                  <h3>{student.name}</h3>
                  <span className="auth-sync-status-badge live">
                    <span className="auth-pulse-dot" />
                    {syncStatus === "syncing" ? "Syncing..." : "Cloud Synced (24/7)"}
                  </span>
                </div>
                <div className="auth-profile-details">
                  <span>📧 {student.email}</span>
                  <span>🎓 {student.degree}</span>
                  <span>🗓️ Class of {student.gradYear}</span>
                </div>
              </div>
            </div>

            {/* SYNC STATS GRID */}
            <div className="auth-stats-grid">
              <div className="auth-stat-card">
                <span className="stat-num">⚡ {student.quizScore}</span>
                <span className="stat-label">Knowledge XP</span>
              </div>
              <div className="auth-stat-card">
                <span className="stat-num">🔥 {student.streakDays}</span>
                <span className="stat-label">Day Study Streak</span>
              </div>
              <div className="auth-stat-card">
                <span className="stat-num">📚 {student.completedModules.length}</span>
                <span className="stat-label">Modules Mastered</span>
              </div>
              <div className="auth-stat-card">
                <span className="stat-num">📝 {notes.length}</span>
                <span className="stat-label">Cloud Study Notes</span>
              </div>
            </div>

            {/* CLOUD SYNC ACTIONS */}
            <div className="auth-actions-group">
              <div className="auth-sync-meta-line">
                <span>Last Cloud Sync: <strong>{lastSyncedAt ? new Date(lastSyncedAt).toLocaleTimeString() : "Just now"}</strong></span>
                <span className="auth-device-tag">💻 Active Device</span>
              </div>

              <div className="auth-btn-cluster">
                <button
                  type="button"
                  className="auth-btn primary"
                  onClick={handleTriggerCloudSync}
                  disabled={loading}
                >
                  {loading ? "🔄 Syncing with Cloud..." : "🔄 Force Cloud Sync Now"}
                </button>
                <button
                  type="button"
                  className="auth-btn secondary"
                  onClick={() => exportUserDataJson(student, notes)}
                >
                  💾 Export All Data (JSON)
                </button>
                <button
                  type="button"
                  className="auth-btn secondary"
                  onClick={() => exportNotesMarkdown(student, notes)}
                >
                  📄 Export Notes (Markdown)
                </button>
                <button
                  type="button"
                  className="auth-btn danger"
                  onClick={handleSignOut}
                >
                  🚪 Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: 1-CLICK DEMO SCHOLARS (INSTANT SWITCH)
            ===================================================================== */}
        {activeTab === "scholars" && (
          <div className="auth-tab-content">
            <p className="auth-section-desc">
              Test Campus AI across different university programs in 1 click. Switching loads pre-enrolled degrees, realistic study notes, quiz XP, and dedicated labs.
            </p>

            <div className="auth-scholars-grid">
              {DEMO_SCHOLAR_KEYS.map((scholar) => {
                const isCurrent = student.email === scholar.key;
                return (
                  <div
                    key={scholar.key}
                    className={`auth-scholar-card ${isCurrent ? "current" : ""}`}
                    onClick={() => !loading && handleSwitchScholar(scholar.key)}
                  >
                    <div className="auth-scholar-top">
                      <span className="scholar-avatar">{scholar.avatar}</span>
                      <div className="scholar-header-info">
                        <strong>{scholar.name}</strong>
                        <span className="scholar-degree-badge" style={{ borderColor: scholar.color }}>
                          {scholar.degree}
                        </span>
                      </div>
                      {isCurrent && <span className="current-pill">Active</span>}
                    </div>
                    <div className="scholar-body">
                      <div className="scholar-career">{scholar.career}</div>
                      <div className="scholar-stats">{scholar.stats}</div>
                    </div>
                    <button
                      type="button"
                      className="scholar-switch-btn"
                      disabled={isCurrent || loading}
                    >
                      {isCurrent ? "✓ Currently Active" : "Switch to this Scholar ↗"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: SIGN IN FORM
            ===================================================================== */}
        {activeTab === "signin" && (
          <form className="auth-tab-content" onSubmit={handleLogin}>
            <div className="note-form-group">
              <label>Student Email Address</label>
              <input
                type="email"
                placeholder="e.g. mbbs-scholar@campus.edu"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="note-form-group">
              <div className="auth-password-header">
                <label>Password</label>
                <button
                  type="button"
                  className="auth-show-pass-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password (demo: demo123)"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-btn-cluster">
              <button
                type="submit"
                className="auth-btn primary"
                disabled={loading}
              >
                {loading ? "Verifying Credentials..." : "🔐 Sign In to Campus AI"}
              </button>
              <button
                type="button"
                className="auth-btn secondary"
                onClick={() => setActiveTab("register")}
              >
                Don't have an account? Register
              </button>
            </div>
          </form>
        )}

        {/* =====================================================================
            TAB 4: CREATE ACCOUNT / REGISTER
            ===================================================================== */}
        {activeTab === "register" && (
          <form className="auth-tab-content" onSubmit={handleRegister}>
            <div className="note-form-group">
              <label>Student Full Name</label>
              <input
                type="text"
                placeholder="e.g. Dr. Jane Doe"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="note-form-group">
              <label>University Email</label>
              <input
                type="email"
                placeholder="e.g. jane@campus.edu"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="note-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <div className="note-form-group">
              <label>Target Degree Program</label>
              <select
                value={regDegreeId}
                onChange={(e) => {
                  setRegDegreeId(e.target.value);
                  const matchingCareer =
                    careerPaths.find((cp) => cp.degreeId === e.target.value) ||
                    careerPaths[0];
                  if (matchingCareer) setRegCareerPath(matchingCareer.id);
                }}
              >
                {degreePrograms.map((dp) => (
                  <option key={dp.id} value={dp.id}>
                    {dp.icon} {dp.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="note-form-group">
              <label>Specialized Track / Career Path</label>
              <select
                value={regCareerPath}
                onChange={(e) => setRegCareerPath(e.target.value)}
              >
                {careerPaths
                  .filter((cp) => cp.degreeId === regDegreeId)
                  .map((cp) => (
                    <option key={cp.id} value={cp.id}>
                      {cp.icon} {cp.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="note-form-group">
              <label>Graduation Year</label>
              <input
                type="text"
                value={regGradYear}
                onChange={(e) => setRegGradYear(e.target.value)}
              />
            </div>

            <div className="auth-btn-cluster">
              <button
                type="submit"
                className="auth-btn primary"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "✨ Create Student Account"}
              </button>
              <button
                type="button"
                className="auth-btn secondary"
                onClick={() => setActiveTab("signin")}
              >
                Already have an account? Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
