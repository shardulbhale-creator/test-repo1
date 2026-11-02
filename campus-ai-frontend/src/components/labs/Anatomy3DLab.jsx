import { useState } from "react";

// ============================================================================
// HIGH-YIELD MUSCLES DIRECTORY: ORIGIN, INSERTION, ACTION & INNERVATION (O.I.A.I.)
// Core medical school & board exam reference database (USMLE / NEET-PG / PLAB)
// ============================================================================
const HIGH_YIELD_MUSCLES_DIRECTORY = [
  {
    id: "trapezius-muscle",
    name: "Trapezius (Ascending, Middle & Descending)",
    region: "Posterior Neck & Back",
    latin: "Musculus trapezius",
    fmaId: "FMA:9626",
    origin:
      "External occipital protuberance, medial 1/3 of superior nuchal line, ligamentum nuchae, and spinous processes of C7–T12 vertebrae (Ascending part: T4–T12 spines).",
    insertion:
      "Ascending (inferior) part: tubercle at apex of scapular spine. Middle part: medial acromion and superior lip of spine. Descending part: posterior border of lateral 1/3 of clavicle.",
    action:
      "Ascending part: depresses scapula and assists upward rotation. Descending part: elevates scapula. Middle part: retracts scapula. Together: upwardly rotates glenoid cavity for arm abduction >90°.",
    innervation: "Motor: Spinal Accessory Nerve (CN XI). Sensory / Proprioception: Ventral rami of C3 and C4 cervical nerves.",
    bloodSupply: "Transverse Cervical Artery (superficial branch), Dorsal Scapular Artery, Posterior Intercostal Arteries.",
    clinicalPearl:
      "Spinal Accessory Nerve (CN XI) is vulnerable to iatrogenic transection during posterior cervical triangle lymph node biopsy. Damage causes Shoulder Droop, weakness in shrugging against resistance, and impaired abduction above 90° with lateral scapular winging.",
  },
  {
    id: "deltoid-muscle",
    name: "Deltoid",
    region: "Shoulder",
    latin: "Musculus deltoideus",
    fmaId: "FMA:9622",
    origin:
      "Anterior fibers: lateral 1/3 of clavicle. Middle fibers: lateral acromion. Posterior fibers: lower lip of spine of scapula.",
    insertion: "Deltoid tuberosity on the lateral aspect of middle humerus shaft.",
    action:
      "Middle fibers: primary powerful arm abductor from 15° to 90°. Anterior fibers: flexes and medially rotates humerus. Posterior fibers: extends and laterally rotates humerus.",
    innervation: "Axillary Nerve (C5, C6) from posterior cord of brachial plexus.",
    bloodSupply: "Posterior Circumflex Humeral Artery, deltoid branch of thoracoacromial artery.",
    clinicalPearl:
      "Surgical neck fracture of humerus or anterior shoulder dislocation injures the Axillary Nerve, producing deltoid atrophy, loss of abduction (15°–90°), and anesthesia over the lateral shoulder ('regimental badge area').",
  },
  {
    id: "biceps-muscle",
    name: "Biceps Brachii",
    region: "Anterior Arm",
    latin: "Musculus biceps brachii",
    fmaId: "FMA:37670",
    origin:
      "Long head: supraglenoid tubercle of scapula (crosses through shoulder joint capsule). Short head: tip of coracoid process of scapula.",
    insertion: "Radial tuberosity of radius and bicipital aponeurosis into deep fascia of medial forearm.",
    action:
      "Chief powerful supinator of the flexed forearm; flexor of the elbow joint; weak accessory flexor of the shoulder joint.",
    innervation: "Musculocutaneous Nerve (C5, C6).",
    bloodSupply: "Muscular branches of Brachial Artery.",
    clinicalPearl:
      "Biceps tendon reflex evaluates C5–C6 spinal cord integrity. Rupture of the long head tendon causes a prominent distal muscle bulge ('Popeye muscle deformity').",
  },
  {
    id: "triceps-muscle",
    name: "Triceps Brachii",
    region: "Posterior Arm",
    latin: "Musculus triceps brachii",
    fmaId: "FMA:37688",
    origin:
      "Long head: infraglenoid tubercle of scapula. Lateral head: posterior humerus above radial groove. Medial head: posterior humerus below radial groove.",
    insertion: "Proximal surface of olecranon process of ulna and deep fascia of forearm.",
    action: "Chief powerful extensor of the forearm at the elbow joint; long head stabilizes abducted shoulder joint and assists extension/adduction.",
    innervation: "Radial Nerve (C6, C7, C8).",
    bloodSupply: "Profunda Brachii (deep brachial) Artery and superior ulnar collateral artery.",
    clinicalPearl:
      "Triceps deep tendon reflex evaluates C7–C8 nerve roots. Sparing of triceps extension in midshaft humeral fracture occurs because branches to long/lateral heads emerge proximal to the radial groove.",
  },
  {
    id: "pectoralis-major-muscle",
    name: "Pectoralis Major",
    region: "Anterior Chest Wall",
    latin: "Musculus pectoralis major",
    fmaId: "FMA:9627",
    origin:
      "Clavicular head: anterior surface of medial half of clavicle. Sternocostal head: anterior sternum, superior 6 costal cartilages, and aponeurosis of external oblique.",
    insertion: "Lateral lip of intertubercular (bicipital) groove of humerus.",
    action:
      "Adducts and medially rotates humerus; clavicular head flexes humerus; sternocostal head extends flexed humerus back to neutral.",
    innervation: "Lateral Pectoral Nerve (C5–C7) and Medial Pectoral Nerve (C8, T1).",
    bloodSupply: "Pectoral branch of thoracoacromial trunk, lateral thoracic artery.",
    clinicalPearl:
      "Poland syndrome is congenital absence of the sternocostal head of pectoralis major, associated with ipsilateral syndactyly (fused fingers) and hypoplasia of breast tissue.",
  },
  {
    id: "latissimus-dorsi-muscle",
    name: "Latissimus Dorsi",
    region: "Posterior Trunk",
    latin: "Musculus latissimus dorsi",
    fmaId: "FMA:9628",
    origin:
      "Spinous processes T7–T12, thoracolumbar fascia, iliac crest, lower 3–4 ribs, and inferior angle of scapula.",
    insertion: "Floor of intertubercular (bicipital) groove of humerus (lies between pectoralis major and teres major: 'Lady between two majors').",
    action:
      "Extends, adducts, and medially rotates humerus; pulls trunk superiorly during climbing ('climber's muscle'); assists in forceful expiration (coughing).",
    innervation: "Thoracodorsal Nerve (C6, C7, C8) from posterior cord of brachial plexus.",
    bloodSupply: "Thoracodorsal Artery (branch of subscapular artery).",
    clinicalPearl:
      "Frequently utilized as a pedicled or free myocutaneous flap in reconstructive breast and chest wall surgeries due to reliable axial blood supply.",
  },
  {
    id: "serratus-anterior-muscle",
    name: "Serratus Anterior",
    region: "Lateral Thoracic Wall",
    latin: "Musculus serratus anterior",
    fmaId: "FMA:13397",
    origin: "Outer surfaces and superior borders of upper 8 to 9 ribs.",
    insertion: "Costal (anterior) surface of the entire medial border of the scapula.",
    action:
      "Protracts scapula and holds it firmly against the thoracic cage; upwardly rotates glenoid cavity during shoulder abduction above 90° ('boxer's muscle').",
    innervation: "Long Thoracic Nerve of Bell (C5, C6, C7 - 'Wings of heaven').",
    bloodSupply: "Lateral Thoracic Artery and thoracodorsal artery.",
    clinicalPearl:
      "Damage to the long thoracic nerve during mastectomy with axillary lymph node dissection produces Medial Winged Scapula (scapula lifts off thoracic wall when pushing forward against resistance).",
  },
  {
    id: "supraspinatus-muscle",
    name: "Supraspinatus (Rotator Cuff)",
    region: "Shoulder / Rotator Cuff",
    latin: "Musculus supraspinatus",
    fmaId: "FMA:9629",
    origin: "Supraspinous fossa of scapula and overlying supraspinous fascia.",
    insertion: "Superior facet of greater tubercle of humerus and joint capsule.",
    action: "Initiates first 0° to 15° of glenohumeral abduction; stabilizes humeral head firmly in glenoid fossa.",
    innervation: "Suprascapular Nerve (C5, C6) passing through suprascapular notch beneath superior transverse scapular ligament.",
    bloodSupply: "Suprascapular Artery and dorsal scapular artery.",
    clinicalPearl:
      "Most commonly injured rotator cuff tendon due to impingement under the acromion. Diagnosed using 'Empty Can' (Jobe) test: pain and weakness during abduction with thumb pointing downward.",
  },
  {
    id: "infraspinatus-muscle",
    name: "Infraspinatus (Rotator Cuff)",
    region: "Shoulder / Rotator Cuff",
    latin: "Musculus infraspinatus",
    fmaId: "FMA:9630",
    origin: "Infraspinous fossa of scapula and overlying fascia.",
    insertion: "Middle facet of greater tubercle of humerus.",
    action: "Chief lateral (external) rotator of the humerus; stabilizes glenohumeral joint posteriorly.",
    innervation: "Suprascapular Nerve (C5, C6).",
    bloodSupply: "Suprascapular Artery and circumflex scapular artery.",
    clinicalPearl:
      "Evaluated clinically by having patient perform external rotation against resistance with arm adducted by side. Weakness indicates infraspinatus tear or suprascapular neuropathy.",
  },
  {
    id: "subscapularis-muscle",
    name: "Subscapularis (Rotator Cuff)",
    region: "Shoulder / Rotator Cuff",
    latin: "Musculus subscapularis",
    fmaId: "FMA:9632",
    origin: "Subscapular fossa on the anterior (costal) surface of scapula.",
    insertion: "Lesser tubercle of humerus and anterior joint capsule.",
    action: "Chief medial (internal) rotator of the arm; prevents anterior displacement of humeral head.",
    innervation: "Upper and Lower Subscapular Nerves (C5, C6).",
    bloodSupply: "Subscapular Artery.",
    clinicalPearl:
      "Evaluated with 'Lift-Off' (Gerber) test: patient places hand on lumbar back and attempts to push backward away from spine against examiner's resistance.",
  },
  {
    id: "sternocleidomastoid-muscle",
    name: "Sternocleidomastoid (SCM)",
    region: "Anterior Neck",
    latin: "Musculus sternocleidomastoideus",
    fmaId: "FMA:13407",
    origin: "Sternal head: anterior surface of manubrium sterni. Clavicular head: superior surface of medial third of clavicle.",
    insertion: "Lateral surface of mastoid process of temporal bone and lateral half of superior nuchal line.",
    action:
      "Unilateral: tilts head to same side and rotates chin to opposite side. Bilateral: flexes cervical vertebral column; accessory muscle of inspiration.",
    innervation: "Motor: Spinal Accessory Nerve (CN XI). Sensory / Proprioception: Ventral rami of C2 and C3.",
    bloodSupply: "Branches of Superior Thyroid Artery, Occipital Artery, and Posterior Auricular Artery.",
    clinicalPearl:
      "Congenital Torticollis (Wryneck): Fibrous tumor or contracture of SCM leads to ipsilateral head tilt and contralateral face rotation. Often treated with stretching or surgical tenotomy.",
  },
  {
    id: "diaphragm-muscle",
    name: "Diaphragm (Thoracic Diaphragm)",
    region: "Thoracoabdominal Junction",
    latin: "Diaphragma",
    fmaId: "FMA:13295",
    origin:
      "Sternal part: posterior xiphoid process. Costal part: inner surfaces of lower 6 ribs/costal cartilages. Lumbar part: right crus (L1–L3), left crus (L1–L2), medial and lateral arcuate ligaments.",
    insertion: "Central tendon of diaphragm (trifoliate aponeurosis with no bony attachments).",
    action: "Chief muscle of respiration; contraction draws central tendon inferiorly, expanding thoracic volume and generating negative intrathoracic pressure.",
    innervation: "Phrenic Nerve (C3, C4, C5 - 'C3, 4, 5 keeps the diaphragm alive').",
    bloodSupply: "Superior & Inferior Phrenic Arteries, Musculophrenic Artery, and Pericardiacophrenic Artery.",
    clinicalPearl:
      "Diaphragmatic apertures: Caval opening (IVC) at T8; Esophageal hiatus (with vagal trunks) at T10; Aortic hiatus (with thoracic duct & azygos vein) at T12 ('I 8 10 Eggs At 12').",
  },
  {
    id: "rectus-femoris-muscle",
    name: "Rectus Femoris (Quadriceps)",
    region: "Anterior Thigh",
    latin: "Musculus rectus femoris",
    fmaId: "FMA:22428",
    origin: "Straight head: anterior inferior iliac spine (AIIS). Reflected head: groove superior to acetabulum.",
    insertion: "Base of patella and via patellar ligament into tibial tuberosity.",
    action: "Extends leg at knee joint; flexes thigh at hip joint ('kicking muscle').",
    innervation: "Femoral Nerve (L2, L3, L4).",
    bloodSupply: "Lateral Circumflex Femoral Artery.",
    clinicalPearl:
      "Knee jerk reflex tests L3–L4 spinal segments via Femoral Nerve. Sudden eccentric contraction in sprinters/soccer players can cause AIIS avulsion fracture.",
  },
  {
    id: "biceps-femoris-muscle",
    name: "Biceps Femoris (Hamstring)",
    region: "Posterior Thigh",
    latin: "Musculus biceps femoris",
    fmaId: "FMA:22356",
    origin: "Long head: ischial tuberosity. Short head: lateral lip of linea aspera and lateral supracondylar line of femur.",
    insertion: "Lateral aspect of head of fibula.",
    action: "Flexes leg at knee joint and rotates it laterally when knee is flexed; long head extends thigh at hip joint.",
    innervation: "Long head: Tibial division of Sciatic Nerve (L5, S1, S2). Short head: Common Fibular division of Sciatic Nerve (L5, S1).",
    bloodSupply: "Perforating branches of profunda femoris artery and inferior gluteal artery.",
    clinicalPearl:
      "Hamstring strain commonly tears proximal tendon attachment at the ischial tuberosity during deceleration phase of high-velocity running.",
  },
  {
    id: "gastrocnemius-muscle",
    name: "Gastrocnemius (Triceps Surae)",
    region: "Posterior Leg / Calf",
    latin: "Musculus gastrocnemius",
    fmaId: "FMA:22541",
    origin: "Lateral head: lateral condyle of femur. Medial head: popliteal surface of femur superior to medial condyle.",
    insertion: "Posterior surface of calcaneus via Calcaneal (Achilles) tendon.",
    action: "Plantarflexes foot at ankle joint; flexes leg at knee joint.",
    innervation: "Tibial Nerve (S1, S2).",
    bloodSupply: "Sural Arteries (branches of Popliteal Artery).",
    clinicalPearl:
      "Achilles tendon rupture presents with sudden audible 'pop', sharp pain, and positive Thompson squeeze test (squeezing calf fails to elicit passive plantarflexion).",
  },
  {
    id: "tibialis-anterior-muscle",
    name: "Tibialis Anterior",
    region: "Anterior Leg",
    latin: "Musculus tibialis anterior",
    fmaId: "FMA:22532",
    origin: "Lateral condyle and upper half of lateral surface of tibia, and interosseous membrane.",
    insertion: "Medial and inferior surfaces of medial cuneiform and base of 1st metatarsal.",
    action: "Chief dorsiflexor of foot at ankle joint; inverts foot at subtalar joint.",
    innervation: "Deep Fibular (Peroneal) Nerve (L4, L5).",
    bloodSupply: "Anterior Tibial Artery.",
    clinicalPearl:
      "Deep fibular nerve palsy leads to Foot Drop (high-steppage gait, inability to dorsiflex or heel-walk) and sensory deficit in the 1st dorsal interdigital web space.",
  },
];

