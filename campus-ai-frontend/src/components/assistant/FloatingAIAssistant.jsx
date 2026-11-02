import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function FloatingAIAssistant({
  isOpen,
  onToggle,
  student,
  currentDegreeProgram,
  currentCareer,
  messages,
  onSendMessage,
  loading,
  onSaveToNotes,
  onNewChat,
  onOpenFullPage,
}) {
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'quick'
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, loading]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputText.trim() || loading) return;
    onSendMessage(inputText.trim());
    setInputText("");
  }

  // High-yield contextual prompt suggestions based on degree
  const suggestions =
    currentDegreeProgram.id === "mbbs"
      ? [
          "Explain Clavicle Neurovascular Triad & Fracture Danger",
          "What is the nutrient foramen rule in long bones?",
          "Differentiate Upper vs Lower Motor Neuron facial palsy",
          "Draft 7-day high-retention Gross Anatomy study plan",
        ]
      : currentDegreeProgram.id === "btech-cs"
      ? [
          "Explain Self-Attention mechanism & KV Cache in Transformers",
          "Compare QuickSort vs MergeSort asymptotic complexity",
          "Explain deadlock conditions and prevention algorithms",
          "Generate 7-day full-stack system design timetable",
        ]
      : currentDegreeProgram.id === "llb"
      ? [
          "Explain Basic Structure Doctrine with Kesavananda Bharati",
          "Analyze mens rea vs actus reus in Indian Penal Jurisprudence",
          "Draft IRAC brief for Article 21 Right to Privacy",
        ]
      : currentDegreeProgram.id === "mba"
      ? [
          "Formulate DCF valuation and WACC computation steps",
          "Explain Porter's Five Forces for fintech disruption",
          "Analyze Unit Economics: LTV to CAC ratio benchmarks",
        ]
      : [
          "Explain synaptic long-term potentiation (LTP)",
          "Compare CBT vs Psychodynamic therapy mechanisms",
          "Analyze DSM-5 diagnostic criteria for Major Depression",
        ];

  return (
    <aside className="floating-assistant-container" aria-label="Campus AI Floating Assistant">
      {/* 1. FLOATING LAUNCHER BUTTON (ALWAYS VISIBLE IN LOWER RIGHT CORNER) */}
      {!isOpen && (
        <button
          type="button"
          className="floating-assistant-launcher"
          onClick={onToggle}
          title={`Open Campus AI Tutor (Calibrated for ${currentDegreeProgram.shortName})`}
          aria-label="Open AI Assistant"
        >
          <div className="launcher-glow" />
          <div className="launcher-icon">✳</div>
          <div className="launcher-content">
            <span className="launcher-title">Campus AI</span>
            <span className="launcher-badge">{currentDegreeProgram.icon} {currentDegreeProgram.shortName}</span>
          </div>
          <span className="launcher-status-dot" />
        </button>
      )}

      {/* 2. EXPANDED FLOATING AI ASSISTANT DRAWER */}
      {isOpen && (
        <div className="floating-assistant-window" role="dialog" aria-modal="false">
          {/* WINDOW HEADER */}
          <div className="floating-window-header">
            <div className="window-header-info">
              <div className="window-avatar-badge">
                <span className="window-icon">✳</span>
                <span className="window-live-dot" />
              </div>
              <div className="window-titles">
                <div className="window-main-title">
                  <strong>Campus AI Tutor</strong>
                  <span className="window-degree-tag">
                    {currentDegreeProgram.icon} {currentDegreeProgram.shortName}
                  </span>
                </div>
                <span className="window-subtitle">
                  Calibrated for {currentCareer.title}
                </span>
              </div>
            </div>

            <div className="window-actions">
              <button
                type="button"
                className="window-action-btn"
                onClick={onNewChat}
                title="Start New Chat Session"
              >
                + New
              </button>
              {onOpenFullPage && (
                <button
                  type="button"
                  className="window-action-btn"
                  onClick={onOpenFullPage}
                  title="Expand to Full Page Workspace"
                >
                  ⛶
                </button>
              )}
              <button
                type="button"
                className="window-action-btn minimize"
                onClick={onToggle}
                title="Minimize AI Assistant"
                aria-label="Minimize AI Assistant"
              >
                −
              </button>
            </div>
          </div>

          {/* QUICK TOPIC CHIPS STRIP */}
          <div className="floating-window-tabs">
            <button
              type="button"
              className={`floating-tab-pill ${activeTab === "chat" ? "active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              💬 Conversation
            </button>
            <button
              type="button"
              className={`floating-tab-pill ${activeTab === "quick" ? "active" : ""}`}
              onClick={() => setActiveTab("quick")}
            >
              ⚡ High-Yield Prompts ({suggestions.length})
            </button>
          </div>

          {/* TAB 1: QUICK PROMPTS DIRECTORY */}
          {activeTab === "quick" && (
            <div className="floating-quick-prompts-tray">
              <div className="quick-prompts-label">Tap any high-yield topic to ask Campus AI immediately:</div>
              <div className="quick-prompts-grid">
                {suggestions.map((sugg) => (
                  <button
                    key={sugg}
                    type="button"
                    className="floating-quick-prompt-chip"
                    onClick={() => {
                      onSendMessage(sugg);
                      setActiveTab("chat");
                    }}
                    disabled={loading}
                  >
                    <span>{sugg}</span>
                    <span className="chip-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CHAT MESSAGES STREAM */}
          {activeTab === "chat" && (
            <div className="floating-chat-stream">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={index}
                    className={`floating-message-row ${isUser ? "user" : "assistant"}`}
                  >
                    {!isUser && <div className="floating-msg-avatar">✳</div>}
                    <div className="floating-msg-bubble">
                      <div className="floating-msg-header">
                        <span className="floating-msg-author">
                          {isUser ? student.name : "CAMPUS AI"}
                        </span>
                        {!isUser && onSaveToNotes && (
                          <button
                            type="button"
                            className="floating-save-note-btn"
                            onClick={() =>
                              onSaveToNotes(
                                `AI Tutor: ${currentCareer.title} Review`,
                                msg.text,
                                currentDegreeProgram.shortName
                              )
                            }
                            title="Save this response to My Notes"
                          >
                            📝 Save to Notes
                          </button>
                        )}
                      </div>

                      <div className="floating-msg-text markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="floating-message-row assistant">
                  <div className="floating-msg-avatar">✳</div>
                  <div className="floating-msg-bubble loading">
                    <span className="floating-msg-author">CAMPUS AI</span>
                    <div className="floating-typing-dots">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}

          {/* WINDOW INPUT FORM */}
          <form className="floating-window-input-box" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder={`Ask AI about ${currentDegreeProgram.shortName}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="floating-send-btn"
              disabled={!inputText.trim() || loading}
              aria-label="Send message to Campus AI"
            >
              {loading ? "..." : "↗"}
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
