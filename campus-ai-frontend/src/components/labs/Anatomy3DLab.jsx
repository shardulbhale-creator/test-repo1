import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Comprehensive MBBS / NEET-PG / USMLE Clinical Anatomical Database
const COGNI_ANATOMICAL_DATA = [
  // --- 1. SKELETAL SYSTEM ---
  {
    id: "bone-cranium",
    name: "Cranium & Facial Skeleton (Adult Human Skull)",
    latin: "Cranium et Calvaria (Adultus)",
    system: "skeletal",
    region: "head-neck",
    depthTier: 3,
    view: "anterior",
    coords: { x: 0, y: 76, z: 0 },
    innervation: "Trigeminal Nerve (CN V sensory); Facial Nerve (CN VII motor)",
    bloodSupply: "Internal & External Carotid Arteries, Middle Meningeal Artery",
    clinicalSummary:
      "Protects the cerebrum and brainstem. The Pterion is the thin H-shaped suture junction (Frontal, Parietal, Temporal, Greater wing of Sphenoid). A lateral skull blow fractures the bone and lacerates the anterior branch of the Middle Meningeal Artery, causing an acute Epidural Hematoma (classic biconvex lens on CT, lucid interval followed by coma).",
    mnemonic: "Middle Meningeal Artery = 'Epidural Hematoma with Lucid Interval'",
    highYieldExamTip:
      "Watch for uncal herniation through tentorial notch, causing ipsilateral 'down-and-out' dilated pupil (CN III palsy) and contralateral hemiparesis.",
    planeDesc: "Coronal section reveals cranial vault, orbital cavities, ethmoid air cells, and maxillary sinuses.",
  },
  {
    id: "bone-spine",
    name: "Vertebral Column (Cervical, Thoracic, Lumbar Spine & Sacrum)",
    latin: "Columna Vertebralis et Os Sacrum",
    system: "skeletal",
    region: "thorax",
    depthTier: 3,
    view: "anterior",
    coords: { x: 0, y: 32, z: -4 },
    innervation: "Spinal Nerves (31 pairs: C1-C8, T1-T12, L1-L5, S1-S5, Co1)",
    bloodSupply: "Anterior & Posterior Spinal Arteries, Great Radicular Artery of Adamkiewicz",
    clinicalSummary:
      "Houses and shields the spinal cord. L4-L5 and L5-S1 posterolateral disc herniations compress traversing nerve roots, triggering classic Sciatica (radicular pain radiating down posterior leg with diminished Achilles reflex). Cauda Equina Syndrome is a surgical emergency characterized by saddle anesthesia and urinary retention.",
    mnemonic: "C3, 4, 5 keep the diaphragm alive (Phrenic nerve origins)",
    highYieldExamTip:
      "Artery of Adamkiewicz typically arises from left intercostal artery at T9-T12; surgical repair of thoracoabdominal aortic aneurysms risks anterior spinal syndrome (paraplegia with loss of pain/temp, preserved proprioception).",
    planeDesc: "Midsagittal view displays cervical lordosis, thoracic kyphosis, lumbar lordosis, and sacral curve.",
  },
  {
    id: "bone-ribs",
    name: "Thoracic Cage, Sternum & 12 Costal Arches",
    latin: "Cavea Thoracis, Sternum et Costae Verae",
    system: "skeletal",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    coords: { x: 0, y: 40, z: 6 },
    innervation: "Intercostal Nerves (T1–T11 anterior rami)",
    bloodSupply: "Internal Thoracic (Mammary) Artery & Posterior Intercostal Arteries",
    clinicalSummary:
      "Protects the heart, lungs, and mediastinal structures. Flail chest occurs when ≥3 adjacent ribs are fractured in ≥2 places, leading to paradoxical inward chest motion during inspiration. Rib notchings on CXR signify Coarctation of the Aorta via hypertrophied intercostal collaterals.",
    mnemonic: "VAN: Vein, Artery, Nerve run in the subcostal groove on the inferior rib margin.",
    highYieldExamTip:
      "Needle decompression of tension pneumothorax or thoracentesis must always be performed just above the superior margin of the lower rib to avoid lacerating the intercostal neurovascular bundle.",
    planeDesc: "Transverse axial plane through T4-T5 (Sternal Angle of Louis) demarcates superior and inferior mediastinum.",
  },
  {
    id: "bone-pelvis",
    name: "Pelvic Girdle (Ilium, Ischium, Pubic Symphysis & Sacrum)",
    latin: "Pelvis Major et Pelvis Minor",
    system: "skeletal",
    region: "abdomen-pelvis",
    depthTier: 3,
    view: "anterior",
    coords: { x: 0, y: 0, z: 0 },
    innervation: "Lumbosacral Plexus (L4–S4), Pudendal Nerve (S2–S4), Obturator Nerve",
    bloodSupply: "Internal and External Iliac Arteries, Superior Gluteal Artery",
    clinicalSummary:
      "Transmits upper body weight to femoral heads. High-velocity lateral-compression or open-book pelvic fractures tear the retroperitoneal presacral venous plexus and internal iliac branches, causing rapid exsanguination.",
    mnemonic: "S2, 3, 4 keep the feces and urine off the floor (Pudendal innervation to sphincters)",
    highYieldExamTip:
      "Apply immediate pelvic circumferential binder over greater trochanters to reduce volume and tamponade life-threatening venous hemorrhage.",
    planeDesc: "Pelvic brim (linea terminalis) separates false (greater) abdominal pelvis from true (lesser) pelvic basin.",
  },
  {
    id: "bone-femur",
    name: "Femur & Biaxial Knee Joint Framework",
    latin: "Os Femoris et Articulatio Genus",
    system: "skeletal",
    region: "lower-limb",
    depthTier: 3,
    view: "anterior",
    coords: { x: -14, y: -45, z: 0 },
    innervation: "Femoral Nerve (L2–L4 anterior), Sciatic Nerve (L4–S3 posterior)",
    bloodSupply: "Medial & Lateral Circumflex Femoral Arteries, Profunda Femoris",
    clinicalSummary:
      "Longest and heaviest weight-bearing bone in the human body. Subcapital femoral neck fractures rupture the retinacular branches of the Medial Circumflex Femoral Artery, producing Avascular Necrosis (AVN) of the femoral head.",
    mnemonic: "Medial circumflex femoral artery = Crucial blood supply to femoral head (danger of AVN)",
    highYieldExamTip:
      "Elderly patient with shortened and externally rotated lower extremity following fall = displaced intracapsular femoral neck fracture.",
    planeDesc: "Sagittal plane through hip and knee captures femoral anteversion angle (normal 12-15°) and patellofemoral tracking.",
  },

  // --- 2. MUSCULAR SYSTEM ---
  {
    id: "musc-deltoid",
    name: "Deltoid Muscle (Anterior, Lateral & Posterior Heads)",
    latin: "Musculus Deltoideus",
    system: "muscular",
    region: "upper-limb",
    depthTier: 1,
    view: "anterior",
    coords: { x: -28, y: 46, z: 2 },
    innervation: "Axillary Nerve (C5, C6 posterior cord of brachial plexus)",
    bloodSupply: "Posterior Circumflex Humeral Artery (in quadrangular space)",
    clinicalSummary:
      "Principal abductor of the arm from 15° to 90° (first 15° initiated by supraspinatus; above 90° assisted by trapezius/serratus anterior). Anterior glenohumeral shoulder dislocation or surgical neck humerus fracture damages the axillary nerve, causing deltoid atrophy and sensory loss over the lateral 'sergeant's patch'.",
    mnemonic: "S-D-T: Supraspinatus (0-15°), Deltoid (15-90°), Trapezius (>90°)",
    highYieldExamTip:
      "Intramuscular deltoid vaccines must be administered 2-3 fingerbreadths below the lateral acromion edge to avoid injury to the axillary nerve.",
    planeDesc: "Superficial multipennate shoulder cap draping over the greater tubercle of the humerus.",
  },
  {
    id: "musc-pectoralis",
    name: "Pectoralis Major (Clavicular & Sternocostal Heads)",
    latin: "Musculus Pectoralis Major",
    system: "muscular",
    region: "thorax",
    depthTier: 1,
    view: "anterior",
    coords: { x: 12, y: 41, z: 9 },
    innervation: "Medial & Lateral Pectoral Nerves (C5–T1)",
    bloodSupply: "Pectoral branch of the Thoracoacromial Trunk",
    clinicalSummary:
      "Powerful adductor, internal rotator, and horizontal flexor of the humerus. Bench-press tendon rupture produces sudden pop and anterior axillary ecchymosis. Poland syndrome is congenital unilateral absence of the sternocostal head with ipsilateral syndactyly.",
    mnemonic: "Clavicular head flexes humerus; Sternocostal head extends flexed humerus",
    highYieldExamTip:
      "Forms the anterior axillary fold; deep to it lies the clavipectoral fascia, pectoralis minor, and the axillary sheath.",
    planeDesc: "Coronal chest wall muscle radiating from clavicle and sternum to the lateral lip of the bicipital groove.",
  },
  {
    id: "musc-biceps",
    name: "Biceps Brachii (Long & Short Heads)",
    latin: "Musculus Biceps Brachii",
    system: "muscular",
    region: "upper-limb",
    depthTier: 1,
    view: "anterior",
    coords: { x: -26, y: 28, z: 2 },
    innervation: "Musculocutaneous Nerve (C5, C6 anterior lateral cord)",
    bloodSupply: "Brachial Artery muscular branches",
    clinicalSummary:
      "Most powerful supinator of the flexed forearm and secondary elbow flexor. Rupture of the proximal long head tendon produces the classic 'Popeye' muscle belly retraction into the distal arm.",
    mnemonic: "Biceps supinates to accept soup, then flexes elbow to bring soup to mouth",
    highYieldExamTip: "Biceps deep tendon reflex assesses C5-C6 spinal nerve root integrity.",
    planeDesc: "Long head tendon courses intra-articularly through shoulder joint capsule over humeral head.",
  },
  {
    id: "musc-abdominis",
    name: "Rectus Abdominis & Abdominal Obliques",
    latin: "Musculus Rectus Abdominis et Musculi Obliqui",
    system: "muscular",
    region: "abdomen-pelvis",
    depthTier: 1,
    view: "anterior",
    coords: { x: 0, y: 15, z: 7 },
    innervation: "Intercostal, Subcostal & Iliohypogastric Nerves (T7–L1)",
    bloodSupply: "Superior & Inferior Epigastric Arteries",
    clinicalSummary:
      "Flexes the vertebral column and compresses abdominal viscera. Inferior epigastric artery rupture creates a painful Rectus Sheath Hematoma. Positive Fothergill's sign: an abdominal wall mass remains fixed and palpable when patient flexes rectus muscles.",
    mnemonic: "Fothergill's sign positive = Rectus sheath mass (mass confined by fibrous sheath, does not cross midline)",
    highYieldExamTip:
      "Below the arcuate line (linea semicircularis), all three aponeuroses pass anterior to the rectus muscle, leaving only transversalis fascia posteriorly.",
    planeDesc: "Segmented by 3 horizontal tendinous intersections creating the anatomical '6-pack' columns separated by linea alba.",
  },
  {
    id: "musc-quads",
    name: "Quadriceps Femoris (Rectus Femoris, Vastus Lateralis/Medialis)",
    latin: "Musculus Quadriceps Femoris",
    system: "muscular",
    region: "lower-limb",
    depthTier: 1,
    view: "anterior",
    coords: { x: 14, y: -32, z: 4 },
    innervation: "Femoral Nerve (L2, L3, L4 posterior divisions)",
    bloodSupply: "Lateral Circumflex Femoral Artery & Profunda Femoris",
    clinicalSummary:
      "Primary extensor of the knee joint. Rectus femoris also assists hip flexion because it originates from the Anterior Inferior Iliac Spine (AIIS). Patellar tendon rupture results in high-riding patella (patella alta) and inability to perform straight leg raise.",
    mnemonic: "L3, L4 kick the door = Patellar tendon reflex",
    highYieldExamTip:
      "Vastus medialis oblique (VMO) fibers pull the patella medially, counteracting the natural lateral dislocation vector (Q-angle).",
    planeDesc: "Converges into the robust quadriceps tendon, encapsulating patella and inserting onto the tibial tuberosity.",
  },

  // --- 3. CIRCULATORY & CARDIOVASCULAR SYSTEM ---
  {
    id: "cardio-heart",
    name: "Human Heart (4 Chambers, Coronaries & Conduction System)",
    latin: "Cor Humanum (Myocardium, Atria et Ventriculi)",
    system: "circulatory",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    coords: { x: -3, y: 37, z: 6 },
    innervation: "Cardiac Plexus (Vagus nerve parasympathetic; T1-T5 sympathetic chains)",
    bloodSupply: "Left Anterior Descending (LAD), Right Coronary (RCA), Circumflex Arteries",
    clinicalSummary:
      "Four-chambered muscular pump oriented at 45° with apex pointing anteriorly and leftward. Occlusion of the LAD ('Widowmaker') induces anterior wall STEMI (V1-V4) and cardiogenic shock. Beck's triad of cardiac tamponade: hypotension, elevated jugular venous distension, and muffled heart sounds.",
    mnemonic: "LAD = Anterior wall (leads V1-V4); RCA = Inferior wall (leads II, III, aVF)",
    highYieldExamTip:
      "Left recurrent laryngeal nerve loops under aortic arch and ligamentum arteriosum; compression by mitral stenosis (left atrial enlargement) or aortic aneurysm produces hoarseness (Ortner syndrome).",
    planeDesc: "Coronal 4-chamber view reveals interatrial septum, fossa ovalis, tricuspid/mitral valves, and muscular left ventricle.",
  },
  {
    id: "cardio-aorta",
    name: "Aorta & Great Vessels (Ascending, Arch & Descending Branches)",
    latin: "Aorta Ascendens, Arcus Aortae et Aorta Abdominalis",
    system: "circulatory",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    coords: { x: 0, y: 44, z: 4 },
    innervation: "Aortic Arch Baroreceptors via Vagus Nerve (CN X)",
    bloodSupply: "Originates directly from aortic root above aortic valve",
    clinicalSummary:
      "Systemic vascular trunk. Aortic dissection occurs when an intimal tear admits blood into the media (Stanford Type A: ascending aorta, urgent surgery; Type B: descending aorta, medical beta-blockade). Presents with sudden, severe tearing chest pain radiating to the interscapular back.",
    mnemonic: "Type A = Ascending (Airway/Surgical Emergency); Type B = Below subclavian (Beta-blockers)",
    highYieldExamTip: "Widened mediastinum (>8 cm) on upright chest radiograph in acute chest trauma strongly suggests aortic rupture/dissection.",
    planeDesc: "Three branches of the arch: 1. Brachiocephalic trunk, 2. Left common carotid, 3. Left subclavian artery.",
  },

  // --- 4. RESPIRATORY SYSTEM ---
  {
    id: "resp-lungs",
    name: "Lungs & Tracheobronchial Tree (Trachea, 5 Lobes & Hilum)",
    latin: "Pulmones (Pulmo Dexter 3 Lobi, Pulmo Sinister 2 Lobi)",
    system: "respiratory",
    region: "thorax",
    depthTier: 2,
    view: "anterior",
    coords: { x: 12, y: 38, z: 2 },
    innervation: "Pulmonary Plexus (Vagus nerve bronchoconstrictor; Sympathetic bronchodilator)",
    bloodSupply: "Bronchial Arteries (oxygenates lung parenchyma); Pulmonary Arteries (gas exchange)",
    clinicalSummary:
      "Right lung has 3 lobes (Superior, Middle, Inferior) with horizontal & oblique fissures; Left lung has 2 lobes with cardiac notch and lingula. Tension pneumothorax creates a one-way flutter valve, shifting mediastinum to the contralateral side and kinking the IVC, causing cardiovascular collapse.",
    mnemonic: "Right lung = 3 lobes (R=3); Left lung = 2 lobes (L=2 to leave room for the Heart)",
    highYieldExamTip:
      "In aspirated foreign bodies, objects lodge preferentially in the Right Main Bronchus because it is wider, shorter, and more vertical than the left.",
    planeDesc: "Transverse section through pulmonary hilum shows Pulmonary Artery most superior in left lung and anterior to bronchus in right lung (RALS: Right Anterior, Left Superior).",
  },

  // --- 5. DIGESTIVE & VISCERAL SYSTEM ---
  {
    id: "visc-liver",
    name: "Liver (Hepar) & Biliary Tree (Gallbladder & Portal Triad)",
    latin: "Hepar (Lobus Dexter et Sinister) et Vesica Biliaris",
    system: "digestive",
    region: "abdomen-pelvis",
    depthTier: 2,
    view: "anterior",
    coords: { x: 10, y: 22, z: 6 },
    innervation: "Hepatic Plexus (Celiac ganglion sympathetics; Vagus nerve parasympathetics)",
    bloodSupply: "75% Hepatic Portal Vein (nutrient-rich), 25% Hepatic Artery Proper (oxygen-rich)",
    clinicalSummary:
      "Largest visceral metabolic organ. Cirrhosis causes portal hypertension and portosystemic shunts: esophageal varices (fatal bleeding via left gastric vein), caput medusae (paraumbilical veins), and hemorrhoids (superior rectal vein). Positive Murphy's sign indicates acute cholecystitis.",
    mnemonic: "Portal Triad: Portal vein (posterior), Hepatic artery proper (anteromedial), Common bile duct (anterolateral)",
    highYieldExamTip:
      "Pringle maneuver temporarily compresses the hepatoduodenal ligament to control catastrophic liver trauma hemorrhage; if bleeding persists, suspect IVC or hepatic vein laceration.",
    planeDesc: "Coronal view reveals Couinaud's 8 independent functional segments, each with its own vascular and biliary pedicle.",
  },
  {
    id: "visc-stomach",
    name: "Stomach (Gaster), Duodenal C-Loop & Intestines",
    latin: "Gaster, Duodenum, Jejunum, Ileum et Colon",
    system: "digestive",
    region: "abdomen-pelvis",
    depthTier: 2,
    view: "anterior",
    coords: { x: -8, y: 19, z: 6 },
    innervation: "Anterior & Posterior Vagal Trunks (CN X; increases gastric motility and acid)",
    bloodSupply: "Celiac Trunk branches: Left Gastric, Splenic, and Common Hepatic Arteries",
    clinicalSummary:
      "J-shaped muscular digestive reservoir. Posterior duodenal wall ulcer erodes into the Gastroduodenal Artery, causing massive hematemesis. Acute appendicitis starts with dull periumbilical pain (visceral T10 afferents) that shifts to sharp somatic pain at McBurney's point (1/3 from ASIS to umbilicus).",
    mnemonic: "Parietal cells secrete Intrinsic Factor (for B12 absorption in terminal ileum) and HCl (inhibited by PPIs)",
    highYieldExamTip:
      "Perforated gastric/duodenal ulcer shows crescent of free subdiaphragmatic air (pneumoperitoneum) on upright chest radiograph.",
    planeDesc: "Shows greater curvature, lesser curvature, pyloric sphincter, and the C-loop of duodenum cradling the head of the pancreas.",
  },

  // --- 6. URINARY SYSTEM ---
  {
    id: "visc-kidneys",
    name: "Kidneys (Renes), Suprarenal Glands & Retroperitoneal Ureters",
    latin: "Renes, Glandulae Suprarenales et Ureteres",
    system: "urinary",
    region: "abdomen-pelvis",
    depthTier: 3,
    view: "anterior",
    coords: { x: 10, y: 16, z: -2 },
    innervation: "Renal Plexus (T10–L1 sympathetic splanchnic fibers)",
    bloodSupply: "Renal Arteries arising directly from Abdominal Aorta at L1-L2",
    clinicalSummary:
      "Bilateral retroperitoneal organs filtering metabolic waste and regulating blood pressure via RAAS. The Left Renal Vein crosses anterior to aorta and posterior to Superior Mesenteric Artery (SMA); compression here ('Nutcracker Syndrome') causes hematuria, left flank pain, and left testicular varicocele.",
    mnemonic: "SAD PUCKER: Suprarenal, Aorta/IVC, Duodenum (2-4), Pancreas, Ureters, Colon, Kidneys, Esophagus, Rectum (Retroperitoneal)",
    highYieldExamTip:
      "Renal Cell Carcinoma (Clear Cell) tends to invade the renal vein, propagating as a tumor thrombus into the IVC all the way up to the right atrium.",
    planeDesc: "Coronal bisection reveals outer renal cortex, 8-12 medullary pyramids, minor/major calyces, and renal pelvis.",
  },

  // --- 7. NERVOUS SYSTEM ---
  {
    id: "neuro-brain",
    name: "Brain & Central Nervous System (Cerebrum, Cerebellum & Brainstem)",
    latin: "Encephalon, Cerebrum, Cerebellum et Truncus Encephali",
    system: "nervous",
    region: "head-neck",
    depthTier: 3,
    view: "anterior",
    coords: { x: 0, y: 76, z: 1 },
    innervation: "Origin of all 12 pairs of Cranial Nerves (CN I to CN XII)",
    bloodSupply: "Circle of Willis (Internal Carotid Arteries + Basilar/Vertebral Arteries)",
    clinicalSummary:
      "Central command of cognitive, sensory, and motor function. Saccular (Berry) aneurysm rupture at the Anterior Communicating Artery produces sudden 'worst headache of my life' (Subarachnoid Hemorrhage - SAH with xanthochromia on lumbar puncture).",
    mnemonic: "Worst headache of life + xanthochromia on lumbar puncture = Subarachnoid Hemorrhage",
    highYieldExamTip:
      "Middle Cerebral Artery (MCA) stroke produces contralateral face and arm weakness/sensory loss + aphasia (if dominant hemisphere); Anterior Cerebral Artery (ACA) stroke affects contralateral leg and foot.",
    planeDesc: "Midsagittal view displays corpus callosum, thalamus, 3rd and 4th ventricles, pons, and cerebellum with arbor vitae.",
  },
];

