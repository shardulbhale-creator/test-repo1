import { useState } from "react";

const MOOT_CASES = [
  {
    id: "case-speech",
    title: "State of Maharashtra v. Digital Freedom Forum",
    doctrine: "Constitutional Law · Freedom of Speech vs Public Order",
    statutes: ["Article 19(1)(a)", "Article 19(2)", "IT Act Sec 66A / BNS"],
    facts:
      "A student journalist published an investigative satirical thread criticizing municipal health response during a disease outbreak. Police invoked Section 153A (promoting enmity) and public order curbs, arresting the journalist. The journalist petitions the Supreme Court under Article 32, alleging chilling of free speech and lack of proximate nexus to public disorder.",
    issues: [
      "Whether executive curbs on digital journalism violate the fundamental right to freedom of speech under Art 19(1)(a)?",
      "Whether criticism of state policy can be deemed a threat to 'Public Order' under Art 19(2) without proof of imminent incitement (Clear and Present Danger test)?",
    ],
    petitionerArguments: [
      "Speech cannot be criminalized merely because it causes political discomfort or embarrassment to the administration.",
      "Under Shreya Singhal (2015), the Supreme Court held that discussion or advocacy, however unpalatable, cannot be curbed unless it amounts to imminent incitement.",
      "The 'Spark in a Powder Keg' test demands direct causation between the speech and physical violence, which is completely absent here.",
    ],
    respondentArguments: [
      "Article 19(2) empowers the State to impose reasonable restrictions to safeguard public tranquility during emergencies.",
      "Disinformation and unverified claims during an epidemic can trigger mass panic and stampede at medical centers, satisfying the proximate nexus requirement.",
      "State sovereignty and public safety override individual unrestrained digital expression.",
    ],
    benchInterrogation:
      "Counsel, distinguish between advocacy and incitement. If a provocative statement does not cause instantaneous breach of peace, on what constitutional basis does the State justify pre-trial detention?",
    judgmentDecree:
      "JUDICIAL DECREE: The Bench holds that free expression is the lifeblood of constitutional democracy. In the absence of direct, proximate incitement to imminent lawless action, executive arrests under the guise of public order are ultra vires Article 19(1)(a). The petition is ALLOWED with costs awarded to the petitioner.",
  },
  {
    id: "case-mensrea",
    title: "State of NCT v. Vikramaditya (Criminal Appeal)",
    doctrine: "Criminal Jurisprudence · Culpable Homicide vs Murder (Mens Rea)",
    statutes: ["IPC Section 299 & 300", "BNS Provisions", "Exception 1 (Grave & Sudden Provocation)"],
    facts:
      "The accused discovered his business partner embezzling company funds after a heated argument. The victim brandished an abusive threat against the accused's family. In sudden frenzy, the accused struck the victim with a paperweight, causing death. The trial court convicted him under Section 302 (Murder). The defense appeals, pleading Exception 1 to Section 300 (Grave & Sudden Provocation) to reduce the charge to Section 304 Part I.",
    issues: [
      "Whether verbal insults without physical battery can constitute 'Grave and Sudden Provocation' under Exception 1 to Section 300?",
      "Whether the lapse of cooling time negated the suddenness of the impulse, proving deliberate premeditation (Mens Rea)?",
    ],
    petitionerArguments: [
      "The strike was delivered with lethal force to a vital organ (cranium), establishing intention to cause bodily injury sufficient in ordinary course of nature to cause death.",
      "Mere verbal altercation does not satisfy the threshold of grave provocation to justify homicide; cooling time was sufficient to regain composure.",
    ],
    respondentArguments: [
      "Under KM Nanavati v. State of Maharashtra, provocation must be tested against what a reasonable person of the same social background would experience.",
      "The accused had no pre-existing weapon, did not bring an instrument of death, and acted instantaneously on impulse without premeditation.",
    ],
    benchInterrogation:
      "Counsel for the Defense, how do you satisfy the 'cooling time' test? If the altercation spanned over 40 minutes, can provocation remain 'sudden' under settled Indian jurisprudence?",
    judgmentDecree:
      "JUDICIAL DECREE: The High Court finds that while the provocation was grave, it ceased to be sudden due to the sustained heated exchange. However, lack of premeditated malice converts the offense from Section 302 to Section 304 Part I (Culpable Homicide not amounting to Murder). Sentence modified to 10 years rigorous imprisonment.",
  },
  {
    id: "case-contract",
    title: "Apex Tech Corp v. Global Telecom Infrastructure",
    doctrine: "Corporate & Contract Law · Liquidated Damages vs Penalty Clause",
    statutes: ["Indian Contract Act Sec 73 & 74", "Specific Relief Act Sec 14"],
    facts:
      "Apex contracted Global to deploy 5G optic fiber towers with a strict milestone completion date. A 30-day delay occurred. Apex invoked Clause 14.2, deducting a flat $25,000,000 as pre-estimated liquidated damages without producing actual audited balance-sheet proof of commercial loss.",
    issues: [
      "Whether Section 74 of the Contract Act dispenses with the evidentiary burden of proving actual loss when genuine pre-estimate damages are stipulated?",
      "Whether Clause 14.2 operates in terrorem as an unenforceable penalty?",
    ],
    petitionerArguments: [
      "Under Kailash Nath Associates v. DDA (2015), proof of actual loss is mandatory unless it is impossible to evaluate damages in exact figures.",
      "The flat sum of $25M bears no mathematical proportion to the 30-day delay and amounts to an extortionate penalty clause.",
    ],
    respondentArguments: [
      "Under ONGC v. Saw Pipes (2003), where parties agree upon a genuine pre-estimate of loss for complex infrastructure delays, the court must award stipulated damages without insisting on exact proof.",
      "Commercial contracts negotiated between sophisticated corporations must be held strictly to their bargain.",
    ],
    benchInterrogation:
      "Counsel, if the claimant suffered no loss because third-party telecom traffic was successfully rerouted, does awarding $25,000,000 constitute unjust enrichment under equitable estoppel?",
    judgmentDecree:
      "JUDICIAL DECREE: Arbitral Award set aside in part. Following Kailash Nath, Section 74 permits reasonable compensation up to the stipulated ceiling, but does not grant a windfall where no legal injury is established. Remanded for nominal damages computation.",
  },
];

