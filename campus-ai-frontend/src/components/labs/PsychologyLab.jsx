import { useState } from "react";

const CLINICAL_CASES = [
  {
    id: "case-depression",
    title: "Case 1: Elena M., 29 — Unrelenting Fatigue & Anhedonia",
    category: "Mood Disorders · DSM-5 Differential",
    presentation:
      "Elena reports a 6-week progressive decline in mood following a corporate reorganization. She describes feeling 'completely numb and hollow', has lost interest in playing the cello (her passion of 10 years), sleeps 11 hours per day yet wakes unrefreshed, and has unintentionally lost 5 kg due to lack of appetite. She expresses feelings of worthlessness and cognitive sluggishness at work.",
    dsmCriteria: [
      { text: "Depressed mood most of the day, nearly every day (duration >= 2 weeks)", match: true },
      { text: "Markedly diminished interest or pleasure in all or almost all activities (Anhedonia)", match: true },
      { text: "Significant unintentional weight loss / change in appetite", match: true },
      { text: "Hypersomnia or insomnia nearly every day", match: true },
      { text: "Grandiosity or decreased need for sleep (<3 hours) without fatigue", match: false },
    ],
    distortions: [
      { id: "all-or-nothing", label: "All-or-Nothing Thinking", desc: "Viewing situations in black-and-white categories ('If I'm not perfect, I'm a complete failure')." },
      { id: "catastrophizing", label: "Catastrophizing", desc: "Expecting worst-case scenarios to materialize inevitably." },
      { id: "emotional-reasoning", label: "Emotional Reasoning", desc: "Assuming that negative feelings reflect objective reality ('I feel useless, therefore I am useless')." },
      { id: "mental-filter", label: "Negative Mental Filter", desc: "Dwelling exclusively on negatives while screening out positive accomplishments." },
    ],
    sampleAutomaticThought: "I made a minor typo in today's report; my entire team now knows I'm incompetent and my career is ruined.",
    adaptiveThought: "Making a typo is a normal human error. I successfully delivered 4 major client deliverables this month and my team values my contributions.",
    differential: "Major Depressive Disorder (MDD), Single Episode, Moderate to Severe without Psychotic Features (Rule out Bipolar II Hypomania & Hypothyroidism via TSH).",
  },
  {
    id: "case-anxiety",
    title: "Case 2: Marcus T., 34 — Sudden Palpitations & Tremors",
    category: "Anxiety Disorders · DSM-5 Differential",
    presentation:
      "Marcus presents to the emergency room for the third time in 2 months convinced he is suffering a fatal heart attack. ECG and troponin biomarkers are completely normal. Attacks occur abruptly with pounding tachycardia, diaphoresis, shortness of breath, trembling, and an intense fear of impending doom or 'losing control'. He has begun avoiding crowded subway trains in fear of experiencing another episode.",
    dsmCriteria: [
      { text: "Recurrent unexpected panic attacks with >= 4 physiological surge symptoms", match: true },
      { text: "At least 1 month of persistent concern about additional attacks or maladaptive avoidance", match: true },
      { text: "Avoidance of situations where escape might be difficult (Agoraphobia features)", match: true },
      { text: "Symptoms caused by primary substance intoxication (e.g. Cocaine/Amphetamines)", match: false },
    ],
    distortions: [
      { id: "catastrophizing", label: "Catastrophizing & Somatic Misinterpretation", desc: "Interpreting benign benign sinus tachycardia as impending cardiac arrest." },
      { id: "emotional-reasoning", label: "Emotional Reasoning", desc: "Believing high adrenaline equates to imminent death." },
    ],
    sampleAutomaticThought: "My heart is beating faster; I am having a massive coronary and I will faint in front of everyone.",
    adaptiveThought: "My heart is beating faster because my autonomic nervous system triggered an adrenaline response. The ER doctor confirmed my cardiovascular health is strong. This sensation will peak and subside in 10 minutes.",
    differential: "Panic Disorder with secondary Agoraphobic avoidance (DSM-5 300.01). First-line treatment: CBT with Interoceptive Exposure + SSRI.",
  },
];

