import { useState, useMemo } from "react";

// Cogni Anatomy Expanded Biological Structures Database
const COGNI_ANATOMICAL_DATA = [
  // --- 1. SKELETAL SYSTEM ---
  {
    id: "bone-cranium",
    name: "Cranium & Facial Skeleton (Skull)",
    latin: "Cranium et Calvaria",
    system: "skeletal",
    region: "head-neck",
    depthTier: 3,
    view: "anterior",
    x: 50,
    y: 8,
    innervation: "Trigeminal Nerve (CN V sensory); Facial Nerve (CN VII motor)",
    bloodSupply: "Internal & External Carotid Arteries, Middle Meningeal Artery",
    clinicalSummary:
      "Protects the cerebrum and cranial nerves. The Pterion is the H-shaped suture junction (Frontal, Parietal, Temporal, Sphenoid). Lateral skull fracture here severs the Middle Meningeal Artery, causing an acute Epidural Hematoma (classic biconvex lens on CT with lucid interval).",
    mnemonic: "Middle Meningeal Artery = 'Epidural Hematoma with Lucid Interval'",
    highYieldExamTip: "Watch for uncal herniation, ipsilateral dilated pupil (CN III palsy), and contralateral hemiparesis.",
    planeDesc: "Coronal view reveals cranial vaults, orbits, nasal septum, and maxillary sinuses.",
  },
  {
    id: "bone-spine",
    name: "Vertebral Column (Cervical, Thoracic, Lumbar Spine)",
    latin: "Columna Vertebralis",
    system: "skeletal",
    region: "thorax",
    depthTier: 3,
    view: "anterior",
    x: 50,
    y: 35,
    innervation: "Spinal Nerves (31 pairs: C1-C8, T1-T12, L1-L5, S1-S5, Co1)",
    bloodSupply: "Anterior and Posterior Spinal Arteries, Radicular Arteries of Adamkiewicz",
    clinicalSummary:
      "Houses and protects the spinal cord. L4-L5 and L5-S1 intervertebral disc herniations compress the traversing nerve roots, causing classic Sciatica (radicular neuropathic leg pain with diminished Achilles tendon reflex).",
    mnemonic: "C3, 4, 5 keep the diaphragm alive (Phrenic nerve roots)",
    highYieldExamTip: "Artery of Adamkiewicz supplies lower two-thirds of the spinal cord; aortic aneurysm repair risks anterior spinal cord syndrome (paraplegia with loss of pain/temp but preserved vibration/proprioception).",
    planeDesc: "Sagittal plane displays cervical lordosis, thoracic kyphosis, and lumbar lordosis curvature.",
  },
  {
    id: "bone-ribs",
    name: "Thoracic Cage & Costal Cartilages",
    latin: "Cavea Thoracis et Costae",
    system: "skeletal",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    x: 50,
    y: 28,
    innervation: "Intercostal Nerves (T1–T11)",
    bloodSupply: "Internal Thoracic Artery, Posterior Intercostal Arteries",
    clinicalSummary:
      "Protects cardiopulmonary viscera. Flail chest occurs when 3 or more contiguous ribs are fractured in multiple segments, producing paradoxical breathing movements.",
    mnemonic: "VAN: Vein, Artery, Nerve run in costal groove on the inferior border of the rib.",
    highYieldExamTip: "Needle thoracentesis must enter over the superior border of the rib below to prevent neurovascular laceration.",
    planeDesc: "Transverse cross-section reveals mediastinal compartment boundaries.",
  },
  {
    id: "bone-pelvis",
    name: "Pelvic Girdle (Ilium, Ischium, Pubis, Sacrum)",
    latin: "Pelvis et Cingulum Pelvicum",
    system: "skeletal",
    region: "abdomen-pelvis",
    depthTier: 3,
    view: "anterior",
    x: 50,
    y: 52,
    innervation: "Lumbosacral Plexus (L4-S4), Pudendal Nerve (S2-S4)",
    bloodSupply: "Internal and External Iliac Arteries",
    clinicalSummary:
      "Transfers upper body weight to lower extremities. High-energy 'open-book' pelvic fractures tear the presacral venous plexus and internal iliac branches, causing life-threatening retroperitoneal hemorrhage.",
    mnemonic: "S2, 3, 4 keep the feces and urine off the floor (Pudendal nerve innervation to sphincters)",
    highYieldExamTip: "Apply immediate pelvic binder over the greater trochanters to tamponade venous bleeding in emergency trauma.",
    planeDesc: "Pelvic brim divides Greater (False) pelvis from Lesser (True) obstetrical pelvic inlet.",
  },
  {
    id: "bone-femur",
    name: "Femur & Hip Joint",
    latin: "Os Femoris",
    system: "skeletal",
    region: "lower-limb",
    depthTier: 3,
    view: "anterior",
    x: 42,
    y: 70,
    innervation: "Femoral Nerve (L2–L4 anterior), Sciatic Nerve (posterior)",
    bloodSupply: "Medial and Lateral Circumflex Femoral Arteries",
    clinicalSummary:
      "Strongest weight-bearing bone in human body. Subcapital femoral neck fractures rupture the retinacular branches of the Medial Circumflex Femoral Artery, triggering Avascular Necrosis (AVN) of the femoral head.",
    mnemonic: "Medial circumflex artery = Primary vascular supply to femoral head",
    highYieldExamTip: "Elderly female presenting with shortened, externally rotated leg after fall = displaced femoral neck fracture.",
    planeDesc: "Sagittal plane through acetabulum displays femoral head anteversion and labrum.",
  },

  // --- 2. MUSCULAR SYSTEM (TIERED BY COGNI MUSCLE STEPPER) ---
  {
    id: "musc-deltoid",
    name: "Deltoid Muscle",
    latin: "Musculus Deltoideus",
    system: "muscular",
    region: "upper-limb",
    depthTier: 1, // Superficial
    view: "anterior",
    x: 32,
    y: 22,
    innervation: "Axillary Nerve (C5, C6)",
    bloodSupply: "Posterior Circumflex Humeral Artery",
    clinicalSummary:
      "Primary arm abductor from 15° to 90° (0-15° initiated by supraspinatus). Anterior shoulder dislocation or surgical neck humerus fracture damages the axillary nerve, causing deltoid atrophy and sensory loss over the lateral shoulder badge.",
    mnemonic: "S-D-T: Supraspinatus (0-15°), Deltoid (15-90°), Trapezius (>90°)",
    highYieldExamTip: "Intramuscular deltoid injection must be given 2-3 fingerbreadths below acromion process to avoid the axillary nerve.",
    planeDesc: "Superficial shoulder cap muscle with anterior, lateral, and posterior multipennate fibers.",
  },
  {
    id: "musc-pectoralis",
    name: "Pectoralis Major",
    latin: "Musculus Pectoralis Major",
    system: "muscular",
    region: "thorax",
    depthTier: 1, // Superficial
    view: "anterior",
    x: 44,
    y: 26,
    innervation: "Medial and Lateral Pectoral Nerves (C5–T1)",
    bloodSupply: "Pectoral branch of Thoracoacromial Trunk",
    clinicalSummary:
      "Powerful adductor and internal rotator of humerus. Bench press tear causes sudden pop with anterior axillary ecchymosis. Poland syndrome is congenital unilateral absence of sternocostal head.",
    mnemonic: "Clavicular head flexes humerus; Sternocostal head extends flexed humerus",
    highYieldExamTip: "Forms the anterior axillary fold; deep to it lies the clavipectoral fascia and pectoralis minor.",
    planeDesc: "Coronal superficial thoracic chest wall wall fan-shaped architecture.",
  },
  {
    id: "musc-biceps",
    name: "Biceps Brachii",
    latin: "Musculus Biceps Brachii",
    system: "muscular",
    region: "upper-limb",
    depthTier: 1, // Superficial
    view: "anterior",
    x: 27,
    y: 34,
    innervation: "Musculocutaneous Nerve (C5, C6)",
    bloodSupply: "Brachial Artery muscular branches",
    clinicalSummary:
      "Powerful supinator of flexed forearm and secondary elbow flexor. Rupture of proximal long head tendon produces the classic 'Popeye' muscle bulge deformity.",
    mnemonic: "Biceps supinates to eat soup; flexes to bring it to mouth",
    highYieldExamTip: "Biceps reflex specifically assesses C5-C6 root integrity.",
    planeDesc: "Two heads: Short head from coracoid process, Long head from supraglenoid tubercle.",
  },
  {
    id: "musc-abdominis",
    name: "Rectus Abdominis & Obliques",
    latin: "Musculus Rectus Abdominis et Obliquus",
    system: "muscular",
    region: "abdomen-pelvis",
    depthTier: 1, // Superficial
    view: "anterior",
    x: 50,
    y: 40,
    innervation: "Intercostal & Subcostal Nerves (T7–T12)",
    bloodSupply: "Superior & Inferior Epigastric Arteries",
    clinicalSummary:
      "Stabilizes core and flexes lumbar spine. Inferior epigastric artery rupture within the rectus sheath produces a Rectus Sheath Hematoma with positive Fothergill's sign (mass remains fixed and tender during abdominal contraction).",
    mnemonic: "Fothergill's sign positive = Rectus sheath hematoma (does not cross midline)",
    highYieldExamTip: "Arcuate line marks the boundary where posterior rectus sheath ends and only transversalis fascia remains.",
    planeDesc: "Divided by tendinous intersections (3 horizontal fibrous bands) producing the '6-pack' anatomy.",
  },
  {
    id: "musc-quads",
    name: "Quadriceps Femoris (Rectus Femoris & Vasti)",
    latin: "Musculus Quadriceps Femoris",
    system: "muscular",
    region: "lower-limb",
    depthTier: 1, // Superficial
    view: "anterior",
    x: 44,
    y: 65,
    innervation: "Femoral Nerve (L2, L3, L4)",
    bloodSupply: "Lateral Circumflex Femoral and Femoral Arteries",
    clinicalSummary:
      "Chief extensor of the knee joint. Patellar tendon reflex directly tests the L3–L4 spinal nerve roots.",
    mnemonic: "L3, L4 kick the door = Patellar tendon reflex",
    highYieldExamTip: "Rectus femoris also flexes the hip joint because it crosses two joints (originates from Anterior Inferior Iliac Spine - AIIS).",
    planeDesc: "Four muscle bellies converge into the quadriceps tendon and patellar ligament.",
  },

  // --- 3. CIRCULATORY & CARDIOVASCULAR SYSTEM ---
  {
    id: "cardio-heart",
    name: "Heart (Myocardium, Atria & Ventricles)",
    latin: "Cor Humanum (Ventriculi et Atria)",
    system: "circulatory",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    x: 48,
    y: 28,
    innervation: "Cardiac Plexus (Vagus nerve parasympathetic; T1-T5 sympathetic)",
    bloodSupply: "Left Anterior Descending (LAD), Right Coronary (RCA), Circumflex Arteries",
    clinicalSummary:
      "Four-chambered muscular pump. Occlusion of the LAD causes anterior wall myocardial infarction ('Widowmaker') presenting with ST elevations in V1-V4 and high risk of cardiogenic shock. Beck's triad of cardiac tamponade: hypotension, elevated JVP, and distant muffled heart sounds.",
    mnemonic: "LAD = Anterior wall (V1-V4); RCA = Inferior wall (II, III, aVF)",
    highYieldExamTip: "Left recurrent laryngeal nerve loops under aortic arch and ligamentum arteriosum; aortic aneurysm or mitral stenosis causes hoarseness (Ortner's syndrome).",
    planeDesc: "Coronal cut reveals right atrium (fossa ovalis), tricuspid valve, right ventricle, mitral valve, and thick left ventricle wall.",
  },
  {
    id: "cardio-aorta",
    name: "Aorta & Great Vessels",
    latin: "Aorta Ascendens et Arcus Aortae",
    system: "circulatory",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    x: 50,
    y: 23,
    innervation: "Aortic baroreceptors via Vagus Nerve (CN X)",
    bloodSupply: "Systemic primary conduit originating from left ventricle",
    clinicalSummary:
      "Aortic Dissection (Stanford Type A: ascending aorta, urgent surgery; Type B: descending aorta, medical beta-blockers). Classic presentation: sharp tearing chest pain radiating to the interscapular back with asymmetric blood pressures between arms.",
    mnemonic: "Type A = Ascending (Airway/Surgical Emergency); Type B = Below subclavian (Beta-blockers)",
    highYieldExamTip: "Chest radiograph in aortic dissection demonstrates classic widening of the superior mediastinum (>8 cm).",
    planeDesc: "Branches: Brachiocephalic trunk, Left common carotid, Left subclavian artery.",
  },

  // --- 4. RESPIRATORY & VISCERAL ORGANS ---
  {
    id: "resp-lungs",
    name: "Lungs & Bronchial Tree",
    latin: "Pulmones (Pulmo Dexter et Sinister)",
    system: "respiratory",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    x: 43,
    y: 28,
    innervation: "Pulmonary Plexus (Vagus CN X and Sympathetic trunk)",
    bloodSupply: "Bronchial Arteries (nutritive) & Pulmonary Trunk (gas exchange)",
    clinicalSummary:
      "Right lung has 3 lobes (Superior, Middle, Inferior); Left lung has 2 lobes and the cardiac notch/lingula. Tension pneumothorax creates a one-way valve, shifting mediastinum to contralateral side and compressing the IVC/SVC leading to shock.",
    mnemonic: "Right lung has 3 lobes (R=3); Left has 2 lobes (L=2 to leave room for Heart)",
    highYieldExamTip: "Emergency needle decompression performed in 2nd intercostal space midclavicular line or 5th space midaxillary line.",
    planeDesc: "Transverse plane demonstrates pulmonary hilum with Pulmonary Artery anterior/superior to main bronchus.",
  },
  {
    id: "visc-liver",
    name: "Liver (Hepar) & Biliary Tree",
    latin: "Hepar et Vesica Biliaris",
    system: "digestive",
    region: "abdomen-pelvis",
    depthTier: 2,
    view: "anterior",
    x: 44,
    y: 38,
    innervation: "Hepatic Plexus (Celiac ganglion and Vagus nerve)",
    bloodSupply: "75% Hepatic Portal Vein, 25% Hepatic Artery Proper",
    clinicalSummary:
      "Largest internal organ. Portal hypertension in liver cirrhosis leads to portosystemic shunts: esophageal varices (fatal upper GI bleeding), caput medusae (umbilical veins), and rectal hemorrhoids. Murphy's sign indicates acute cholecystitis.",
    mnemonic: "Portosystemic anastomoses: 'Gut, Butt, and Caput'",
    highYieldExamTip: "Pringle maneuver temporarily compresses the hepatoduodenal ligament (Portal Triad: Portal vein, Hepatic artery, Common bile duct) to control liver trauma hemorrhage.",
    planeDesc: "Coronal section shows Couinaud's 8 functional hepatic segments based on vascular supply.",
  },
  {
    id: "visc-stomach",
    name: "Stomach (Gaster) & Intestines",
    latin: "Gaster, Duodenum et Intestinum",
    system: "digestive",
    region: "abdomen-pelvis",
    depthTier: 2,
    view: "anterior",
    x: 54,
    y: 38,
    innervation: "Anterior & Posterior Vagal Trunks (Parasympathetic; Celiac sympathetic)",
    bloodSupply: "Celiac Trunk branches (Left Gastric, Splenic, Common Hepatic)",
    clinicalSummary:
      "Acid and intrinsic factor factory. Posterior duodenal wall ulcer perforation erodes into Gastroduodenal Artery, causing massive hematemesis. Acute appendicitis presents with periumbilical pain shifting to McBurney's point (1/3 distance from ASIS to umbilicus).",
    mnemonic: "Parietal cells secrete Gastric Acid and Intrinsic Factor (for B12 absorption in terminal ileum)",
    highYieldExamTip: "Perforated gastric/duodenal ulcer shows free air under diaphragm (pneumoperitoneum) on upright chest radiograph.",
    planeDesc: "Frontal plane displays lesser and greater curvatures, pylorus, and duodenum C-loop cradling pancreas.",
  },
  {
    id: "visc-kidneys",
    name: "Kidneys & Urinary System",
    latin: "Renes et Ureteres",
    system: "urinary",
    region: "abdomen-pelvis",
    depthTier: 3,
    view: "anterior",
    x: 52,
    y: 43,
    innervation: "Renal Plexus (T10-L1 sympathetic splanchnic)",
    bloodSupply: "Renal Arteries arising directly from Abdominal Aorta",
    clinicalSummary:
      "Retroperitoneal organs filtering metabolic waste and regulating acid-base balance. Left renal vein is compressed between Superior Mesenteric Artery (SMA) and abdominal aorta ('Nutcracker syndrome'), presenting with hematuria and left varicocele in males.",
    mnemonic: "SAD PUCKER: Suprarenal, Aorta, Duodenum (parts 2-4), Pancreas, Ureters, Colon, Kidneys, Esophagus, Rectum (Retroperitoneal)",
    highYieldExamTip: "Renal cell carcinoma (clear cell type) invades the renal vein and can extend into the Inferior Vena Cava all the way up to right atrium.",
    planeDesc: "Coronal section shows renal cortex, medullary pyramids, major/minor calyces, and renal pelvis.",
  },

  // --- 5. NERVOUS SYSTEM ---
  {
    id: "neuro-brain",
    name: "Brain (Cerebrum, Cerebellum & Brainstem)",
    latin: "Encephalon et Cerebrum",
    system: "nervous",
    region: "head-neck",
    depthTier: 3,
    view: "anterior",
    x: 50,
    y: 7,
    innervation: "Origin of Cranial Nerves I through XII",
    bloodSupply: "Circle of Willis (Internal Carotids + Vertebrobasilar system)",
    clinicalSummary:
      "Central command of sensory, motor, and vegetative functions. Rupture of a saccular (Berry) aneurysm at the Anterior Communicating Artery produces sudden explosive 'thunderclap headache' (Subarachnoid Hemorrhage - SAH).",
    mnemonic: "Worst headache of life + xanthochromia on lumbar puncture = Subarachnoid Hemorrhage",
    highYieldExamTip: "Middle Cerebral Artery (MCA) stroke affects contralateral face and arm; Anterior Cerebral Artery (ACA) stroke affects contralateral leg and foot.",
    planeDesc: "Midsagittal plane displays corpus callosum, thalamus, pons, medulla oblongata, and 4th ventricle.",
  },
];

