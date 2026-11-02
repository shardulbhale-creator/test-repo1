import { useState, useRef, useEffect } from "react";
import {
  exportUserDataJson,
  exportNotesMarkdown,
  pushCloudData,
} from "../../services/cloudSyncService";

export default function TopRightProfileMenu({
  student,
  notes,
  currentDegreeProgram,
  onOpenAuthModal,
  syncStatus,
  lastSyncedAt,
  onAccountUpdate,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  async function handleQuickSync() {
    setIsSyncing(true);
    try {
      const res = await pushCloudData(student.email, student, notes);
      if (res && res.syncedAt) {
        onAccountUpdate(student, notes, res.syncedAt);
      }
    } finally {
      setIsSyncing(false);
      setIsOpen(false);
    }
  }

  function handleSignOut() {
    setIsOpen(false);
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
    }
  }

  return (
    <div className="top-right-profile-wrapper" ref={menuRef}>
      {/* TRIGGER PILL IN TOP RIGHT CORNER */}
      <button
        type="button"
        className={`top-right-profile-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Student Profile & Cloud Settings (Upper Right Corner)"
        aria-expanded={isOpen}
      >
        <div className="top-profile-avatar-box">
          <span className="top-profile-avatar">{student.avatar}</span>
          <span className="top-profile-status-dot" />
        </div>

        <div className="top-profile-info-text">
          <span className="top-profile-name">{student.name}</span>
          <span className="top-profile-degree-tag">{currentDegreeProgram.shortName}</span>
        </div>

        <span className={`top-profile-chevron ${isOpen ? "open" : ""}`}>▾</span>
      </button>

      {/* FLOATING DROPDOWN MENU */}
      {isOpen && (
        <div className="top-right-profile-dropdown" role="menu">
          {/* USER MINI HEADER */}
          <div className="profile-dropdown-header">
            <div className="profile-dropdown-avatar">{student.avatar}</div>
            <div className="profile-dropdown-meta">
              <strong>{student.name}</strong>
              <span className="dropdown-email">{student.email}</span>
              <div className="dropdown-degree-badge">
                {currentDegreeProgram.icon} {currentDegreeProgram.shortName} · Class of {student.gradYear}
              </div>
            </div>
          </div>

          {/* CLOUD SYNC LIVE STATUS BAR */}
          <div className="profile-dropdown-sync-bar">
            <div className="sync-bar-left">
              <span className={`sync-status-indicator ${syncStatus === "syncing" || isSyncing ? "syncing" : "synced"}`} />
              <span>{isSyncing ? "Syncing now..." : syncStatus === "syncing" ? "Syncing with cloud..." : "Cloud Synced (24/7)"}</span>
            </div>
            <span className="sync-bar-time">
              {lastSyncedAt ? new Date(lastSyncedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Active"}
            </span>
          </div>

          {/* STATS QUICK CHIPS */}
          <div className="profile-dropdown-stats-row">
            <div className="dropdown-stat-chip">
              <strong>⚡ {student.quizScore}</strong>
              <span>XP Score</span>
            </div>
            <div className="dropdown-stat-chip">
              <strong>🔥 {student.streakDays}d</strong>
              <span>Streak</span>
            </div>
            <div className="dropdown-stat-chip">
              <strong>📝 {notes.length}</strong>
              <span>Notes</span>
            </div>
          </div>

          <div className="profile-dropdown-divider" />

          {/* MENU ACTIONS */}
          <div className="profile-dropdown-actions">
            <button
              type="button"
              className="dropdown-action-item"
              onClick={() => {
                setIsOpen(false);
                onOpenAuthModal("sync");
              }}
            >
              <span className="action-icon">⚙️</span>
              <div className="action-labels">
                <strong>Account Settings & Sync Hub</strong>
                <span>Manage cloud profile, backup and sync</span>
              </div>
            </button>

            <button
              type="button"
              className="dropdown-action-item"
              onClick={() => {
                setIsOpen(false);
                onOpenAuthModal("scholars");
              }}
            >
              <span className="action-icon">⚡</span>
              <div className="action-labels">
                <strong>1-Click Switch Scholar</strong>
                <span>Switch between MBBS, B.Tech, LLB & MBA</span>
              </div>
            </button>

            <button
              type="button"
              className="dropdown-action-item"
              onClick={handleQuickSync}
              disabled={isSyncing}
            >
              <span className="action-icon">🔄</span>
              <div className="action-labels">
                <strong>Force Cloud Sync Now</strong>
                <span>Push latest notes & study progress</span>
              </div>
            </button>

            <button
              type="button"
              className="dropdown-action-item"
              onClick={() => {
                setIsOpen(false);
                exportNotesMarkdown(student, notes);
              }}
            >
              <span className="action-icon">📄</span>
              <div className="action-labels">
                <strong>Export Notes (Markdown)</strong>
                <span>Download notes archive to disk</span>
              </div>
            </button>

            <button
              type="button"
              className="dropdown-action-item"
              onClick={() => {
                setIsOpen(false);
                exportUserDataJson(student, notes);
              }}
            >
              <span className="action-icon">💾</span>
              <div className="action-labels">
                <strong>Backup All Data (JSON)</strong>
                <span>Export complete student profile & syllabus stats</span>
              </div>
            </button>
          </div>

          <div className="profile-dropdown-divider" />

          {/* SIGN OUT */}
          <button
            type="button"
            className="dropdown-signout-btn"
            onClick={handleSignOut}
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