export default function MootCourtLab({ onAwardXp, onSaveNote }) {
  const [selectedCase, setSelectedCase] = useState(MOOT_CASES[0]);
  const [selectedRole, setSelectedRole] = useState("petitioner"); // 'petitioner' | 'respondent' | 'judge'
  const [currentRound, setCurrentRound] = useState(1); // 1: Jurisdiction, 2: Arguments, 3: Grilling & Ruling
  const [customOralArgument, setCustomOralArgument] = useState("");
  const [benchScore, setBenchScore] = useState(null);
  const [isDebating, setIsDebating] = useState(false);

  function handleDeliverArgument() {
    setIsDebating(true);
    setTimeout(() => {
      setIsDebating(false);
      setCurrentRound(3);
      setBenchScore({
        persuasion: 92,
        statutoryAccuracy: 96,
        precedentsUsed: 88,
        overallRating: "Outstanding Oral Advocacy (First Class Honours)",
      });
      if (onAwardXp) onAwardXp(120);
    }, 1100);
  }

  function handleResetDebate() {
    setCurrentRound(1);
    setBenchScore(null);
    setCustomOralArgument("");
  }

  return (
    <div className="lab-page-container">
      {/* HEADER BANNER */}
      <div className="lab-header-banner llb-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">⚖️</div>
          <div>
            <div className="lab-eyebrow">LLB JURISPRUDENTIAL & MOOT COURT SUITE</div>
            <h2>Constitutional Moot Court & Appellate Debate Arena</h2>
            <p>
              Argue landmark constitutional, criminal, and commercial cases before an active judicial bench. Refine your oral advocacy, statutory deconstruction, and IRAC jurisprudence.
            </p>
          </div>
        </div>

        {/* ROLE PICKER */}
        <div className="lab-nav-pills">
          <button
            type="button"
            className={`lab-nav-pill ${selectedRole === "petitioner" ? "active" : ""}`}
            onClick={() => setSelectedRole("petitioner")}
          >
            👨‍⚖️ Petitioner Counsel
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${selectedRole === "respondent" ? "active" : ""}`}
            onClick={() => setSelectedRole("respondent")}
          >
            👩‍⚖️ Respondent Counsel
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${selectedRole === "judge" ? "active" : ""}`}
            onClick={() => setSelectedRole("judge")}
          >
            🧑‍⚖️ Presiding Justice
          </button>
        </div>
      </div>

      <div className="lab-workspace-grid">
        {/* LEFT COLUMN: CASE SELECTION & BRIEFS */}
        <div className="lab-problem-column">
          <div className="lab-card">
            <div className="lab-card-title">
              <span>📜</span> Landmark Moot Court Dossiers
            </div>
            <div className="lab-problem-selector">
              {MOOT_CASES.map((cs) => (
                <button
                  key={cs.id}
                  type="button"
                  className={`problem-chip ${selectedCase.id === cs.id ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCase(cs);
                    handleResetDebate();
                  }}
                >
                  <span className="diff-tag law">Moot Case</span>
                  <strong>{cs.title}</strong>
                </button>
              ))}
            </div>

            {/* CASE SUMMARY CARD */}
            <div className="problem-description-box">
              <div className="prob-category-pill">{selectedCase.doctrine}</div>
              <h3>{selectedCase.title}</h3>

              <div className="statute-tags-row">
                {selectedCase.statutes.map((st) => (
                  <span key={st} className="statute-tag">§ {st}</span>
                ))}
              </div>

              <div className="case-facts-box">
                <h4>📋 Factual Matrix:</h4>
                <p>{selectedCase.facts}</p>
              </div>

              <div className="case-issues-box">
                <h4>⚖️ Issues Framed for Determination:</h4>
                <ol>
                  {selectedCase.issues.map((iss, i) => (
                    <li key={i}>{iss}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: COURTROOM BENCH & ORAL ARGUMENT ARENA */}
        <div className="lab-editor-column">
          <div className="courtroom-card">
            <div className="courtroom-header">
              <div className="courtroom-bench-title">
                <span>🏛️</span> SUPREME COURT OF INDIA · CONSTITUTION BENCH
              </div>
              <div className="round-indicator">
                Round {currentRound} of 3 · Role: <strong>{selectedRole.toUpperCase()}</strong>
              </div>
            </div>

            {/* ROUND 1: PREPARATION & STATEMENT OF ARGUMENTS */}
            {currentRound === 1 && (
              <div className="court-stage-content">
                <div className="bench-advisory">
                  <strong>Bench Calling:</strong> <em>"Counsels are requested to stand and place their principal statutory arguments before the Bench."</em>
                </div>

                <div className="arguments-preset-box">
                  <h4>Recommended Submissions for {selectedRole === "petitioner" ? "Petitioner" : "Respondent"}:</h4>
                  <ul>
                    {(selectedRole === "petitioner"
                      ? selectedCase.petitionerArguments
                      : selectedCase.respondentArguments
                    ).map((arg, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          className="argument-pill-btn"
                          onClick={() => setCustomOralArgument(arg)}
                        >
                          + Adopt Submission: "{arg}"
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="oral-speech-editor">
                  <label>Advocate's Oral Submission & Legal Citations:</label>
                  <textarea
                    rows={6}
                    value={customOralArgument}
                    onChange={(e) => setCustomOralArgument(e.target.value)}
                    placeholder="May it please the Court, my respectful submission on behalf of the client rests on the landmark precedent in..."
                  />
                </div>

                <div className="court-actions-bar">
                  <button
                    type="button"
                    className="deliver-argument-btn"
                    onClick={handleDeliverArgument}
                    disabled={isDebating || !customOralArgument.trim()}
                  >
                    {isDebating ? "Delivering Submissions to the Bench..." : "📢 Present Oral Argument to Bench ↗"}
                  </button>
                </div>
              </div>
            )}

            {/* ROUND 3: JUDICIAL GRILLING & BENCH DECREE */}
            {currentRound === 3 && (
              <div className="court-stage-content">
                {/* SOCRATIC QUESTIONING FROM BENCH */}
                <div className="bench-interrogation-card">
                  <div className="bench-judge-avatar">🧑‍⚖️</div>
                  <div className="bench-judge-speech">
                    <span className="judge-name">HON'BLE CHIEF JUSTICE:</span>
                    <p>"{selectedCase.benchInterrogation}"</p>
                  </div>
                </div>

                {/* ADVOCACY EVALUATION SCORECARD */}
                {benchScore && (
                  <div className="advocacy-scorecard">
                    <div className="scorecard-title">🏆 Bench Oral Advocacy Assessment</div>
                    <div className="scorecard-grid">
                      <div className="score-item">
                        <span className="score-num">{benchScore.persuasion}%</span>
                        <span className="score-lbl">Persuasiveness</span>
                      </div>
                      <div className="score-item">
                        <span className="score-num">{benchScore.statutoryAccuracy}%</span>
                        <span className="score-lbl">Statutory Precision</span>
                      </div>
                      <div className="score-item">
                        <span className="score-num">{benchScore.precedentsUsed}%</span>
                        <span className="score-lbl">Precedent Citation</span>
                      </div>
                    </div>
                    <div className="scorecard-rating">{benchScore.overallRating}</div>
                  </div>
                )}

                {/* FINAL JUDICIAL DECREE */}
                <div className="judicial-decree-box">
                  <div className="decree-header">📜 Operative Judicial Order & Ratio Decidendi</div>
                  <p>{selectedCase.judgmentDecree}</p>
                </div>

                <div className="court-actions-bar">
                  <button
                    type="button"
                    className="editor-btn reset"
                    onClick={handleResetDebate}
                  >
                    ↺ Argue Alternative Side
                  </button>
                  <button
                    type="button"
                    className="deliver-argument-btn"
                    onClick={() => {
                      if (onSaveNote) {
                        onSaveNote(
                          `Moot Case Brief: ${selectedCase.title}`,
                          `### ⚖️ Moot Court Brief: ${selectedCase.title}\n\n**Doctrine**: ${selectedCase.doctrine}\n**Statutes**: ${selectedCase.statutes.join(", ")}\n\n#### 📋 Factual Matrix\n${selectedCase.facts}\n\n#### 📜 Arguments Presented\n${customOralArgument}\n\n#### 🏛️ Operative Judicial Decree\n${selectedCase.judgmentDecree}`,
                          "Law (LLB)"
                        );
                      }
                    }}
                  >
                    💾 Save Case Brief to My Notes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