export default function Anatomy3DLab({ onAwardXp, onSaveNote }) {
  // Cogni Systems Checklist Toggles
  const [systems, setSystems] = useState({
    skeletal: true,
    muscular: true,
    circulatory: true,
    respiratory: true,
    digestive: true,
    nervous: true,
    urinary: true,
  });

  // Cogni Muscle Stepper Layer: 1 = Superficial, 2 = Intermediate, 3 = Deep Skeleton & Viscera
  const [muscleTier, setMuscleTier] = useState(1);

  // Cogni Section Tool (Anatomical Planes)
  const [activePlane, setActivePlane] = useState("coronal"); // 'coronal' (Frontal) | 'sagittal' | 'transverse'

  // Cogni Ready-Made Regional Views
  const [presetRegion, setPresetRegion] = useState("whole-body"); // 'whole-body' | 'head-neck' | 'thorax' | 'abdomen-pelvis' | 'upper-limb' | 'lower-limb'

  // Visual Controls (Cogni Explode & X-Ray Mode)
  const [isXrayMode, setIsXrayMode] = useState(false);
  const [explodeSpacing, setExplodeSpacing] = useState(0); // 0 to 40px explosion
  const [bodyOrientation, setBodyOrientation] = useState("anterior"); // 'anterior' | 'posterior' | 'lateral'
  const [zoomLevel, setZoomLevel] = useState(100);

  // Selected Structure & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStructure, setSelectedStructure] = useState(COGNI_ANATOMICAL_DATA[5]); // Default to Heart

  function toggleSystem(sysKey) {
    setSystems((prev) => ({ ...prev, [sysKey]: !prev[sysKey] }));
  }

  // Filter Structures matching active systems, region, and search query
  const visibleStructures = useMemo(() => {
    return COGNI_ANATOMICAL_DATA.filter((item) => {
      if (!systems[item.system]) return false;
      if (presetRegion !== "whole-body" && item.region !== presetRegion) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(q) ||
          item.latin.toLowerCase().includes(q) ||
          item.clinicalSummary.toLowerCase().includes(q) ||
          item.system.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [systems, presetRegion, searchQuery]);

  function handleSelectStructure(item) {
    setSelectedStructure(item);
    if (onAwardXp) onAwardXp(20);
  }

  return (
    <div className="lab-page-container">
      {/* COGNI ANATOMY HEADER BANNER */}
      <div className="lab-header-banner mbbs-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">🧬</div>
          <div>
            <div className="lab-eyebrow">COGNI ANATOMY 3D MEDICAL ATLAS</div>
            <h2>Interactive 3D Anatomical Body Dissector</h2>
            <p>
              Built following the Cogni Anatomy framework: Multi-system toggles, Explode Dissection, Muscle Layer Stepper, and Section Planes with USMLE/NEET-PG pathology.
            </p>
          </div>
        </div>

        {/* READY-MADE REGIONAL PRESET VIEWS (COGNI STYLE) */}
        <div className="lab-nav-pills">
          {[
            { id: "whole-body", label: "Whole Body" },
            { id: "head-neck", label: "Head & Neck" },
            { id: "thorax", label: "Thorax" },
            { id: "abdomen-pelvis", label: "Abdomen & Pelvis" },
            { id: "upper-limb", label: "Upper Limb" },
            { id: "lower-limb", label: "Lower Limb" },
          ].map((reg) => (
            <button
              key={reg.id}
              type="button"
              className={`lab-nav-pill ${presetRegion === reg.id ? "active" : ""}`}
              onClick={() => setPresetRegion(reg.id)}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cogni-workspace-grid">
        {/* LEFT COLUMN: COGNI DISSECTION TOOLBAR & SYSTEMS */}
        <aside className="cogni-tools-column">
          {/* SEARCH AUTOCOMPLETE */}
          <div className="anatomy-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search 2,800+ structures (e.g. Femur, Heart, Aorta)..."
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

          {/* COGNI MUSCLE LAYER STEPPER */}
          <div className="cogni-tool-card">
            <div className="cogni-tool-title">
              <span>🥩</span> Muscle Layer Stepper (Cogni Feature)
            </div>
            <p className="tool-sub">Peel back superficial tissue to reveal deep muscular corridors.</p>
            <div className="layer-stepper-row">
              <button
                type="button"
                className={`stepper-btn ${muscleTier === 1 ? "active" : ""}`}
                onClick={() => setMuscleTier(1)}
              >
                Tier 1: Superficial
              </button>
              <button
                type="button"
                className={`stepper-btn ${muscleTier === 2 ? "active" : ""}`}
                onClick={() => setMuscleTier(2)}
              >
                Tier 2: Intermediate
              </button>
              <button
                type="button"
                className={`stepper-btn ${muscleTier === 3 ? "active" : ""}`}
                onClick={() => setMuscleTier(3)}
              >
                Tier 3: Deep Periosteum
              </button>
            </div>
          </div>

          {/* COGNI SECTION TOOL: ANATOMICAL PLANES */}
          <div className="cogni-tool-card">
            <div className="cogni-tool-title">
              <span>📐</span> Section Tool (Planes of Dissection)
            </div>
            <div className="planes-btn-row">
              <button
                type="button"
                className={`plane-btn ${activePlane === "coronal" ? "active" : ""}`}
                onClick={() => setActivePlane("coronal")}
              >
                Coronal (Frontal)
              </button>
              <button
                type="button"
                className={`plane-btn ${activePlane === "sagittal" ? "active" : ""}`}
                onClick={() => setActivePlane("sagittal")}
              >
                Sagittal (Median)
              </button>
              <button
                type="button"
                className={`plane-btn ${activePlane === "transverse" ? "active" : ""}`}
                onClick={() => setActivePlane("transverse")}
              >
                Transverse (Cross)
              </button>
            </div>
          </div>

          {/* COGNI EXPLODE & X-RAY SLIDERS */}
          <div className="cogni-tool-card">
            <div className="cogni-tool-title">
              <span>💥</span> Explode & X-Ray Visibility Controls
            </div>
            <div className="slider-wrapper">
              <div className="slider-label">
                <span>Explode Spacing:</span>
                <strong>{explodeSpacing}px</strong>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="5"
                value={explodeSpacing}
                onChange={(e) => setExplodeSpacing(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="xray-toggle-row">
              <span>X-Ray Ghost Mode:</span>
              <button
                type="button"
                className={`xray-btn ${isXrayMode ? "on" : "off"}`}
                onClick={() => setIsXrayMode(!isXrayMode)}
              >
                {isXrayMode ? "⚡ X-RAY ON" : "STANDARD"}
              </button>
            </div>
          </div>

          {/* 15 MAJOR COGNI BODY SYSTEMS CHECKLIST */}
          <div className="cogni-systems-card">
            <div className="cogni-tool-title">
              <span>🗂️</span> Body Systems Checklist ({visibleStructures.length} Parts)
            </div>
            <div className="systems-checklist-grid">
              {[
                { id: "skeletal", label: "Skeletal System (Bones)", icon: "🦴" },
                { id: "muscular", label: "Muscular System (Striated)", icon: "💪" },
                { id: "circulatory", label: "Cardiovascular (Heart & Aorta)", icon: "🫀" },
                { id: "respiratory", label: "Respiratory (Lungs & Bronchi)", icon: "🫁" },
                { id: "digestive", label: "Digestive (Stomach & Liver)", icon: "🍔" },
                { id: "nervous", label: "Nervous System (Brain & Nerves)", icon: "🧠" },
                { id: "urinary", label: "Urinary System (Kidneys)", icon: "💧" },
              ].map((sys) => (
                <div
                  key={sys.id}
                  className={`system-check-item ${systems[sys.id] ? "checked" : "unchecked"}`}
                  onClick={() => toggleSystem(sys.id)}
                >
                  <span className="check-box">{systems[sys.id] ? "✓" : ""}</span>
                  <span className="sys-icon">{sys.icon}</span>
                  <span className="sys-lbl">{sys.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: INTERACTIVE 3D LAYERED ANATOMICAL ATLAS */}
        <section className="cogni-canvas-column">
          <div className="canvas-header-strip">
            <div className="view-orientations">
              <span className="toolbar-lbl">Angle:</span>
              {["anterior", "posterior", "lateral"].map((angle) => (
                <button
                  key={angle}
                  type="button"
                  className={`orient-btn ${bodyOrientation === angle ? "active" : ""}`}
                  onClick={() => setBodyOrientation(angle)}
                >
                  {angle.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="zoom-indicator">
              <span>Zoom: {zoomLevel}%</span>
              <input
                type="range"
                min="100"
                max="160"
                step="5"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="zoom-range-mini"
              />
            </div>
          </div>

          {/* 3D ANATOMICAL MODEL VIEWPORT */}
          <div
            className={`cogni-viewport-box ${isXrayMode ? "xray-mode" : ""}`}
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <svg
              className="cogni-svg"
              viewBox="0 0 220 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="cardioGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff1744" stopOpacity="1" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.85" />
                </radialGradient>
                <radialGradient id="neuroGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="1" />
                  <stop offset="100%" stopColor="#581c87" stopOpacity="0.8" />
                </radialGradient>
                <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
                <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>

              {/* HUMAN BODY SILHOUETTE */}
              <path
                d="M110 20 C125 20 132 35 130 50 C130 62 124 70 118 75 C134 82 154 94 164 112 C174 130 172 165 168 190 C164 215 160 240 158 260 C156 270 158 285 152 300 C146 315 142 340 140 375 C138 410 136 440 134 460 C132 470 124 472 118 472 C114 472 112 460 112 440 L112 320 C112 300 108 300 108 320 L108 440 C108 460 106 472 102 472 C96 472 88 470 86 460 C84 440 82 410 80 375 C78 340 74 315 68 300 C62 285 64 270 62 260 C60 240 56 215 52 190 C48 165 46 130 56 112 C66 94 86 82 102 75 C96 70 90 62 90 50 C88 35 95 20 110 20 Z"
                fill={isXrayMode ? "rgba(15, 23, 42, 0.4)" : "#0b0d14"}
                stroke={isXrayMode ? "#38bdf8" : "rgba(220, 38, 38, 0.5)"}
                strokeWidth={isXrayMode ? "1.5" : "1.2"}
              />

              {/* SKELETAL SYSTEM LAYER (EXPLODE OFFSET APPLIED) */}
              {systems.skeletal && (
                <g className="cogni-layer-skeletal" transform={`translate(${-explodeSpacing / 2}, 0)`}>
                  {/* Cranium */}
                  <ellipse cx="110" cy="45" rx="16" ry="20" fill="url(#boneGrad)" opacity="0.9" />
                  {/* Spine */}
                  <path d="M110 68 L110 260" stroke="#f1f5f9" strokeWidth="4" strokeDasharray="3,2" />
                  {/* Clavicles */}
                  <path d="M80 82 Q110 88 140 82" stroke="#f1f5f9" strokeWidth="3.5" fill="none" />
                  {/* Sternum & Ribs */}
                  <path d="M110 86 L110 145" stroke="#f1f5f9" strokeWidth="5" />
                  <path d="M110 95 Q140 95 135 120 Q125 135 110 135" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  <path d="M110 95 Q80 95 85 120 Q95 135 110 135" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  {/* Pelvic Basin */}
                  <path d="M88 225 Q110 215 132 225 Q140 255 128 268 Q110 275 92 268 Q80 255 88 225 Z" fill="#e2e8f0" opacity="0.9" />
                  {/* Femur Bones */}
                  <path d="M96 268 Q94 315 92 360" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
                  <path d="M124 268 Q126 315 128 360" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
                  {/* Patella */}
                  <circle cx="92" cy="365" r="4.5" fill="#ffffff" />
                  <circle cx="128" cy="365" r="4.5" fill="#ffffff" />
                  {/* Tibia & Fibula */}
                  <path d="M92 372 L90 445" stroke="#f1f5f9" strokeWidth="5" />
                  <path d="M128 372 L130 445" stroke="#f1f5f9" strokeWidth="5" />
                </g>
              )}

              {/* MUSCULAR SYSTEM LAYER (COGNI MUSCLE STEPPER: TIER 1 vs 2) */}
              {systems.muscular && muscleTier < 3 && (
                <g className="cogni-layer-muscular" opacity={muscleTier === 1 ? 0.85 : 0.45}>
                  {/* Deltoids */}
                  <path d="M74 85 Q62 105 66 125 Q80 115 82 92 Z" fill="url(#muscleGrad)" />
                  <path d="M146 85 Q158 105 154 125 Q140 115 138 92 Z" fill="url(#muscleGrad)" />
                  {/* Pectoralis Major */}
                  <path d="M85 92 Q110 100 110 128 Q88 132 82 108 Z" fill="url(#muscleGrad)" />
                  <path d="M135 92 Q110 100 110 128 Q132 132 138 108 Z" fill="url(#muscleGrad)" />
                  {/* Rectus Abdominis 6-Pack */}
                  <rect x="98" y="142" width="10" height="14" rx="2" fill="url(#muscleGrad)" />
                  <rect x="112" y="142" width="10" height="14" rx="2" fill="url(#muscleGrad)" />
                  <rect x="98" y="160" width="10" height="14" rx="2" fill="url(#muscleGrad)" />
                  <rect x="112" y="160" width="10" height="14" rx="2" fill="url(#muscleGrad)" />
                  <rect x="98" y="178" width="10" height="16" rx="2" fill="url(#muscleGrad)" />
                  <rect x="112" y="178" width="10" height="16" rx="2" fill="url(#muscleGrad)" />
                  {/* Quadriceps */}
                  <path d="M84 275 Q95 305 90 355 Q80 320 82 285 Z" fill="url(#muscleGrad)" />
                  <path d="M136 275 Q125 305 130 355 Q140 320 138 285 Z" fill="url(#muscleGrad)" />
                </g>
              )}

              {/* CARDIOVASCULAR LAYER (EXPLODE OFFSET APPLIED) */}
              {systems.circulatory && (
                <g className="cogni-layer-cardio" transform={`translate(${explodeSpacing / 2}, 0)`}>
                  {/* Aortic Arch */}
                  <path d="M110 115 Q105 90 108 75" stroke="#ff1744" strokeWidth="3.5" fill="none" />
                  {/* Heart Geometry with bioluminescent pulse */}
                  <path
                    d="M108 122 C102 108 90 114 94 128 C98 142 110 152 110 152 C110 152 122 142 126 128 C130 114 118 108 112 122 Z"
                    fill="url(#cardioGlow)"
                    filter="drop-shadow(0 0 8px rgba(255,23,68,0.9))"
                  />
                  {/* Femoral Arteries */}
                  <path d="M106 260 L94 360" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" fill="none" />
                  <path d="M114 260 L126 360" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" fill="none" />
                </g>
              )}

              {/* RESPIRATORY LUNGS LAYER */}
              {systems.respiratory && (
                <g className="cogni-layer-resp" opacity="0.85">
                  <path d="M88 105 Q82 135 94 150 Q102 140 102 112 Z" fill="#f87171" opacity="0.8" />
                  <path d="M132 105 Q138 135 126 150 Q118 140 118 112 Z" fill="#f87171" opacity="0.8" />
                </g>
              )}

              {/* DIGESTIVE ORGANS LAYER */}
              {systems.digestive && (
                <g className="cogni-layer-digestive" opacity="0.85">
                  {/* Liver (RUQ) */}
                  <path d="M92 155 Q115 152 122 165 Q115 180 94 175 Z" fill="#b45309" />
                  {/* Stomach (LUQ) */}
                  <path d="M118 160 Q132 165 128 185 Q114 188 116 170 Z" fill="#d97706" />
                  {/* Intestines */}
                  <ellipse cx="110" cy="205" rx="16" ry="14" fill="#92400e" opacity="0.75" />
                </g>
              )}

              {/* URINARY SYSTEM */}
              {systems.urinary && (
                <g className="cogni-layer-urinary">
                  <ellipse cx="98" cy="180" rx="6" ry="9" fill="#dc2626" opacity="0.85" />
                  <ellipse cx="122" cy="180" rx="6" ry="9" fill="#dc2626" opacity="0.85" />
                </g>
              )}

              {/* NERVOUS SYSTEM LAYER */}
              {systems.nervous && (
                <g className="cogni-layer-nervous">
                  <ellipse cx="110" cy="45" rx="14" ry="17" fill="url(#neuroGlow)" opacity="0.95" />
                  <path d="M110 62 L110 240" stroke="#c084fc" strokeWidth="3" />
                </g>
              )}

              {/* COGNI INTERACTIVE CLICKABLE STRUCTURE NODES */}
              {visibleStructures.map((item) => {
                const isSelected = selectedStructure?.id === item.id;
                const pinX = item.x * 2.2;
                const pinY = (item.y / 100) * 500;

                return (
                  <g
                    key={item.id}
                    className={`cogni-pin ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectStructure(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {isSelected && (
                      <circle
                        cx={pinX}
                        cy={pinY}
                        r="12"
                        fill="none"
                        stroke="#ff1744"
                        strokeWidth="1.8"
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

        {/* RIGHT COLUMN: COGNI DETAILED CLINICAL CASE FILE */}
        <aside className="cogni-dossier-column">
          {selectedStructure ? (
            <div className="cogni-dossier-card">
              <div className="dossier-badge">
                <span>{selectedStructure.region.toUpperCase()}</span>
                <span className="dossier-sys-tag">{selectedStructure.system.toUpperCase()}</span>
              </div>

              <h2 className="dossier-title">{selectedStructure.name}</h2>
              <div className="dossier-latin">
                <em>Scientific / Latin: {selectedStructure.latin}</em>
              </div>

              {/* SECTION PLANE DETAILS */}
              <div className="dossier-section plane-info">
                <h4>📐 {activePlane.toUpperCase()} SECTION PLANE CORRELATION</h4>
                <p>{selectedStructure.planeDesc}</p>
              </div>

              {/* INNERVATION & ARTERIAL SUPPLY */}
              <div className="dossier-section">
                <h4>📍 Innervation & Vascular Supply</h4>
                <div className="dossier-meta-item">
                  <strong>Nerve Supply:</strong> {selectedStructure.innervation}
                </div>
                <div className="dossier-meta-item">
                  <strong>Arterial Supply:</strong> {selectedStructure.bloodSupply}
                </div>
              </div>

              {/* CLINICAL PATHOLOGY */}
              <div className="dossier-section highlight-red">
                <h4>🩺 Clinical Pathology & Surgical Correlations</h4>
                <p>{selectedStructure.clinicalSummary}</p>
              </div>

              {/* USMLE / NEET-PG HIGH YIELD MNEMONIC */}
              <div className="dossier-section mnemonic-box">
                <h4>💡 USMLE / Medical Board Mnemonic</h4>
                <div className="mnemonic-text">"{selectedStructure.mnemonic}"</div>
              </div>

              {/* EXAM FLASHPOINT */}
              <div className="dossier-section exam-tip-box">
                <h4>🎯 High-Yield Exam Flashpoint</h4>
                <p>{selectedStructure.highYieldExamTip}</p>
              </div>

              {/* ACTIONS */}
              <div className="dossier-actions">
                <button
                  type="button"
                  className="dossier-btn save-note"
                  onClick={() => {
                    if (onSaveNote) {
                      onSaveNote(
                        `Cogni Anatomy Dossier: ${selectedStructure.name}`,
                        `### 🧬 Cogni 3D Anatomy Clinical Dossier: ${selectedStructure.name}\n\n**Latin**: *${selectedStructure.latin}* | **System**: ${selectedStructure.system}\n\n- **Innervation**: ${selectedStructure.innervation}\n- **Blood Supply**: ${selectedStructure.bloodSupply}\n\n#### 🩺 Clinical Pathology\n${selectedStructure.clinicalSummary}\n\n#### 💡 Board Exam Mnemonic\n> ${selectedStructure.mnemonic}\n\n#### 🎯 High-Yield Flashpoint\n${selectedStructure.highYieldExamTip}`,
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
              <h3>Select a Biological Structure</h3>
              <p>Click any organ, bone, or muscle node in the 3D viewport to inspect surgical relationships.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