// ============================================================================
// COGNI ANATOMY 3D PRESETS & CLINICAL SELF-STUDY COMPANION DATABASE
// Mapped directly to official Cogni Anatomy 3D Viewer Presets: cogni.cards/anatomy
// ============================================================================
const COGNI_PRESETS = [
  // --- 1. FULL BODY & MAJOR SYSTEMS ---
  {
    id: "body-all",
    label: "🌟 Full Human Body",
    system: "Multi-System",
    region: "Whole Body",
    icon: "🧍‍♂️",
    structuresCount: "6,600+ Structures",
    latin: "Corpus Humanum Integrum",
    fmaId: "FMA:20394",
    summary:
      "The complete adult reference anatomical model. Contains 2,853 distinct 3D parts spanning skeletal, muscular, circulatory, nervous, respiratory, digestive, and urinary systems. Built from BodyParts3D and Z-Anatomy open research datasets.",
    origin: "Spans all cranial, axial, and appendicular bony origins across 206 bones.",
    insertion: "Distal soft tissue, tendon, and aponeurotic insertions across 600+ muscles.",
    action: "Comprehensive biomechanical locomotion, voluntary articulation, autonomic homeostasis, and metabolic thermogenesis.",
    innervation: "Complete Somatic & Autonomic Nervous Systems (CNS + PNS, Sympathetic & Parasympathetic)",
    bloodSupply: "Systemic arterial tree (Aorta and branches) and systemic venous return (SVC / IVC)",
    clinicalHighYield:
      "Understanding 3D spatial relationships is the core foundation for medical diagnosis, surgical access, radiographic orientation (CT/MRI), and USMLE/NEET-PG board exams.",
    mnemonic: "Anatomical Position: Standing erect, eyes forward, palms facing anteriorly with thumbs pointed out.",
    examTip: "Standard reference planes: Coronal (Frontal), Sagittal (Midline), and Transverse (Axial cross-section).",
    flashcards: [
      {
        q: "What are the 3 cardinal anatomical planes used in medical imaging?",
        a: "1. Coronal (Frontal): divides anterior/posterior.\n2. Sagittal: divides left/right (midsagittal at midline).\n3. Transverse (Axial): divides superior/inferior (standard CT/MRI view).",
      },
      {
        q: "What datasets power the Cogni 3D Anatomy Atlas?",
        a: "BodyParts3D (DBCLS Japan), Z-Anatomy (Creative Commons Blender project), Human Reference Atlas, and Layered Human.",
      },
    ],
  },
  {
    id: "trapezius",
    label: "🦅 Trapezius Muscle (Ascending & Descending)",
    system: "Muscular",
    region: "Head & Neck / Back",
    icon: "🦅",
    structuresCount: "Ascending, Middle & Descending Fibers",
    latin: "Musculus trapezius",
    fmaId: "FMA:9626",
    summary:
      "Large superficial trapezoidal extrinsic back muscle. Connects the skull and vertebral spine to the shoulder girdle. Crucial for scapular posture, elevation, retraction, depression, and upward rotation during arm abduction above 90°.",
    origin:
      "External occipital protuberance, medial 1/3 of superior nuchal line, ligamentum nuchae, and spinous processes of C7–T12 vertebrae (Ascending part arises specifically from T4–T12 spines).",
    insertion:
      "Ascending (inferior) fibers: smooth tubercle on apex of spine of scapula. Middle fibers: medial margin of acromion & superior lip of spine. Descending (superior) fibers: posterior border of lateral 1/3 of clavicle.",
    action:
      "Ascending part: depresses scapula and assists upward rotation. Descending part: elevates scapula. Middle part: retracts (adducts) scapula. Together: upwardly rotates glenoid cavity during abduction >90°.",
    innervation: "Motor: Spinal Accessory Nerve (Cranial Nerve XI). Sensory / Proprioception: Ventral rami of C3 and C4 cervical spinal nerves.",
    bloodSupply: "Transverse Cervical Artery (superficial branch), Dorsal Scapular Artery, Posterior Intercostal Arteries.",
    clinicalHighYield:
      "Spinal Accessory Nerve (CN XI) is vulnerable to iatrogenic transection during posterior cervical triangle lymph node biopsy. Damage causes Shoulder Droop, weakness in shrugging against resistance, and impaired abduction above 90° with lateral scapular winging.",
    mnemonic: "TRAP = Turns scapula upward, Retracts, Accessory nerve (CN XI), Posterior triangle vulnerable.",
    examTip: "Trapezius and Serratus Anterior work as an essential force couple to rotate the scapula upward. Tested clinically by asking the patient to shrug shoulders against resistance.",
    flashcards: [
      {
        q: "What is the origin and insertion of the Ascending (inferior) part of the Trapezius muscle?",
        a: "Origin: Spinous processes of T4–T12 vertebrae and supraspinous ligaments.\nInsertion: Tubercle on the apex of the spine of the scapula.",
      },
      {
        q: "Which cranial nerve provides motor innervation to the Trapezius, and what clinical sign indicates injury?",
        a: "Spinal Accessory Nerve (CN XI). Injury results in Shoulder Droop, weakness in shrugging shoulders against resistance, and difficulty abducting the arm above 90°.",
      },
      {
        q: "What two muscles work together as a force couple to upwardly rotate the scapula during full arm abduction?",
        a: "Trapezius (superior & inferior parts) and Serratus Anterior (innervated by the Long Thoracic Nerve).",
      },
    ],
  },
  {
    id: "muscles",
    label: "💪 Full Muscular System",
    system: "Muscular",
    region: "Whole Body",
    icon: "💪",
    structuresCount: "600+ Striated Muscles",
    latin: "Systema Musculare",
    fmaId: "FMA:30315",
    summary:
      "Over 600 striated voluntary skeletal muscles responsible for locomotion, posture maintenance, and thermogenesis. Features superficial, intermediate, and deep periosteal muscle layers with fascial compartments.",
    origin: "Spans all cranial, axial, and appendicular bony surfaces, interosseous membranes, and fascial septa.",
    insertion: "Bone tuberosities, trochanters, epicondyles, and tendons inserting across synovial joint axes.",
    action: "Generates skeletal locomotion, joint stabilization, visceral sphincteric control, and metabolic heat.",
    innervation: "Somatic motor neurons releasing Acetylcholine (ACh) at the Neuromuscular Junction (NMJ)",
    bloodSupply: "Muscular branches of adjacent regional arteries forming intramuscular anastomotic beds",
    clinicalHighYield:
      "Myasthenia Gravis: Autoantibodies against post-synaptic nicotinic ACh receptors cause progressive muscle fatigability (ptosis, diplopia, worse at end of day). Lambert-Eaton: Autoantibodies against presynaptic voltage-gated calcium channels (associated with small cell lung cancer, improves with use).",
    mnemonic: "Myasthenia Gravis = Mind to Ground (descending weakness, eyes first, worse with exertion).",
    examTip: "Compartment syndrome occurs when fascial compartment pressure >30 mmHg, threatening ischemic necrosis (Requires urgent fasciotomy; 5 Ps: Pain, Pallor, Pulselessness, Paresthesia, Paralysis).",
    flashcards: [
      {
        q: "What is the primary pathophysiology of Myasthenia Gravis?",
        a: "Autoantibodies against post-synaptic nicotinic Acetylcholine (ACh) receptors at the neuromuscular junction, leading to receptor degradation and fatigable muscle weakness.",
      },
      {
        q: "What are the 5 classic signs ('5 Ps') of acute compartment syndrome?",
        a: "Pain (out of proportion to injury, pain with passive stretch), Pallor, Paresthesia, Pulselessness, and Paralysis.",
      },
    ],
  },
  {
    id: "skeleton",
    label: "🦴 Full Skeleton (206 Bones)",
    system: "Skeletal",
    region: "Whole Body",
    icon: "💀",
    structuresCount: "206 Bones",
    latin: "Systema Skeletale (Sceletus)",
    fmaId: "FMA:23881",
    summary:
      "The rigid structural framework of the human body. Divided into Axial Skeleton (80 bones: skull, vertebral column, ribs, sternum, hyoid) and Appendicular Skeleton (126 bones: shoulder girdle, upper limbs, pelvic girdle, lower limbs).",
    origin: "Provides origin sites for over 600 skeletal muscle bellies.",
    insertion: "Provides insertion anchor points through Sharpey's fibers penetrating the bony periosteum.",
    action: "Structural support, mechanical leverage, vital organ protection, calcium homeostasis, and hematopoiesis.",
    innervation: "Periosteal sensory nerves (extremely sensitive to trauma and fracture pain)",
    bloodSupply: "Nutrient arteries entering via nutrient foramina, periosteal arteries, and metaphyseal/epiphyseal vessels",
    clinicalHighYield:
      "Bone marrow in flat bones (sternum, iliac crest) remains the chief site of hematopoiesis in adults. Iliac crest marrow aspiration is the gold standard for diagnosing leukemias and aplastic anemia.",
    mnemonic: "Axial = Axis of body (80 bones); Appendicular = Appendages/limbs (126 bones). Total = 206.",
    examTip: "Epiphyseal growth plate (physis) fractures in children are classified using the Salter-Harris system (Types I-V).",
    flashcards: [
      {
        q: "How many bones are in the adult human body, and how are they divided?",
        a: "206 total: 80 in Axial Skeleton (skull, spine, ribs, sternum) and 126 in Appendicular Skeleton (limbs and girdles).",
      },
      {
        q: "What is the most common site for adult bone marrow biopsy?",
        a: "Posterior Superior Iliac Spine (PSIS) of the pelvic iliac crest, due to rich red marrow and distance from major organs.",
      },
    ],
  },
  {
    id: "circulatory-system",
    label: "🩸 Circulatory System (Arteries & Veins)",
    system: "Circulatory",
    region: "Whole Body",
    icon: "🫀",
    structuresCount: "Great Vessels & Microcirculation",
    latin: "Systema Cardiovasculare",
    fmaId: "FMA:7161",
    summary:
      "Closed vascular circuit conveying oxygenated blood from the left ventricle through the systemic arterial tree to tissues, returning deoxygenated blood via the caval venous system to the right atrium and pulmonary circulation.",
    origin: "Ascending aorta arising from aortic orifice of left ventricle.",
    insertion: "Microvascular capillary beds draining to venules and caval systems.",
    action: "High-pressure oxygen and nutrient perfusion; metabolic waste clearance.",
    innervation: "Sympathetic vasoconstriction via alpha-1 receptors; parasympathetic vasodilation in specialized beds",
    bloodSupply: "Primary conduit system supplying all organ parenchymas",
    clinicalHighYield:
      "Virchow's Triad for deep vein thrombosis (DVT): 1. Endothelial injury, 2. Stasis, 3. Hypercoagulability. Thrombi dislodging from lower extremity deep veins (femoral, popliteal) travel through IVC to occlude the pulmonary trunk (Pulmonary Embolism).",
    mnemonic: "Virchow's Triad = Stasis, Endothelial Injury, Hypercoagulability = DVT risk.",
    examTip: "Aortic baroreceptors transmit afferents via Vagus (CN X); Carotid sinus baroreceptors transmit via Glossopharyngeal (CN IX).",
    flashcards: [
      {
        q: "What comprises Virchow's Triad for venous thromboembolism?",
        a: "1. Endothelial damage\n2. Venous stasis\n3. Hypercoagulable state (e.g. Factor V Leiden, malignancy, oral contraceptives).",
      },
      {
        q: "Which cranial nerves carry baroreceptor afferents from the carotid sinus and aortic arch?",
        a: "Carotid sinus: CN IX (Glossopharyngeal nerve).\nAortic arch: CN X (Vagus nerve).",
      },
    ],
  },
  {
    id: "nervous-system",
    label: "🧠 Central & Peripheral Nerves",
    system: "Nervous",
    region: "Whole Body",
    icon: "⚡",
    structuresCount: "Brain, Cord & 43 Nerve Pairs",
    latin: "Systema Nervosum",
    fmaId: "FMA:9905",
    summary:
      "Composed of Central Nervous System (Brain and Spinal Cord) and Peripheral Nervous System (12 pairs of cranial nerves and 31 pairs of spinal nerves, plus autonomic ganglia).",
    origin: "Neural tube (CNS, somatic motor nerves) and neural crest cells (PNS, sensory and autonomic ganglia).",
    insertion: "Target neuromuscular junctions, motor endplates, sensory mechanoreceptors, and visceral organs.",
    action: "Sensory afferent transduction, central integration, and somatic/autonomic efferent execution.",
    innervation: "Complex neurochemical signaling across cholinergic, adrenergic, dopaminergic, and GABAergic synapses",
    bloodSupply: "Internal Carotid and Vertebrobasilar arterial systems (Circle of Willis); Spinal arteries",
    clinicalHighYield:
      "Upper Motor Neuron (UMN) lesions produce spastic paralysis, hyperreflexia, and positive Babinski sign (toes fan upward). Lower Motor Neuron (LMN) lesions produce flaccid paralysis, muscle atrophy, fasciculations, and hyporeflexia.",
    mnemonic: "UMN = Everything goes UP (Hyperreflexia, hypertonia, Babinski up). LMN = Everything goes DOWN (Atrophy, hyporeflexia, flaccid).",
    examTip: "Lumbar puncture safely enters the subarachnoid space at the L3-L4 or L4-L5 intervertebral space (below termination of adult conus medullaris at L1-L2).",
    flashcards: [
      {
        q: "What are the cardinal differences between UMN and LMN lesions?",
        a: "UMN: Spasticity, hyperreflexia, clasp-knife tone, extensor plantar (Babinski +).\nLMN: Flaccidity, muscle atrophy, fasciculations, loss of reflexes (hyporeflexia).",
      },
      {
        q: "At what vertebral level does the adult spinal cord end, and where is lumbar puncture performed?",
        a: "Spinal cord ends at L1-L2 (conus medullaris). Lumbar puncture is performed at L3-L4 or L4-L5 (level of iliac crests).",
      },
    ],
  },

  // --- 2. HEAD, NECK & NEUROANATOMY ---
  {
    id: "skull",
    label: "💀 Cranium & Skull (Calvaria & Face)",
    system: "Skeletal",
    region: "Head & Neck",
    icon: "💀",
    structuresCount: "22 Cranial & Facial Bones",
    latin: "Cranium et Calvaria",
    fmaId: "FMA:46565",
    summary:
      "Protective bony encasement for the brain and sensory organs. Divided into Neurocranium (8 bones: frontal, occipital, sphenoid, ethmoid, 2 parietal, 2 temporal) and Viscerocranium (14 facial bones: mandible, maxilla, zygomatic, nasal, etc.).",
    origin: "Origin for muscles of mastication (temporalis, masseter) and muscles of facial expression.",
    insertion: "Attachment for cranial sutures, tentorium cerebelli, and falx cerebri.",
    action: "Protects intracranial neurovasculature, supports sensory organs, and facilitates mastication.",
    innervation: "Trigeminal Nerve (CN V sensory: V1 ophthalmic, V2 maxillary, V3 mandibular); Facial Nerve (CN VII motor to facial expression)",
    bloodSupply: "External Carotid (Maxillary, Superficial Temporal, Facial), Internal Carotid, Middle Meningeal Artery",
    clinicalHighYield:
      "Pterion fracture: The H-shaped junction of frontal, parietal, temporal, and sphenoid bones is the thinnest cranial point. Fractures lacerate the anterior branch of the Middle Meningeal Artery, causing an acute Epidural Hematoma (biconvex lens on CT; classic lucid interval followed by uncal herniation).",
    mnemonic: "Middle Meningeal Artery = 'Epidural Hematoma with Lucid Interval' (Lens shape on non-contrast CT).",
    examTip: "Le Fort fractures of the midface: Le Fort I (horizontal maxilla), Le Fort II (pyramidal nasomaxillary), Le Fort III (craniofacial disjunction).",
    flashcards: [
      {
        q: "What critical artery runs directly beneath the Pterion on the lateral skull?",
        a: "The anterior branch of the Middle Meningeal Artery (branch of the maxillary artery). Laceration causes acute Epidural Hematoma.",
      },
      {
        q: "What classic CT appearance distinguishes an Epidural from a Subdural Hematoma?",
        a: "Epidural: Biconvex (lenticular) hyperdense collection limited by cranial sutures.\nSubdural: Crescent-shaped collection crossing suture lines (rupture of bridging veins).",
      },
    ],
  },
  {
    id: "brain",
    label: "🧠 Brain (Cerebrum, Cerebellum & Stem)",
    system: "Nervous",
    region: "Head & Neck",
    icon: "🧠",
    structuresCount: "107 3D Brain Structures",
    latin: "Encephalon, Cerebrum et Cerebellum",
    fmaId: "FMA:50801",
    summary:
      "Central processing center of the nervous system. Features cerebral cortex (frontal, parietal, temporal, occipital lobes, and insula), basal ganglia, thalamus, limbic structures, brainstem (midbrain, pons, medulla), and cerebellum.",
    origin: "Telencephalon, Diencephalon, Mesencephalon, Metencephalon, and Myelencephalon embryonic vesicles.",
    insertion: "Descending corticospinal and corticobulbar tracts synapsing on anterior horn motor neurons.",
    action: "Higher cognitive executive functions, sensory processing, motor programming, memory, and autonomic life-support.",
    innervation: "Origin of all 12 Cranial Nerves (CN I through CN XII)",
    bloodSupply: "Circle of Willis formed by Anterior & Posterior Communicating, Anterior & Posterior Cerebral, and Internal Carotids",
    clinicalHighYield:
      "Berry aneurysm rupture in the Circle of Willis (most commonly at Anterior Communicating Artery junction) causes spontaneous Subarachnoid Hemorrhage (SAH: 'worst headache of my life', thunderclap onset, nuchal rigidity, xanthochromia on lumbar puncture).",
    mnemonic: "Worst headache of life + thunderclap onset = Subarachnoid Hemorrhage (SAH) from ruptured Berry aneurysm.",
    examTip: "MCA stroke: Contralateral motor/sensory deficits affecting face and upper extremity greater than lower extremity + aphasia if left hemisphere.",
    flashcards: [
      {
        q: "Where is the most common site for a saccular (Berry) aneurysm to rupture in the Circle of Willis?",
        a: "The junction of the Anterior Communicating Artery (ACom) and Anterior Cerebral Artery (ACA).",
      },
      {
        q: "What symptoms characterize a stroke of the Middle Cerebral Artery (MCA)?",
        a: "Contralateral hemiparesis and hemisensory loss predominantly of the face and arm (sparing the leg), with aphasia (Broca/Wernicke) if dominant hemisphere.",
      },
    ],
  },
  {
    id: "spine",
    label: "🦴 Vertebral Column & Spine",
    system: "Skeletal",
    region: "Thorax & Spine",
    icon: "🦴",
    structuresCount: "33 Vertebrae & Discs",
    latin: "Columna Vertebralis",
    fmaId: "FMA:7112",
    summary:
      "Flexible central axis comprising 7 Cervical, 12 Thoracic, 5 Lumbar, 5 fused Sacral, and 4 fused Coccygeal vertebrae. Houses and protects the spinal cord inside the vertebral canal.",
    origin: "Origin for intrinsic erector spinae, transversospinales, and extrinsic back muscles.",
    insertion: "Supraspinous ligaments, ligamenta flava, anterior and posterior longitudinal ligaments.",
    action: "Weight transmission, spinal cord protection, and multi-axial trunk flexion, extension, and rotation.",
    innervation: "Spinal nerves (C1-C8, T1-T12, L1-L5, S1-S5, Co1); Sinuvertebral nerves to outer annulus fibrosus",
    bloodSupply: "Anterior Spinal Artery (supplies anterior 2/3 of cord), paired Posterior Spinal Arteries, and Artery of Adamkiewicz",
    clinicalHighYield:
      "L4-L5 and L5-S1 posterolateral disc herniations herniate the nucleus pulposus through the torn annulus fibrosus, compressing traversing nerve roots and producing classic Sciatica (radicular pain down posterior leg with positive straight leg raise).",
    mnemonic: "C3, 4, 5 keep the diaphragm alive (Phrenic nerve roots); S2, 3, 4 keep the sphincters tight.",
    examTip: "Artery of Adamkiewicz (great radicular artery) supplies the lower spinal cord; cross-clamping aorta in thoracic aneurysm repair risks anterior spinal artery syndrome.",
    flashcards: [
      {
        q: "Which nerve root is typically compressed in an L4-L5 posterolateral intervertebral disc herniation?",
        a: "The traversing L5 nerve root (causing weakness of great toe dorsiflexion / extensor hallucis longus and sensory loss over the dorsum of the foot).",
      },
      {
        q: "What clinical deficit occurs in Anterior Spinal Artery Syndrome?",
        a: "Bilateral loss of motor function (paraplegia/quadriplegia) and loss of pain and temperature sensation below lesion; dorsal columns (vibration and proprioception) are spared.",
      },
    ],
  },

  // --- 3. THORAX, CARDIOPULMONARY & BREATHING ---
  {
    id: "heart-detailed",
    label: "💓 Heart Internal Chambers & Valves",
    system: "Circulatory",
    region: "Thorax",
    icon: "🫀",
    structuresCount: "202 3D Heart Structures",
    latin: "Cor Humanum (Valvae et Cavitates)",
    fmaId: "FMA:7088",
    summary:
      "Detailed 3D teaching model of the heart walls, chambers (Right/Left Atrium, Right/Left Ventricle), atrioventricular valves (Tricuspid, Mitral), semilunar valves (Aortic, Pulmonary), chordae tendineae, and papillary muscles.",
    origin: "Embryonic primitive heart tube (truncus arteriosus, bulbus cordis, primitive ventricle, primitive atrium, sinus venosus).",
    insertion: "Fibrous cardiac skeleton anchoring all 4 valve annuli and supporting myocardial syncytium.",
    action: "Synchronized cyclic myocardial contraction (systole) and relaxation (diastole) to pump blood through pulmonary and systemic circuits.",
    innervation: "Cardiac Plexus: Sympathetics (T1-T5 via sympathetic trunk, increases HR/inotropy); Parasympathetics (Vagus nerve CN X, decreases HR)",
    bloodSupply: "Left Main Coronary (LAD + Circumflex) and Right Coronary Artery (RCA -> Posterior Descending Artery)",
    clinicalHighYield:
      "Myocardial Infarction: LAD occlusion causes anterior wall MI (V1-V4; 'Widowmaker'); RCA occlusion causes inferior wall MI (leads II, III, aVF) often complicated by bradycardia and AV nodal blocks. Beck's triad of cardiac tamponade: Hypotension, Distant/muffled heart sounds, Elevated JVP.",
    mnemonic: "LAD = Anterior wall (V1-V4); RCA = Inferior wall (II, III, aVF); Circumflex = Lateral wall (I, aVL, V5-V6).",
    examTip: "Aortic Stenosis: Systolic crescendo-decrescendo murmur heard best at right 2nd intercostal space radiating to carotids (SAD symptoms: Syncope, Angina, Dyspnea).",
    flashcards: [
      {
        q: "What coronary artery supplies the Sinoatrial (SA) node and Atrioventricular (AV) node in the majority of individuals?",
        a: "The Right Coronary Artery (RCA) supplies the SA node in ~60% and the AV node in ~90% of individuals.",
      },
      {
        q: "What is Beck's Triad for acute cardiac tamponade?",
        a: "1. Hypotension\n2. Distant (muffled) heart sounds\n3. Jugular venous distension (elevated JVP).",
      },
    ],
  },
  {
    id: "respiratory-system",
    label: "🫁 Lungs & Tracheobronchial Tree",
    system: "Respiratory",
    region: "Thorax",
    icon: "🫁",
    structuresCount: "Trachea, 5 Lobes & Bronchi",
    latin: "Apparatus Respiratorius (Pulmones)",
    fmaId: "FMA:7113",
    summary:
      "Conducting and respiratory airways. Trachea bifurcates at carina into Right Main Bronchus (wider, shorter, more vertical) and Left Main Bronchus. Right lung has 3 lobes (Superior, Middle, Inferior); Left lung has 2 lobes (Superior, Inferior) with cardiac notch and lingula.",
    origin: "Laryngotracheal diverticulum (respiratory bud) arising from the ventral wall of the foregut endoderm.",
    insertion: "Terminal alveolar capillary membranes across 300 million alveoli.",
    action: "Airway conduction, alveolar gas exchange (O2 uptake and CO2 elimination), surfactant production, and acid-base buffering.",
    innervation: "Pulmonary Plexus: Vagus CN X (bronchoconstrictor, secretomotor); Sympathetic T2-T5 (bronchodilator via beta-2 receptors)",
    bloodSupply: "Bronchial Arteries from descending aorta (nutritive supply); Pulmonary Arteries from right ventricle (gas exchange)",
    clinicalHighYield:
      "Tension Pneumothorax: Air accumulates in pleural space without escape, shifting mediastinum and trachea to the contralateral side, kinking IVC and causing fatal shock. Treated with immediate needle thoracostomy in 2nd ICS midclavicular line or 5th ICS midaxillary line.",
    mnemonic: "Right lung has 3 lobes (R=3); Left lung has 2 lobes (L=2) to leave room for the Heart.",
    examTip: "In an upright patient who aspirates a foreign body (e.g. peanut), it typically lodges in the posterior segment of the Right Inferior Lobe due to vertical bronchus orientation.",
    flashcards: [
      {
        q: "Why do aspirated foreign objects preferentially enter the Right Main Bronchus over the Left?",
        a: "The Right Main Bronchus is wider, shorter, and descends more vertically in line with the trachea than the left.",
      },
      {
        q: "What is the immediate emergency management for a Tension Pneumothorax?",
        a: "Immediate needle decompression (large-bore needle in the 2nd intercostal space midclavicular line or 5th intercostal space midaxillary line) followed by tube thoracostomy.",
      },
    ],
  },

  // --- 4. ABDOMEN, DIGESTIVE & URINARY ---
  {
    id: "digestive-system",
    label: "🍔 Digestive (Liver, Stomach & Gut)",
    system: "Digestive",
    region: "Abdomen & Pelvis",
    icon: "🍔",
    structuresCount: "Stomach, Liver, Pancreas & Intestines",
    latin: "Apparatus Digestorius (Hepar et Gaster)",
    fmaId: "FMA:7115",
    summary:
      "Visceral gastrointestinal tract. Includes Esophagus, J-shaped Stomach, C-loop Duodenum with Pancreas, Liver with Gallbladder, Jejunum, Ileum, and framed Large Colon (Cecum, Ascending, Transverse, Descending, Sigmoid, Rectum).",
    origin: "Embryonic primitive gut endoderm divided into Foregut, Midgut, and Hindgut.",
    insertion: "Anal canal at the pectinate line transitioning from endoderm to ectoderm.",
    action: "Mechanical churning, chemical enzymatic digestion, nutrient/fluid absorption, and biliary excretion.",
    innervation: "Enteric Nervous System (Myenteric Auerbach's & Submucosal Meissner's plexuses); Vagus nerve (parasympathetic) and Splanchnic nerves (sympathetic)",
    bloodSupply: "Three ventral branches of Abdominal Aorta: 1. Celiac Trunk (Foregut), 2. Superior Mesenteric Artery (Midgut), 3. Inferior Mesenteric Artery (Hindgut)",
    clinicalHighYield:
      "Portal Hypertension in cirrhosis causes portosystemic collateral shunting: Esophageal varices (fatal rupture; left gastric vein to azygos), Caput medusae (paraumbilical to epigastric veins), and Internal Hemorrhoids (superior to middle/inferior rectal veins).",
    mnemonic: "Foregut = Celiac Trunk; Midgut = SMA; Hindgut = IMA. Portosystemic shunts = 'Gut, Butt, and Caput'.",
    examTip: "Pringle Maneuver: Clamping the hepatoduodenal ligament compresses the Portal Triad (Portal Vein, Proper Hepatic Artery, Common Bile Duct) to arrest liver hemorrhage.",
    flashcards: [
      {
        q: "What are the 3 major vascular territories of the gut and their supplying arteries?",
        a: "1. Foregut (pharynx to 2nd part duodenum): Celiac Trunk.\n2. Midgut (3rd part duodenum to proximal 2/3 transverse colon): Superior Mesenteric Artery (SMA).\n3. Hindgut (distal 1/3 transverse colon to upper anal canal): Inferior Mesenteric Artery (IMA).",
      },
      {
        q: "What anatomical structure is clamped in a Pringle maneuver, and what does it contain?",
        a: "The Hepatoduodenal ligament is clamped. It contains the Portal Triad: 1. Common Bile Duct, 2. Proper Hepatic Artery, 3. Hepatic Portal Vein.",
      },
    ],
  },
  {
    id: "kidney",
    label: "💧 Urinary System & Kidneys",
    system: "Urinary",
    region: "Abdomen & Pelvis",
    icon: "💧",
    structuresCount: "Kidneys, Ureters & Bladder",
    latin: "Apparatus Urinarius (Renes et Ureteres)",
    fmaId: "FMA:7159",
    summary:
      "Retroperitoneal filtration and urinary excretion system. Left kidney sits at T12-L3; Right kidney sits slightly lower due to the liver. Renal arteries arise directly from the abdominal aorta at L1-L2.",
    origin: "Ureteric bud (collecting system) and metanephric blastema (glomeruli and nephrons).",
    insertion: "Ureteric orifices inserting at the base of the bladder trigone.",
    action: "Glomerular filtration, tubular reabsorption/secretion, blood pressure regulation via renin, and erythropoiesis.",
    innervation: "Renal Plexus derived from celiac and least splanchnic sympathetic nerves (T10-L1)",
    bloodSupply: "Renal Arteries originating from Abdominal Aorta; Renal Veins draining into Inferior Vena Cava (IVC)",
    clinicalHighYield:
      "Nutcracker Syndrome: Compression of the Left Renal Vein between the Superior Mesenteric Artery (SMA) and the abdominal aorta. Causes left flank pain, microscopic hematuria, and left-sided varicocele in males (left gonadal vein drains into left renal vein at 90°).",
    mnemonic: "SAD PUCKER: Suprarenal, Aorta/IVC, Duodenum (2-4), Pancreas, Ureters, Colon (asc/desc), Kidneys, Esophagus, Rectum (Retroperitoneal).",
    examTip: "Kidney stones (nephrolithiasis) lodge at 3 classic constrictions: 1. Ureteropelvic junction (UPJ), 2. Pelvic brim (crossing iliac vessels), 3. Ureterovesical junction (UVJ - narrowest point).",
    flashcards: [
      {
        q: "Why is testicular varicocele significantly more common on the left side than the right?",
        a: "The left testicular vein drains into the left renal vein at a 90° angle (subject to Nutcracker compression by SMA), whereas the right testicular vein drains obliquely directly into the IVC.",
      },
      {
        q: "What are the 3 anatomical sites where ureteral calculi typically lodge?",
        a: "1. Ureteropelvic Junction (UPJ)\n2. Pelvic Brim (where ureter crosses the iliac vessels)\n3. Ureterovesical Junction (UVJ) inside bladder wall.",
      },
    ],
  },
  {
    id: "pelvis",
    label: "🦴 Pelvis & Hip Girdle",
    system: "Skeletal",
    region: "Abdomen & Pelvis",
    icon: "🦴",
    structuresCount: "Ilium, Ischium, Pubis & Sacrum",
    latin: "Pelvis Major et Pelvis Minor",
    fmaId: "FMA:9578",
    summary:
      "Weight-bearing bony pelvis connecting the axial spine to the lower limbs. Composed of 2 hip bones (Os coxae: ilium, ischium, pubis) fused at the acetabulum, articulated with sacrum at sacroiliac joints and pubic symphysis.",
    origin: "Origin for gluteal, hamstring, adductor, and abdominal wall muscles.",
    insertion: "Insertion of latissimus dorsi, erector spinae, and psoas major tendons.",
    action: "Transfers weight from upper body to lower limbs, protects pelvic viscera, and anchors pelvic floor.",
    innervation: "Lumbosacral Plexus (L4-S4), Pudendal Nerve (S2-S4), Obturator Nerve (L2-L4)",
    bloodSupply: "Internal Iliac Artery (anterior and posterior divisions supplying pelvic viscera and perineum)",
    clinicalHighYield:
      "High-energy open-book pelvic fractures disrupt the pelvic ring and lacerate the presacral venous plexus and internal iliac branches, causing life-threatening retroperitoneal exsanguination. Managed with emergency pelvic binder over greater trochanters.",
    mnemonic: "S2, S3, S4 keeps the penis off the floor / keeps the sphincters tight (Pudendal & parasympathetics).",
    examTip: "Femoral triangle contents from lateral to medial: NAVEL = Nerve, Artery, Vein, Empty space (femoral canal, site of femoral hernia), Lymphatics.",
    flashcards: [
      {
        q: "What is the anatomical arrangement of neurovascular structures in the femoral triangle from lateral to medial?",
        a: "N-A-V-E-L: Femoral Nerve, Femoral Artery, Femoral Vein, Empty space (Femoral Canal), Lymphatics.",
      },
      {
        q: "Which division of the internal iliac artery is most prone to injury in open-book pelvic ring fractures?",
        a: "The presacral venous plexus and branches of the internal iliac artery (superior gluteal artery).",
      },
    ],
  },

  // --- 5. LIMBS & EXTREMITIES ---
  {
    id: "arm-bones",
    label: "🦾 Upper Limb (Humerus, Radius & Hand)",
    system: "Skeletal",
    region: "Upper Limb",
    icon: "🦾",
    structuresCount: "Clavicle, Scapula, Arm & Hand",
    latin: "Ossa Membri Superioris",
    fmaId: "FMA:71337",
    summary:
      "Upper extremity bones optimized for reach, grasping, and manipulation. Includes Clavicle, Scapula, Humerus, Radius, Ulna, 8 Carpal bones, 5 Metacarpals, and 14 Phalanges.",
    origin: "Origins for rotator cuff, biceps, triceps, brachialis, and forearm flexor/extensor compartments.",
    insertion: "Insertions for pectoralis major, latissimus dorsi, deltoid, and hand intrinsic muscles.",
    action: "Reaching, throwing, delicate manual grasp, and precision tool manipulation.",
    innervation: "Brachial Plexus (C5-T1 roots -> Musculocutaneous, Axillary, Median, Radial, Ulnar nerves)",
    bloodSupply: "Subclavian -> Axillary -> Brachial -> Radial & Ulnar Arteries -> Deep & Superficial Palmar Arches",
    clinicalHighYield:
      "Humeral fracture nerve injuries: 1. Surgical neck fracture = Axillary nerve (deltoid paralysis). 2. Mid-shaft fracture = Radial nerve in spiral groove (wrist drop). 3. Supracondylar fracture = Median nerve / Brachial artery. 4. Medial epicondyle fracture = Ulnar nerve (claw hand).",
    mnemonic: "ARM: Axillary (surgical neck), Radial (mid-shaft), Median (supracondylar), Ulnar (medial epicondyle).",
    examTip: "Scaphoid fracture: Most commonly fractured carpal bone after fall on outstretched hand (FOOSH); tenderness in anatomical snuffbox; high risk of Avascular Necrosis (AVN) due to retrograde blood supply.",
    flashcards: [
      {
        q: "Which nerve is injured in a mid-shaft fracture of the humerus, and what clinical deformity results?",
        a: "The Radial Nerve (running in the radial/spiral groove). Injury produces 'Wrist Drop' due to denervation of the forearm extensors.",
      },
      {
        q: "Why are scaphoid fractures at high risk of avascular necrosis (AVN) and nonunion?",
        a: "The blood supply enters the scaphoid at its distal pole and flows in a retrograde direction to the proximal pole; a waist fracture interrupts blood flow to the proximal segment.",
      },
    ],
  },
  {
    id: "leg-bones",
    label: "🦵 Lower Limb (Femur, Knee, Tibia & Foot)",
    system: "Skeletal",
    region: "Lower Limb",
    icon: "🦵",
    structuresCount: "Femur, Patella, Tibia, Fibula & Foot",
    latin: "Ossa Membri Inferioris",
    fmaId: "FMA:71338",
    summary:
      "Bones of the lower limb engineered for weight-bearing and bipedal locomotion. Features Femur (strongest bone), Patella (largest sesamoid), Tibia (weight-bearing), Fibula (lateral stabilizer), 7 Tarsals, 5 Metatarsals, and 14 Phalanges.",
    origin: "Origins for gluteal, quadriceps, hamstring, adductor, and calf muscle groups.",
    insertion: "Insertions for iliopsoas (lesser trochanter), patellar ligament (tibial tuberosity), and Achilles tendon (calcaneus).",
    action: "Upright posture, ground reaction force absorption, and bipedal running and walking locomotion.",
    innervation: "Lumbar Plexus (Femoral L2-L4, Obturator L2-L4) & Sacral Plexus (Sciatic -> Tibial & Common Fibular)",
    bloodSupply: "Femoral Artery -> Popliteal Artery -> Anterior & Posterior Tibial and Fibular Arteries",
    clinicalHighYield:
      "Common Fibular (Peroneal) Nerve injury: Courses superficially around the fibular neck; fracture or tight cast compresses it, paralyzing anterior and lateral compartment leg muscles, producing Foot Drop (steppage gait, inability to dorsiflex or evert foot).",
    mnemonic: "PED = Peroneal Everts and Dorsiflexes (injury = foot drop). TIP = Tibial Inverts and Plantarflexes.",
    examTip: "Femoral neck fracture in elderly disrupts Medial Circumflex Femoral Artery, resulting in avascular necrosis of the femoral head (leg presents shortened and externally rotated).",
    flashcards: [
      {
        q: "A patient presents with foot drop and inability to dorsiflex or evert the foot following a blow to the lateral knee. What nerve is injured?",
        a: "The Common Fibular (Peroneal) Nerve as it winds around the neck of the fibula.",
      },
      {
        q: "What vascular structure is torn in an intracapsular femoral neck fracture, causing avascular necrosis?",
        a: "Retinacular branches of the Medial Circumflex Femoral Artery supplying the femoral head.",
      },
    ],
  },
];