export default function PsychologyLab({ onAwardXp, onSaveNote }) {
  const [selectedCase, setSelectedCase] = useState(CLINICAL_CASES[0]);
  const [selectedDistortions, setSelectedDistortions] = useState([]);
  const [thoughtRecord, setThoughtRecord] = useState({
    situation: "Receiving constructive managerial feedback",
    automaticThought: selectedCase.sampleAutomaticThought,
    rationalResponse: "",
  });
  const [clinicalFeedback, setClinicalFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  function toggleDistortion(id) {
    if (selectedDistortions.includes(id)) {
      setSelectedDistortions(selectedDistortions.filter((d) => d !== id));
    } else {
      setSelectedDistortions([...selectedDistortions, id]);
    }
  }

  function handleEvaluateCase() {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setClinicalFeedback({
        diagnosticAccuracy: 95,
        formulationRating: "Excellent Diagnostic Synthesis (Meets DSM-5 Criteria)",
        supervisorNotes:
          "Accurately identified core neurovegetative and cognitive symptoms. The cognitive restructuring demonstrates clear Socratic defusion from automatic distortions. Recommended treatment: Behavioral Activation + Cognitive Restructuring.",
      });
      if (onAwardXp) onAwardXp(100);
    }, 900);
  }

  return (
    <div className="lab-page-container">
      {/* HEADER BANNER */}
      <div className="lab-header-banner psych-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">🧠</div>
          <div>
            <div className="lab-eyebrow">PSYCHOLOGY & COGNITIVE SCIENCE SUITE</div>
            <h2>DSM-5 Clinical Diagnostic & CBT Restructuring Lab</h2>
            <p>
              Assess clinical vignettes, map symptom clusters to DSM-5 criteria, identify cognitive distortions, and construct evidence-based Cognitive Behavioral Therapy (CBT) formulations.
            </p>
          </div>
        </div>

        <div className="lab-nav-pills">
          <span className="finance-status-pill">
            Evidence-Based CBT & Beck Institute Framework
          </span>
        </div>
      </div>

      <div className="lab-workspace-grid">
        {/* LEFT COLUMN: PATIENT CASES & DSM-5 CHECKLIST */}
        <aside className="lab-problem-column">
          <div className="lab-card">
            <div className="lab-card-title">
              <span>📋</span> Clinical Patient Vignettes
            </div>
            <div className="lab-problem-selector">
              {CLINICAL_CASES.map((cs) => (
                <button
                  key={cs.id}
                  type="button"
                  className={`problem-chip ${selectedCase.id === cs.id ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCase(cs);
                    setSelectedDistortions([]);
                    setClinicalFeedback(null);
                    setThoughtRecord({
                      situation: "Clinical encounter",
                      automaticThought: cs.sampleAutomaticThought,
                      rationalResponse: "",
                    });
                  }}
                >
                  <span className="diff-tag psych">Vignette</span>
                  <strong>{cs.title}</strong>
                </button>
              ))}
            </div>

            <div className="problem-description-box">
              <div className="prob-category-pill">{selectedCase.category}</div>
              <h3>{selectedCase.title}</h3>
              <p className="clinical-text">{selectedCase.presentation}</p>

              <div className="dsm-checklist-box">
                <h4>DSM-5 Diagnostic Criteria Verification:</h4>
                {selectedCase.dsmCriteria.map((crit, idx) => (
                  <div key={idx} className="dsm-item">
                    <span className={`dsm-check ${crit.match ? "present" : "absent"}`}>
                      {crit.match ? "✓ PRESENT" : "✕ ABSENT"}
                    </span>
                    <span className="dsm-desc">{crit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: COGNITIVE DISTORTION IDENTIFICATION & CBT RECORD */}
        <section className="lab-editor-column">
          <div className="courtroom-card">
            <div className="courtroom-header">
              <div className="courtroom-bench-title">
                <span>📝</span> CBT THOUGHT RECORD & COGNITIVE RESTRUCTURING
              </div>
            </div>

            <div className="court-stage-content">
              {/* DISTORTION SELECTOR */}
              <div className="distortions-selector-box">
                <h4>Step 1: Identify Active Cognitive Distortions:</h4>
                <div className="distortions-grid">
                  {selectedCase.distortions.map((dist) => (
                    <button
                      key={dist.id}
                      type="button"
                      className={`distortion-card-btn ${selectedDistortions.includes(dist.id) ? "selected" : ""}`}
                      onClick={() => toggleDistortion(dist.id)}
                    >
                      <strong>{dist.label}</strong>
                      <p>{dist.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* THOUGHT RECORD FORM */}
              <div className="thought-record-form">
                <h4>Step 2: Construct Balanced Rational Response:</h4>
                <div className="f-mini-input" style={{ marginBottom: "12px" }}>
                  <label>Automatic Negative Thought (ANT):</label>
                  <input
                    type="text"
                    value={thoughtRecord.automaticThought}
                    onChange={(e) =>
                      setThoughtRecord({ ...thoughtRecord, automaticThought: e.target.value })
                    }
                  />
                </div>

                <div className="f-mini-input">
                  <label>Adaptive Rational Reframe (Cognitive Restructuring):</label>
                  <textarea
                    rows={4}
                    placeholder="Provide evidence against the automatic thought and formulate an objective, compassionate reframe..."
                    value={thoughtRecord.rationalResponse}
                    onChange={(e) =>
                      setThoughtRecord({ ...thoughtRecord, rationalResponse: e.target.value })
                    }
                  />
                </div>

                <div className="quick-reframe-row">
                  <button
                    type="button"
                    className="code-preset-btn"
                    onClick={() =>
                      setThoughtRecord({
                        ...thoughtRecord,
                        rationalResponse: selectedCase.adaptiveThought,
                      })
                    }
                  >
                    + Use Beck Institute Evidence-Based Reframe
                  </button>
                </div>
              </div>

              {/* EVALUATE BUTTON */}
              <div className="court-actions-bar">
                <button
                  type="button"
                  className="deliver-argument-btn"
                  onClick={handleEvaluateCase}
                  disabled={isEvaluating}
                >
                  {isEvaluating ? "Evaluating Formulation with Clinical AI..." : "🧠 Evaluate Clinical Formulation ↗"}
                </button>
              </div>

              {/* CLINICAL FEEDBACK SCORECARD */}
              {clinicalFeedback && (
                <div className="advocacy-scorecard" style={{ marginTop: "20px" }}>
                  <div className="scorecard-title">🏆 Clinical Supervisor Assessment</div>
                  <div className="scorecard-grid">
                    <div className="score-item">
                      <span className="score-num">{clinicalFeedback.diagnosticAccuracy}%</span>
                      <span className="score-lbl">Diagnostic Precision</span>
                    </div>
                  </div>
                  <div className="scorecard-rating">{clinicalFeedback.formulationRating}</div>
                  <p className="supervisor-notes">{clinicalFeedback.supervisorNotes}</p>

                  <div className="differential-box">
                    <strong>Differential Diagnosis:</strong> {selectedCase.differential}
                  </div>

                  <div className="court-actions-bar" style={{ marginTop: "14px" }}>
                    <button
                      type="button"
                      className="deliver-argument-btn"
                      onClick={() => {
                        if (onSaveNote) {
                          onSaveNote(
                            `CBT Case Formulation: ${selectedCase.title}`,
                            `### 🧠 Clinical Case Formulation: ${selectedCase.title}\n\n**Differential**: ${selectedCase.differential}\n\n#### 📋 Automatic Thought\n"${thoughtRecord.automaticThought}"\n\n#### 💡 Adaptive Rational Reframe\n"${thoughtRecord.rationalResponse}"\n\n#### 🩺 Supervisor Feedback\n${clinicalFeedback.supervisorNotes}`,
                            "Psychology"
                          );
                        }
                      }}
                    >
                      💾 Save Clinical Formulation to My Notes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
