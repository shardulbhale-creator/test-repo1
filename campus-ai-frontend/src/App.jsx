import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  DEGREE_PROGRAMS,
  CAREER_PATHS,
  SUBJECTS,
} from "./data/curriculum";

function App() {
  // Navigation State
  const [active, setActive] = useState("Overview");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedStageFilter, setSelectedStageFilter] = useState("All Stages");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [quizStageFilter, setQuizStageFilter] = useState("All Stages");
  const [showAllCareerTracks, setShowAllCareerTracks] = useState(false);

  // Active Selected Degree ID (Defaults to B.Tech)
  const [selectedDegreeId, setSelectedDegreeId] = useState(() => {
    try {
      const savedDegree = localStorage.getItem("campus-ai-selected-degree");
      if (savedDegree) return savedDegree;
      const saved = localStorage.getItem("campus-ai-student");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.degreeId) return parsed.degreeId;
        const match = DEGREE_PROGRAMS.find((dp) => dp.title === parsed.degree);
        if (match) return match.id;
      }
    } catch {
      // fallback
    }
    return "btech-cs";
  });

  // Student Profile State (Persisted in localStorage)
  const [student, setStudent] = useState(() => {
    try {
      const saved = localStorage.getItem("campus-ai-student");
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: "Shardul Bhale",
      email: "shardul@campus.edu",
      careerPath: "ai-engineer",
      degree: "BTech / BS (Computer Science & AI)",
      degreeId: "btech-cs",
      gradYear: "2027",
      completedModules: ["py-1"],
      quizScore: 280,
      streakDays: 6,
      avatar: "👨‍💻",
    };
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState(student);

  function saveStudent(updated) {
    setStudent(updated);
    localStorage.setItem("campus-ai-student", JSON.stringify(updated));
  }

  // Active Degree Program Object (100% matched to selected degree)
  const currentDegreeProgram = useMemo(() => {
    return (
      DEGREE_PROGRAMS.find((dp) => dp.id === selectedDegreeId) ||
      DEGREE_PROGRAMS.find((dp) => dp.id === "btech-cs") ||
      DEGREE_PROGRAMS[0]
    );
  }, [selectedDegreeId]);

  // Active Career Path Object (constrained to active degree)
  const currentCareer = useMemo(() => {
    return (
      CAREER_PATHS.find(
        (cp) => cp.id === student.careerPath && cp.degreeId === currentDegreeProgram.id
      ) ||
      CAREER_PATHS.find((cp) => cp.degreeId === currentDegreeProgram.id) ||
      CAREER_PATHS[0]
    );
  }, [student.careerPath, currentDegreeProgram]);

  // Subjects belonging EXCLUSIVELY to the selected Degree
  const degreeSubjects = useMemo(() => {
    return SUBJECTS.filter((s) => s.degreeId === currentDegreeProgram.id);
  }, [currentDegreeProgram.id]);

  // All Module IDs in this Degree
  const degreeModuleIds = useMemo(() => {
    return degreeSubjects.flatMap((s) => s.modules.map((m) => m.id));
  }, [degreeSubjects]);

  // Completed Modules Count in this Degree
  const degreeCompletedCount = useMemo(() => {
    return degreeModuleIds.filter((id) =>
      student.completedModules.includes(id)
    ).length;
  }, [degreeModuleIds, student.completedModules]);

  // Overall Degree Progress Percentage
  const degreeProgress = useMemo(() => {
    if (degreeModuleIds.length === 0) return 0;
    return Math.round((degreeCompletedCount / degreeModuleIds.length) * 100);
  }, [degreeCompletedCount, degreeModuleIds]);

  // Switch Course/Degree Handler — Updates entire app instantly
  function handleSelectDegree(degreeId) {
    setSelectedDegreeId(degreeId);
    localStorage.setItem("campus-ai-selected-degree", degreeId);
    const prog = DEGREE_PROGRAMS.find((p) => p.id === degreeId);
    if (!prog) return;
    const defaultCareer =
      CAREER_PATHS.find((cp) => cp.id === prog.defaultCareer) ||
      CAREER_PATHS.find((cp) => cp.degreeId === degreeId) ||
      CAREER_PATHS[0];
    const updated = {
      ...student,
      degreeId: prog.id,
      degree: prog.title,
      careerPath: defaultCareer.id,
      avatar: prog.icon,
    };
    saveStudent(updated);
    setSelectedSubjectId(null);
    setSelectedStageFilter("All Stages");
    setQuizStageFilter("All Stages");
    setSubjectSearch("");
  }

  function selectCareerTrack(track) {
    const matchingProg = DEGREE_PROGRAMS.find((dp) => dp.id === track.degreeId);
    const updated = {
      ...student,
      careerPath: track.id,
      degreeId: matchingProg ? matchingProg.id : student.degreeId,
      degree: matchingProg ? matchingProg.title : student.degree,
      avatar: track.icon,
    };
    saveStudent(updated);
  }

  // Filtered Subjects for Study Hub — STRICTLY isolated to the active Degree
  const filteredSubjects = useMemo(() => {
    return degreeSubjects.filter((s) => {
      // 1. Stage Filter
      if (selectedStageFilter && selectedStageFilter !== "All Stages") {
        if (s.stage !== selectedStageFilter) {
          return false;
        }
      }

      // 2. Search Query
      if (subjectSearch.trim()) {
        const q = subjectSearch.toLowerCase().trim();
        const matchesTitle = s.title.toLowerCase().includes(q);
        const matchesDesc = s.description.toLowerCase().includes(q);
        const matchesCategory = s.category.toLowerCase().includes(q);
        const matchesStage = s.stage && s.stage.toLowerCase().includes(q);
        const matchesModules = s.modules.some(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.summary.toLowerCase().includes(q) ||
            (m.keyConcepts && m.keyConcepts.some((kc) => kc.toLowerCase().includes(q)))
        );
        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesCategory &&
          !matchesStage &&
          !matchesModules
        ) {
          return false;
        }
      }

      return true;
    });
  }, [degreeSubjects, selectedStageFilter, subjectSearch]);

  // Filtered Quiz Questions for Quiz Lab — STRICTLY isolated to active Degree
  const filteredQuizQuestions = useMemo(() => {
    let list = degreeSubjects;
    if (quizStageFilter && quizStageFilter !== "All Stages") {
      list = degreeSubjects.filter((s) => s.stage === quizStageFilter);
    }
    return list.flatMap((s) =>
      s.quiz.map((q, idx) => ({
        ...q,
        subjectTitle: s.title,
        subjectCategory: s.category,
        subjectStage: s.stage,
        sId: s.id,
        qIdx: idx,
      }))
    );
  }, [degreeSubjects, quizStageFilter]);

  // Toggle Module Completion
  function toggleModuleCompletion(moduleId) {
    const isDone = student.completedModules.includes(moduleId);
    const updatedModules = isDone
      ? student.completedModules.filter((id) => id !== moduleId)
      : [...student.completedModules, moduleId];

    const xpDiff = isDone ? -25 : 25;
    const updatedStudent = {
      ...student,
      completedModules: updatedModules,
      quizScore: Math.max(0, student.quizScore + xpDiff),
    };
    saveStudent(updatedStudent);
  }

  // Active Subject Object
  const currentSubject = useMemo(() => {
    return SUBJECTS.find((s) => s.id === selectedSubjectId) || null;
  }, [selectedSubjectId]);

  // Subject Tab within Detail View
  const [subjectActiveTab, setSubjectActiveTab] = useState("modules"); // 'modules' | 'quiz'

  // Quiz Answer Tracking State: { [questionId]: optionIndex }
  const [quizAnswers, setQuizAnswers] = useState({});

  function handleSelectQuizAnswer(qKey, chosenIndex, correctIndex) {
    if (quizAnswers[qKey] !== undefined) return; // already answered
    setQuizAnswers((prev) => ({ ...prev, [qKey]: chosenIndex }));

    if (chosenIndex === correctIndex) {
      const updated = {
        ...student,
        quizScore: student.quizScore + 50,
      };
      saveStudent(updated);
    }
  }

  // Smart Notes State (Persisted in localStorage)
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("campus-ai-notes") || "[]");
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("All Subjects");

  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteSubject, setNoteSubject] = useState("Medicine & Surgery");
  const [noteContent, setNoteContent] = useState("");
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);

  function saveNotes(updatedNotes) {
    setNotes(updatedNotes);
    localStorage.setItem("campus-ai-notes", JSON.stringify(updatedNotes));
  }

  function openNewNoteEditor(initialSubject = "Medicine & Surgery", initialTitle = "") {
    setEditingNoteId(null);
    setNoteTitle(initialTitle);
    setNoteSubject(initialSubject);
    setNoteContent("");
    setShowMarkdownPreview(false);
    setIsNoteEditorOpen(true);
  }

  function openEditNoteEditor(note) {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteSubject(note.subject || "Other");
    setNoteContent(note.content);
    setShowMarkdownPreview(false);
    setIsNoteEditorOpen(true);
  }

  function handleSaveNote() {
    if (!noteTitle.trim() || !noteContent.trim()) {
      alert("Please provide both a note title and content.");
      return;
    }

    const now = new Date().toISOString();
    let updatedNotes;

    if (editingNoteId !== null) {
      updatedNotes = notes.map((note) =>
        note.id === editingNoteId
          ? {
              ...note,
              title: noteTitle.trim(),
              subject: noteSubject,
              content: noteContent,
              updatedAt: now,
            }
          : note
      );
    } else {
      updatedNotes = [
        {
          id: Date.now(),
          title: noteTitle.trim(),
          subject: noteSubject,
          content: noteContent,
          pinned: false,
          createdAt: now,
          updatedAt: now,
        },
        ...notes,
      ];
    }

    saveNotes(updatedNotes);
    setIsNoteEditorOpen(false);
  }

  function togglePinNote(noteId) {
    const updated = notes.map((item) =>
      item.id === noteId ? { ...item, pinned: !item.pinned } : item
    );
    saveNotes(updated);
  }

  function handleDeleteNote(noteId) {
    if (!window.confirm("Delete this study note?")) return;
    const updated = notes.filter((item) => item.id !== noteId);
    saveNotes(updated);
  }

  const filteredNotes = notes
    .filter((note) => {
      const matchesSubject =
        selectedSubjectFilter === "All Subjects" ||
        note.subject === selectedSubjectFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (note.title && note.title.toLowerCase().includes(q)) ||
        (note.content && note.content.toLowerCase().includes(q)) ||
        (note.subject && note.subject.toLowerCase().includes(q));
      return matchesSubject && matchesSearch;
    })
    .slice()
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

  // AI Assistant Chat State
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hello **${student.name}**! I am your dedicated **Campus AI Study Partner**. Whether you are studying for your **${currentCareer.title}**, mastering clinical medicine cases, dissecting constitutional statutes, analyzing corporate balance sheets, or architecting neural networks, I am ready to help. What concept are we tackling today?`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text = question) {
    const userQuestion = text.trim();
    if (!userQuestion || loading) return;

    setActive("AI Assistant");
    setQuestion("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userQuestion },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer || "Here is what I found for you.",
        },
      ]);
    } catch {
      // Intelligent Contextual Academic Fallback for all disciplines
      const fallbackAnswer = generateStudyFallback(
        userQuestion,
        currentCareer.title,
        currentCareer.discipline
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: fallbackAnswer,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function generateStudyFallback(q, careerName, discipline) {
    const qLower = q.toLowerCase();

    // Medicine / MBBS Specific
    if (discipline.includes("Medicine") || qLower.includes("ecg") || qLower.includes("cardiac") || qLower.includes("pharmacology") || qLower.includes("necrosis")) {
      return `### 🩺 High-Yield Clinical Analysis (${careerName})\n\nRegarding: **"${q}"**\n\n1. **Core Pathophysiology & Mechanisms**: \n   - Focus on anatomical landmarks, physiological autoregulation, and enzymatic pathways.\n   - Correlate diagnostic test indicators (e.g., elevated troponins, leukocytosis, anion gap deviations).\n2. **Differential Diagnosis & Clinical Presentation**:\n   - Rule out life-threatening presentations first.\n   - Analyze acute vs chronic symptom evolution and targeted pharmacotherapy.\n3. **Exam & Ward Rounds Tip**:\n   - Review the associated module under **Study Hub > Medicine** and test yourself with our clinical scenario quizzes!`;
    }

    // Law / LLB Specific
    if (discipline.includes("Law") || qLower.includes("court") || qLower.includes("contract") || qLower.includes("constitutional") || qLower.includes("writ")) {
      return `### ⚖️ Jurisprudential & Case Law Analysis (${careerName})\n\nRegarding: **"${q}"**\n\n1. **Statutory Framework & Legal Issues**:\n   - Identify the primary constitutional articles or legislative provisions governing this dispute.\n2. **IRAC Method (Issue, Rule, Application, Conclusion)**:\n   - **Issue**: What is the threshold legal conflict?\n   - **Rule**: Apply prevailing judicial precedents, ratio decidendi, and constitutional doctrines.\n   - **Application**: Balance competing equities, burden of proof standards, and procedural safeguards.\n3. **Advocacy Practice**:\n   - Save key case citations in **My Notes** under the Law domain for quick reference during mock trials and moot court preparation!`;
    }

    // Business / MBA Specific
    if (discipline.includes("Business") || qLower.includes("valuation") || qLower.includes("dcf") || qLower.includes("accounting") || qLower.includes("wacc")) {
      return `### 📈 Strategic & Financial Executive Briefing (${careerName})\n\nRegarding: **"${q}"**\n\n1. **Fundamental Valuation Framework**:\n   - Evaluate enterprise value, cash flow yield, cost of capital (WACC), and margin sensitivity.\n2. **Strategic Moats & Market Dynamics**:\n   - Assess competitive differentiation, pricing power, and customer retention unit economics (LTV:CAC).\n3. **Executive Action**:\n   - Link this concept with our **Business & Finance** modules in the Study Hub!`;
    }

    // Engineering & General Academic
    return `### 💡 Campus AI Academic Tutor (${careerName})\n\nRegarding **"${q}"**:\n\n- **First Principles**: Deconstruct the problem into fundamental definitions, core assumptions, and system constraints.\n- **Academic Mastery**: In **${careerName}**, examiners and technical interviewers look for structured reasoning, precise terminology, and practical real-world application.\n- **Recommended Next Step**: Head to **Study Hub** to check off this module and solidify your recall with an interactive quiz!`;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function openPage(page) {
    setActive(page);
    setSelectedSubjectId(null);
  }

  function openSubjectDetail(subjectId) {
    setSelectedSubjectId(subjectId);
    setSubjectActiveTab("modules");
    setActive("Study Hub");
  }

  // Contextual AI Prompt Suggestions based on Discipline
  const contextualPrompts = useMemo(() => {
    if (currentCareer.discipline.includes("Medicine")) {
      return [
        "Explain Wiggers Diagram and cardiac cycle pressures step by step",
        "Mechanism of action: ACE Inhibitors vs ARBs and dry cough",
        "Algorithmic approach to reading an emergency 12-lead ECG",
        "Differential diagnosis for high anion gap metabolic acidosis",
      ];
    }
    if (currentCareer.discipline.includes("Law")) {
      return [
        "Explain the Doctrine of Basic Structure with landmark precedents",
        "Compare the 5 Constitutional prerogative writs with legal scenarios",
        "Draft an ironclad Liquidated Damages clause for commercial contracts",
        "Distinguish between Mens Rea standards: Intention vs Recklessness",
      ];
    }
    if (currentCareer.discipline.includes("Business")) {
      return [
        "Walk me through DCF valuation and WACC computation step by step",
        "How a $10 increase in depreciation impacts the 3 financial statements",
        "Explain the 4 economic moats (Network effects, Switching costs, Scale, Brands)",
        "Key unit economics: LTV, CAC, payback period, and churn benchmarks",
      ];
    }
    if (currentCareer.discipline.includes("Psychology")) {
      return [
        "Explain Beck's Cognitive Triad and cognitive restructuring in CBT",
        "Cellular mechanism of Long-Term Potentiation (LTP) in memory encoding",
        "DSM-5 diagnostic criteria for Major Depressive Disorder vs Bipolar I/II",
        "Working memory limits: Baddeley's multi-component model",
      ];
    }
    return [
      `Give me a 30-day study plan for ${currentCareer.title}`,
      "Explain Python generators vs list comprehensions with memory benchmarks",
      "How does backpropagation work in deep neural networks?",
      "Explain the CAP theorem with distributed database tradeoffs",
    ];
  }, [currentCareer]);

  return (
    <div className="app-shell">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-symbol">c.</div>
          <div>
            <h2>
              campus<span>ai</span>
            </h2>
            <p>ACADEMIC LEARNING PLATFORM</p>
          </div>
        </div>

        <p className="workspace-label">ACADEMIC WORKSPACE</p>

        <nav className="nav-list">
          {[
            { name: "Overview", icon: "⌂" },
            { name: "Career Paths", icon: "🧭" },
            { name: "Study Hub", icon: "📚" },
            { name: "AI Assistant", icon: "✳" },
            { name: "My Notes", icon: "▤" },
            { name: "Quiz Lab", icon: "◎" },
          ].map((item) => (
            <button
              key={item.name}
              className={`nav-item ${active === item.name ? "active" : ""}`}
              onClick={() => openPage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
              {active === item.name && <span className="active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {/* Active Degree Card */}
          <div
            className="sidebar-course-card"
            onClick={() => setIsProfileModalOpen(true)}
            title="Click to switch your university degree or career path"
          >
            <div className="sidebar-course-header">
              <span className="sidebar-course-icon">{currentDegreeProgram.icon}</span>
              <div className="sidebar-course-info">
                <div className="sidebar-course-tag">ENROLLED COURSE</div>
                <div className="sidebar-course-title">{currentDegreeProgram.shortName}</div>
              </div>
            </div>
            <div className="sidebar-course-progress-bar">
              <div
                className="sidebar-course-progress-fill"
                style={{ width: `${degreeProgress}%` }}
              />
            </div>
            <div className="sidebar-course-stats">
              <span>{degreeCompletedCount}/{degreeModuleIds.length} Modules</span>
              <strong>{degreeProgress}%</strong>
            </div>
          </div>

          {/* Student Profile Card */}
          <div
            className="profile-card"
            onClick={() => {
              setProfileForm(student);
              setIsProfileModalOpen(true);
            }}
            title="Click to view & edit your student profile"
          >
            <div className="profile-avatar">{student.avatar}</div>
            <div className="profile-info">
              <strong>{student.name}</strong>
              <span>Class of {student.gradYear} · {currentDegreeProgram.shortName}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="main-content">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span>{" "}
            <span className="breadcrumb-current">
              {selectedSubjectId && currentSubject
                ? `${active} / ${currentSubject.title}`
                : active}
            </span>
          </div>

          <div className="topbar-actions">
            {/* Direct Instant Course Switcher Dropdown */}
            <div className="course-switcher-pill" title="Switch your active course anytime">
              <span className="course-switcher-label">COURSE:</span>
              <select
                className="course-switcher-select"
                value={currentDegreeProgram.id}
                onChange={(e) => handleSelectDegree(e.target.value)}
                aria-label="Active Academic Course"
              >
                {DEGREE_PROGRAMS.map((dp) => (
                  <option key={dp.id} value={dp.id}>
                    {dp.icon} {dp.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="streak-badge" title="Daily Academic Streak">
              🔥 {student.streakDays} Day Streak
            </div>
            <div className="xp-badge" title="Knowledge XP Score">
              ⚡ {student.quizScore} XP
            </div>
          </div>
        </header>

        {/* =========================================================================
            PAGE: OVERVIEW
            ========================================================================= */}
        {active === "Overview" && (
          <div className="page-container">
            <div className="eyebrow">
              <span className="eyebrow-line" /> {currentDegreeProgram.shortName.toUpperCase()} · PERSONAL LEARNING SPACE
            </div>

            {/* HERO BANNER */}
            <section className="overview-hero">
              <div className="hero-main">
                <h1>
                  Welcome back, <span>{student.name}</span>.
                </h1>
                <p className="hero-subtitle">
                  Enrolled in <strong>{currentDegreeProgram.title}</strong>. Your dashboard, subjects, and study materials are strictly personalized to <strong>{currentDegreeProgram.shortName}</strong>.
                </p>

                {/* Quick AI Search/Ask */}
                <form className="hero-quick-prompt" onSubmit={handleFormSubmit}>
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={`Ask Campus AI anything about ${currentDegreeProgram.shortName}...`}
                  />
                  <button type="submit">Ask AI ↗</button>
                </form>
              </div>
            </section>

            {/* STATS ROW */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon teal">🎯</div>
                <div className="stat-data">
                  <h3>{degreeProgress}%</h3>
                  <p>{currentDegreeProgram.shortName} Progress</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon cyan">📖</div>
                <div className="stat-data">
                  <h3>{degreeCompletedCount} / {degreeModuleIds.length}</h3>
                  <p>Modules Mastered</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon amber">⚡</div>
                <div className="stat-data">
                  <h3>{student.quizScore} XP</h3>
                  <p>Knowledge XP Score</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon indigo">📝</div>
                <div className="stat-data">
                  <h3>{notes.length}</h3>
                  <p>Study Notes Saved</p>
                </div>
              </div>
            </div>

            {/* ACTIVE CAREER TRACK BANNER */}
            <div className="active-track-banner">
              <div className="track-banner-info">
                <div className="track-banner-icon">{currentCareer.icon}</div>
                <div className="track-banner-text">
                  <div className="track-banner-tag">{currentDegreeProgram.shortName} Track</div>
                  <h3>{currentCareer.title}</h3>
                  <p>{currentCareer.tagline}</p>
                </div>
              </div>

              <div className="track-progress-block">
                <div className="progress-labels">
                  <span>Curriculum Progress</span>
                  <strong>{degreeProgress}%</strong>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${degreeProgress}%` }}
                  />
                </div>
              </div>

              <button
                className="notes-add-button"
                onClick={() => openPage("Study Hub")}
              >
                Continue Curriculum ↗
              </button>
            </div>

            {/* RECOMMENDED SUBJECTS FOR ACTIVE CAREER */}
            <div className="section-header">
              <div>
                <h2>Core Subjects in {currentDegreeProgram.shortName}</h2>
                <p>Showing foundational & specialized subjects for your {currentDegreeProgram.title} program.</p>
              </div>
              <button
                className="view-all-link"
                onClick={() => openPage("Study Hub")}
              >
                Browse all {degreeSubjects.length} subjects ↗
              </button>
            </div>

            <div className="subjects-grid">
              {degreeSubjects
                .slice(0, 3)
                .map((subject) => {
                  const completedInSubject = subject.modules.filter((m) =>
                    student.completedModules.includes(m.id)
                  ).length;
                  return (
                    <article
                      key={subject.id}
                      className="subject-card"
                      onClick={() => openSubjectDetail(subject.id)}
                    >
                      <div className="subject-card-top">
                        <span className="subject-icon">{subject.icon}</span>
                        <span className="subject-category-badge">
                          {subject.category}
                        </span>
                      </div>
                      <h3>{subject.title}</h3>
                      <p className="subject-desc">{subject.description}</p>
                      <div className="subject-card-footer">
                        <span>
                          {completedInSubject}/{subject.modules.length} Modules Done
                        </span>
                        <span className="subject-action-arrow">Study ↗</span>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE: CAREER PATHS
            ========================================================================= */}
        {active === "Career Paths" && (
          <div className="page-container">
            <div className="eyebrow">
              <span className="eyebrow-line" /> {currentDegreeProgram.shortName.toUpperCase()} · SPECIALIZED CAREER TRACKS
            </div>
            <div className="section-header">
              <div>
                <h2>{currentDegreeProgram.shortName} Career Tracks</h2>
                <p>
                  Specialized career specializations and industry roles aligned with your <strong>{currentDegreeProgram.title}</strong> curriculum.
                </p>
              </div>

              <button
                className="filter-pill"
                onClick={() => setShowAllCareerTracks((prev) => !prev)}
                style={{ alignSelf: "flex-start" }}
              >
                {showAllCareerTracks ? "← Show Only My Program" : "Browse All Programs ↗"}
              </button>
            </div>

            <div className="career-tracks-grid">
              {CAREER_PATHS.filter((track) => {
                if (showAllCareerTracks) return true;
                return track.degreeId === currentDegreeProgram.id;
              }).map((track) => {
                const isActive = student.careerPath === track.id;
                return (
                  <div
                    key={track.id}
                    className={`career-card ${isActive ? "active-career" : ""}`}
                  >
                    <div className="career-card-top">
                      <div className="career-card-icon">{track.icon}</div>
                      <span className="career-badge">{track.badge}</span>
                    </div>

                    <h3>{track.title}</h3>
                    <p className="career-tagline">{track.tagline}</p>

                    <div className="career-target-roles">
                      <div className="target-roles-label">Target Positions & Careers</div>
                      <div className="role-tags">
                        {track.targetRoles.map((role) => (
                          <span key={role} className="role-tag">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="career-card-footer">
                      <span className="career-duration">
                        ⏱ {track.estimatedMonths}
                      </span>
                      <button
                        className={`select-track-btn ${
                          isActive ? "is-active" : "not-active"
                        }`}
                        onClick={() => {
                          if (!isActive) {
                            selectCareerTrack(track);
                          }
                        }}
                      >
                        {isActive ? "✓ Active Path" : "Select Career Path"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE: STUDY HUB & SUBJECT DETAILS
            ========================================================================= */}
        {active === "Study Hub" && (
          <div className="page-container">
            {!selectedSubjectId ? (
              <>
                <div className="eyebrow">
                  <span className="eyebrow-line" /> {currentDegreeProgram.shortName.toUpperCase()} · CURRICULUM & SELF-STUDY
                </div>
                <div className="section-header">
                  <div>
                    <h2>{currentDegreeProgram.title}</h2>
                    <p>
                      Showing exclusively all {degreeSubjects.length} subjects for your {currentDegreeProgram.shortName} program. Check off modules (+25 XP), consult AI, and take practice quizzes (+50 XP).
                    </p>
                  </div>
                </div>

                {/* Active Degree Banner */}
                <div className="degree-banner-study">
                  <div className="degree-banner-left">
                    <div className="degree-banner-icon">
                      {currentDegreeProgram.icon}
                    </div>
                    <div>
                      <h3 className="degree-banner-title">
                        {currentDegreeProgram.title}
                      </h3>
                      <p className="degree-banner-meta">
                        <span>⏱ {currentDegreeProgram.years}</span>
                        <span>•</span>
                        <span>{degreeSubjects.length} Curriculum Subjects</span>
                        <span>•</span>
                        <span>{degreeCompletedCount}/{degreeModuleIds.length} Modules Done ({degreeProgress}%)</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="degree-enrolled-pill">
                      ✓ Active Course
                    </span>
                  </div>
                </div>

                {/* Stage Filters (When a Degree is Active) */}
                {currentDegreeProgram.stages && (
                  <div className="stage-pills-bar">
                    <span className="stage-pills-label">ACADEMIC STAGES:</span>
                    {currentDegreeProgram.stages.map((stage) => (
                      <button
                        key={stage}
                        className={`stage-pill ${
                          selectedStageFilter === stage ? "active" : ""
                        }`}
                        onClick={() => setSelectedStageFilter(stage)}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search & Results Toolbar */}
                <div className="study-hub-toolbar">
                  <div className="study-search-box">
                    <span className="study-search-icon">🔍</span>
                    <input
                      type="text"
                      className="study-search-input"
                      placeholder="Search subjects, topics, or modules (e.g., Anatomy, Torts, Valuation, React, CBT)..."
                      value={subjectSearch}
                      onChange={(e) => setSubjectSearch(e.target.value)}
                    />
                    {subjectSearch && (
                      <button
                        className="study-search-clear"
                        onClick={() => setSubjectSearch("")}
                        title="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <span className="study-results-count">
                    Showing {filteredSubjects.length} of {degreeSubjects.length} {currentDegreeProgram.shortName} subjects
                  </span>
                </div>

                {/* Subjects Grid */}
                {filteredSubjects.length === 0 ? (
                  <div className="notes-empty-state">
                    <div className="notes-empty-icon">🔍</div>
                    <h2>No subjects found.</h2>
                    <p>
                      No subjects matched &quot;{subjectSearch}&quot; in this stage. Try
                      clearing your search or changing the stage filter.
                    </p>
                    <button
                      className="notes-add-button"
                      onClick={() => {
                        setSubjectSearch("");
                        setSelectedStageFilter("All Stages");
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="subjects-grid">
                    {filteredSubjects.map((subject) => {
                      const completedInSub = subject.modules.filter((m) =>
                        student.completedModules.includes(m.id)
                      ).length;
                      const progressPct = Math.round(
                        (completedInSub / subject.modules.length) * 100
                      );
                      return (
                        <article
                          key={subject.id}
                          className="subject-card"
                          onClick={() => openSubjectDetail(subject.id)}
                        >
                          <div className="subject-card-top">
                            <span className="subject-icon">{subject.icon}</span>
                            <div className="subject-badges">
                              <span className="subject-category-badge">
                                {subject.category}
                              </span>
                              {subject.stage && (
                                <span className="subject-stage-badge">
                                  {subject.stage}
                                </span>
                              )}
                            </div>
                          </div>

                          <h3>{subject.title}</h3>
                          <div style={{ marginBottom: "8px" }}>
                            <span className="subject-level-badge">
                              {subject.level}
                            </span>
                          </div>

                          <p className="subject-desc">{subject.description}</p>

                          <div className="subject-mini-progress">
                            <div className="subject-mini-labels">
                              <span>Module Progress</span>
                              <strong>
                                {completedInSub} / {subject.modules.length} ({progressPct}%)
                              </strong>
                            </div>
                            <div className="subject-mini-bar">
                              <div
                                className="subject-mini-fill"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>

                          <div className="subject-card-footer">
                            <span>
                              ◎ {subject.quiz.length} Quiz (+50 XP)
                            </span>
                            <span className="subject-action-arrow">
                              Open Syllabus ↗
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              /* SUBJECT DETAIL VIEW */
              currentSubject && (
                <div>
                  <button
                    className="back-to-subjects-btn"
                    onClick={() => setSelectedSubjectId(null)}
                  >
                    ← Back to all subjects
                  </button>

                  <div className="subject-detail-header">
                    <div>
                      <div className="eyebrow">
                        <span className="eyebrow-line" /> {currentSubject.category} · {currentSubject.level}
                      </div>
                      <h1 style={{ margin: "0 0 10px", fontSize: "32px", fontWeight: "800" }}>
                        {currentSubject.icon} {currentSubject.title}
                      </h1>
                      <p style={{ margin: 0, color: "var(--text-muted)", maxWidth: "700px", lineHeight: "1.6" }}>
                        {currentSubject.description}
                      </p>
                    </div>

                    <button
                      className="notes-add-button"
                      onClick={() => {
                        sendMessage(`Give me a high-yield academic study breakdown of "${currentSubject.title}" covering key principles, exam pitfalls, and practical scenarios.`);
                      }}
                    >
                      Ask AI Overview ↗
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="subject-tabs">
                    <button
                      className={`subject-tab ${
                        subjectActiveTab === "modules" ? "active" : ""
                      }`}
                      onClick={() => setSubjectActiveTab("modules")}
                    >
                      Curriculum Modules ({currentSubject.modules.length})
                    </button>
                    <button
                      className={`subject-tab ${
                        subjectActiveTab === "quiz" ? "active" : ""
                      }`}
                      onClick={() => setSubjectActiveTab("quiz")}
                    >
                      Practice Assessment ({currentSubject.quiz.length})
                    </button>
                  </div>

                  {/* MODULES LIST */}
                  {subjectActiveTab === "modules" && (
                    <div className="modules-list">
                      {currentSubject.modules.map((mod, idx) => {
                        const isDone = student.completedModules.includes(mod.id);
                        return (
                          <div
                            key={mod.id}
                            className={`module-card ${isDone ? "completed" : ""}`}
                          >
                            <div className="module-card-header">
                              <h4>
                                {idx + 1}. {mod.title}
                              </h4>
                              <span className="module-duration">⏱ {mod.duration}</span>
                            </div>

                            <p className="module-summary">{mod.summary}</p>

                            <div className="module-takeaways">
                              {mod.keyConcepts.map((kc) => (
                                <span key={kc} className="takeaway-tag">
                                  {kc}
                                </span>
                              ))}
                            </div>

                            <div className="module-actions">
                              <button
                                className={`module-complete-toggle ${
                                  isDone ? "is-done" : ""
                                }`}
                                onClick={() => toggleModuleCompletion(mod.id)}
                              >
                                {isDone ? "✓ Completed (+25 XP)" : "◯ Mark Complete"}
                              </button>

                              <div className="module-extra-actions">
                                <button
                                  className="study-ai-btn"
                                  onClick={() => sendMessage(mod.samplePrompt)}
                                >
                                  Study with AI ↗
                                </button>
                                <button
                                  className="take-note-btn"
                                  onClick={() =>
                                    openNewNoteEditor(
                                      currentSubject.category,
                                      mod.title
                                    )
                                  }
                                >
                                  Take Note ✎
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* SUBJECT QUIZ */}
                  {subjectActiveTab === "quiz" && (
                    <div className="quiz-container">
                      {currentSubject.quiz.map((q, qIndex) => {
                        const qKey = `${currentSubject.id}-${qIndex}`;
                        const chosen = quizAnswers[qKey];
                        return (
                          <div key={qKey} className="quiz-card">
                            <div className="quiz-question-header">
                              Question {qIndex + 1} of {currentSubject.quiz.length}
                            </div>
                            <h3>{q.question}</h3>

                            <div className="quiz-options">
                              {q.options.map((opt, optIndex) => {
                                let optClass = "";
                                if (chosen !== undefined) {
                                  if (optIndex === q.correctIndex) {
                                    optClass = "correct";
                                  } else if (chosen === optIndex) {
                                    optClass = "incorrect";
                                  }
                                }
                                return (
                                  <button
                                    key={optIndex}
                                    className={`quiz-option ${optClass}`}
                                    disabled={chosen !== undefined}
                                    onClick={() =>
                                      handleSelectQuizAnswer(
                                        qKey,
                                        optIndex,
                                        q.correctIndex
                                      )
                                    }
                                  >
                                    <span style={{ opacity: 0.6 }}>
                                      {["A", "B", "C", "D"][optIndex]}.
                                    </span>
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {chosen !== undefined && (
                              <div className="quiz-explanation">
                                <strong>
                                  {chosen === q.correctIndex
                                    ? "✓ Correct (+50 XP)!"
                                    : "Incorrect."}
                                </strong>{" "}
                                {q.explanation}
                                <div>
                                  <button
                                    className="quiz-explain-btn"
                                    onClick={() =>
                                      sendMessage(
                                        `In ${currentSubject.title}, please explain in depth why "${q.options[q.correctIndex]}" is the correct answer to: "${q.question}". Also detail why the other options are wrong and what key takeaways to remember.`
                                      )
                                    }
                                  >
                                    Ask AI to Explain This ↗
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* =========================================================================
            PAGE: AI ASSISTANT (CONTEXTUAL STUDY PARTNER)
            ========================================================================= */}
        {active === "AI Assistant" && (
          <div className="page-container">
            <div className="eyebrow">
              <span className="eyebrow-line" /> 24/7 CONTEXTUAL AI ACADEMIC TUTOR
            </div>

            <div className="section-header">
              <div>
                <h2>Campus AI Study Partner</h2>
                <p>
                  Calibrated for <strong>{currentCareer.title}</strong> ({currentCareer.discipline}).
                </p>
              </div>
            </div>

            <div className="chat-panel">
              <div className="chat-panel-header">
                <div className="chat-avatar">✳</div>
                <div>
                  <strong>Campus AI Tutor</strong>
                  <span>Trained across Medicine, Law, Business & Technology</span>
                </div>

                <button
                  className="new-chat-button"
                  onClick={() =>
                    setMessages([
                      {
                        role: "assistant",
                        text: `New chat session started! I am ready to assist with your **${currentCareer.title}** studies. Ask a question, paste clinical case facts, request statutory interpretations, or examine code!`,
                      },
                    ])
                  }
                  disabled={loading}
                >
                  + New Chat
                </button>
              </div>

              <div className="chat-messages">
                {messages.length === 0 ? (
                  <div className="chat-welcome">
                    <div className="welcome-symbol">✳</div>
                    <h2>What are we learning today?</h2>
                    <p>
                      Ask questions, request case study breakdowns, review mnemonics, or solve complex problems.
                    </p>

                    <div className="suggestion-list">
                      {contextualPrompts.map((sugg) => (
                        <button
                          key={sugg}
                          onClick={() => sendMessage(sugg)}
                          disabled={loading}
                        >
                          {sugg} <span>↗</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`message-row ${
                        msg.role === "user" ? "user-row" : "ai-row"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="message-avatar">✳</div>
                      )}
                      <div className="message-bubble">
                        <span className="message-label">
                          {msg.role === "user" ? "YOU" : "CAMPUS AI"}
                        </span>
                        <div className="markdown-content">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {loading && (
                  <div className="message-row ai-row">
                    <div className="message-avatar">✳</div>
                    <div className="message-bubble">
                      <span className="message-label">CAMPUS AI</span>
                      <p className="typing-indicator">
                        Thinking<span>.</span><span>.</span><span>.</span>
                      </p>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <form className="chat-input-form" onSubmit={handleFormSubmit}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleFormSubmit(e);
                    }
                  }}
                  placeholder={`Ask a question or request a study breakdown for ${currentCareer.title}...`}
                  rows={2}
                  disabled={loading}
                />
                <div className="chat-input-footer">
                  <span>✳ Pro tip: Press Enter to send, Shift+Enter for newline</span>
                  <button type="submit" disabled={!question.trim() || loading}>
                    {loading ? "..." : "Send Question ↗"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            PAGE: MY NOTES (SMART STUDY NOTES)
            ========================================================================= */}
        {active === "My Notes" && (
          <div className="page-container">
            <div className="eyebrow">
              <span className="eyebrow-line" /> YOUR ACADEMIC REPOSITORY
            </div>

            <div className="notes-heading">
              <div>
                <h1>Your Study Notes</h1>
                <p className="hero-description">
                  Organize case summaries, medical mnemonics, statutory clauses, and technical code.
                </p>
              </div>

              <button
                className="notes-add-button"
                onClick={() => openNewNoteEditor()}
              >
                + New Note
              </button>
            </div>

            <div className="notes-toolbar">
              <input
                type="search"
                placeholder="Search note titles or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              >
                <option value="All Subjects">All Subjects</option>
                <option value="Medicine (MBBS)">Medicine (MBBS)</option>
                <option value="Law (LLB)">Law (LLB)</option>
                <option value="Business (MBA/BBA)">Business (MBA/BBA)</option>
                <option value="Psychology">Psychology</option>
                <option value="Engineering & AI">Engineering & AI</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {notes.length === 0 ? (
              <div className="notes-empty-state">
                <div className="notes-empty-icon">✎</div>
                <h2>Your notebook is ready.</h2>
                <p>Create your first study note or save takeaways from the Study Hub.</p>
                <button
                  className="notes-add-button"
                  onClick={() => openNewNoteEditor()}
                >
                  + Create First Note
                </button>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="notes-empty-state">
                <div className="notes-empty-icon">🔍</div>
                <h2>No notes match your filter.</h2>
                <p>Try searching for different keywords or clear the category filter.</p>
                <button
                  className="notes-add-button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedSubjectFilter("All Subjects");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="notes-grid">
                {filteredNotes.map((note) => (
                  <article key={note.id} className="note-card">
                    <div className="note-card-top">
                      <span className="note-subject">{note.subject || "Other"}</span>
                      <button
                        className="note-icon-button"
                        title={note.pinned ? "Unpin note" : "Pin note"}
                        onClick={() => togglePinNote(note.id)}
                      >
                        {note.pinned ? "📌 Pinned" : "📍 Pin"}
                      </button>
                    </div>

                    <h3>{note.title}</h3>
                    <div className="note-content markdown-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {note.content}
                      </ReactMarkdown>
                    </div>

                    <div className="note-card-actions">
                      <button onClick={() => openEditNoteEditor(note)}>
                        Edit
                      </button>
                      <button
                        className="note-delete-button"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            PAGE: QUIZ LAB
            ========================================================================= */}
        {active === "Quiz Lab" && (
          <div className="page-container">
            <div className="eyebrow">
              <span className="eyebrow-line" /> {currentDegreeProgram.shortName.toUpperCase()} · ASSESSMENT CHALLENGE
            </div>
            <div className="section-header">
              <div>
                <h2>{currentDegreeProgram.shortName} Quiz Lab</h2>
                <p>
                  Practice assessment questions strictly curated for your <strong>{currentDegreeProgram.title}</strong> curriculum. Earn +50 XP for each correct answer.
                </p>
              </div>
            </div>

            {/* Quiz Stage Filter */}
            {currentDegreeProgram.stages && (
              <div className="filter-pills" style={{ marginBottom: "20px" }}>
                {currentDegreeProgram.stages.map((stage) => (
                  <button
                    key={stage}
                    className={`filter-pill ${
                      quizStageFilter === stage ? "active" : ""
                    }`}
                    onClick={() => setQuizStageFilter(stage)}
                  >
                    {stage === "All Stages"
                      ? `🎯 All ${currentDegreeProgram.shortName} Quizzes`
                      : stage}
                  </button>
                ))}
              </div>
            )}

            <div className="quiz-container">
              {filteredQuizQuestions.map((q) => {
                const qKey = `${q.sId}-${q.qIdx}`;
                const chosen = quizAnswers[qKey];
                return (
                  <div key={qKey} className="quiz-card">
                    <div className="quiz-question-header">
                      {q.subjectTitle}
                    </div>
                    <h3>{q.question}</h3>

                    <div className="quiz-options">
                      {q.options.map((opt, optIndex) => {
                        let optClass = "";
                        if (chosen !== undefined) {
                          if (optIndex === q.correctIndex) {
                            optClass = "correct";
                          } else if (chosen === optIndex) {
                            optClass = "incorrect";
                          }
                        }
                        return (
                          <button
                            key={optIndex}
                            className={`quiz-option ${optClass}`}
                            disabled={chosen !== undefined}
                            onClick={() =>
                              handleSelectQuizAnswer(
                                qKey,
                                optIndex,
                                q.correctIndex
                              )
                            }
                          >
                            <span style={{ opacity: 0.6 }}>
                              {["A", "B", "C", "D"][optIndex]}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {chosen !== undefined && (
                      <div className="quiz-explanation">
                        <strong>
                          {chosen === q.correctIndex
                            ? "✓ Correct (+50 XP)!"
                            : "Incorrect."}
                        </strong>{" "}
                        {q.explanation}
                        <div>
                          <button
                            className="quiz-explain-btn"
                            onClick={() =>
                              sendMessage(
                                `In ${q.subjectTitle}, please explain why the correct answer to "${q.question}" is "${q.options[q.correctIndex]}". Detail the reasoning and relevant clinical, legal, or technical insights.`
                              )
                            }
                          >
                            Ask AI to Explain This ↗
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          NOTE EDITOR MODAL
          ========================================================================= */}
      {isNoteEditorOpen && (
        <div
          className="note-modal-overlay"
          onClick={() => setIsNoteEditorOpen(false)}
        >
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="note-modal-header">
              <h2>{editingNoteId !== null ? "Edit Study Note" : "Create Study Note"}</h2>
              <button
                className="note-modal-close"
                onClick={() => setIsNoteEditorOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="note-form">
              <div className="note-form-group">
                <label>Note Title</label>
                <input
                  type="text"
                  placeholder="e.g. Wiggers Diagram Pressures, Mens Rea Cases..."
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
              </div>

              <div className="note-form-group">
                <label>Academic Domain</label>
                <select
                  value={noteSubject}
                  onChange={(e) => setNoteSubject(e.target.value)}
                >
                  <option value="Medicine (MBBS)">Medicine (MBBS)</option>
                  <option value="Law (LLB)">Law (LLB)</option>
                  <option value="Business (MBA/BBA)">Business (MBA/BBA)</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Engineering & AI">Engineering & AI</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="note-form-group">
                <div className="note-content-header">
                  <label>Content (Markdown Supported)</label>
                  <button
                    type="button"
                    className="note-preview-toggle"
                    onClick={() => setShowMarkdownPreview((prev) => !prev)}
                  >
                    {showMarkdownPreview ? "✎ Edit Content" : "👁 Markdown Preview"}
                  </button>
                </div>

                {showMarkdownPreview ? (
                  <div className="note-markdown-preview markdown-content">
                    {noteContent.trim() ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {noteContent}
                      </ReactMarkdown>
                    ) : (
                      <p className="preview-empty">Nothing to preview yet.</p>
                    )}
                  </div>
                ) : (
                  <textarea
                    rows={8}
                    placeholder="Write key clinical findings, statutory citations, financial formulas, or algorithms..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                  />
                )}
              </div>

              <div className="note-modal-actions">
                <button
                  type="button"
                  className="note-cancel-button"
                  onClick={() => setIsNoteEditorOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="notes-add-button"
                  onClick={handleSaveNote}
                >
                  {editingNoteId !== null ? "Save Changes" : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          STUDENT PROFILE & ONBOARDING MODAL
          ========================================================================= */}
      {isProfileModalOpen && (
        <div
          className="note-modal-overlay"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="note-modal-header">
              <h2>Student Degree & Profile Settings</h2>
              <button
                className="note-modal-close"
                onClick={() => setIsProfileModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="note-form">
              <div className="note-form-group">
                <label>Student Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                />
              </div>

              <div className="note-form-group">
                <label>Email / Campus Handle</label>
                <input
                  type="text"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                />
              </div>

              <div className="note-form-group">
                <label>Enrolled Degree Program</label>
                <select
                  value={profileForm.degreeId || selectedDegreeId}
                  onChange={(e) => {
                    const newProg = DEGREE_PROGRAMS.find((p) => p.id === e.target.value);
                    if (!newProg) return;
                    const newCareer =
                      CAREER_PATHS.find((cp) => cp.id === newProg.defaultCareer) ||
                      CAREER_PATHS.find((cp) => cp.degreeId === newProg.id) ||
                      CAREER_PATHS[0];

                    setProfileForm({
                      ...profileForm,
                      degreeId: newProg.id,
                      degree: newProg.title,
                      avatar: newProg.icon,
                      careerPath: newCareer.id,
                    });
                  }}
                >
                  {DEGREE_PROGRAMS.map((dp) => (
                    <option key={dp.id} value={dp.id}>
                      {dp.icon} {dp.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="note-form-group">
                <label>Specialized Career Path</label>
                <select
                  value={profileForm.careerPath}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, careerPath: e.target.value })
                  }
                >
                  {CAREER_PATHS.filter((cp) =>
                    profileForm.degreeId
                      ? cp.degreeId === profileForm.degreeId
                      : cp.degreeId === selectedDegreeId
                  ).map((cp) => (
                    <option key={cp.id} value={cp.id}>
                      {cp.icon} {cp.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="note-form-group">
                <label>Target Graduation Year</label>
                <input
                  type="text"
                  value={profileForm.gradYear}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, gradYear: e.target.value })
                  }
                />
              </div>

              <div className="note-modal-actions">
                <button
                  type="button"
                  className="note-cancel-button"
                  onClick={() => setIsProfileModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="notes-add-button"
                  onClick={() => {
                    saveStudent(profileForm);
                    if (profileForm.degreeId) {
                      handleSelectDegree(profileForm.degreeId);
                    }
                    setIsProfileModalOpen(false);
                  }}
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
