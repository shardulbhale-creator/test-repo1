import { useState, useMemo } from "react";

// Anatomical Database with High-Yield USMLE / NEET-PG Clinical Correlations
const ANATOMICAL_DATA = [
  // --- SKELETAL SYSTEM ---
  {
    id: "bone-cranium",
    name: "Cranium & Facial Skeleton (Skull)",
    latin: "Cranium et Ossa Faciei",
    system: "skeletal",
    category: "Axial Skeleton",
    view: "anterior",
    x: 50,
    y: 8,
    innervation: "Trigeminal Nerve (CN V) sensory; Facial Nerve (CN VII) motor to facial muscles",
    bloodSupply: "Internal & External Carotid Arteries, Middle Meningeal Artery",
    clinicalSummary:
      "Protects the brain and cranial nerves. The Pterion is the thinnest junction on the lateral skull where the frontal, parietal, temporal, and sphenoid bones meet; trauma here risks tearing the Middle Meningeal Artery leading to fatal Epidural Hematoma (lens-shaped biconvex hemorrhage on CT).",
    mnemonic: "Middle Meningeal Artery = 'Epidural Hematoma with Lucid Interval'",
    highYieldExamTip:
      "Look for uncal herniation, blown pupil (CN III compression), and contralateral hemiparesis following pterion fracture.",
  },
  {
    id: "bone-ribcage",
    name: "Thoracic Cage & Sternum",
    latin: "Cavea Thoracis et Sternum",
    system: "skeletal",
    category: "Axial Skeleton",
    view: "anterior",
    x: 50,
    y: 28,
    innervation: "Intercostal Nerves (T1–T11)",
    bloodSupply: "Internal Thoracic Artery, Intercostal Arteries",
    clinicalSummary:
      "Protects cardiac and pulmonary viscera. Flail chest occurs when 3 or more contiguous ribs are fractured in 2 or more places, creating a paradoxical segment that moves inward during inspiration and outward during expiration.",
    mnemonic: "VAN Rule: Vein, Artery, Nerve run along inferior rib groove (insert needle ABOVE rib)",
    highYieldExamTip:
      "Thoracentesis / chest tube insertion must always enter above the superior border of the rib to avoid the neurovascular bundle.",
  },
  {
    id: "bone-pelvis",
    name: "Pelvic Girdle (Ilium, Ischium, Pubis)",
    latin: "Cingulum Pelvicum",
    system: "skeletal",
    category: "Axial Skeleton",
    view: "anterior",
    x: 50,
    y: 52,
    innervation: "Lumbosacral Plexus (L4–S4)",
    bloodSupply: "Internal and External Iliac Arteries",
    clinicalSummary:
      "Provides weight transmission from spine to lower limbs. High-energy pelvic 'open-book' ring fractures risk massive retroperitoneal hemorrhage from the presacral venous plexus or internal iliac branches.",
    mnemonic: "Pelvic brim separates Greater (False) Pelvis from Lesser (True) Pelvis",
    highYieldExamTip:
      "In suspected pelvic fracture, immediately place a pelvic binder over greater trochanters to minimize bleeding volume.",
  },
  {
    id: "bone-femur",
    name: "Femur (Thigh Bone)",
    latin: "Os Femoris",
    system: "skeletal",
    category: "Appendicular Skeleton",
    view: "anterior",
    x: 42,
    y: 70,
    innervation: "Femoral Nerve (L2–L4 anterior), Sciatic Nerve (posterior)",
    bloodSupply: "Medial and Lateral Circumflex Femoral Arteries",
    clinicalSummary:
      "The longest and strongest bone in the human body. Femoral neck fractures tear the Medial Circumflex Femoral Artery branches supplying the femoral head, precipitating Avascular Necrosis (AVN) requiring hemiarthroplasty.",
    mnemonic: "Medial circumflex = Main blood supply to femoral head",
    highYieldExamTip:
      "Subcapital femoral neck fracture has high risk of non-union and osteonecrosis due to retrograde retinacular arterial interruption.",
  },
  {
    id: "bone-tibia",
    name: "Tibia & Fibula (Lower Leg)",
    latin: "Tibia et Fibula",
    system: "skeletal",
    category: "Appendicular Skeleton",
    view: "anterior",
    x: 43,
    y: 88,
    innervation: "Tibial Nerve (posterior), Common Fibular Nerve (anterior/lateral)",
    bloodSupply: "Anterior and Posterior Tibial Arteries",
    clinicalSummary:
      "The tibia is the primary weight-bearing bone of the leg. Fractures of the proximal fibula can injure the Common Fibular (Peroneal) Nerve, causing Foot Drop (loss of dorsiflexion and eversion).",
    mnemonic: "PED = Peroneal Everts & Dorsiflexes; TIP = Tibial Inverts & Plantarflexes",
    highYieldExamTip:
      "Deep compartment syndrome in tibia fracture requires urgent emergency fasciotomy to prevent ischemic Volkmann-like contracture.",
  },

  // --- MUSCULAR SYSTEM ---
  {
    id: "musc-deltoid",
    name: "Deltoid Muscle",
    latin: "Musculus Deltoideus",
    system: "muscular",
    category: "Upper Limb Musculature",
    view: "anterior",
    x: 32,
    y: 22,
    innervation: "Axillary Nerve (C5, C6)",
    bloodSupply: "Posterior Circumflex Humeral Artery",
    clinicalSummary:
      "Primary arm abductor from 15° to 90° (initial 0–15° is initiated by the Supraspinatus). Anterior shoulder dislocation or surgical neck humerus fractures can stretch or sever the Axillary Nerve, leading to deltoid paralysis and loss of sensation over the lateral shoulder badge area.",
    mnemonic: "S-D-T: Supraspinatus (0-15°), Deltoid (15-90°), Trapezius/Serratus (>90°)",
    highYieldExamTip:
      "Intramuscular vaccine injection site must be 2-3 fingerbreadths below the acromion to avoid the subacromial bursa and radial nerve.",
  },
  {
    id: "musc-pectoralis",
    name: "Pectoralis Major",
    latin: "Musculus Pectoralis Major",
    system: "muscular",
    category: "Thoracic Musculature",
    view: "anterior",
    x: 44,
    y: 26,
    innervation: "Medial and Lateral Pectoral Nerves (C5–T1)",
    bloodSupply: "Pectoral branch of Thoracoacromial Trunk",
    clinicalSummary:
      "Powerful adductor and internal rotator of the humerus. Poland Syndrome presents with congenital unilateral absence of the sternal head of the pectoralis major and ipsilateral syndactyly.",
    mnemonic: "Clavicular head flexes humerus; Sternocostal head extends flexed humerus",
    highYieldExamTip:
      "Tears commonly occur during heavy bench-pressing; physical exam shows loss of anterior axillary fold and ecchymosis.",
  },
  {
    id: "musc-biceps",
    name: "Biceps Brachii",
    latin: "Musculus Biceps Brachii",
    system: "muscular",
    category: "Upper Limb Musculature",
    view: "anterior",
    x: 27,
    y: 34,
    innervation: "Musculocutaneous Nerve (C5, C6)",
    bloodSupply: "Brachial Artery muscular branches",
    clinicalSummary:
      "Powerful supinator of the flexed forearm and secondary elbow flexor. Rupture of the long head tendon presents with a dramatic 'Popeye Muscle' bulge in the distal arm.",
    mnemonic: "The Biceps supinates to drink soup, then flexes elbow to bring spoon to mouth",
    highYieldExamTip:
      "Tested clinically via Biceps Deep Tendon Reflex evaluating the integrity of C5 and C6 nerve roots.",
  },
  {
    id: "musc-abdominis",
    name: "Rectus Abdominis ('Abs')",
    latin: "Musculus Rectus Abdominis",
    system: "muscular",
    category: "Abdominal Wall",
    view: "anterior",
    x: 50,
    y: 40,
    innervation: "Thoracoabdominal Nerves (T7–T11) and Subcostal Nerve (T12)",
    bloodSupply: "Superior and Inferior Epigastric Arteries",
    clinicalSummary:
      "Flexes the lumbar spine and stabilizes the anterior abdominal wall. Rupture of the Inferior Epigastric Artery within the rectus sheath causes a Rectus Sheath Hematoma (Fothergill's sign: mass does not cross midline and remains fixed on abdominal contraction).",
    mnemonic: "Fothergill's sign distinguishes rectus sheath hematoma from intra-abdominal mass",
    highYieldExamTip:
      "Arcuate line marks where posterior rectus sheath transitions to transversalis fascia only.",
  },
  {
    id: "musc-quadriceps",
    name: "Quadriceps Femoris (Rectus Femoris, Vasti)",
    latin: "Musculus Quadriceps Femoris",
    system: "muscular",
    category: "Lower Limb Musculature",
    view: "anterior",
    x: 44,
    y: 65,
    innervation: "Femoral Nerve (L2, L3, L4)",
    bloodSupply: "Lateral Circumflex Femoral and Femoral Arteries",
    clinicalSummary:
      "Great extensor of the knee joint. The patella acts as a fulcrum to increase quadriceps mechanical leverage. Patellar tendon reflex tests L3–L4 root integrity ('one, two, buckle my shoe, three, four, kick the door').",
    mnemonic: "L3, L4 kick the door = Patellar reflex",
    highYieldExamTip:
      "Quadriceps tendon rupture occurs proximal to patella in patients >40 with renal failure or steroid use; inability to extend knee against gravity.",
  },

  // --- INTERNAL ORGANS & VISCERA ---
  {
    id: "organ-brain",
    name: "Cerebrum & Central Nervous System",
    latin: "Cerebrum et Encephalon",
    system: "nervous",
    category: "Neuroanatomy",
    view: "anterior",
    x: 50,
    y: 7,
    innervation: "Cranial Nerves I–XII origin",
    bloodSupply: "Circle of Willis (Internal Carotids + Vertebrobasilar System)",
    clinicalSummary:
      "Contains sensory, motor, and cognitive centers. Ischemic stroke in the Middle Cerebral Artery (MCA) territory results in contralateral face and arm weakness, sensory loss, and aphasia (Broca's if dominant frontal; Wernicke's if temporal).",
    mnemonic: "MCA = Upper extremities & Speech; ACA = Lower extremities & Incontinence",
    highYieldExamTip:
      "Circle of Willis Berry aneurysms typically rupture at the Anterior Communicating Artery (ACom), presenting as 'Worst headache of my life' (Subarachnoid Hemorrhage).",
  },
  {
    id: "organ-heart",
    name: "Heart (Myocardium & Chambers)",
    latin: "Cor Humanum",
    system: "cardiovascular",
    category: "Cardiovascular Viscera",
    view: "anterior",
    x: 48,
    y: 28,
    innervation: "Cardiac Plexus (Vagus nerve parasympathetic; T1–T5 sympathetic)",
    bloodSupply: "Left & Right Coronary Arteries (LAD, Circumflex, RCA)",
    clinicalSummary:
      "Four-chambered muscular organ maintaining systemic and pulmonary circulation. Left Anterior Descending (LAD) artery occlusion causes anterior wall myocardial infarction ('Widowmaker'), presenting with ST elevations in leads V1–V4 and cardiogenic shock risk.",
    mnemonic: "LAD = Anterior wall / V1-V4; RCA = Inferior wall / II, III, aVF",
    highYieldExamTip:
      "Cardiac tamponade triad of Beck: Hypotension, Jugular Venous Distension (JVD), and Muffled Heart Sounds + Pulsus Paradoxus.",
  },
  {
    id: "organ-lungs",
    name: "Lungs (Pulmonary Lobes & Bronchi)",
    latin: "Pulmones (Pulmo Dexter et Sinister)",
    system: "visceral",
    category: "Respiratory Viscera",
    view: "anterior",
    x: 43,
    y: 28,
    innervation: "Pulmonary Plexus (Vagus and sympathetic trunk)",
    bloodSupply: "Bronchial Arteries (tissue supply) & Pulmonary Arteries (gas exchange)",
    clinicalSummary:
      "Right lung has 3 lobes; left lung has 2 lobes (and the lingula). Tension pneumothorax creates one-way valve air trapping, shifting trachea to the contralateral side, compressing the superior vena cava and causing rapid hemodynamic collapse.",
    mnemonic: "Right lung has 3 lobes (R = 3); Left has 2 lobes (L = 2 for Heart space)",
    highYieldExamTip:
      "Immediate emergency needle decompression for tension pneumothorax in 2nd intercostal space midclavicular line (or 5th space midaxillary line).",
  },
  {
    id: "organ-liver",
    name: "Liver (Hepar) & Gallbladder",
    latin: "Hepar et Vesica Biliaris",
    system: "visceral",
    category: "Gastrointestinal Viscera",
    view: "anterior",
    x: 44,
    y: 38,
    innervation: "Hepatic Plexus (Celiac ganglion and Vagus nerve)",
    bloodSupply: "75% Hepatic Portal Vein, 25% Hepatic Artery Proper",
    clinicalSummary:
      "Largest internal organ; central metabolic and detoxifying factory. Cirrhosis leads to Portal Hypertension, causing portosystemic collateral shunting: Esophageal varices (fatal hematemesis), Caput medusae (umbilical veins), and Rectal hemorrhoids.",
    mnemonic: "Portosystemic anastomoses: 'Gut, Butt, and Caput'",
    highYieldExamTip:
      "Murphy's sign: Inspiratory arrest upon deep palpation of right upper quadrant during inspiration = Acute Cholecystitis.",
  },
  {
    id: "organ-stomach",
    name: "Stomach (Gaster) & Spleen",
    latin: "Gaster et Ventriculus",
    system: "visceral",
    category: "Gastrointestinal Viscera",
    view: "anterior",
    x: 54,
    y: 38,
    innervation: "Anterior and Posterior Vagal Trunks",
    bloodSupply: "Celiac Trunk branches (Left Gastric, Splenic, Common Hepatic)",
    clinicalSummary:
      "Digestive reservoir producing hydrochloric acid (via parietal cells) and intrinsic factor (for Vitamin B12 absorption in terminal ileum). Posterior gastric ulcer perforation erodes into the Splenic Artery, causing catastrophic intra-abdominal hemorrhage.",
    mnemonic: "Intrinsic factor secreted by Parietal cells -> B12 absorbed in Terminal Ileum",
    highYieldExamTip:
      "Splenic rupture following blunt abdominal trauma presents with Kehr's sign: referred pain to left shoulder via phrenic nerve (C3, C4, C5).",
  },
  {
    id: "organ-kidneys",
    name: "Kidneys & Adrenal Glands",
    latin: "Renes et Glandulae Suprarenales",
    system: "visceral",
    category: "Urogenital Viscera",
    view: "anterior",
    x: 52,
    y: 43,
    innervation: "Renal Plexus (T10–L1 sympathetic splanchnic)",
    bloodSupply: "Renal Arteries originating directly from Abdominal Aorta",
    clinicalSummary:
      "Retroperitoneal organs filtering blood, regulating electrolyte homeostasis, producing erythropoietin (EPO), and activating Vitamin D (1,25-dihydroxycholecalciferol). Renal cell carcinoma classic triad: hematuria, flank pain, and palpable abdominal mass.",
    mnemonic: "Kidneys are Retroperitoneal (SAD PUCKER: Suprarenal, Aorta, Duodenum...)",
    highYieldExamTip:
      "Left renal vein crosses between the Superior Mesenteric Artery (SMA) and Abdominal Aorta; compression causes 'Nutcracker Syndrome' and left testicular varicocele.",
  },
];