// Helper: Create Anatomical Rib Mesh (12 curved ribs)
function createRibcageGeometry() {
  const group = new THREE.Group();
  const boneMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.35,
    metalness: 0.1,
  });

  // Sternum (Manubrium + Body + Xiphoid)
  const sternumGeom = new THREE.BoxGeometry(3.2, 16, 1.4);
  const sternum = new THREE.Mesh(sternumGeom, boneMat);
  sternum.position.set(0, 39, 10.2);
  group.add(sternum);

  // 10 Pairs of True/False Ribs
  for (let i = 0; i < 10; i++) {
    const yPos = 46 - i * 2.1;
    const widthFactor = 9.5 + Math.sin((i / 9) * Math.PI) * 7.5;
    const depthFactor = 6.0 + Math.sin((i / 9) * Math.PI) * 5.0;

    // Left rib curve
    const curveL = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, yPos + 0.8, -4.5),
      new THREE.Vector3(-widthFactor * 0.7, yPos, -2),
      new THREE.Vector3(-widthFactor, yPos - 1.2, depthFactor * 0.4),
      new THREE.Vector3(-widthFactor * 0.6, yPos - 2.0, depthFactor * 0.9),
      new THREE.Vector3(-1.6, yPos - 2.2, 10.0),
    ]);
    const tubeGeomL = new THREE.TubeGeometry(curveL, 20, 0.45, 8, false);
    group.add(new THREE.Mesh(tubeGeomL, boneMat));

    // Right rib curve
    const curveR = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, yPos + 0.8, -4.5),
      new THREE.Vector3(widthFactor * 0.7, yPos, -2),
      new THREE.Vector3(widthFactor, yPos - 1.2, depthFactor * 0.4),
      new THREE.Vector3(widthFactor * 0.6, yPos - 2.0, depthFactor * 0.9),
      new THREE.Vector3(1.6, yPos - 2.2, 10.0),
    ]);
    const tubeGeomR = new THREE.TubeGeometry(curveR, 20, 0.45, 8, false);
    group.add(new THREE.Mesh(tubeGeomR, boneMat));
  }

  // Clavicles (S-shaped bilateral collarbones)
  const clavL = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.8, 48.5, 9.8),
    new THREE.Vector3(-12, 49.5, 7.5),
    new THREE.Vector3(-22, 48.0, 3.0),
  ]);
  const clavR = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.8, 48.5, 9.8),
    new THREE.Vector3(12, 49.5, 7.5),
    new THREE.Vector3(22, 48.0, 3.0),
  ]);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(clavL, 16, 0.7, 8, false), boneMat));
  group.add(new THREE.Mesh(new THREE.TubeGeometry(clavR, 16, 0.7, 8, false), boneMat));

  return group;
}