export default function Anatomy3DLab({ onAwardXp, onSaveNote }) {
  // Current active Cogni preset
  const [activePreset, setActivePreset] = useState(COGNI_PRESETS[1]); // Default to 'trapezius'

  // Viewport display mode: 'cogni-live' (Official live 3D Atlas) vs 'flashcards' (Active Recall)
  const [activeTab, setActiveTab] = useState("cogni-live");

  // Viewer height: 'normal' (880px) or 'imax' (980px)
  const [viewerHeight, setViewerHeight] = useState("normal");

  // Search filter for presets & structures
  const [searchQuery, setSearchQuery] = useState("");

  // Selected High-Yield Muscle from O.I.A.I. Directory
  const [selectedMuscle, setSelectedMuscle] = useState(HIGH_YIELD_MUSCLES_DIRECTORY[0]); // Default Trapezius

  // Directory filter search
  const [muscleDirectorySearch, setMuscleDirectorySearch] = useState("");

  // Flashcard flip states: { [cardIndex]: boolean }
  const [flippedCards, setFlippedCards] = useState({});

  // Key to force-reload iframe if user clicks reload
  const [iframeKey, setIframeKey] = useState(1);

  // Filter presets based on user search
  const filteredPresets = COGNI_PRESETS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.label.toLowerCase().includes(q) ||
      p.system.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.latin.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.clinicalHighYield.toLowerCase().includes(q)
    );
  });

  // Filter muscle directory based on search
  const filteredMuscles = HIGH_YIELD_MUSCLES_DIRECTORY.filter((m) => {
    if (!muscleDirectorySearch.trim()) return true;
    const q = muscleDirectorySearch.toLowerCase().trim();
    return (
      m.name.toLowerCase().includes(q) ||
      m.region.toLowerCase().includes(q) ||
      m.action.toLowerCase().includes(q) ||
      m.origin.toLowerCase().includes(q) ||
      m.insertion.toLowerCase().includes(q) ||
      m.clinicalPearl.toLowerCase().includes(q)
    );
  });

  function handleSelectPreset(preset) {
    setActivePreset(preset);
    setFlippedCards({});
    // If selecting trapezius or muscles, sync selectedMuscle
    if (preset.id === "trapezius") {
      setSelectedMuscle(HIGH_YIELD_MUSCLES_DIRECTORY[0]);
    }
    if (onAwardXp) onAwardXp(15);
  }

  function toggleCardFlip(index) {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  // Construct official Cogni Anatomy 3D Viewer URL
  const cogniViewerUrl =
    activePreset.id === "body-all"
      ? `https://cogni.cards/anatomy/viewer/?lang=en`
      : activePreset.id === "trapezius"
      ? `https://cogni.cards/anatomy/viewer/?preset=muscles&lang=en`
      : `https://cogni.cards/anatomy/viewer/?preset=${activePreset.id}&lang=en`;

  return (
    <div className="lab-page-container expanded-workstation">
      {/* =========================================================================
          HEADER BANNER: OFFICIAL COGNI ANATOMY 3D ATLAS FOR MBBS
          ========================================================================= */}
      <div className="lab-header-banner mbbs-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">🧬</div>
          <div>
            <div className="lab-eyebrow">OFFICIAL COGNI ANATOMY 3D MEDICAL ATLAS</div>
            <h2>Cogni 3D Human Anatomy Atlas & Medical Dissector</h2>
            <p>
              Interactive 3D body with 2,853 distinct parts, 6,600+ named structures from BodyParts3D & Z-Anatomy.
              Rotate 360°, peel muscle layers, explode organ systems, and master USMLE/NEET-PG high-yield facts.
            </p>
          </div>
        </div>

        {/* WORKSTATION CONTROLS */}
        <div className="lab-nav-pills">
          <button
            type="button"
            className={`lab-nav-pill ${activeTab === "cogni-live" ? "active" : ""}`}
            onClick={() => setActiveTab("cogni-live")}
          >
            🌐 3D Human Body (100% Full-Width)
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${activeTab === "flashcards" ? "active" : ""}`}
            onClick={() => setActiveTab("flashcards")}
          >
            🗂️ Active Recall Flashcards ({activePreset.flashcards?.length || 0})
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${viewerHeight === "imax" ? "active" : ""}`}
            onClick={() => setViewerHeight(viewerHeight === "imax" ? "normal" : "imax")}
            title="Toggle IMAX 980px vertical height"
          >
            {viewerHeight === "imax" ? "📐 Normal Height (880px)" : "📺 Height: IMAX (980px)"}
          </button>
        </div>
      </div>

      {/* =========================================================================
          COGNI ANATOMY REGIONAL PRESET CHIPS BAR (ONE-CLICK QUICK JUMP)
          ========================================================================= */}
      <div className="cogni-presets-bar">
        <div className="presets-bar-header">
          <span className="toolbar-lbl">Cogni 3D Presets:</span>
          <div className="presets-search-mini">
            <input
              type="text"
              placeholder="Filter regions (e.g. Trapezius, Muscles, Heart, Skull)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="presets-chips-scroller">
          {filteredPresets.map((preset) => {
            const isSelected = activePreset.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                className={`cogni-preset-chip ${isSelected ? "active" : ""}`}
                onClick={() => handleSelectPreset(preset)}
                title={`${preset.system} · ${preset.region}`}
              >
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MAIN WORKSPACE: 100% FULL-WIDTH 3D BODY (TOP) + CLINICAL DOSSIER (BELOW)
          ========================================================================= */}
      <div className="cogni-workspace-stacked">
        {/* TOP SECTION: 100% FULL-WIDTH 3D HUMAN BODY VIEWPORT */}
        <section className="cogni-canvas-column full-width">
          {/* VIEWPORT CONTROLS BAR */}
          <div className="canvas-header-strip">
            <div className="canvas-hud-toolbar">
              <span className="current-preset-badge">
                {activePreset.icon} <strong>{activePreset.label}</strong>
              </span>
              <span className="preset-structures-pill">{activePreset.structuresCount}</span>

              <button
                type="button"
                className="canvas-hud-btn"
                onClick={() => setIframeKey((k) => k + 1)}
                title="Reload 3D Viewer"
              >
                ↻ Reload 3D Model
              </button>

              <a
                href={cogniViewerUrl}
                target="_blank"
                rel="noreferrer"
                className="canvas-hud-btn"
                title="Open in external browser window"
              >
                ↗ Open in Full Tab
              </a>
            </div>

            <div className="canvas-hud-badges">
              <span className="hud-badge-info">🖱️ Left Click + Drag: Rotate 360°</span>
              <span className="hud-badge-info">📜 Scroll: Zoom In/Out</span>
              <span className="hud-badge-info">💥 Use Explode Slider in Viewer</span>
            </div>
          </div>

          {/* TAB 1: OFFICIAL COGNI ANATOMY 3D LIVE IFRAME VIEWER */}
          {activeTab === "cogni-live" && (
            <div className={`cogni-live-container ${viewerHeight}`}>
              <iframe
                key={iframeKey + activePreset.id}
                src={cogniViewerUrl}
                title={`Cogni Anatomy 3D Viewer - ${activePreset.label}`}
                className="cogni-live-iframe"
                loading="eager"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}

          {/* TAB 2: ACTIVE RECALL FLASHCARDS (SELF-STUDY COMPANION) */}
          {activeTab === "flashcards" && (
            <div className="self-study-flashcards-grid">
              <div className="flashcards-intro-banner">
                <h3>🗂️ Active Recall Self-Study Deck: {activePreset.label}</h3>
                <p>
                  Click any flashcard to flip between the clinical question and medical board answer.
                  Designed for high-retention spaced repetition.
                </p>
              </div>

              <div className="cards-container">
                {activePreset.flashcards?.map((card, idx) => {
                  const isFlipped = !!flippedCards[idx];
                  return (
                    <div
                      key={idx}
                      className={`flashcard-item ${isFlipped ? "flipped" : ""}`}
                      onClick={() => toggleCardFlip(idx)}
                    >
                      <div className="flashcard-inner">
                        <div className="card-face card-front">
                          <span className="card-tag">QUESTION {idx + 1}</span>
                          <p className="card-text">{card.q}</p>
                          <span className="flip-hint">👆 Click to reveal answer</span>
                        </div>
                        <div className="card-face card-back">
                          <span className="card-tag answer">ANSWER & CLINICAL PEARL</span>
                          <p className="card-text answer-text">{card.a}</p>
                          <span className="flip-hint">👆 Click to flip back</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* BOTTOM SECTION: CLINICAL SELF-STUDY COMPANION DOSSIER (LOCATED DIRECTLY BELOW) */}
        <section className="cogni-dossier-column full-width">
          <div className="cogni-dossier-card">
            {/* DOSSIER HEADER WITH ONE-CLICK SAVE ACTION */}
            <div className="dossier-top-strip">
              <div>
                <div className="dossier-badge">
                  <span>{activePreset.region.toUpperCase()}</span>
                  <span className="dossier-sys-tag">{activePreset.system.toUpperCase()}</span>
                </div>
                <h2 className="dossier-title">{activePreset.label}</h2>
                <div className="dossier-latin">
                  <em>Scientific / Latin: {activePreset.latin}</em>
                  <span className="fma-code">{activePreset.fmaId}</span>
                </div>
              </div>

              <div className="dossier-actions-top">
                <button
                  type="button"
                  className="dossier-btn save-note"
                  onClick={() => {
                    if (onSaveNote) {
                      const oiaiContent = activePreset.origin
                        ? `\n\n#### 🦴 Muscle Origin, Insertion & Action (O.I.A.I.)\n- **Origin (Proximal)**: ${activePreset.origin}\n- **Insertion (Distal)**: ${activePreset.insertion}\n- **Action / Function**: ${activePreset.action}`
                        : "";
                      onSaveNote(
                        `Cogni Anatomy: ${activePreset.label}`,
                        `### 🧬 Cogni 3D Anatomy Study Notes: ${activePreset.label}\n\n**Latin**: *${activePreset.latin}* | **FMA**: \`${activePreset.fmaId}\`\n\n#### 📖 Overview\n${activePreset.summary}${oiaiContent}\n\n- **Innervation**: ${activePreset.innervation}\n- **Blood Supply**: ${activePreset.bloodSupply}\n\n#### 🩺 Clinical Pathology\n${activePreset.clinicalHighYield}\n\n#### 💡 Board Exam Mnemonic\n> ${activePreset.mnemonic}\n\n#### 🎯 Exam Tip\n${activePreset.examTip}`,
                        "Medicine (MBBS)"
                      );
                    }
                  }}
                >
                  💾 Save to Study Notes (+20 XP)
                </button>
              </div>
            </div>

            {/* DEDICATED HIGHLIGHT CARD: MUSCLE ORIGIN, INSERTION & ACTION (O.I.A.I.) */}
            {(activePreset.origin || activePreset.insertion || activePreset.action) && (
              <div className="dossier-oiai-box">
                <div className="oiai-header">
                  <div className="oiai-title-badge">
                    <span className="oiai-icon">🎯</span>
                    <strong>O.I.A.I. MEDICAL EXAM SPECIFICATION</strong>
                    <span className="oiai-subtitle">Origin · Insertion · Action · Innervation</span>
                  </div>
                  <span className="oiai-status-pill">High-Yield Clinical Anatomy</span>
                </div>

                <div className="oiai-breakdown-grid">
                  {/* ORIGIN */}
                  <div className="oiai-cell origin">
                    <div className="oiai-label-pill origin">
                      <span>📍</span> ORIGIN (Proximal Attachment)
                    </div>
                    <p className="oiai-description">{activePreset.origin}</p>
                  </div>

                  {/* INSERTION */}
                  <div className="oiai-cell insertion">
                    <div className="oiai-label-pill insertion">
                      <span>📌</span> INSERTION (Distal Attachment)
                    </div>
                    <p className="oiai-description">{activePreset.insertion}</p>
                  </div>

                  {/* ACTION & MOVEMENT */}
                  <div className="oiai-cell action">
                    <div className="oiai-label-pill action">
                      <span>⚙️</span> ACTION & BIOMECHANICAL MOTION
                    </div>
                    <p className="oiai-description">{activePreset.action}</p>
                  </div>
                </div>
              </div>
            )}

            {/* MULTI-CARD CLINICAL DASHBOARD GRID */}
            <div className="cogni-dossier-grid">
              {/* CARD 1: ARCHITECTURE & INNERVATION */}
              <div className="dossier-section">
                <h4>📖 Anatomical Architecture & Innervation</h4>
                <p className="dossier-summary-text">{activePreset.summary}</p>
                <div className="dossier-meta-item" style={{ marginTop: "12px" }}>
                  <strong>Nerve Supply (Innervation):</strong> {activePreset.innervation}
                </div>
                <div className="dossier-meta-item">
                  <strong>Arterial Blood Supply:</strong> {activePreset.bloodSupply}
                </div>
              </div>

              {/* CARD 2: CLINICAL PATHOLOGY & SURGICAL PEARLS */}
              <div className="dossier-section highlight-red">
                <h4>🩺 Clinical Pathology & Surgical Correlations</h4>
                <p>{activePreset.clinicalHighYield}</p>
              </div>

              {/* CARD 3: USMLE / NEET-PG MNEMONICS & FLASHPOINTS */}
              <div className="dossier-section mnemonic-box">
                <h4>💡 High-Yield Board Exam Mnemonic</h4>
                <div className="mnemonic-text">"{activePreset.mnemonic}"</div>

                <h4 style={{ marginTop: "14px" }}>🎯 High-Yield Exam Flashpoint</h4>
                <p style={{ color: "#fde68a", fontSize: "12.5px", lineHeight: "1.5", margin: 0 }}>
                  {activePreset.examTip}
                </p>
              </div>
            </div>

            {/* =====================================================================
                INTERACTIVE HIGH-YIELD MUSCLE DIRECTORY (O.I.A.I. RAPID LOOKUP)
                Allows students to select and study Origin, Insertion, Action of any key muscle
                ===================================================================== */}
            <div className="muscle-directory-container">
              <div className="directory-header-row">
                <div className="directory-title-block">
                  <span className="directory-badge">📋 CLINICAL DIRECTORY</span>
                  <h3>High-Yield Muscle Directory (Origin & Insertion Explorer)</h3>
                  <p>
                    Select any skeletal muscle below to review its exact proximal origin, distal insertion, primary action, innervation, and clinical test.
                  </p>
                </div>

                <div className="directory-search-input">
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder="Search muscle (e.g. Trapezius, Deltoid, Biceps)..."
                    value={muscleDirectorySearch}
                    onChange={(e) => setMuscleDirectorySearch(e.target.value)}
                  />
                  {muscleDirectorySearch && (
                    <button type="button" onClick={() => setMuscleDirectorySearch("")}>
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* MUSCLE CHIPS SELECTOR */}
              <div className="muscle-chips-scroller">
                {filteredMuscles.map((muscle) => {
                  const isSelected = selectedMuscle.id === muscle.id;
                  return (
                    <button
                      key={muscle.id}
                      type="button"
                      className={`muscle-chip-btn ${isSelected ? "active" : ""}`}
                      onClick={() => setSelectedMuscle(muscle)}
                    >
                      <span className="muscle-chip-region">{muscle.region}</span>
                      <strong>{muscle.name}</strong>
                    </button>
                  );
                })}
              </div>

              {/* ACTIVE SELECTED MUSCLE DETAILED O.I.A.I. CARD */}
              {selectedMuscle && (
                <div className="active-muscle-spotlight">
                  <div className="spotlight-header">
                    <div>
                      <span className="spotlight-region-pill">{selectedMuscle.region}</span>
                      <h4>{selectedMuscle.name}</h4>
                      <span className="spotlight-latin">
                        <em>{selectedMuscle.latin}</em> · <code>{selectedMuscle.fmaId}</code>
                      </span>
                    </div>

                    <button
                      type="button"
                      className="spotlight-save-btn"
                      onClick={() => {
                        if (onSaveNote) {
                          onSaveNote(
                            `Muscle O.I.A.I.: ${selectedMuscle.name}`,
                            `### 🦾 Muscle O.I.A.I. Study Notes: ${selectedMuscle.name}\n\n**Latin**: *${selectedMuscle.latin}* | **FMA**: \`${selectedMuscle.fmaId}\` | **Region**: ${selectedMuscle.region}\n\n#### 📍 Origin (Proximal Attachment)\n${selectedMuscle.origin}\n\n#### 📌 Insertion (Distal Attachment)\n${selectedMuscle.insertion}\n\n#### ⚙️ Action & Biomechanical Motion\n${selectedMuscle.action}\n\n#### ⚡ Innervation & Nerve Supply\n${selectedMuscle.innervation}\n\n#### 🩸 Arterial Blood Supply\n${selectedMuscle.bloodSupply}\n\n#### 🩺 High-Yield Clinical Pearl\n${selectedMuscle.clinicalPearl}`,
                            "Medicine (MBBS)"
                          );
                        }
                      }}
                    >
                      💾 Save Muscle to Notes (+20 XP)
                    </button>
                  </div>

                  <div className="spotlight-grid">
                    <div className="spotlight-col origin">
                      <div className="spotlight-label origin">📍 ORIGIN (Proximal Attachment)</div>
                      <p>{selectedMuscle.origin}</p>
                    </div>

                    <div className="spotlight-col insertion">
                      <div className="spotlight-label insertion">📌 INSERTION (Distal Attachment)</div>
                      <p>{selectedMuscle.insertion}</p>
                    </div>

                    <div className="spotlight-col action">
                      <div className="spotlight-label action">⚙️ ACTION (Functional Movement)</div>
                      <p>{selectedMuscle.action}</p>
                    </div>
                  </div>

                  <div className="spotlight-meta-strip">
                    <div className="meta-block">
                      <strong>⚡ Nerve Supply:</strong> {selectedMuscle.innervation}
                    </div>
                    <div className="meta-block">
                      <strong>🩸 Arterial Supply:</strong> {selectedMuscle.bloodSupply}
                    </div>
                  </div>

                  <div className="spotlight-clinical-box">
                    <span className="clinical-badge">🩺 Clinical & Board Exam Pearl</span>
                    <p>{selectedMuscle.clinicalPearl}</p>
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