export default function Anatomy3DLab({ onAwardXp, onSaveNote }) {
  // System Layers Toggles
  const [layers, setLayers] = useState({
    skeletal: true,
    muscular: true,
    visceral: true,
    cardiovascular: true,
    nervous: false,
  });

  // Opacity Sliders (Dissection simulation)
  const [muscleOpacity, setMuscleOpacity] = useState(0.85);
  const [boneOpacity, setBoneOpacity] = useState(0.95);
  const [organsOpacity, setOrgansOpacity] = useState(0.9);

  // Rotation & Viewing Angle
  const [bodyAngle, setBodyAngle] = useState("anterior"); // 'anterior' | 'posterior' | 'lateral'
  const [zoomLevel, setZoomLevel] = useState(100); // 100% to 180%
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStructure, setSelectedStructure] = useState(ANATOMICAL_DATA[6]); // Default to Heart

  function toggleLayer(sysKey) {
    setLayers((prev) => ({ ...prev, [sysKey]: !prev[sysKey] }));
  }

  // Filtered Structures based on active layers and search
  const visibleStructures = useMemo(() => {
    return ANATOMICAL_DATA.filter((item) => {
      if (!layers[item.system]) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(q) ||
          item.latin.toLowerCase().includes(q) ||
          item.clinicalSummary.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [layers, searchQuery]);

  function handleSelectStructure(item) {
    setSelectedStructure(item);
    if (onAwardXp) onAwardXp(15);
  }

  return (
    <div className="lab-page-container">
      {/* HEADER BANNER */}
      <div className="lab-header-banner mbbs-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">🧬</div>
          <div>
            <div className="lab-eyebrow">MBBS ANATOMICAL DISSECTION SUITE</div>
            <h2>Interactive 3D Human Anatomy & Clinical Atlas</h2>
            <p>
              Examine musculoskeletal, visceral, cardiovascular, and nervous systems in high fidelity. Toggle layer transparencies to explore surgical corridors, nerve roots, and clinical pathology.
            </p>
          </div>
        </div>

        {/* VIEW ANGLE PILLS */}
        <div className="lab-nav-pills">
          <button
            type="button"
            className={`lab-nav-pill ${bodyAngle === "anterior" ? "active" : ""}`}
            onClick={() => setBodyAngle("anterior")}
          >
            Anterior (Front)
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${bodyAngle === "posterior" ? "active" : ""}`}
            onClick={() => setBodyAngle("posterior")}
          >
            Posterior (Back)
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${bodyAngle === "lateral" ? "active" : ""}`}
            onClick={() => setBodyAngle("lateral")}
          >
            Lateral (Profile)
          </button>
        </div>
      </div>

      <div className="anatomy-workspace-layout">
        {/* LEFT COLUMN: SYSTEM TOGGLES & OPACITY CONTROLS */}
        <aside className="anatomy-controls-panel">
          {/* SEARCH BAR */}
          <div className="anatomy-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search organ, muscle, bone (e.g., Femur, Heart)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* SYSTEM TOGGLE CARDS */}
          <div className="anatomy-control-group">
            <label className="control-label">ANATOMICAL SYSTEMS ({visibleStructures.length} ACTIVE)</label>

            <div className="system-toggles-list">
              {[
                { id: "skeletal", label: "Bones & Skeletal System", icon: "🦴", color: "#e2e8f0" },
                { id: "muscular", label: "Muscles & Musculature", icon: "💪", color: "#f87171" },
                { id: "visceral", label: "Internal Visceral Organs", icon: "🫁", color: "#fb923c" },
                { id: "cardiovascular", label: "Heart & Vascular System", icon: "🫀", color: "#ef4444" },
                { id: "nervous", label: "Brain & Nervous System", icon: "🧠", color: "#a855f7" },
              ].map((sys) => (
                <div
                  key={sys.id}
                  className={`system-toggle-item ${layers[sys.id] ? "enabled" : "disabled"}`}
                  onClick={() => toggleLayer(sys.id)}
                >
                  <div className="toggle-info">
                    <span className="sys-icon">{sys.icon}</span>
                    <span className="sys-name">{sys.label}</span>
                  </div>
                  <div className="toggle-switch">
                    <span className="switch-knob" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DISSECTION OPACITY SLIDERS */}
          <div className="anatomy-control-group">
            <label className="control-label">DISSECTION DEPTH & OPACITY</label>
            <div className="slider-wrapper">
              <div className="slider-label">
                <span>Muscle Tissue Opacity:</span>
                <strong>{Math.round(muscleOpacity * 100)}%</strong>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={muscleOpacity}
                onChange={(e) => setMuscleOpacity(parseFloat(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="slider-wrapper">
              <div className="slider-label">
                <span>Skeletal Framework:</span>
                <strong>{Math.round(boneOpacity * 100)}%</strong>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={boneOpacity}
                onChange={(e) => setBoneOpacity(parseFloat(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="slider-wrapper">
              <div className="slider-label">
                <span>Internal Visceral Organs:</span>
                <strong>{Math.round(organsOpacity * 100)}%</strong>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={organsOpacity}
                onChange={(e) => setOrgansOpacity(parseFloat(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="slider-wrapper">
              <div className="slider-label">
                <span>Viewport Magnification:</span>
                <strong>{zoomLevel}%</strong>
              </div>
              <input
                type="range"
                min="100"
                max="160"
                step="5"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseInt(e.target.value, 10))}
                className="custom-range"
              />
            </div>
          </div>

          {/* QUICK STRUCTURE LIST */}
          <div className="quick-structures-list">
            <label className="control-label">QUICK ANATOMICAL PIN INDEX</label>
            <div className="pins-scroll-box">
              {visibleStructures.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pin-list-item ${selectedStructure?.id === item.id ? "active" : ""}`}
                  onClick={() => handleSelectStructure(item)}
                >
                  <span className="pin-bullet" />
                  <span className="pin-text">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: INTERACTIVE 3D LAYERED BODY CANVAS */}
        <section className="anatomy-canvas-viewport">
          <div className="canvas-header-strip">
            <span className="canvas-view-tag">
              📐 VIEW: {bodyAngle.toUpperCase()} ORIENTATION · SCALE {zoomLevel}%
            </span>
            <span className="canvas-tip">
              💡 Click any glowing node or organ to inspect surgical dossier
            </span>
          </div>

          <div
            className="body-model-container"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* SVG ANATOMICAL LAYERED MODEL */}
            <svg
              className="anatomical-svg"
              viewBox="0 0 200 480"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Radial Glows for Organs */}
                <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff1744" stopOpacity="1" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.8" />
                </radialGradient>
                <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.7" />
                </radialGradient>
                <linearGradient id="boneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
                <linearGradient id="muscleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>

              {/* BODY SILHOUETTE (Aesthetic anatomical background) */}
              <path
                d="M100 20 C115 20 122 35 120 50 C120 62 114 70 108 75 C124 82 144 94 154 112 C164 130 162 165 158 190 C154 215 150 240 148 260 C146 270 148 285 142 300 C136 315 132 340 130 375 C128 410 126 440 124 460 C122 470 114 472 108 472 C104 472 102 460 102 440 L102 320 C102 300 98 300 98 320 L98 440 C98 460 96 472 92 472 C86 472 78 470 76 460 C74 440 72 410 70 375 C68 340 64 315 58 300 C52 285 54 270 52 260 C50 240 46 215 42 190 C38 165 36 130 46 112 C56 94 76 82 92 75 C86 70 80 62 80 50 C78 35 85 20 100 20 Z"
                fill="#0d1117"
                stroke="rgba(220, 38, 38, 0.45)"
                strokeWidth="1.2"
                opacity="0.8"
              />

              {/* 1. SKELETAL SYSTEM LAYER */}
              {layers.skeletal && (
                <g className="layer-skeletal" opacity={boneOpacity}>
                  {/* Cranium Skull */}
                  <ellipse cx="100" cy="45" rx="16" ry="20" fill="url(#boneGradient)" opacity="0.9" />
                  <ellipse cx="100" cy="58" rx="10" ry="8" fill="#e2e8f0" />
                  {/* Vertebral Column (Spine) */}
                  <path d="M100 68 L100 260" stroke="#f1f5f9" strokeWidth="4" strokeDasharray="3,2" />
                  {/* Clavicles */}
                  <path d="M72 82 Q100 88 128 82" stroke="#f1f5f9" strokeWidth="3.5" fill="none" />
                  {/* Sternum & Ribs */}
                  <path d="M100 86 L100 145" stroke="#f1f5f9" strokeWidth="5" />
                  {/* Rib cages curved loops */}
                  <path d="M100 95 Q130 95 125 120 Q115 135 100 135" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  <path d="M100 95 Q70 95 75 120 Q85 135 100 135" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  <path d="M100 105 Q138 108 130 138 Q118 152 100 150" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  <path d="M100 105 Q62 108 70 138 Q82 152 100 150" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  {/* Pelvic Basin */}
                  <path d="M78 225 Q100 215 122 225 Q130 255 118 268 Q100 275 82 268 Q70 255 78 225 Z" fill="#e2e8f0" opacity="0.85" />
                  {/* Femur Bones (Left & Right) */}
                  <path d="M86 268 Q84 315 82 360" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
                  <path d="M114 268 Q116 315 118 360" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
                  {/* Patella Knee Joints */}
                  <circle cx="82" cy="365" r="4.5" fill="#ffffff" />
                  <circle cx="118" cy="365" r="4.5" fill="#ffffff" />
                  {/* Tibia & Fibula */}
                  <path d="M82 372 L80 445" stroke="#f1f5f9" strokeWidth="5" />
                  <path d="M75 375 L73 442" stroke="#cbd5e1" strokeWidth="2" />
                  <path d="M118 372 L120 445" stroke="#f1f5f9" strokeWidth="5" />
                  <path d="M125 375 L127 442" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Humerus Upper Arm */}
                  <path d="M68 95 L50 170" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M132 95 L150 170" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
                </g>
              )}

              {/* 2. MUSCULAR SYSTEM LAYER */}
              {layers.muscular && (
                <g className="layer-muscular" opacity={muscleOpacity}>
                  {/* Deltoids */}
                  <path d="M64 85 Q52 105 56 125 Q70 115 72 92 Z" fill="url(#muscleGradient)" opacity="0.8" />
                  <path d="M136 85 Q148 105 144 125 Q130 115 128 92 Z" fill="url(#muscleGradient)" opacity="0.8" />
                  {/* Pectoralis Major (Chest) */}
                  <path d="M75 92 Q100 100 100 128 Q78 132 72 108 Z" fill="url(#muscleGradient)" opacity="0.85" />
                  <path d="M125 92 Q100 100 100 128 Q122 132 128 108 Z" fill="url(#muscleGradient)" opacity="0.85" />
                  {/* Rectus Abdominis 6-Pack */}
                  <rect x="88" y="142" width="10" height="14" rx="2" fill="url(#muscleGradient)" opacity="0.8" />
                  <rect x="102" y="142" width="10" height="14" rx="2" fill="url(#muscleGradient)" opacity="0.8" />
                  <rect x="88" y="160" width="10" height="14" rx="2" fill="url(#muscleGradient)" opacity="0.8" />
                  <rect x="102" y="160" width="10" height="14" rx="2" fill="url(#muscleGradient)" opacity="0.8" />
                  <rect x="88" y="178" width="10" height="16" rx="2" fill="url(#muscleGradient)" opacity="0.8" />
                  <rect x="102" y="178" width="10" height="16" rx="2" fill="url(#muscleGradient)" opacity="0.8" />
                  {/* Quadriceps */}
                  <path d="M74 275 Q85 305 80 355 Q70 320 72 285 Z" fill="url(#muscleGradient)" opacity="0.8" />
                  <path d="M126 275 Q115 305 120 355 Q130 320 128 285 Z" fill="url(#muscleGradient)" opacity="0.8" />
                  {/* Biceps */}
                  <ellipse cx="52" cy="145" rx="5" ry="16" fill="url(#muscleGradient)" opacity="0.75" />
                  <ellipse cx="148" cy="145" rx="5" ry="16" fill="url(#muscleGradient)" opacity="0.75" />
                </g>
              )}

              {/* 3. CARDIOVASCULAR & HEART LAYER */}
              {layers.cardiovascular && (
                <g className="layer-cardio">
                  {/* Aortic Arch & Vena Cava */}
                  <path d="M100 115 Q95 90 98 75" stroke="#ff1744" strokeWidth="3" fill="none" />
                  <path d="M105 115 Q108 92 104 75" stroke="#3b82f6" strokeWidth="3" fill="none" />
                  {/* Heart Geometry with pulsing glow */}
                  <path
                    d="M98 122 C92 108 80 114 84 128 C88 142 100 152 100 152 C100 152 112 142 116 128 C120 114 108 108 102 122 Z"
                    fill="url(#heartGlow)"
                    filter="drop-shadow(0 0 6px rgba(239,68,68,0.8))"
                  />
                  {/* Femoral & Carotid arteries */}
                  <path d="M96 260 L84 360" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4,2" fill="none" />
                  <path d="M104 260 L116 360" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4,2" fill="none" />
                </g>
              )}

              {/* 4. VISCERAL ORGANS LAYER */}
              {layers.visceral && (
                <g className="layer-visceral" opacity={organsOpacity}>
                  {/* Lungs */}
                  <path d="M78 105 Q72 135 84 150 Q92 140 92 112 Z" fill="#f87171" opacity="0.75" />
                  <path d="M122 105 Q128 135 116 150 Q108 140 108 112 Z" fill="#f87171" opacity="0.75" />
                  {/* Liver (Right upper quadrant) */}
                  <path d="M82 155 Q105 152 112 165 Q105 180 84 175 Z" fill="#92400e" opacity="0.85" />
                  {/* Stomach (Left upper quadrant) */}
                  <path d="M108 160 Q122 165 118 185 Q104 188 106 170 Z" fill="#f59e0b" opacity="0.8" />
                  {/* Intestines loop */}
                  <ellipse cx="100" cy="205" rx="16" ry="14" fill="#d97706" opacity="0.75" />
                  <path d="M88 200 Q100 215 112 200" stroke="#b45309" strokeWidth="2" fill="none" />
                </g>
              )}

              {/* 5. NERVOUS SYSTEM LAYER */}
              {layers.nervous && (
                <g className="layer-nervous">
                  {/* Brain in Cranium */}
                  <ellipse cx="100" cy="45" rx="14" ry="17" fill="url(#brainGlow)" opacity="0.9" />
                  {/* Spinal Cord */}
                  <path d="M100 62 L100 240" stroke="#c084fc" strokeWidth="3" />
                  {/* Brachial & Sciatic Nerve branches */}
                  <path d="M100 80 Q70 110 50 170" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,2" fill="none" />
                  <path d="M100 80 Q130 110 150 170" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,2" fill="none" />
                  <path d="M100 240 Q84 310 80 430" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="4,2" fill="none" />
                  <path d="M100 240 Q116 310 120 430" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="4,2" fill="none" />
                </g>
              )}

              {/* INTERACTIVE CLICKABLE HOTSPOT PINS */}
              {visibleStructures.map((item) => {
                const isSelected = selectedStructure?.id === item.id;
                const pinX = item.x * 2;
                const pinY = (item.y / 100) * 480;

                return (
                  <g
                    key={item.id}
                    className={`svg-pin-group ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectStructure(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={pinX}
                        cy={pinY}
                        r="10"
                        fill="none"
                        stroke="#ff1744"
                        strokeWidth="1.5"
                        className="pin-pulse"
                      />
                    )}
                    <circle
                      cx={pinX}
                      cy={pinY}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? "#ff1744" : "#ffffff"}
                      stroke="#0d1117"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </section>

        {/* RIGHT COLUMN: CLINICAL CASE FILE & SURGICAL DOSSIER */}
        <aside className="anatomy-dossier-panel">
          {selectedStructure ? (
            <div className="dossier-card">
              <div className="dossier-badge">
                <span>{selectedStructure.category.toUpperCase()}</span>
                <span className="dossier-sys-tag">{selectedStructure.system}</span>
              </div>

              <h2 className="dossier-title">{selectedStructure.name}</h2>
              <div className="dossier-latin">
                <em>Scientific / Latin: {selectedStructure.latin}</em>
              </div>

              {/* ANATOMICAL LANDMARKS */}
              <div className="dossier-section">
                <h4>📍 Innervation & Blood Supply</h4>
                <div className="dossier-meta-item">
                  <strong>Nerve Supply:</strong> {selectedStructure.innervation}
                </div>
                <div className="dossier-meta-item">
                  <strong>Arterial Supply:</strong> {selectedStructure.bloodSupply}
                </div>
              </div>

              {/* CLINICAL SUMMARY & PATHOLOGY */}
              <div className="dossier-section highlight-red">
                <h4>🩺 Clinical Significance & Pathology</h4>
                <p>{selectedStructure.clinicalSummary}</p>
              </div>

              {/* HIGH YIELD EXAM MNEMONIC */}
              <div className="dossier-section mnemonic-box">
                <h4>💡 USMLE / NEET-PG Mnemonic</h4>
                <div className="mnemonic-text">"{selectedStructure.mnemonic}"</div>
              </div>

              {/* HIGH YIELD BOARD TIP */}
              <div className="dossier-section exam-tip-box">
                <h4>🎯 High-Yield Exam Flashpoint</h4>
                <p>{selectedStructure.highYieldExamTip}</p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="dossier-actions">
                <button
                  type="button"
                  className="dossier-btn save-note"
                  onClick={() => {
                    if (onSaveNote) {
                      onSaveNote(
                        `Anatomy Dossier: ${selectedStructure.name} (${selectedStructure.latin})`,
                        `### 🧬 Clinical Anatomical Dossier: ${selectedStructure.name}\n\n**Latin**: *${selectedStructure.latin}* | **System**: ${selectedStructure.system}\n\n- **Innervation**: ${selectedStructure.innervation}\n- **Blood Supply**: ${selectedStructure.bloodSupply}\n\n#### 🩺 Clinical Significance\n${selectedStructure.clinicalSummary}\n\n#### 💡 High-Yield Mnemonic\n> ${selectedStructure.mnemonic}\n\n#### 🎯 Board Examination Flashpoint\n${selectedStructure.highYieldExamTip}`,
                        "Medicine (MBBS)"
                      );
                    }
                  }}
                >
                  💾 Save to Study Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="dossier-empty">
              <span className="empty-icon">🧬</span>
              <h3>Select an Anatomical Structure</h3>
              <p>Click any organ, bone, or muscle pin on the 3D model to inspect its clinical pathology.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