// Helper: Create Anatomical Vertebral Column (Cervical, Thoracic, Lumbar)
function createSpineGeometry() {
  const group = new THREE.Group();
  const boneMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.4,
    metalness: 0.05,
  });
  const discMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.6,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85,
  });

  // 24 Vertebrae from Y = 66 (C1 atlas) down to Y = 5 (L5)
  for (let i = 0; i < 24; i++) {
    const y = 66 - i * 2.6;
    const zOffset = Math.sin((i / 23) * Math.PI * 2) * 2.2 - 4.5;
    const scale = 1.0 + (i / 24) * 0.8;

    // Vertebral body
    const vert = new THREE.Mesh(new THREE.CylinderGeometry(2.0 * scale, 2.2 * scale, 1.8, 12), boneMat);
    vert.position.set(0, y, zOffset);
    group.add(vert);

    // Spinous process pointing posteriorly
    const spinous = new THREE.Mesh(new THREE.ConeGeometry(0.8 * scale, 3.0 * scale, 6), boneMat);
    spinous.rotation.x = -Math.PI / 2.2;
    spinous.position.set(0, y, zOffset - 2.8 * scale);
    group.add(spinous);

    // Intervertebral disc
    if (i < 23) {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.9 * scale, 1.9 * scale, 0.7, 12), discMat);
      disc.position.set(0, y - 1.25, zOffset);
      group.add(disc);
    }
  }

  // Sacrum & Coccyx
  const sacrum = new THREE.Mesh(new THREE.ConeGeometry(5.5, 11, 8), boneMat);
  sacrum.rotation.x = Math.PI;
  sacrum.position.set(0, -1, -3.5);
  group.add(sacrum);

  return group;
}

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

  // Cogni Muscle Stepper: 1 = Superficial, 2 = Intermediate/Viscera, 3 = Deep Skeleton & Neurovascular
  const [muscleTier, setMuscleTier] = useState(1);

  // Cogni Section Planes ('coronal' | 'sagittal' | 'transverse')
  const [activePlane, setActivePlane] = useState("coronal");

  // Regional Camera Presets ('whole-body' | 'head-neck' | 'thorax' | 'abdomen-pelvis' | 'upper-limb' | 'lower-limb')
  const [presetRegion, setPresetRegion] = useState("whole-body");

  // Visual Controls
  const [isXrayMode, setIsXrayMode] = useState(false);
  const [explodeSpacing, setExplodeSpacing] = useState(0); // 0 to 45px
  const [autoRotate, setAutoRotate] = useState(false);
  const [heartPulse, setHeartPulse] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // Workstation Expand Mode

  // Selection & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStructure, setSelectedStructure] = useState(COGNI_ANATOMICAL_DATA[5]); // Default to Heart
  const [hoveredName, setHoveredName] = useState("");

  // Canvas & Three.js Refs
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameRef = useRef(null);
  const groupsRef = useRef({});
  const interactiveMeshesRef = useRef([]);
  const heartMeshRef = useRef(null);
  const highlightMeshRef = useRef(null);
  const planeHelperRef = useRef(null);

  // Target camera position for smooth camera tweening
  const targetCamPosRef = useRef(new THREE.Vector3(0, 8, 220));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  function toggleSystem(sysKey) {
    setSystems((prev) => ({ ...prev, [sysKey]: !prev[sysKey] }));
  }

  const handleSelectStructure = useCallback((item) => {
    setSelectedStructure(item);
    if (onAwardXp) onAwardXp(20);
  }, [onAwardXp]);

  // Filter Structures based on search & active systems
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

  // Camera preset positions
  useEffect(() => {
    switch (presetRegion) {
      case "head-neck":
        targetCamPosRef.current.set(0, 75, 75);
        targetLookAtRef.current.set(0, 75, 0);
        break;
      case "thorax":
        targetCamPosRef.current.set(0, 38, 90);
        targetLookAtRef.current.set(0, 38, 0);
        break;
      case "abdomen-pelvis":
        targetCamPosRef.current.set(0, 10, 100);
        targetLookAtRef.current.set(0, 10, 0);
        break;
      case "upper-limb":
        targetCamPosRef.current.set(-25, 32, 90);
        targetLookAtRef.current.set(-25, 30, 0);
        break;
      case "lower-limb":
        targetCamPosRef.current.set(0, -42, 125);
        targetLookAtRef.current.set(0, -42, 0);
        break;
      case "whole-body":
      default:
        targetCamPosRef.current.set(0, 6, 215);
        targetLookAtRef.current.set(0, 0, 0);
        break;
    }
  }, [presetRegion]);

  // =========================================================================
  // INITIALIZE THREE.JS HIGH-FIDELITY MEDICAL WORKSTATION
  // =========================================================================
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 700;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06080e);

    // Subtle anatomical studio grid
    const grid = new THREE.GridHelper(180, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -90;
    scene.add(grid);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.copy(targetCamPosRef.current);
    cameraRef.current = camera;

    // 3. Renderer with high dynamic range lighting & shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 450;
    controls.minDistance = 30;
    controls.target.copy(targetLookAtRef.current);
    controlsRef.current = controls;

    // 5. Medical Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(60, 100, 90);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-60, 40, -50);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff1744, 0.7);
    rimLight.position.set(0, -60, -90);
    scene.add(rimLight);

    // =========================================================================
    // BUILD HIGH-FIDELITY MEDICAL ANATOMICAL MESHES
    // =========================================================================
    interactiveMeshesRef.current = [];
    const groups = {
      silhouette: new THREE.Group(),
      skeletal: new THREE.Group(),
      muscular: new THREE.Group(),
      circulatory: new THREE.Group(),
      respiratory: new THREE.Group(),
      digestive: new THREE.Group(),
      urinary: new THREE.Group(),
      nervous: new THREE.Group(),
    };
    groupsRef.current = groups;
    Object.values(groups).forEach((grp) => scene.add(grp));

    // Helper: Register interactive mesh
    function registerInteractive(mesh, structureId, name) {
      mesh.userData = { structureId, name };
      interactiveMeshesRef.current.push(mesh);
    }

    // --- A. ADULT TRANSLUCENT HUMAN SILHOUETTE ---
    const silhouetteMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.18,
      transmission: 0.65,
      depthWrite: false,
    });

    // Head / Cranial Envelope
    const headSil = new THREE.Mesh(new THREE.SphereGeometry(12.5, 32, 24), silhouetteMat);
    headSil.scale.set(1.0, 1.25, 1.15);
    headSil.position.set(0, 76, 0);
    groups.silhouette.add(headSil);

    // Neck
    const neckSil = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 6.8, 12, 24), silhouetteMat);
    neckSil.position.set(0, 61, 0);
    groups.silhouette.add(neckSil);

    // Torso / Chest & Abdomen (Adult athletic human proportions)
    const torsoSil = new THREE.Mesh(new THREE.CylinderGeometry(19, 14, 52, 32), silhouetteMat);
    torsoSil.scale.set(1.15, 1.0, 0.75);
    torsoSil.position.set(0, 31, 0);
    groups.silhouette.add(torsoSil);

    // Pelvic Contours
    const pelvisSil = new THREE.Mesh(new THREE.CylinderGeometry(14, 16.5, 20, 32), silhouetteMat);
    pelvisSil.scale.set(1.18, 1.0, 0.82);
    pelvisSil.position.set(0, -3, 0);
    groups.silhouette.add(pelvisSil);

    // Shoulders & Arms
    [-1, 1].forEach((dir) => {
      // Deltoid curve
      const shld = new THREE.Mesh(new THREE.SphereGeometry(7.5, 24, 20), silhouetteMat);
      shld.position.set(dir * 25, 48, 0);
      groups.silhouette.add(shld);

      // Arm
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 4.2, 32, 20), silhouetteMat);
      arm.position.set(dir * 26, 28, 0);
      groups.silhouette.add(arm);

      // Forearm & Hand
      const forearm = new THREE.Mesh(new THREE.CylinderGeometry(4.0, 2.8, 30, 20), silhouetteMat);
      forearm.position.set(dir * 26, -3, 0);
      groups.silhouette.add(forearm);

      // Thigh (Femoral contour)
      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(9.0, 6.2, 44, 24), silhouetteMat);
      thigh.position.set(dir * 12.5, -31, 0);
      groups.silhouette.add(thigh);

      // Lower Leg (Calf & Tibia)
      const calf = new THREE.Mesh(new THREE.CylinderGeometry(5.8, 3.8, 44, 24), silhouetteMat);
      calf.position.set(dir * 12.5, -69, 0);
      groups.silhouette.add(calf);

      // Foot
      const foot = new THREE.Mesh(new THREE.BoxGeometry(7, 4.5, 16), silhouetteMat);
      foot.position.set(dir * 12.5, -89, 4);
      groups.silhouette.add(foot);
    });

    // --- B. SKELETAL SYSTEM ---
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.08 });

    // 1. Skull (`bone-cranium`)
    const craniumMesh = new THREE.Mesh(new THREE.SphereGeometry(10.8, 32, 24), boneMat);
    craniumMesh.scale.set(1.0, 1.18, 1.15);
    craniumMesh.position.set(0, 77, 0);
    registerInteractive(craniumMesh, "bone-cranium", "Cranium & Skull");
    groups.skeletal.add(craniumMesh);

    // Facial skeleton & Mandible
    const mandible = new THREE.Mesh(new THREE.BoxGeometry(8.5, 5.5, 7.5), boneMat);
    mandible.position.set(0, 69, 5.5);
    registerInteractive(mandible, "bone-cranium", "Mandible & Facial Bones");
    groups.skeletal.add(mandible);

    // Orbital eye cavities
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x090b10 });
    [-1, 1].forEach((dir) => {
      const orbit = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 16), orbitMat);
      orbit.position.set(dir * 3.6, 75, 10.2);
      groups.skeletal.add(orbit);
    });

    // 2. Ribcage (`bone-ribs`)
    const ribcage = createRibcageGeometry();
    ribcage.traverse((child) => {
      if (child.isMesh) registerInteractive(child, "bone-ribs", "Thoracic Cage & Ribs");
    });
    groups.skeletal.add(ribcage);

    // 3. Spine (`bone-spine`)
    const spine = createSpineGeometry();
    spine.traverse((child) => {
      if (child.isMesh) registerInteractive(child, "bone-spine", "Vertebral Column");
    });
    groups.skeletal.add(spine);

    // 4. Pelvic Girdle (`bone-pelvis`)
    const pelvisGeom = new THREE.TorusGeometry(12, 3.2, 16, 32);
    const pelvisMesh = new THREE.Mesh(pelvisGeom, boneMat);
    pelvisMesh.rotation.x = Math.PI / 2.2;
    pelvisMesh.position.set(0, 0, 0);
    registerInteractive(pelvisMesh, "bone-pelvis", "Pelvic Girdle");
    groups.skeletal.add(pelvisMesh);

    // 5. Femur & Knee Bones (`bone-femur`)
    [-1, 1].forEach((dir) => {
      // Femur shaft & head
      const femur = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.2, 40, 16), boneMat);
      femur.position.set(dir * 13, -29, 0);
      registerInteractive(femur, "bone-femur", "Femur (Thigh Bone)");
      groups.skeletal.add(femur);

      // Femoral head angled into acetabulum
      const femHead = new THREE.Mesh(new THREE.SphereGeometry(3.4, 16, 16), boneMat);
      femHead.position.set(dir * 8.5, -11, 0);
      groups.skeletal.add(femHead);

      // Patella
      const patella = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 16), boneMat);
      patella.scale.set(1.0, 1.2, 0.6);
      patella.position.set(dir * 13, -48, 3.2);
      registerInteractive(patella, "bone-femur", "Patella (Kneecap)");
      groups.skeletal.add(patella);

      // Tibia & Fibula
      const tibia = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 1.8, 38, 16), boneMat);
      tibia.position.set(dir * 12.2, -68, 0);
      groups.skeletal.add(tibia);

      const fibula = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.7, 36, 12), boneMat);
      fibula.position.set(dir * 15.5, -68, -0.6);
      groups.skeletal.add(fibula);

      // Humerus
      const humerus = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.6, 28, 16), boneMat);
      humerus.position.set(dir * 25, 30, 0);
      groups.skeletal.add(humerus);

      // Radius & Ulna
      const forearmBones = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.2, 26, 16), boneMat);
      forearmBones.position.set(dir * 25, 0, 0);
      groups.skeletal.add(forearmBones);
    });

    // --- C. MUSCULAR SYSTEM ---
    const muscleMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.5,
      metalness: 0.1,
    });

    // 1. Pectoralis Major (`musc-pectoralis`)
    [-1, 1].forEach((dir) => {
      const pec = new THREE.Mesh(new THREE.BoxGeometry(11, 8.5, 3.5), muscleMat);
      pec.rotation.z = dir * 0.15;
      pec.position.set(dir * 7.5, 41, 9.5);
      registerInteractive(pec, "musc-pectoralis", "Pectoralis Major");
      groups.muscular.add(pec);
    });

    // 2. Deltoids (`musc-deltoid`)
    [-1, 1].forEach((dir) => {
      const deltoid = new THREE.Mesh(new THREE.SphereGeometry(6.8, 20, 16), muscleMat);
      deltoid.scale.set(1.1, 1.4, 1.0);
      deltoid.position.set(dir * 25, 47, 0);
      registerInteractive(deltoid, "musc-deltoid", "Deltoid Muscle");
      groups.muscular.add(deltoid);
    });

    // 3. Biceps Brachii (`musc-biceps`)
    [-1, 1].forEach((dir) => {
      const bicep = new THREE.Mesh(new THREE.CapsuleGeometry(3.0, 14, 16, 16), muscleMat);
      bicep.position.set(dir * 25, 30, 1.8);
      registerInteractive(bicep, "musc-biceps", "Biceps Brachii");
      groups.muscular.add(bicep);
    });

    // 4. Rectus Abdominis (`musc-abdominis`) - 8 Pack Segments
    for (let r = 0; r < 4; r++) {
      const y = 25 - r * 5.2;
      [-1, 1].forEach((dir) => {
        const ab = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.8, 2.0), muscleMat);
        ab.position.set(dir * 2.8, y, 7.8);
        registerInteractive(ab, "musc-abdominis", "Rectus Abdominis (6-Pack)");
        groups.muscular.add(ab);
      });
    }

    // 5. Quadriceps Femoris (`musc-quads`)
    [-1, 1].forEach((dir) => {
      const quad = new THREE.Mesh(new THREE.CapsuleGeometry(5.2, 22, 16, 16), muscleMat);
      quad.position.set(dir * 13, -30, 2.8);
      registerInteractive(quad, "musc-quads", "Quadriceps Femoris");
      groups.muscular.add(quad);
    });

    // --- D. CARDIOVASCULAR SYSTEM ---
    // 1. Anatomical Heart (`cardio-heart`)
    const heartGroup = new THREE.Group();
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff1744,
      roughness: 0.3,
      metalness: 0.15,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.4,
    });
    // Ventricles & Atria (tilted 45° towards apex)
    const ventricles = new THREE.Mesh(new THREE.ConeGeometry(5.2, 10, 24), heartMat);
    ventricles.rotation.z = Math.PI / 1.15;
    ventricles.position.set(0, 0, 0);
    heartGroup.add(ventricles);

    const atria = new THREE.Mesh(new THREE.SphereGeometry(4.6, 24, 20), heartMat);
    atria.position.set(0.8, 3.8, 0);
    heartGroup.add(atria);

    // Coronary LAD branch (etched across anterior groove)
    const ladCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, 4.0, 3.8),
      new THREE.Vector3(-0.8, 1.0, 4.0),
      new THREE.Vector3(-2.8, -3.0, 2.5),
    ]);
    const ladMesh = new THREE.Mesh(
      new THREE.TubeGeometry(ladCurve, 16, 0.45, 8, false),
      new THREE.MeshBasicMaterial({ color: 0xff4569 })
    );
    heartGroup.add(ladMesh);

    heartGroup.position.set(-3.2, 38, 6.0);
    registerInteractive(ventricles, "cardio-heart", "Human Heart (Left Ventricle)");
    registerInteractive(atria, "cardio-heart", "Human Heart (Atria)");
    heartMeshRef.current = heartGroup;
    groups.circulatory.add(heartGroup);

    // 2. Aortic Arch & Great Vessels (`cardio-aorta`)
    const aortaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 41, 6.0),
      new THREE.Vector3(-0.5, 48, 5.0),
      new THREE.Vector3(2.5, 48, 2.0),
      new THREE.Vector3(1.0, 42, -1.0),
      new THREE.Vector3(0.5, 20, -2.5),
      new THREE.Vector3(0.0, 2, -2.5),
    ]);
    const aortaMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.3,
      metalness: 0.1,
      emissive: 0x991b1b,
      emissiveIntensity: 0.2,
    });
    const aortaMesh = new THREE.Mesh(new THREE.TubeGeometry(aortaCurve, 32, 1.4, 16, false), aortaMat);
    registerInteractive(aortaMesh, "cardio-aorta", "Aorta & Great Vessels");
    groups.circulatory.add(aortaMesh);

    // --- E. RESPIRATORY SYSTEM (`resp-lungs`) ---
    const lungMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.55,
      metalness: 0.05,
      transparent: true,
      opacity: 0.88,
    });

    // Right Lung (3 distinct lobes)
    const rLungSup = new THREE.Mesh(new THREE.SphereGeometry(5.8, 20, 16), lungMat);
    rLungSup.scale.set(1.0, 1.6, 0.85);
    rLungSup.position.set(11.5, 40, 2.5);
    registerInteractive(rLungSup, "resp-lungs", "Right Lung (Superior & Middle Lobes)");
    groups.respiratory.add(rLungSup);

    // Left Lung (2 lobes with cardiac notch)
    const lLung = new THREE.Mesh(new THREE.SphereGeometry(5.5, 20, 16), lungMat);
    lLung.scale.set(0.9, 1.55, 0.85);
    lLung.position.set(-11.5, 40, 2.5);
    registerInteractive(lLung, "resp-lungs", "Left Lung (with Cardiac Notch)");
    groups.respiratory.add(lLung);

    // Trachea with cartilaginous rings
    const trachea = new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 14, 16),
      new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.4 })
    );
    trachea.position.set(0, 54, 3.5);
    groups.respiratory.add(trachea);

    // --- F. DIGESTIVE SYSTEM (`visc-liver`, `visc-stomach`) ---
    // 1. Liver (`visc-liver`)
    const liverGeom = new THREE.CylinderGeometry(3.5, 12, 9, 20);
    const liverMat = new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.45 });
    const liver = new THREE.Mesh(liverGeom, liverMat);
    liver.rotation.z = -Math.PI / 3.8;
    liver.position.set(8.5, 23, 5.0);
    registerInteractive(liver, "visc-liver", "Liver (Hepar & Portal Triad)");
    groups.digestive.add(liver);

    // 2. Stomach (`visc-stomach`)
    const stomachCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 27, 4),
      new THREE.Vector3(-9, 24, 5),
      new THREE.Vector3(-8, 16, 5),
      new THREE.Vector3(-1, 16, 4.5),
    ]);
    const stomachMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
    const stomach = new THREE.Mesh(new THREE.TubeGeometry(stomachCurve, 24, 3.2, 16, false), stomachMat);
    registerInteractive(stomach, "visc-stomach", "Stomach (Gaster)");
    groups.digestive.add(stomach);

    // 3. Intestines
    const bowelMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5 });
    const intestines = new THREE.Mesh(new THREE.SphereGeometry(9, 24, 18), bowelMat);
    intestines.scale.set(1.1, 0.85, 0.65);
    intestines.position.set(0, 7, 4.5);
    registerInteractive(intestines, "visc-stomach", "Small & Large Intestines");
    groups.digestive.add(intestines);

    // --- G. URINARY SYSTEM (`visc-kidneys`) ---
    const kidneyMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.4 });
    [-1, 1].forEach((dir) => {
      const kidney = new THREE.Mesh(new THREE.SphereGeometry(3.2, 18, 16), kidneyMat);
      kidney.scale.set(0.7, 1.4, 0.85);
      kidney.position.set(dir * 9.5, 17 - (dir > 0 ? 1.5 : 0), -1.5);
      registerInteractive(kidney, "visc-kidneys", dir > 0 ? "Right Kidney (Ren Dexter)" : "Left Kidney (Ren Sinister)");
      groups.urinary.add(kidney);

      // Ureter
      const ureter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 20, 8),
        new THREE.MeshBasicMaterial({ color: 0xfef08a })
      );
      ureter.position.set(dir * 6.5, 7, 0.5);
      groups.urinary.add(ureter);
    });

    // --- H. NERVOUS SYSTEM (`neuro-brain`) ---
    const brainMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      roughness: 0.45,
      emissive: 0x581c87,
      emissiveIntensity: 0.35,
    });
    const cerebrum = new THREE.Mesh(new THREE.SphereGeometry(9.2, 28, 20), brainMat);
    cerebrum.scale.set(0.95, 1.05, 1.15);
    cerebrum.position.set(0, 77.5, 0);
    registerInteractive(cerebrum, "neuro-brain", "Cerebrum & Encephalon");
    groups.nervous.add(cerebrum);

    const spinalCord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.7, 72, 12),
      new THREE.MeshBasicMaterial({ color: 0xe9d5ff })
    );
    spinalCord.position.set(0, 36, -3.8);
    groups.nervous.add(spinalCord);

    // --- I. SELECTION HIGHLIGHT PULSE RING ---
    const ringGeom = new THREE.RingGeometry(5.5, 6.2, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff1744,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const highlightRing = new THREE.Mesh(ringGeom, ringMat);
    highlightRing.visible = false;
    scene.add(highlightRing);
    highlightMeshRef.current = highlightRing;

    // --- J. SECTION CUTTING PLANE HELPER ---
    const planeGeom = new THREE.PlaneGeometry(80, 140);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const planeHelper = new THREE.Mesh(planeGeom, planeMat);
    planeHelper.position.set(0, 15, 0);
    planeHelper.visible = false;
    scene.add(planeHelper);
    planeHelperRef.current = planeHelper;

    // =========================================================================
    // RAYCASTING CLICK & HOVER HANDLER
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);

      if (intersects.length > 0) {
        container.style.cursor = "pointer";
        const hit = intersects[0].object;
        setHoveredName(hit.userData.name || "");
      } else {
        container.style.cursor = "grab";
        setHoveredName("");
      }
    }

    function onPointerDown(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const sId = hit.userData.structureId;
        const found = COGNI_ANATOMICAL_DATA.find((x) => x.id === sId);
        if (found) {
          handleSelectStructure(found);
        }
      }
    }

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // =========================================================================
    // RENDER / ANIMATION LOOP
    // =========================================================================
    let clock = new THREE.Clock();

    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Smooth camera interpolation towards target preset
      camera.position.lerp(targetCamPosRef.current, 0.05);
      controls.target.lerp(targetLookAtRef.current, 0.05);
      controls.update();

      // 3D Auto-Rotation
      if (autoRotate) {
        scene.rotation.y += 0.008;
      }

      // Anatomical Cardiac Pulse (Systole / Diastole)
      if (heartPulse && heartMeshRef.current) {
        const beat = 1.0 + Math.sin(time * 7) * 0.06 * Math.max(0, Math.sin(time * 7));
        heartMeshRef.current.scale.set(beat, beat, beat);
      }

      // Selection Ring Animation
      if (highlightMeshRef.current && highlightMeshRef.current.visible) {
        highlightMeshRef.current.rotation.z += 0.02;
        const pulse = 1.0 + Math.sin(time * 6) * 0.12;
        highlightMeshRef.current.scale.set(pulse, pulse, 1);
      }

      renderer.render(scene, camera);
    }
    animate();

    // Resize Observer for dynamic fluid scaling
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      controls.dispose();
      renderer.dispose();
    };
  }, [handleSelectStructure, autoRotate, heartPulse]);

  // =========================================================================
  // UPDATE 3D SCENE VISIBILITY, EXPLODE, X-RAY & SECTION PLANES
  // =========================================================================
  useEffect(() => {
    const groups = groupsRef.current;
    if (!groups || !groups.skeletal) return;

    // 1. Systems Visibility toggles
    groups.skeletal.visible = systems.skeletal;
    groups.muscular.visible = systems.muscular && muscleTier < 3;
    groups.circulatory.visible = systems.circulatory;
    groups.respiratory.visible = systems.respiratory;
    groups.digestive.visible = systems.digestive;
    groups.urinary.visible = systems.urinary;
    groups.nervous.visible = systems.nervous;

    // Muscle Tier adjustments
    if (systems.muscular && groups.muscular) {
      groups.muscular.children.forEach((child) => {
        if (child.material) {
          child.material.opacity = muscleTier === 1 ? 0.95 : 0.45;
          child.material.transparent = muscleTier === 2;
        }
      });
    }

    // 2. 3D Explode Spacing (separates body systems along 3D axes)
    const factor = explodeSpacing * 0.4;
    groups.skeletal.position.z = -factor * 0.8;
    groups.circulatory.position.z = factor * 1.2;
    groups.respiratory.position.z = factor * 0.9;
    groups.digestive.position.z = factor * 1.0;
    groups.nervous.position.z = -factor * 1.1;

    // 3. X-Ray Radiograph Shaders toggle
    const xrayColor = new THREE.Color(0x38bdf8);
    const normalBoneColor = new THREE.Color(0xf8fafc);
    const normalMuscleColor = new THREE.Color(0x991b1b);

    groups.skeletal.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color = isXrayMode ? xrayColor : normalBoneColor;
        child.material.emissive = isXrayMode ? new THREE.Color(0x0284c7) : new THREE.Color(0x000000);
        child.material.emissiveIntensity = isXrayMode ? 0.45 : 0;
        child.material.wireframe = isXrayMode;
      }
    });

    groups.muscular.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color = isXrayMode ? xrayColor : normalMuscleColor;
        child.material.opacity = isXrayMode ? 0.25 : muscleTier === 1 ? 0.95 : 0.45;
        child.material.transparent = true;
      }
    });

    // 4. Section Plane Visualizer Helper
    if (planeHelperRef.current) {
      planeHelperRef.current.visible = true;
      if (activePlane === "coronal") {
        planeHelperRef.current.rotation.set(0, 0, 0); // Frontal cutting plane
      } else if (activePlane === "sagittal") {
        planeHelperRef.current.rotation.set(0, Math.PI / 2, 0); // Midline cut
      } else if (activePlane === "transverse") {
        planeHelperRef.current.rotation.set(Math.PI / 2, 0, 0); // Axial slice
      }
    }

    // 5. Update Selection Ring Position
    if (highlightMeshRef.current && selectedStructure?.coords) {
      highlightMeshRef.current.visible = true;
      highlightMeshRef.current.position.set(
        selectedStructure.coords.x,
        selectedStructure.coords.y,
        selectedStructure.coords.z + 8
      );
    }
  }, [systems, muscleTier, explodeSpacing, isXrayMode, activePlane, selectedStructure]);

  return (
    <div className={`lab-page-container ${isExpanded ? "expanded-workstation" : ""}`}>
      {/* HEADER BANNER */}
      <div className="lab-header-banner mbbs-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">🧬</div>
          <div>
            <div className="lab-eyebrow">HIGH-FIDELITY MEDICAL WORKSTATION</div>
            <h2>Cogni 3D Anatomical Atlas & Surgical Dissector</h2>
            <p>
              High-definition adult human 3D body with multi-layer dissection, real 3D orbital inspection, exploding organ systems, and USMLE/NEET-PG high-yield pathology.
            </p>
          </div>
        </div>

        {/* REGIONAL CAMERA FOCUS PRESETS */}
        <div className="lab-nav-pills">
          {[
            { id: "whole-body", label: "Whole Body (Full Frame)" },
            { id: "head-neck", label: "Cranium & Head" },
            { id: "thorax", label: "Cardiopulmonary Thorax" },
            { id: "abdomen-pelvis", label: "Abdomen & Pelvis" },
            { id: "upper-limb", label: "Shoulder & Arm" },
            { id: "lower-limb", label: "Femur & Knee" },
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

      {/* WORKSPACE 3-COLUMN MEDICAL GRID */}
      <div className={`cogni-workspace-grid ${isExpanded ? "expanded" : ""}`}>
        {/* LEFT COLUMN: COGNI DISSECTION TOOLBAR & SYSTEMS */}
        <aside className="cogni-tools-column">
          {/* SEARCH AUTOCOMPLETE */}
          <div className="anatomy-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search organ, bone, or nerve (e.g. Heart, LAD, Pterion)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" className="clear-search" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>

          {/* COGNI MUSCLE LAYER STEPPER */}
          <div className="cogni-tool-card">
            <div className="cogni-tool-title">
              <span>🪜</span> Muscle Layer Stepper (Cogni Dissection)
            </div>
            <p className="tool-sub">Peel superficial muscle groups down to deep skeleton & viscera</p>
            <div className="layer-stepper-row">
              <button
                type="button"
                className={`stepper-btn ${muscleTier === 1 ? "active" : ""}`}
                onClick={() => setMuscleTier(1)}
              >
                1. Superficial
              </button>
              <button
                type="button"
                className={`stepper-btn ${muscleTier === 2 ? "active" : ""}`}
                onClick={() => setMuscleTier(2)}
              >
                2. Intermediate
              </button>
              <button
                type="button"
                className={`stepper-btn ${muscleTier === 3 ? "active" : ""}`}
                onClick={() => setMuscleTier(3)}
              >
                3. Deep Skeleton
              </button>
            </div>
          </div>

          {/* COGNI SECTION PLANES */}
          <div className="cogni-tool-card">
            <div className="cogni-tool-title">
              <span>📐</span> Section Dissection Planes (CT / MRI Slices)
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
                Sagittal (Midline)
              </button>
              <button
                type="button"
                className={`plane-btn ${activePlane === "transverse" ? "active" : ""}`}
                onClick={() => setActivePlane("transverse")}
              >
                Transverse (Axial)
              </button>
            </div>
          </div>

          {/* 3D EXPLODE & X-RAY SLIDERS */}
          <div className="cogni-tool-card">
            <div className="cogni-tool-title">
              <span>💥</span> 3D Radial Explode & Holographic Mode
            </div>
            <div className="slider-wrapper">
              <div className="slider-label">
                <span>Explode Spacing:</span>
                <strong>{explodeSpacing}px</strong>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="5"
                value={explodeSpacing}
                onChange={(e) => setExplodeSpacing(Number(e.target.value))}
                className="custom-range"
              />
            </div>

            <div className="xray-toggle-row">
              <span>⚡ Holographic X-Ray Scan:</span>
              <button
                type="button"
                className={`xray-btn ${isXrayMode ? "on" : "off"}`}
                onClick={() => setIsXrayMode(!isXrayMode)}
              >
                {isXrayMode ? "⚡ RADIOGRAPH ON" : "STANDARD RGB"}
              </button>
            </div>
          </div>

          {/* 7 MAJOR COGNI BODY SYSTEMS CHECKLIST */}
          <div className="cogni-systems-card">
            <div className="cogni-tool-title">
              <span>🗂️</span> Anatomical Systems ({visibleStructures.length} Parts Active)
            </div>
            <div className="systems-checklist-grid">
              {[
                { id: "skeletal", label: "Skeletal Framework (Bones & Joints)", icon: "🦴" },
                { id: "muscular", label: "Striated Muscular System", icon: "💪" },
                { id: "circulatory", label: "Cardiovascular (Heart & Aorta)", icon: "🫀" },
                { id: "respiratory", label: "Respiratory (Trachea & Lungs)", icon: "🫁" },
                { id: "digestive", label: "Digestive (Liver, Stomach, Gut)", icon: "🍔" },
                { id: "nervous", label: "Central Nervous (Brain & Spine)", icon: "🧠" },
                { id: "urinary", label: "Urinary (Kidneys & Ureters)", icon: "💧" },
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

        {/* CENTER COLUMN: HIGH-DEFINITION THREE.JS 3D CANVAS */}
        <section className="cogni-canvas-column">
          {/* HUD TOOLBAR OVERLAY */}
          <div className="canvas-header-strip">
            <div className="canvas-hud-toolbar">
              <button
                type="button"
                className={`canvas-hud-btn ${autoRotate ? "active" : ""}`}
                onClick={() => setAutoRotate(!autoRotate)}
                title="Toggle 360° Slow Orbit Animation"
              >
                🔄 {autoRotate ? "Pause Spin" : "Auto-Rotate 360°"}
              </button>

              <button
                type="button"
                className={`canvas-hud-btn ${heartPulse ? "active" : ""}`}
                onClick={() => setHeartPulse(!heartPulse)}
                title="Toggle Anatomical Cardiac Systole Pulse"
              >
                💓 {heartPulse ? "Heartbeat On" : "Pulse Off"}
              </button>

              <button
                type="button"
                className="canvas-hud-btn"
                onClick={() => {
                  targetCamPosRef.current.set(0, 6, 215);
                  targetLookAtRef.current.set(0, 0, 0);
                  setPresetRegion("whole-body");
                }}
                title="Reset Camera Orientation"
              >
                🎯 Reset View
              </button>

              <button
                type="button"
                className={`canvas-hud-btn ${isExpanded ? "active" : ""}`}
                onClick={() => setIsExpanded(!isExpanded)}
                title="Expand Workstation View"
              >
                {isExpanded ? "↙ Collapse" : "⛶ Full Workstation"}
              </button>
            </div>

            <div className="canvas-hud-badges">
              <span className="hud-badge-info">🖱️ Drag to Orbit 360°</span>
              <span className="hud-badge-info">📜 Scroll to Zoom</span>
              <span className="hud-badge-info">🎯 Click Organ to Inspect</span>
            </div>
          </div>

          {/* THREE.JS 3D WEBGL VIEWPORT */}
          <div className="cogni-viewport-box threejs-container">
            <div ref={mountRef} className="canvas-3d-mount" />

            {/* FLOATING HOVER CALLOUT */}
            {hoveredName && (
              <div className="canvas-hud-tooltip">
                <span>🔍 Inspecting:</span> <strong>{hoveredName}</strong>
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: COGNI CLINICAL CASE FILE */}
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
                        `Cogni 3D Anatomy: ${selectedStructure.name}`,
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
              <p>Click any organ, bone, or muscle in the 3D viewport to inspect surgical relationships.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
