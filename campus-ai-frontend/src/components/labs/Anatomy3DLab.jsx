import { useState } from "react";

// ============================================================================
// ANATOMICAL PARTS LIBRARY (MATCHED TO COGNI ANATOMY STRUCTURES & ATTACHMENTS)
// Comprehensive V.A.N. (Vein · Artery · Nerve) Triad for Bone Relations
// ============================================================================
const ANATOMICAL_PARTS_LIBRARY = [
  {
    id: "right-clavicle",
    name: "Right Clavicle",
    category: "Skeleton",
    region: "Upper limb",
    system: "Skeletal",
    presetId: "arm-bones",
    description:
      "Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.",
    origin: "Medial two-thirds curves convexly anteriorly; sternal end articulates with manubrium sterni at sternoclavicular joint.",
    insertion: "Lateral third curves concavely anteriorly; acromial end articulates with acromion of scapula at acromioclavicular joint.",
    action: "Acts as a rigid strut transmitting mechanical forces from upper limb to axial skeleton and maximizing arm reach.",
    // V.A.N. TRIAD (VEIN · ARTERY · NERVE) FOR BONE RELATIONS
    arteries:
      "1. Subclavian Artery (passes directly posteroinferior to medial 1/3 between clavicle and 1st rib); 2. Suprascapular Artery (courses posterior to clavicle); 3. Clavicular branch of Thoracoacromial Artery; 4. Internal Thoracic Artery. Nutrient Artery enters middle 1/3 directed laterally.",
    veins:
      "1. Subclavian Vein (courses posteroinferior to medial third, anterior to scalenus anterior; vulnerable in fracture or central line placement); 2. External Jugular Vein (crosses superficial to middle third of clavicle to pierce deep fascia); 3. Cephalic Vein (courses in deltopectoral groove immediately inferior to clavicle).",
    nerves:
      "1. Supraclavicular Nerves (medial, intermediate, and lateral branches from C3–C4 cervical plexus) crossing superficial to bone under platysma; 2. Nerve to Subclavius (C5, C6); 3. Trunks and cords of Brachial Plexus passing posteroinferior to middle third.",
    fractureDanger:
      "Midshaft clavicle fractures (80% of all fractures) risk lacerating the Subclavian Vein and Subclavian Artery, or compressing Brachial Plexus trunks. Sternocleidomastoid pulls medial fragment upward; Deltoid & arm gravity pull lateral fragment downward and medially.",
    nutrientForamen: "Situated in the middle third on the inferior surface, directed laterally toward the acromial end.",
    clinicalPearl:
      "Most frequently fractured bone in the human body. Subclavian vein puncture for central lines is performed 1 cm inferior to clavicle junction of medial and middle thirds.",
  },
  {
    id: "humerus-bone",
    name: "Right Humerus (Arm Bone)",
    category: "Skeleton",
    region: "Upper limb",
    system: "Skeletal",
    presetId: "arm-bones",
    description:
      "Long bone of the upper arm articulating proximally with the glenoid cavity of the scapula and distally with the radius and ulna at the elbow.",
    origin: "Greater tubercle, lesser tubercle, intertubercular groove, and deltoid tuberosity.",
    insertion: "Medial and lateral epicondyles, trochlea, and capitulum at distal elbow articulation.",
    action: "Mechanical arm lever for reaching, pushing, pulling, and overhead throwing motions.",
    arteries:
      "1. Surgical neck: Anterior and Posterior Circumflex Humeral Arteries (from 3rd part of axillary artery); 2. Shaft / Spiral groove: Profunda Brachii (Deep Brachial) Artery; 3. Distal supracondylar: Brachial Artery and Superior/Inferior Ulnar Collateral Arteries.",
    veins:
      "Paired Brachial Veins (venae comitantes running with brachial artery), Basilic Vein (medial arm), Cephalic Vein (anterolateral arm), and Circumflex Humeral Veins.",
    nerves:
      "1. Surgical neck: Axillary Nerve (C5, C6); 2. Spiral groove: Radial Nerve (C5–T1); 3. Distal supracondylar: Median Nerve (C5–T1); 4. Medial epicondyle groove: Ulnar Nerve (C8, T1; 'funny bone').",
    fractureDanger:
      "Surgical neck fracture injures Axillary Nerve & Posterior Circumflex Humeral Artery (deltoid paralysis). Midshaft fracture lacerates Radial Nerve & Profunda Brachii in spiral groove (Wrist Drop). Supracondylar fracture in children lacerates Brachial Artery and Median Nerve (Volkmann's Ischemic Contracture). Medial epicondyle fracture injures Ulnar Nerve (Claw Hand).",
    nutrientForamen: "Enters near the midshaft on the anteromedial border, directed DOWNWARD toward the elbow ('To the elbow I go').",
    clinicalPearl:
      "Mnemonic ARM for humeral fracture nerve relations: Axillary (surgical neck), Radial (midshaft), Median (supracondylar), Ulnar (medial epicondyle).",
  },
  {
    id: "scapula-bone",
    name: "Scapula (Shoulder Blade)",
    category: "Skeleton",
    region: "Upper limb",
    system: "Skeletal",
    presetId: "arm-bones",
    description:
      "Flat triangular bone of the pectoral girdle lying on posterolateral chest wall across ribs 2 to 7. Anchors 17 distinct muscle attachments.",
    origin: "Supraspinous fossa, infraspinous fossa, subscapular fossa, spine, acromion, and coracoid process.",
    insertion: "Glenoid cavity articulates with humeral head to form multiaxial glenohumeral joint.",
    action: "Provides mobile platform for arm elevation, protraction, retraction, and upward rotation.",
    arteries:
      "Scapular Anastomosis: 1. Suprascapular Artery (from thyrocervical trunk, passes over transverse scapular ligament); 2. Dorsal Scapular Artery (deep branch of transverse cervical); 3. Circumflex Scapular Artery (from subscapular branch of 3rd part of axillary). Ensures collateral circulation if axillary artery is occluded.",
    veins:
      "Suprascapular Veins, Circumflex Scapular Veins, and Subscapular Veins draining into the Axillary Vein.",
    nerves:
      "1. Suprascapular Nerve (C5, C6; passes under transverse scapular ligament through notch); 2. Dorsal Scapular Nerve (C5); 3. Axillary Nerve (passes close to inferior joint capsule); 4. Long Thoracic Nerve (courses across serratus anterior).",
    fractureDanger:
      "Fracture of scapular neck threatens Suprascapular Nerve and Artery. Scapular body fractures result from high-energy impact and have a high association with rib fractures, pneumothorax, and pulmonary contusion.",
    nutrientForamen: "Located on the costal surface in the subscapular fossa and near the infraspinous crest.",
    clinicalPearl:
      "Scapular anastomosis is an essential medical exam topic: connects 1st part of subclavian artery with 3rd part of axillary artery.",
  },
  {
    id: "right-third-rib",
    name: "Right Third Rib",
    category: "Skeleton",
    region: "Trunk",
    system: "Skeletal",
    presetId: "skeleton",
    description:
      "True vertebrosternal rib articulating with T3 thoracic vertebra posteriorly and sternum anteriorly via costal cartilage. Protects thoracic organs.",
    origin: "Head has 2 articular facets for bodies of T2 and T3 vertebrae; tubercle articulates with T3 transverse process.",
    insertion: "Anterior costal end joins the 3rd costal cartilage to insert into lateral sternal border.",
    action: "Expands thoracic volume during inspiration (bucket-handle and pump-handle movements).",
    arteries:
      "3rd Posterior Intercostal Artery (arises directly from thoracic aorta) and Anterior Intercostal Arteries (branches of Internal Thoracic Artery) running in the subcostal groove.",
    veins:
      "3rd Posterior Intercostal Vein (drains into Azygos Vein on right) and Anterior Intercostal Veins (drain into Internal Thoracic Vein). The intercostal vein is the HIGHEST structure in the costal groove: V.A.N. (Vein, Artery, Nerve from top to bottom).",
    nerves:
      "3rd Intercostal Nerve (anterior primary ramus of T3 spinal nerve). Runs inferior to the intercostal artery, closest to the lower rib margin, making it most vulnerable during procedures.",
    fractureDanger:
      "Displaced rib fractures lacerate the high-pressure Posterior Intercostal Artery and Vein, causing massive Hemothorax. Inward displacement punctures parietal and visceral pleura, causing Tension Pneumothorax.",
    nutrientForamen: "Located in the costal groove near the angle of the rib, directed towards the anterior end.",
    clinicalPearl:
      "Thoracentesis (pleural fluid aspiration) and chest tube placement must ALWAYS be performed directly OVER the superior border of the lower rib to avoid the subcostal V.A.N. bundle.",
  },
  {
    id: "femur-part",
    name: "Femur (Right Thigh Bone)",
    category: "Skeleton",
    region: "Lower limb",
    system: "Skeletal",
    presetId: "leg-bones",
    description:
      "Longest and strongest tubular bone in the human body, transmitting weight from the acetabular pelvis to the tibia.",
    origin: "Head fits into acetabulum; greater and lesser trochanters anchor hip rotators and iliopsoas.",
    insertion: "Distal medial and lateral condyles articulate with tibia and patella.",
    action: "Forms hip and knee joints; provides structural lever for bipedal locomotion.",
    arteries:
      "1. Head & Neck: Retinacular branches of Medial Circumflex Femoral Artery and Lateral Circumflex Femoral Artery; Artery of ligamentum teres (from obturator). 2. Shaft: 4 Perforating branches of Profunda Femoris Artery. 3. Distal: Popliteal and Genicular Arteries.",
    veins:
      "Femoral Vein (courses through adductor canal and femoral triangle), Profunda Femoris Vein, Great Saphenous Vein (drains into femoral vein at fossa ovalis), and Popliteal Vein.",
    nerves:
      "Femoral Nerve (L2–L4 anterior relations in femoral triangle), Sciatic Nerve (L4–S3 posterior relations in deep gluteal/posterior thigh), and Obturator Nerve (L2–L4 medial relations).",
    fractureDanger:
      "1. Intracapsular Femoral Neck fracture: tears retinacular branches of Medial Circumflex Femoral Artery, inevitably causing Avascular Necrosis (AVN) of the femoral head. 2. Midshaft femur fracture: causes 1 to 2 Liters of concealed internal hemorrhage from torn perforating vessels. 3. Supracondylar distal fracture: distal fragment tilts posteriorly by gastrocnemius pull, lacerating Popliteal Artery and Tibial Nerve.",
    nutrientForamen: "Enters along the linea aspera, directed UPWARD away from the knee joint ('From the knee I flee').",
    clinicalPearl:
      "Femoral neck fractures in elderly present with shortened and externally rotated lower limb due to psoas major and gluteal pull.",
  },
  {
    id: "tibia-fibula-bone",
    name: "Tibia & Fibula (Leg Bones)",
    category: "Skeleton",
    region: "Lower limb",
    system: "Skeletal",
    presetId: "leg-bones",
    description:
      "Bones of the lower leg. Tibia is the major weight-bearing bone; Fibula provides lateral stability and muscle attachments.",
    origin: "Tibial plateau condyles articulate with femoral condyles; fibular head articulates with lateral tibial condyle.",
    insertion: "Medial malleolus (tibia) and lateral malleolus (fibula) form the mortise of the talocrural ankle joint.",
    action: "Weight transmission, ankle stability, and attachment for leg anterior, lateral, and posterior muscles.",
    arteries:
      "Anterior Tibial Artery (passes through interosseous hiatus to anterior compartment, becomes Dorsalis Pedis), Posterior Tibial Artery (runs in deep posterior compartment, branches to medial/lateral plantar), and Fibular (Peroneal) Artery.",
    veins:
      "Anterior and Posterior Tibial Veins (paired venae comitantes), Fibular Veins, Great Saphenous Vein (passes anterior to medial malleolus), and Small Saphenous Vein (passes posterior to lateral malleolus).",
    nerves:
      "Common Fibular (Peroneal) Nerve (winds around subcutaneous neck of fibula), Deep Fibular Nerve (anterior compartment), Superficial Fibular Nerve (lateral compartment), and Tibial Nerve (posterior compartment).",
    fractureDanger:
      "Fibular neck fracture or tight plaster cast crushes Common Fibular Nerve against fibular bone, producing complete Foot Drop (loss of dorsiflexion and eversion). Tibial shaft fractures frequently cause Acute Compartment Syndrome, occluding anterior tibial artery and causing ischemic necrosis.",
    nutrientForamen: "Tibia has the largest nutrient foramen in the human skeleton, located on posterior surface below soleal line, pointing downward away from knee.",
    clinicalPearl:
      "Great saphenous vein cutdown is safely performed 2.5 cm anterior and superior to the medial malleolus.",
  },
  {
    id: "spine-vertebrae-bone",
    name: "Vertebral Column & Spine",
    category: "Skeleton",
    region: "Trunk",
    system: "Skeletal",
    presetId: "spine",
    description:
      "Flexible axial pillar of 33 vertebrae (7 cervical, 12 thoracic, 5 lumbar, 5 sacral, 4 coccygeal) housing the spinal cord.",
    origin: "Vertebral bodies, pedicles, laminae, transverse and spinous processes.",
    insertion: "Intervertebral discs (annulus fibrosus & nucleus pulposus) and facet (zygapophyseal) joints.",
    action: "Protects spinal cord, bears axial body weight, and facilitates multidirectional trunk movements.",
    arteries:
      "Anterior Spinal Artery (supplies anterior 2/3 of spinal cord), paired Posterior Spinal Arteries, Segmental Medullary Arteries, and the Artery of Adamkiewicz (great anterior radiculomedullary artery, usually T9–L2 left side).",
    veins:
      "Internal and External Vertebral Venous Plexuses (Batson's Plexus)—a vast network of VALVELESS veins connecting pelvic and abdominal veins directly to spinal and intracranial veins, explaining how prostate and pelvic cancers metastasize to the spine and brain without lung filtering!",
    nerves:
      "31 pairs of Spinal Nerves (C1–C8, T1–T12, L1–L5, S1–S5, Co1) exiting via intervertebral foramina; Sinuvertebral Nerves (recurrent meningeal nerves) innervating outer disc and posterior longitudinal ligament.",
    fractureDanger:
      "Burst fractures of vertebral bodies retropulse fragments into the spinal canal, lacerating spinal arteries and compressing the spinal cord or cauda equina, producing paraplegia, sensory loss, and neurogenic bladder.",
    nutrientForamen: "Basivertebral foramina on the posterior and anterior surfaces of vertebral bodies.",
    clinicalPearl:
      "Batson's valveless venous plexus is the premier USMLE / NEET-PG board question explaining spinal metastases from prostate and breast carcinomas.",
  },
  {
    id: "ascending-trapezius",
    name: "Ascending Part Of Right Trapezius",
    category: "Muscles",
    region: "Head",
    system: "Musculoskeletal",
    presetId: "trapezius",
    muscleId: "trapezius-muscle",
    description:
      "Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.",
    origin: "Spinous processes and supraspinous ligaments of thoracic vertebrae T4 through T12.",
    insertion: "Apex of the spine of the scapula at a smooth triangular tubercle near medial border.",
    action: "Depresses the scapula and upwardly rotates the glenoid cavity during overhead abduction (>90°).",
    arteries:
      "Superficial branch of Transverse Cervical Artery (cervicodorsal trunk), Dorsal Scapular Artery, and Posterior Intercostal Arteries.",
    veins:
      "Transverse Cervical Vein and External Jugular tributaries draining into Subclavian Vein.",
    nerves:
      "Motor: Spinal Accessory Nerve (Cranial Nerve XI) passing through posterior cervical triangle. Sensory/Proprioception: Ventral rami of C3–C4 cervical spinal nerves.",
    fractureDanger:
      "Scapular spine or upper thoracic spine trauma can avulse the insertion tubercle. Posterior triangle lymph node biopsy lacerates CN XI, producing Shoulder Droop.",
    clinicalPearl:
      "Works with lower fibers of Serratus Anterior as a vital force couple to rotate the glenoid cavity upward for abduction >90°.",
  },
  {
    id: "deltoid-part",
    name: "Deltoid Muscle",
    category: "Muscles",
    region: "Upper limb",
    system: "Musculoskeletal",
    presetId: "muscles",
    muscleId: "deltoid-muscle",
    description:
      "Major multipennate abductor of the glenohumeral joint covering the shoulder with anterior, middle, and posterior heads.",
    origin: "Lateral 1/3 of clavicle, lateral acromion, and lower lip of crest of scapular spine.",
    insertion: "Deltoid tuberosity on lateral middle shaft of humerus.",
    action: "Abducts arm from 15° to 90° (middle fibers); anterior fibers flex and medially rotate; posterior fibers extend and laterally rotate.",
    arteries:
      "Posterior Circumflex Humeral Artery (passes through quadrangular space with axillary nerve) and Deltoid branch of Thoracoacromial Artery.",
    veins:
      "Posterior Circumflex Humeral Veins draining into Axillary Vein; Cephalic Vein running in the deltopectoral groove.",
    nerves:
      "Axillary Nerve (C5, C6) arising from the posterior cord of the brachial plexus.",
    fractureDanger:
      "Surgical neck humerus fractures or anterior shoulder dislocation compress or tear the Axillary Nerve, producing deltoid paralysis and sensory loss over the lateral shoulder.",
    clinicalPearl:
      "Intramuscular shoulder injections are administered into the central bulky middle deltoid, 2 to 3 fingerbreadths below the acromion to avoid the axillary nerve.",
  },
  {
    id: "biceps-brachii-part",
    name: "Biceps Brachii",
    category: "Muscles",
    region: "Upper limb",
    system: "Musculoskeletal",
    presetId: "muscles",
    muscleId: "biceps-muscle",
    description:
      "Two-headed flexor and supinator muscle of the anterior arm acting across both shoulder and elbow joints.",
    origin: "Long head: supraglenoid tubercle of scapula; Short head: tip of coracoid process.",
    insertion: "Radial tuberosity of radius and bicipital aponeurosis.",
    action: "Chief powerful supinator of the flexed forearm and elbow flexor.",
    arteries:
      "Muscular branches of the Brachial Artery and Anterior Circumflex Humeral Artery.",
    veins:
      "Brachial Veins (venae comitantes), Basilic Vein, and Median Cubital Vein (passing superficial to bicipital aponeurosis).",
    nerves:
      "Musculocutaneous Nerve (C5, C6) passing between biceps and brachialis; terminates as Lateral Antebrachial Cutaneous Nerve.",
    fractureDanger:
      "Bicipital groove fractures can lacerate the tendon or trap the anterior circumflex humeral ascending artery.",
    clinicalPearl:
      "Bicipital aponeurosis protects the underlying Brachial Artery and Median Nerve from accidental puncture during cubital venipuncture.",
  },
  {
    id: "heart-structure",
    name: "Heart (Myocardium & Chambers)",
    category: "Circulatory",
    region: "Trunk",
    system: "Circulatory",
    presetId: "heart-detailed",
    description:
      "Four-chambered muscular double pump enclosed in the fibrous and serous pericardium inside the middle mediastinum.",
    origin: "Primitive embryonic heart tube; right atrium receives SVC, IVC, and coronary sinus.",
    insertion: "Pumps blood out through Pulmonary Trunk (right ventricle) and Aorta (left ventricle).",
    action: "Rhythmic electrical contraction (systole) and relaxation (diastole) to perfuse body tissues.",
    arteries:
      "Left Main Coronary (LAD + Circumflex) and Right Coronary Artery (RCA -> Posterior Descending Artery).",
    veins:
      "Great, Middle, and Small Cardiac Veins draining into the Coronary Sinus, emptying into the Right Atrium.",
    nerves:
      "Cardiac Plexus: Sympathetics (T1–T5) increase heart rate and inotropy; Parasympathetics (Vagus CN X) decrease heart rate.",
    fractureDanger:
      "Sternum and anterior rib fractures from steering wheel impact can cause severe Myocardial Contusion, pericardial tamponade, or traumatic rupture of the aorta at the aortic isthmus.",
    clinicalPearl:
      "Beck's Triad of cardiac tamponade: 1. Hypotension, 2. Distant/muffled heart sounds, 3. Jugular venous distension.",
  },
  {
    id: "lungs-structure",
    name: "Lungs & Tracheobronchial Tree",
    category: "Respiratory",
    region: "Trunk",
    system: "Respiratory",
    presetId: "respiratory-system",
    description:
      "Essential respiratory organs where venous blood is oxygenated and carbon dioxide is excreted across alveolar membranes.",
    origin: "Trachea bifurcates at carina (T4/T5) into right and left primary bronchi.",
    insertion: "Extends down to 300 million alveoli with capillary networks.",
    action: "Pulmonary ventilation, gas exchange, and acid-base blood buffering.",
    arteries:
      "Pulmonary Arteries (carry deoxygenated blood from right ventricle) and Bronchial Arteries (arise from thoracic aorta to provide nutritive supply to lung parenchyma).",
    veins:
      "Pulmonary Veins (4 veins carrying oxygenated blood to left atrium) and Bronchial Veins (drain to azygos and hemiazygos).",
    nerves:
      "Pulmonary Plexus: Vagus CN X (bronchoconstriction and secretomotor) and Sympathetics T2–T5 (bronchodilation via beta-2 receptors).",
    fractureDanger:
      "Fractured rib fragments puncturing lung parenchyma produce pneumothorax, hemothorax, or surgical subcutaneous emphysema.",
    clinicalPearl:
      "Aspirated foreign objects preferentially enter Right Main Bronchus due to its wider, shorter, and more vertical course.",
  },
  {
    id: "brain-structure",
    name: "Brain (Cerebrum & Cerebellum)",
    category: "Nervous",
    region: "Head",
    system: "Nervous",
    presetId: "brain",
    description:
      "Cerebral hemispheres, basal ganglia, brainstem, and cerebellum managing higher executive cognition, motor control, and sensory integration.",
    origin: "Neural tube derivatives (Telencephalon, Diencephalon, Mesencephalon, Rhombencephalon).",
    insertion: "Corticospinal tracts and 12 pairs of cranial nerves.",
    action: "Cognition, memory, voluntary locomotion, sensory reception, and autonomic vegetative control.",
    arteries:
      "Circle of Willis: Internal Carotid Arteries (Anterior & Middle Cerebral) and Vertebrobasilar system (Posterior Cerebral & Basilar).",
    veins:
      "Internal Cerebral Veins -> Great Cerebral Vein of Galen -> Straight Sinus -> Superior/Inferior Sagittal Sinuses -> Transverse & Sigmoid Sinuses -> Internal Jugular Vein.",
    nerves:
      "Origin of all 12 Cranial Nerves (CN I through CN XII) and central sensory/motor neuro-pathways.",
    fractureDanger:
      "Pterion fracture tears Middle Meningeal Artery (acute Epidural Hematoma). Skull base fracture tears internal carotid in cavernous sinus (carotid-cavernous fistula).",
    clinicalPearl:
      "Bridging veins tearing from sudden deceleration produce Subdural Hematoma (crescentic shape on non-contrast head CT).",
  },
  {
    id: "quadriceps-part",
    name: "Quadriceps Femoris",
    category: "Muscles",
    region: "Lower limb",
    system: "Musculoskeletal",
    presetId: "muscles",
    muscleId: "quadriceps-muscle",
    description:
      "Four-headed anterior thigh muscle extending the knee and stabilizing patellar tracking during walking and running.",
    origin: "Rectus femoris (AIIS), Vastus lateralis, Vastus medialis, and Vastus intermedius.",
    insertion: "Patella via common quadriceps tendon, continuing as patellar ligament into tibial tuberosity.",
    action: "Extends leg at knee joint; Rectus femoris also flexes thigh at hip joint.",
    arteries:
      "Lateral Circumflex Femoral Artery, Medial Circumflex Femoral Artery, and Deep Femoral (Profunda Femoris) Artery.",
    veins:
      "Profunda Femoris Vein draining into Femoral Vein.",
    nerves:
      "Femoral Nerve (L2, L3, L4 posterior division).",
    fractureDanger:
      "Patellar fracture or violent eccentric contraction ruptures patellar tendon, causing complete inability to perform straight leg raise.",
    clinicalPearl:
      "Knee jerk reflex tests L3–L4 spinal segments via Femoral Nerve.",
  },
];

// ============================================================================
// HIGH-YIELD MUSCLES DIRECTORY: ORIGIN, INSERTION, ACTION & INNERVATION (O.I.A.I.)
// Exhaustive medical school & board exam reference database (USMLE / NEET-PG / PLAB)
// ============================================================================
const HIGH_YIELD_MUSCLES_DIRECTORY = [
  {
    id: "trapezius-muscle",
    name: "Trapezius (Ascending, Middle & Descending)",
    region: "Posterior Neck & Upper Back",
    latin: "Musculus trapezius",
    fmaId: "FMA:9626",
    heads: [
      {
        name: "Ascending (Inferior) Fibers",
        origin: "Spinous processes of T4–T12 vertebrae and supraspinous ligaments.",
        insertion: "Smooth triangular tubercle on the apex of the spine of the scapula.",
        action: "Depresses scapula and assists upward rotation of glenoid during overhead arm elevation.",
      },
      {
        name: "Middle (Transverse) Fibers",
        origin: "Spinous processes of C7–T3 vertebrae and supraspinous ligaments.",
        insertion: "Medial margin of the acromion and superior lip of the crest of the scapular spine.",
        action: "Retracts (adducts) scapula toward midline; stabilizes scapula against thoracic cage.",
      },
      {
        name: "Descending (Superior) Fibers",
        origin: "External occipital protuberance, medial 1/3 of superior nuchal line, ligamentum nuchae, C7 spine.",
        insertion: "Posterior border of the lateral 1/3 of the clavicle.",
        action: "Elevates pectoral girdle; upwardly rotates scapula; extends and laterally flexes neck.",
      },
    ],
    origin:
      "External occipital protuberance, medial third of superior nuchal line, ligamentum nuchae, and spinous processes of C7–T12 vertebrae (Ascending part: T4–T12 spines).",
    insertion:
      "Lateral third of posterior border of clavicle, medial margin of acromion, and superior lip of spine of scapula to apex tubercle.",
    action:
      "Ascending fibers depress scapula; Descending fibers elevate scapula; Middle fibers retract scapula; Upper + lower fibers act as a force couple with Serratus Anterior to rotate glenoid cavity superiorly for abduction >90°.",
    synergists: "Serratus Anterior (upward rotation), Levator Scapulae (elevation), Rhomboid major & minor (retraction).",
    antagonists: "Pectoralis Minor & Serratus Anterior (protraction vs retraction), Latissimus Dorsi (depression vs elevation), Rhomboids (downward rotation vs upward rotation).",
    innervation: "Motor: Spinal Accessory Nerve (Cranial Nerve XI). Sensory / Proprioception: Ventral rami of C3 and C4 cervical spinal nerves.",
    bloodSupply: "Superficial branch of Transverse Cervical Artery (cervicodorsal trunk), Dorsal Scapular Artery, Posterior Intercostal Arteries.",
    lymphatics: "Drains into Superficial Cervical and Supraclavicular lymph node chains.",
    bedsideTest:
      "1. Superior fibers: Ask patient to shrug shoulders upward against examiner's downward manual resistance. 2. Middle fibers: Ask patient to pull shoulders backward ('brace chest') against anterior resistance. 3. Inferior fibers: Patient abducts arm to 130° and presses downward against upward resistance.",
    clinicalPearl:
      "Spinal Accessory Nerve (CN XI) is vulnerable to iatrogenic injury during posterior cervical triangle lymph node biopsy. Laceration causes Shoulder Droop, inability to abduct the arm above 90°, and Lateral Scapular Winging (scapula shifts downward and laterally).",
    vivaQuestion: {
      q: "Why is the Spinal Accessory Nerve uniquely vulnerable in the neck, and how does Trapezius winging differ from Serratus Anterior winging?",
      a: "CN XI runs superficially in the roof of the posterior cervical triangle just beneath the investing layer of deep cervical fascia with no muscular roof. Trapezius paralysis produces Lateral Winging (scapular spine shifts down and away from midline), whereas Serratus Anterior paralysis (Long Thoracic Nerve) produces Medial Winging (vertebral border lifts posteriorly toward midline).",
    },
  },
  {
    id: "deltoid-muscle",
    name: "Deltoid",
    region: "Shoulder",
    latin: "Musculus deltoideus",
    fmaId: "FMA:9622",
    heads: [
      {
        name: "Anterior (Clavicular) Head",
        origin: "Anterior border and superior surface of lateral 1/3 of clavicle.",
        insertion: "Deltoid tuberosity on lateral middle humerus shaft.",
        action: "Flexes and medially (internally) rotates the humerus at the glenohumeral joint.",
      },
      {
        name: "Middle (Acromial) Head (Multipennate)",
        origin: "Lateral margin and superior surface of acromion of scapula.",
        insertion: "Deltoid tuberosity of humerus.",
        action: "Chief powerful abductor of the arm from 15° to 90°.",
      },
      {
        name: "Posterior (Spinal) Head",
        origin: "Inferior lip of the posterior border of the crest of the scapular spine.",
        insertion: "Deltoid tuberosity of humerus.",
        action: "Extends and laterally (externally) rotates the humerus.",
      },
    ],
    origin:
      "Anterior: lateral 1/3 of clavicle. Middle: lateral border of acromion. Posterior: lower lip of crest of spine of scapula.",
    insertion: "Deltoid tuberosity on the lateral aspect of the middle shaft of humerus.",
    action:
      "Middle head: powerful arm abduction between 15° and 90° (multipennate architecture). Anterior head: flexion and medial rotation. Posterior head: extension and lateral rotation.",
    synergists: "Supraspinatus (initiates first 0°–15° abduction), Pectoralis major (anterior head flexion), Latissimus dorsi (posterior head extension).",
    antagonists: "Pectoralis Major, Latissimus Dorsi, Teres Major (adduction).",
    innervation: "Axillary Nerve (C5, C6) originating from the posterior cord of the brachial plexus.",
    bloodSupply: "Posterior Circumflex Humeral Artery (passes through quadrangular space), Deltoid branch of Thoracoacromial Artery.",
    lymphatics: "Drains to Subscapular and Central Axillary lymph nodes.",
    bedsideTest:
      "Patient abducts arm to 90° in the scapular plane with elbow flexed; examiner applies downward force on distal humerus while palpating middle deltoid contraction.",
    clinicalPearl:
      "Fracture of the surgical neck of the humerus or anterior shoulder dislocation damages the Axillary Nerve, causing deltoid muscle paralysis, loss of arm abduction (15°–90°), and cutaneous sensory anesthesia over the 'regimental badge area' (lateral shoulder).",
    vivaQuestion: {
      q: "What anatomical boundary structures define the Quadrangular Space, and what vital structures pass through it?",
      a: "Boundaries: Superior: Teres minor; Inferior: Teres major; Medial: Long head of triceps; Lateral: Surgical neck of humerus. Contents: Axillary nerve and Posterior Circumflex Humeral Artery and veins.",
    },
  },
  {
    id: "biceps-muscle",
    name: "Biceps Brachii",
    region: "Anterior Arm",
    latin: "Musculus biceps brachii",
    fmaId: "FMA:37670",
    heads: [
      {
        name: "Long Head (Intracapsular)",
        origin: "Supraglenoid tubercle of scapula and superior glenoid labrum.",
        insertion: "Radial tuberosity and bicipital aponeurosis.",
        action: "Weak shoulder flexion; stabilizes humeral head in glenoid during arm motion.",
      },
      {
        name: "Short Head",
        origin: "Tip of the coracoid process of the scapula (conjoint tendon with coracobrachialis).",
        insertion: "Radial tuberosity of radius and deep fascia of medial forearm.",
        action: "Elbow flexion and powerful forearm supination; accessory shoulder flexion and adduction.",
      },
    ],
    origin:
      "Long head: supraglenoid tubercle of scapula (crosses intracapsularly over humeral head, through bicipital groove). Short head: tip of coracoid process of scapula.",
    insertion: "Radial tuberosity of radius and bicipital aponeurosis (lacertus fibrosus) into deep medial forearm fascia.",
    action:
      "Most powerful supinator of the flexed forearm (screwing/corkscrew motion); powerful flexor of elbow joint; weak accessory flexor of shoulder joint.",
    synergists: "Brachialis (pure elbow flexor in all forearm positions), Supinator (pure supination), Brachioradialis.",
    antagonists: "Triceps Brachii (elbow extension), Pronator Teres and Pronator Quadratus (forearm pronation).",
    innervation: "Musculocutaneous Nerve (C5, C6) from the lateral cord of the brachial plexus; terminates as Lateral Antebrachial Cutaneous Nerve.",
    bloodSupply: "Muscular branches of the Brachial Artery.",
    lymphatics: "Drains into Brachial (Lateral) and Central Axillary lymph node groups.",
    bedsideTest:
      "1. Supination test: Patient flexes elbow to 90° with forearm fully pronated; patient forcefully supinates against examiner's resistance. 2. Biceps tendon reflex (evaluates C5–C6 spinal roots).",
    clinicalPearl:
      "Rupture of the long head of the biceps tendon (often at proximal bicipital groove) produces the classic 'Popeye Muscle Deformity'—a prominent bulging muscle belly in the distal anterior arm with proximal ecchymosis.",
    vivaQuestion: {
      q: "Why is the Biceps Brachii a more powerful supinator when the elbow is flexed at 90° compared to when fully extended?",
      a: "When the elbow is flexed at 90°, the radial tuberosity is oriented so the biceps tendon pulls at a perpendicular (90°) mechanical angle to the axis of rotation of the radius, generating maximum torque.",
    },
  },
  {
    id: "triceps-muscle",
    name: "Triceps Brachii",
    region: "Posterior Arm",
    latin: "Musculus triceps brachii",
    fmaId: "FMA:37688",
    heads: [
      {
        name: "Long Head",
        origin: "Infraglenoid tubercle of scapula.",
        insertion: "Olecranon process of ulna.",
        action: "Elbow extension; adducts humerus; stabilizes abducted glenohumeral joint.",
      },
      {
        name: "Lateral Head",
        origin: "Posterior surface of humerus superior to the radial (spiral) groove and lateral intermuscular septum.",
        insertion: "Olecranon process of ulna.",
        action: "Powerful elbow extension against high load.",
      },
      {
        name: "Medial Head (Deep 'Workhorse')",
        origin: "Posterior surface of humerus inferior to the radial groove and medial intermuscular septum.",
        insertion: "Olecranon process of ulna.",
        action: "Active in all forms of forearm extension, even against minimal resistance.",
      },
    ],
    origin:
      "Long head: infraglenoid tubercle of scapula. Lateral head: posterior humerus above radial groove. Medial head: posterior humerus below radial groove.",
    insertion: "Superior posterior surface of the olecranon process of the ulna and deep fascia of forearm.",
    action: "Chief powerful extensor of the forearm at the elbow joint; long head assists in adduction and extension of the shoulder joint.",
    synergists: "Anconeus (assists extension and stabilizes elbow).",
    antagonists: "Biceps Brachii, Brachialis, Brachioradialis (elbow flexors).",
    innervation: "Radial Nerve (C6, C7, C8). Note: Branches to long and lateral heads emerge high in the axilla before entering the spiral groove.",
    bloodSupply: "Profunda Brachii (deep brachial) Artery and Superior Ulnar Collateral Artery.",
    lymphatics: "Drains into Lateral (Humeral) and Subscapular Axillary lymph nodes.",
    bedsideTest:
      "Patient flexes elbow to 90° and extends forearm against resistance applied at the distal wrist; Triceps deep tendon reflex (tests C7–C8).",
    clinicalPearl:
      "In mid-shaft humeral fractures injuring the Radial Nerve in the spiral groove, triceps extension is preserved because the nerve branches to long and lateral heads arise proximal to the spiral groove in the axilla. Wrist drop is present, but elbow extension remains intact.",
    vivaQuestion: {
      q: "Explain why elbow extension is spared in a patient with mid-shaft humeral fracture presenting with complete wrist drop.",
      a: "The motor branches of the radial nerve to the long and lateral heads of the triceps brachii arise high in the axilla, proximal to the entrance into the radial (spiral) groove where midshaft fractures occur.",
    },
  },
  {
    id: "pectoralis-major-muscle",
    name: "Pectoralis Major",
    region: "Anterior Chest Wall",
    latin: "Musculus pectoralis major",
    fmaId: "FMA:9627",
    heads: [
      {
        name: "Clavicular Head",
        origin: "Anterior surface of the medial half of the clavicle.",
        insertion: "Lateral lip of the intertubercular (bicipital) groove of the humerus.",
        action: "Flexes and medially rotates the humerus; horizontal adduction.",
      },
      {
        name: "Sternocostal Head",
        origin: "Anterior surface of sternum, superior 6 costal cartilages, and aponeurosis of external abdominal oblique.",
        insertion: "Lateral lip of bicipital groove of humerus (bilaminar tendon).",
        action: "Adducts and medially rotates humerus; extends flexed arm back to anatomical neutral.",
      },
    ],
    origin:
      "Clavicular head: anterior medial half of clavicle. Sternocostal head: sternum, upper 6 costal cartilages, and external oblique aponeurosis.",
    insertion: "Lateral lip of the intertubercular (bicipital) groove of humerus via a bilaminar, U-shaped tendon.",
    action:
      "Powerful adduction and medial rotation of the arm; clavicular head flexes humerus; sternocostal head extends flexed humerus; accessory muscle of inspiration in respiratory distress.",
    synergists: "Latissimus Dorsi, Teres Major, Subscapularis (adduction & medial rotation).",
    antagonists: "Deltoid, Infraspinatus, Teres Minor, Supraspinatus.",
    innervation: "Lateral Pectoral Nerve (C5, C6, C7) and Medial Pectoral Nerve (C8, T1) passing through pectoralis minor.",
    bloodSupply: "Pectoral branch of the Thoracoacromial Artery, Lateral Thoracic Artery, and anterior perforating branches of Internal Thoracic Artery.",
    lymphatics: "Drains into Pectoral (Anterior) Axillary lymph node group and Parasternal (internal mammary) nodes.",
    bedsideTest:
      "1. Clavicular head: Patient flexes arm forward to 90° and horizontally adducts against resistance. 2. Sternocostal head: Patient adducts horizontally abducted arm downwards and across chest against resistance.",
    clinicalPearl:
      "Poland Syndrome is a congenital condition characterized by unilateral absence of the sternocostal head of the Pectoralis Major, accompanied by ipsilateral syndactyly (fused fingers) and hypoplasia of breast and nipple tissue.",
    vivaQuestion: {
      q: "What anatomical structures pierce the clavipectoral fascia in the deltopectoral triangle?",
      a: "1. Cephalic vein (draining into axillary vein), 2. Thoracoacromial artery (branches), 3. Lateral pectoral nerve, 4. Lymphatic vessels from infraclavicular nodes.",
    },
  },
  {
    id: "latissimus-dorsi-muscle",
    name: "Latissimus Dorsi",
    region: "Posterior Trunk & Lower Back",
    latin: "Musculus latissimus dorsi",
    fmaId: "FMA:9628",
    heads: [
      {
        name: "Vertebral & Fascial Origin",
        origin: "Spinous processes of T7–T12 vertebrae, thoracolumbar fascia, and posterior 1/3 of outer lip of iliac crest.",
        insertion: "Floor of the bicipital groove of the humerus.",
        action: "Powerful humerus extension, adduction, and internal rotation.",
      },
      {
        name: "Costal & Scapular Digitations",
        origin: "Lower 3 or 4 ribs and inferior angle of the scapula.",
        insertion: "Floor of bicipital groove anterior to teres major.",
        action: "Pulls trunk upward and forward during climbing and chin-ups.",
      },
    ],
    origin:
      "Spinous processes of T7–T12, thoracolumbar fascia, posterior third of iliac crest, lower 3–4 ribs, and inferior angle of scapula.",
    insertion:
      "Floor of the intertubercular (bicipital) groove of the humerus (mnemonic: 'A lady between two majors'—Latissimus lies between Pectoralis Major laterally and Teres Major medially).",
    action:
      "Extends, adducts, and medially rotates the humerus; pulls trunk superiorly during climbing ('climber's muscle'); acts as an expulsive coughing muscle by compressing lower ribs.",
    synergists: "Teres Major (shares identical movements), Pectoralis Major (sternal head), Triceps (long head).",
    antagonists: "Deltoid (middle & anterior), Supraspinatus.",
    innervation: "Thoracodorsal Nerve (C6, C7, C8) arising from the posterior cord of the brachial plexus.",
    bloodSupply: "Thoracodorsal Artery (terminal branch of the subscapular artery from the 3rd part of axillary artery).",
    lymphatics: "Drains into Posterior (Subscapular) Axillary lymph node group.",
    bedsideTest:
      "1. Ask patient to cough forcefully while examiner palpates the posterior axillary fold for muscle belly contraction. 2. Patient adducts abducted arm against upward resistance.",
    clinicalPearl:
      "Latissimus Dorsi myocutaneous flap is commonly used in plastic and reconstructive surgery for autologous breast reconstruction and thoracic wall defects due to its robust single neurovascular pedicle (thoracodorsal vessels).",
    vivaQuestion: {
      q: "What are the anatomical boundaries of the Triangle of Auscultation, and why is it clinically significant?",
      a: "Boundaries: Medial: Lateral border of Trapezius; Inferior: Superior horizontal border of Latissimus Dorsi; Lateral: Medial border of Scapula. Floor: 6th and 7th intercostal spaces. It is a region devoid of thick muscle coverage where respiratory sounds of the lung's lower lobe are heard clearly.",
    },
  },
  {
    id: "serratus-anterior-muscle",
    name: "Serratus Anterior",
    region: "Lateral Thoracic Wall",
    latin: "Musculus serratus anterior",
    fmaId: "FMA:13397",
    heads: [
      {
        name: "Upper Digitations (1–2)",
        origin: "Ribs 1 and 2 and intercostal fascia.",
        insertion: "Superior angle of the costal surface of the scapula.",
        action: "Stabilizes scapula against anterior chest wall.",
      },
      {
        name: "Middle Digitations (3–4)",
        origin: "Ribs 3 and 4.",
        insertion: "Anterior costal surface of the medial border of the scapula.",
        action: "Protracts (pulls forward) the scapula ('boxer's muscle').",
      },
      {
        name: "Lower Digitations (5–8)",
        origin: "Outer surfaces of ribs 5 to 8 (interdigitates with external abdominal oblique).",
        insertion: "Large triangular area on costal surface of inferior angle of scapula.",
        action: "Powerful upward rotator of glenoid cavity during abduction above 90°.",
      },
    ],
    origin: "Outer surfaces and superior borders of the upper 8 to 9 ribs and intervening intercostal fascia.",
    insertion: "Costal (anterior) surface of the entire medial border of the scapula from superior to inferior angle.",
    action:
      "Protracts the scapula forward around thoracic wall ('boxer's muscle'); holds medial border firmly against the ribs; lower fibers rotate inferior angle laterally to upwardly rotate glenoid cavity for full abduction >90°.",
    synergists: "Trapezius (upward rotation force couple), Pectoralis Minor (protraction).",
    antagonists: "Rhomboid Major and Minor, Middle Trapezius (retraction).",
    innervation: "Long Thoracic Nerve of Bell (C5, C6, C7 roots from roots of brachial plexus; 'C5, 6, 7 raise your arms to heaven').",
    bloodSupply: "Lateral Thoracic Artery and Thoracodorsal Artery.",
    lymphatics: "Drains into Anterior (Pectoral) and Central Axillary lymph nodes.",
    bedsideTest:
      "Wall Push-Up Test: Ask patient to stand facing a wall with arms outstretched at shoulder height and push firmly against the wall; observe for medial winging of the scapula.",
    clinicalPearl:
      "Injury to the Long Thoracic Nerve during mastectomy, axillary lymph node dissection, or chest tube placement results in Medial Winged Scapula—the vertebral border of the scapula lifts prominently off the thoracic cage when pushing forward.",
    vivaQuestion: {
      q: "Why is the Long Thoracic Nerve particularly prone to injury during surgical procedures in the axilla?",
      a: "Unlike most motor nerves that run deep to the muscle they innervate, the Long Thoracic Nerve courses superficially on the outer surface of the Serratus Anterior within the superficial fascia of the lateral chest wall.",
    },
  },
  {
    id: "supraspinatus-muscle",
    name: "Supraspinatus (Rotator Cuff)",
    region: "Posterior Shoulder / Rotator Cuff",
    latin: "Musculus supraspinatus",
    fmaId: "FMA:9629",
    heads: [
      {
        name: "Fossa Belly & Tendon",
        origin: "Medial 2/3 of the supraspinous fossa of scapula and deep supraspinatus fascia.",
        insertion: "Superior facet of the greater tubercle of humerus and glenohumeral fibrous capsule.",
        action: "Initiates first 15° of glenohumeral abduction; seats and compresses humeral head into glenoid fossa.",
      },
    ],
    origin: "Medial two-thirds of the supraspinous fossa of the scapula and deep supraspinous fascia.",
    insertion: "Superior facet of the greater tubercle of the humerus and capsule of the glenohumeral joint.",
    action:
      "Initiates the first 0° to 15° of glenohumeral abduction before Deltoid takes over; dynamically stabilizes the glenohumeral joint by seating the humeral head firmly against the glenoid cavity.",
    synergists: "Deltoid (middle fibers act synergistically beyond 15°).",
    antagonists: "Pectoralis Major, Latissimus Dorsi, Teres Major (adduction).",
    innervation: "Suprascapular Nerve (C5, C6) from the superior trunk of the brachial plexus (passes through suprascapular notch beneath superior transverse scapular ligament).",
    bloodSupply: "Suprascapular Artery (passes OVER the superior transverse scapular ligament; 'Navy under the bridge, Army over the bridge') and Dorsal Scapular Artery.",
    lymphatics: "Drains into Subscapular and Apical Axillary lymph nodes.",
    bedsideTest:
      "Empty Can (Jobe's) Test: Arms abducted to 90° in scapular plane (30° anterior to coronal), fully internally rotated with thumbs pointing toward the floor; patient resists downward pressure.",
    clinicalPearl:
      "Supraspinatus is the most commonly torn rotator cuff tendon due to repeated subacromial impingement against the coracoacromial arch and poor vascularity at Codman's critical hypovascular zone near its insertion.",
    vivaQuestion: {
      q: "Explain the anatomical relationship of the Suprascapular Nerve and Artery at the suprascapular notch.",
      a: "The Suprascapular Nerve passes UNDER the superior transverse scapular ligament through the notch, while the Suprascapular Artery passes OVER the ligament ('Army over the bridge, Navy under the bridge').",
    },
  },
  {
    id: "gluteus-maximus-muscle",
    name: "Gluteus Maximus",
    region: "Gluteal Region / Buttock",
    latin: "Musculus gluteus maximus",
    fmaId: "FMA:22314",
    heads: [
      {
        name: "Superficial (Upper 3/4) Fibers",
        origin: "Posterior gluteal line of ilium, dorsal sacrum and coccyx, and sacrotuberous ligament.",
        insertion: "Iliotibial tract (cranial insertion).",
        action: "Steadies femur on articular surface of tibia during standing; abduction and lateral rotation.",
      },
      {
        name: "Deep (Lower 1/4) Fibers",
        origin: "Sacrotuberous ligament and lateral coccyx.",
        insertion: "Gluteal tuberosity of the upper posterior femur.",
        action: "Most powerful extensor of the hip joint against heavy resistance.",
      },
    ],
    origin:
      "Posterior gluteal line of ilium, posterior dorsal surface of sacrum and coccyx, sacrotuberous ligament, and thoracolumbar fascia.",
    insertion:
      "Upper three-quarters insert into the Iliotibial Tract (IT band) of tensor fasciae latae; lower one-quarter inserts into the Gluteal Tuberosity of femur.",
    action:
      "Chief powerful extensor of the thigh at hip joint (standing up from seated position, climbing stairs, running, jumping); powerful lateral rotator of hip.",
    synergists: "Hamstrings (Biceps Femoris long head, Semitendinosus, Semimembranosus), Adductor Magnus (posterior head).",
    antagonists: "Iliopsoas, Rectus Femoris, Tensor Fasciae Latae (hip flexors).",
    innervation: "Inferior Gluteal Nerve (L5, S1, S2) exiting the pelvis below piriformis through the greater sciatic foramen.",
    bloodSupply: "Superior and Inferior Gluteal Arteries (branches of internal iliac artery); cruciate anastomosis of thigh.",
    lymphatics: "Drains into Internal Iliac and Superficial Inguinal lymph nodes.",
    bedsideTest:
      "Patient in prone position with knee flexed to 90° (to isolate gluteus maximus from hamstrings); patient extends hip upward toward ceiling against downward resistance on posterior thigh.",
    clinicalPearl:
      "Inferior Gluteal Nerve injury causes 'Gluteus Maximus Lurch': at heel-strike during walking, the patient thrusts the trunk backwards to keep the center of gravity behind the hip joint axis and prevent falling forward.",
    vivaQuestion: {
      q: "Where is the safe quadrant for intramuscular (IM) injections in the buttock, and what nerves/vessels are avoided?",
      a: "The safe zone is the Upper Outer Quadrant (specifically Von Hochstetter's triangle of the anterolateral gluteal area). This avoids the Sciatic Nerve, Inferior Gluteal Nerve/vessels, and Superior Gluteal Nerve/vessels.",
    },
  },
  {
    id: "gluteus-medius-muscle",
    name: "Gluteus Medius",
    region: "Lateral Gluteal Region",
    latin: "Musculus gluteus medius",
    fmaId: "FMA:22315",
    heads: [
      {
        name: "Anterior Fibers",
        origin: "Outer iliac surface between anterior and middle gluteal lines.",
        insertion: "Lateral surface of greater trochanter of femur.",
        action: "Medially rotates and flexes hip joint.",
      },
      {
        name: "Posterior Fibers",
        origin: "Posterior outer surface of ilium.",
        insertion: "Lateral surface of greater trochanter of femur.",
        action: "Abducts thigh and stabilizes pelvis in the coronal plane during single-leg stance.",
      },
    ],
    origin: "Gluteal (outer) surface of the ilium between the anterior and posterior gluteal lines.",
    insertion: "Lateral and superoposterior surface of the Greater Trochanter of the femur.",
    action:
      "Chief abductor of the thigh at the hip joint; anterior fibers medially rotate thigh; critically prevents tilting of the pelvis to the unsupported side during walking (single-limb stance phase).",
    synergists: "Gluteus Minimus, Tensor Fasciae Latae.",
    antagonists: "Adductor Longus, Adductor Brevis, Adductor Magnus, Gracilis (adductors).",
    innervation: "Superior Gluteal Nerve (L4, L5, S1) exiting above piriformis through the greater sciatic foramen.",
    bloodSupply: "Deep branch of Superior Gluteal Artery and Trochanteric Anastomosis.",
    lymphatics: "Drains into Internal Iliac and Common Iliac lymph node chains.",
    bedsideTest:
      "Trendelenburg Test: Patient stands on one leg; normally the abductors contract to keep the unsupported pelvis horizontal or slightly elevated. In gluteus medius weakness, the pelvis drops on the opposite unsupported side (Positive Trendelenburg Sign).",
    clinicalPearl:
      "Superior Gluteal Nerve lesion produces a positive Trendelenburg Sign and classic 'Waddling Gait' (bilateral lesions) or 'Gluteal Gait' (unilateral lesion) with compensatory trunk lean toward the affected side.",
    vivaQuestion: {
      q: "In a patient standing on the right leg, the left side of the pelvis drops. Which nerve and muscle are defective?",
      a: "The RIGHT Superior Gluteal Nerve or RIGHT Gluteus Medius/Minimus muscle (the weight-bearing side is paralyzed).",
    },
  },
  {
    id: "biceps-femoris-muscle",
    name: "Biceps Femoris (Hamstring)",
    region: "Posterior Compartment of Thigh",
    latin: "Musculus biceps femoris",
    fmaId: "FMA:22356",
    heads: [
      {
        name: "Long Head (True Hamstring)",
        origin: "Inferomedial impression of the ischial tuberosity (conjoint tendon with semitendinosus).",
        insertion: "Head of the fibula (embraces lateral fibular collateral ligament).",
        action: "Extends hip joint and flexes knee joint; laterally rotates flexed leg.",
      },
      {
        name: "Short Head",
        origin: "Lateral lip of the linea aspera and lateral supracondylar line of the femur.",
        insertion: "Head of the fibula and lateral tibial condyle.",
        action: "Flexes knee joint and laterally rotates flexed leg.",
      },
    ],
    origin: "Long head: ischial tuberosity and sacrotuberous ligament. Short head: lateral lip of linea aspera and lateral supracondylar ridge.",
    insertion: "Lateral aspect of the head of the fibula (surrounds the fibular collateral ligament of the knee).",
    action: "Flexes the leg at the knee joint and laterally rotates flexed knee; long head extends thigh at the hip joint.",
    synergists: "Semitendinosus, Semimembranosus, Gastrocnemius, Popliteus.",
    antagonists: "Quadriceps Femoris (Rectus Femoris, Vasti).",
    innervation: "Long head: Tibial division of Sciatic Nerve (L5, S1, S2). Short head: Common Fibular (Peroneal) division of Sciatic Nerve (L5, S1).",
    bloodSupply: "Perforating branches of the Profunda Femoris (deep femoral) Artery, Inferior Gluteal Artery, and Popliteal Artery.",
    lymphatics: "Drains into Deep Inguinal and Popliteal lymph nodes.",
    bedsideTest:
      "Patient prone with knee flexed to 45° and leg externally rotated; patient resists examiner's effort to pull knee into extension.",
    clinicalPearl:
      "Hamstring strains (pulled hamstring) most frequently tear the proximal musculotendinous junction of the Biceps Femoris long head during the terminal deceleration swing phase of high-velocity sprinting.",
    vivaQuestion: {
      q: "Why is the Short Head of Biceps Femoris not considered a 'true' hamstring muscle?",
      a: "Because it does NOT arise from the ischial tuberosity, does NOT cross the hip joint (cannot extend the hip), and is innervated by the Common Fibular nerve instead of the Tibial division.",
    },
  },
  {
    id: "gastrocnemius-muscle",
    name: "Gastrocnemius (Triceps Surae)",
    region: "Superficial Posterior Leg / Calf",
    latin: "Musculus gastrocnemius",
    fmaId: "FMA:22541",
    heads: [
      {
        name: "Medial Head (Larger)",
        origin: "Popliteal surface of femur superior to medial condyle and adductor tubercle.",
        insertion: "Posterior surface of calcaneus via Achilles (calcaneal) tendon.",
        action: "Plantarflexes foot at ankle joint; flexes knee joint.",
      },
      {
        name: "Lateral Head",
        origin: "Lateral aspect of lateral condyle of femur and lateral supracondylar line.",
        insertion: "Posterior calcaneus via Achilles tendon.",
        action: "Plantarflexes foot during propulsion (jumping, running).",
      },
    ],
    origin: "Medial head: popliteal surface of femur above medial condyle. Lateral head: posterolateral aspect of lateral condyle of femur.",
    insertion: "Middle posterior surface of the calcaneus via the common Calcaneal (Achilles) Tendon (strongest tendon in the human body).",
    action: "Powerful plantarflexion of the foot at the ankle joint (propulsion in walking, running, jumping); assists in knee flexion.",
    synergists: "Soleus (together form Triceps Surae), Plantaris, Tibialis Posterior, Flexor Hallucis Longus.",
    antagonists: "Tibialis Anterior, Extensor Digitorum Longus (dorsiflexors).",
    innervation: "Tibial Nerve (S1, S2) within the popliteal fossa.",
    bloodSupply: "Sural Arteries (terminal branches of the Popliteal Artery supplying each head).",
    lymphatics: "Drains into Popliteal and Deep Inguinal lymph nodes.",
    bedsideTest:
      "1. Achilles Tendon Reflex (Ankle Jerk Reflex) evaluating S1–S2 nerve roots. 2. Single-leg heel raise test (patient raises body weight onto toes on one foot).",
    clinicalPearl:
      "Achilles Tendon Rupture presents with a sudden audible 'pop' or sensation of being kicked in the calf, severe pain, inability to plantarflex against resistance, and a Positive Thompson (Simmonds) Test: squeezing the calf fails to produce passive plantarflexion.",
    vivaQuestion: {
      q: "Explain Thompson's (Simmonds) Squeeze Test and its diagnostic significance.",
      a: "With the patient prone and feet hanging off the examination couch, the examiner squeezes the calf muscle belly. A normal calf produces involuntary plantarflexion. If the Achilles tendon is ruptured, the foot remains immobile (Positive Thompson Test).",
    },
  },
  {
    id: "tibialis-anterior-muscle",
    name: "Tibialis Anterior",
    region: "Anterior Compartment of Leg",
    latin: "Musculus tibialis anterior",
    fmaId: "FMA:22532",
    heads: [
      {
        name: "Tibia & Interosseous Belly",
        origin: "Lateral condyle and upper 2/3 of lateral surface of tibia, and anterior surface of interosseous membrane.",
        insertion: "Medial and inferior surfaces of the medial cuneiform and base of 1st metatarsal bone.",
        action: "Chief dorsiflexor of foot at ankle joint; inverts foot at subtalar joint; maintains medial longitudinal arch.",
      },
    ],
    origin: "Lateral condyle and upper half to two-thirds of lateral shaft of tibia, deep fascia of leg, and interosseous membrane.",
    insertion: "Medial and plantar surfaces of the medial cuneiform bone and base of the 1st metatarsal bone.",
    action: "Chief dorsiflexor of the foot at the talocrural (ankle) joint; inverts the foot at subtalar and transverse tarsal joints; dynamically supports the medial longitudinal arch.",
    synergists: "Extensor Hallucis Longus, Extensor Digitorum Longus, Peroneus Tertius.",
    antagonists: "Gastrocnemius, Soleus (plantarflexors), Fibularis Longus & Brevis (everters).",
    innervation: "Deep Fibular (Peroneal) Nerve (L4, L5) in the anterior leg compartment.",
    bloodSupply: "Anterior Tibial Artery (accompanied by venae comitantes and deep fibular nerve).",
    lymphatics: "Drains into Anterior Tibial and Popliteal lymph nodes.",
    bedsideTest:
      "Ask patient to heel-walk or dorsiflex and invert the foot against examiner's plantarflexion and eversion resistance; palpate the prominent tendon anterior to the medial malleolus.",
    clinicalPearl:
      "Compression or laceration of the Deep Fibular Nerve or Common Fibular Nerve around the fibular neck produces Foot Drop. The patient cannot dorsiflex the foot, resulting in a 'High-Steppage Gait' (compensatory hip and knee flexion) and tripping over toes.",
    vivaQuestion: {
      q: "What symptoms and signs distinguish Common Fibular Nerve palsy from isolated Deep Fibular Nerve palsy?",
      a: "Common Fibular palsy causes loss of both dorsiflexion AND eversion (foot drop with inverted foot) PLUS sensory loss over the lateral leg and entire dorsum of foot. Isolated Deep Fibular palsy causes foot drop but leaves eversion intact (superficial fibular spared) and sensory loss is restricted to only the 1st interdigital web space.",
    },
  },
];

// ============================================================================
// COGNI ANATOMY 3D PRESETS & CLINICAL SELF-STUDY COMPANION DATABASE
// Mapped directly to official Cogni Anatomy 3D Viewer Presets: cogni.cards/anatomy
// Comprehensive, exhaustive textbook-level depth for MBBS, USMLE Step 1 & NEET-PG
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
    bloodSupply: "Systemic arterial tree (Aorta and major regional branches)",
    venousDrainage: "Superior and Inferior Vena Cava (SVC/IVC), portal venous system, and azygos venous tributary network.",
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
      "Large superficial trapezoidal extrinsic back muscle. Connects the skull and vertebral spine to the pectoral girdle. Crucial for scapular posture, elevation, retraction, depression, and upward rotation during arm abduction above 90°.",
    origin:
      "External occipital protuberance, medial 1/3 of superior nuchal line, ligamentum nuchae, and spinous processes of C7–T12 vertebrae (Ascending part arises specifically from T4–T12 spines).",
    insertion:
      "Ascending (inferior) fibers: smooth tubercle on apex of spine of scapula. Middle fibers: medial margin of acromion & superior lip of spine. Descending (superior) fibers: posterior border of lateral 1/3 of clavicle.",
    action:
      "Ascending part: depresses scapula and assists upward rotation. Descending part: elevates scapula. Middle part: retracts (adducts) scapula. Together: upwardly rotates glenoid cavity during abduction >90°.",
    innervation: "Motor: Spinal Accessory Nerve (Cranial Nerve XI). Sensory / Proprioception: Ventral rami of C3 and C4 cervical spinal nerves.",
    bloodSupply: "Transverse Cervical Artery (superficial branch), Dorsal Scapular Artery, Posterior Intercostal Arteries.",
    venousDrainage: "Transverse Cervical Vein and External Jugular tributaries draining into Subclavian Vein.",
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
    venousDrainage: "Deep paired venae comitantes with bicuspid valves promoting venous return during skeletal muscle pump action.",
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
    innervation: "Periosteal sensory nerves (extremely sensitive to trauma, fractures, and bone tumors)",
    bloodSupply: "Nutrient arteries entering via nutrient foramina, periosteal arteries, and metaphyseal/epiphyseal vessels",
    venousDrainage: "Emissary veins, cortical periosteal venules, and large sinusoidal medullary bone veins.",
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
    id: "arm-bones",
    label: "🦾 Upper Limb Bones (Clavicle, Humerus & Hand)",
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
    venousDrainage: "Cephalic Vein, Basilic Vein, Median Cubital Vein, and deep venae comitantes draining into Axillary and Subclavian Veins.",
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
    label: "🦵 Lower Limb Bones (Femur, Tibia & Foot)",
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
    venousDrainage: "Great Saphenous Vein, Small Saphenous Vein, and deep paired tibial, popliteal, and femoral veins with muscular pump valves.",
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
    venousDrainage: "Batson's Internal and External Vertebral Venous Plexuses (valveless veins explaining pelvic cancer metastasis to spine and brain).",
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
    venousDrainage: "Great, Middle, and Small Cardiac Veins draining into the Coronary Sinus into the Right Atrium.",
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
    venousDrainage: "4 Pulmonary Veins (oxygenated blood to left atrium) and Bronchial Veins (to azygos/hemiazygos).",
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
        q: "Where is emergency needle decompression performed for a tension pneumothorax?",
        a: "2nd intercostal space in the midclavicular line, or 5th intercostal space in the midaxillary line, inserting the needle directly OVER the superior border of the rib to avoid the subcostal neurovascular bundle.",
      },
    ],
  },
];

export default function Anatomy3DLab({ onAwardXp, onSaveNote }) {
  // Current active Cogni preset
  const [activePreset, setActivePreset] = useState(COGNI_PRESETS[1]); // Default to 'trapezius'

  // Viewport display mode: 'cogni-live' (Official live 3D Atlas) vs 'flashcards' (Active Recall)
  const [activeTab, setActiveTab] = useState("cogni-live");

  // Clinical Dossier Sub-Tab: 'all' (Complete Textbook Mode), 'oiai', 'relations', 'neurovascular', 'clinical', 'viva'
  const [dossierTab, setDossierTab] = useState("all");

  // Viewer height: 'normal' (880px) or 'imax' (980px)
  const [viewerHeight, setViewerHeight] = useState("normal");

  // Search filter for presets & structures
  const [searchQuery, setSearchQuery] = useState("");

  // =========================================================================
  // FLOATING HUD OVERLAYS STATE (MATCHING USER IMAGES 1 & 2 WITH MINIMIZE)
  // =========================================================================
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [leftPanelTab, setLeftPanelTab] = useState("systems"); // 'systems' | 'opacity' | 'contents'
  const [regionFilter, setRegionFilter] = useState("all"); // 'all' | 'Whole body' | 'Head' | 'Trunk' | 'Upper limb' | 'Lower limb'
  const [rightPanelTab, setRightPanelTab] = useState("structure"); // 'view' | 'structure' | 'settings'
  const [selectedStructure, setSelectedStructure] = useState(ANATOMICAL_PARTS_LIBRARY[0]); // Default Right Clavicle
  const [isOverviewOpen, setIsOverviewOpen] = useState(true);
  const [isStructureHidden, setIsStructureHidden] = useState(false);
  const [isSeeThrough, setIsSeeThrough] = useState(false);
  const [isIsolated, setIsIsolated] = useState(false);

  // Advanced HUD Opacity & Camera Controls
  const [systemOpacities, setSystemOpacities] = useState({
    skeleton: 100,
    muscles: 90,
    vascular: 95,
    nervous: 85,
    organs: 80,
  });
  const [explodeValue, setExplodeValue] = useState(0);
  const [activeCameraAngle, setActiveCameraAngle] = useState("Anterior");
  const [isXrayActive, setIsXrayActive] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [contentsFilter, setContentsFilter] = useState("");
  const [hudSettings, setHudSettings] = useState({
    renderQuality: "Ultra HD (60fps)",
    lightingMode: "Clinical Surgical Lamp",
    nomenclature: "Bilingual (Latin & English)",
    show3DPins: true,
  });

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

  // Filter parts library for left panel
  const filteredParts = ANATOMICAL_PARTS_LIBRARY.filter((part) => {
    if (regionFilter === "all" || regionFilter === "Whole body") return true;
    return part.region.toLowerCase() === regionFilter.toLowerCase();
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

  // Handle structure selection from left panel or chips
  // REQUIREMENT: When user selects any part, keep the right info interface open!
  function handleSelectStructure(structure) {
    setSelectedStructure(structure);
    setIsRightPanelOpen(true);
    setIsStructureHidden(false);
    setIsSeeThrough(false);
    setIsIsolated(false);

    if (structure.presetId) {
      const matchPreset = COGNI_PRESETS.find((p) => p.id === structure.presetId);
      if (matchPreset) setActivePreset(matchPreset);
    }
    if (structure.muscleId) {
      const matchMuscle = HIGH_YIELD_MUSCLES_DIRECTORY.find((m) => m.id === structure.muscleId);
      if (matchMuscle) setSelectedMuscle(matchMuscle);
    }
    if (onAwardXp) onAwardXp(10);
  }

  function handleSelectPreset(preset) {
    setActivePreset(preset);
    setFlippedCards({});

    const matchingStruct = ANATOMICAL_PARTS_LIBRARY.find((s) => s.presetId === preset.id);
    if (matchingStruct) {
      setSelectedStructure(matchingStruct);
      setIsRightPanelOpen(true);
    }
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
            title="Toggle full screen IMAX height mode"
          >
            {viewerHeight === "imax" ? "📱 Normal Height" : "🖥️ Expand IMAX Height (980px)"}
          </button>
        </div>
      </div>

      {/* =========================================================================
          PRESET SELECTOR BAR (MATCHED DIRECTLY TO COGNI PRESETS)
          ========================================================================= */}
      <div className="cogni-presets-bar">
        <div className="presets-bar-header">
          <div className="current-preset-badge">
            <span>Current 3D Specimen:</span>
            <strong>{activePreset.label}</strong>
            <span className="preset-structures-pill">{activePreset.structuresCount}</span>
          </div>

          <div className="presets-search-mini">
            <input
              type="text"
              placeholder="Search 3D preset or organ (e.g. Trapezius, Heart)..."
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
          {/* VIEWPORT CONTROLS BAR WITH INTERFACE MINIMIZE / RESTORE TOGGLES */}
          <div className="canvas-header-strip">
            <div className="canvas-hud-toolbar">
              <span className="current-preset-badge">
                {activePreset.icon} <strong>{activePreset.label}</strong>
              </span>

              {/* TOGGLE BUTTONS FOR LEFT & RIGHT INTERFACES */}
              <button
                type="button"
                className={`canvas-hud-btn ${isLeftPanelOpen ? "active" : ""}`}
                onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
                title="Toggle Left Anatomy Systems Interface"
              >
                {isLeftPanelOpen ? "📂 Left Panel (Open)" : "📁 Open Anatomy (Left)"}
              </button>

              <button
                type="button"
                className={`canvas-hud-btn ${isRightPanelOpen ? "active" : ""}`}
                onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
                title="Toggle Right Structure Info Interface"
              >
                {isRightPanelOpen ? "ℹ️ Structure Info (Open)" : "ℹ️ Open Info (Right)"}
              </button>

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
                ↗ Full Tab
              </a>
            </div>

            <div className="canvas-hud-badges">
              <span className="hud-badge-info">🖱️ Left Drag: Rotate</span>
              <span className="hud-badge-info">📜 Scroll: Zoom</span>
              <span className="hud-badge-info">💥 Explode in Viewer</span>
            </div>
          </div>

          {/* TAB 1: OFFICIAL COGNI ANATOMY 3D LIVE IFRAME VIEWER WITH FLOATING HUD OVERLAYS */}
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

              {/* =================================================================
                  FLOATING HUD INTERFACE 1: LEFT ANATOMY SYSTEMS & CONTENTS NAVIGATOR
                  Matched directly to User Image 1 with MINIMIZE option
                  ================================================================= */}
              {isLeftPanelOpen ? (
                <div className="hud-floating-panel left">
                  {/* PANEL HEADER WITH MINIMIZE BUTTON */}
                  <div className="hud-panel-header">
                    <div className="hud-title-with-badge">
                      <span className="hud-panel-title">Anatomy</span>
                      <span className="hud-count-badge">
                        {filteredParts.length}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="hud-minimize-btn"
                      onClick={() => setIsLeftPanelOpen(false)}
                      title="Minimize Anatomy Interface"
                    >
                      −
                    </button>
                  </div>

                  {/* TOP 3 TABS: Systems | Opacity | Contents */}
                  <div className="hud-tab-strip">
                    <button
                      type="button"
                      className={`hud-tab-pill ${leftPanelTab === "systems" ? "active" : ""}`}
                      onClick={() => setLeftPanelTab("systems")}
                    >
                      Systems
                    </button>
                    <button
                      type="button"
                      className={`hud-tab-pill ${leftPanelTab === "opacity" ? "active" : ""}`}
                      onClick={() => setLeftPanelTab("opacity")}
                    >
                      Opacity
                    </button>
                    <button
                      type="button"
                      className={`hud-tab-pill ${leftPanelTab === "contents" ? "active" : ""}`}
                      onClick={() => setLeftPanelTab("contents")}
                    >
                      Contents
                    </button>
                  </div>

                  {/* TAB 1: SYSTEMS (REGION CHIPS & CARDS) */}
                  {leftPanelTab === "systems" && (
                    <>
                      <div className="hud-region-pills">
                        {["all", "Head", "Trunk", "Upper limb", "Lower limb"].map((reg) => (
                          <button
                            key={reg}
                            type="button"
                            className={`hud-region-chip ${regionFilter === reg ? "active" : ""}`}
                            onClick={() => setRegionFilter(reg)}
                          >
                            {reg === "all" ? "Whole body" : reg}
                          </button>
                        ))}
                      </div>

                      <div className="hud-panel-body">
                        <div className="hud-section-label">Musculoskeletal & Skeletal Structures</div>
                        <div className="hud-structure-cards-list">
                          {filteredParts.map((part) => {
                            const isSelected = selectedStructure.id === part.id;
                            return (
                              <div
                                key={part.id}
                                className={`hud-structure-card ${isSelected ? "active" : ""}`}
                                onClick={() => handleSelectStructure(part)}
                              >
                                <div className="hud-card-icon">
                                  {part.category === "Skeleton" ? "🦴" : part.category === "Muscles" ? "🦾" : "🫀"}
                                </div>
                                <div className="hud-card-info">
                                  <strong>{part.name}</strong>
                                  <span>{part.category} · {part.region}</span>
                                </div>
                                {isSelected && <span className="hud-selected-dot">•</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {/* TAB 2: OPACITY CONTROLS */}
                  {leftPanelTab === "opacity" && (
                    <div className="hud-panel-body hud-opacity-panel">
                      <div className="hud-section-label">System Layer Opacities</div>
                      <div className="hud-opacity-slider-group">
                        <div className="hud-slider-item">
                          <div className="hud-slider-label-row">
                            <span>🦴 Skeletal Framework</span>
                            <strong>{systemOpacities.skeleton}%</strong>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={systemOpacities.skeleton}
                            onChange={(e) =>
                              setSystemOpacities({ ...systemOpacities, skeleton: Number(e.target.value) })
                            }
                          />
                        </div>

                        <div className="hud-slider-item">
                          <div className="hud-slider-label-row">
                            <span>🦾 Muscular System</span>
                            <strong>{systemOpacities.muscles}%</strong>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={systemOpacities.muscles}
                            onChange={(e) =>
                              setSystemOpacities({ ...systemOpacities, muscles: Number(e.target.value) })
                            }
                          />
                        </div>

                        <div className="hud-slider-item">
                          <div className="hud-slider-label-row">
                            <span>🩸 Arteries & Veins</span>
                            <strong>{systemOpacities.vascular}%</strong>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={systemOpacities.vascular}
                            onChange={(e) =>
                              setSystemOpacities({ ...systemOpacities, vascular: Number(e.target.value) })
                            }
                          />
                        </div>

                        <div className="hud-slider-item">
                          <div className="hud-slider-label-row">
                            <span>⚡ Nervous System</span>
                            <strong>{systemOpacities.nervous}%</strong>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={systemOpacities.nervous}
                            onChange={(e) =>
                              setSystemOpacities({ ...systemOpacities, nervous: Number(e.target.value) })
                            }
                          />
                        </div>

                        <div className="hud-slider-item">
                          <div className="hud-slider-label-row">
                            <span>🫀 Visceral Organs</span>
                            <strong>{systemOpacities.organs}%</strong>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={systemOpacities.organs}
                            onChange={(e) =>
                              setSystemOpacities({ ...systemOpacities, organs: Number(e.target.value) })
                            }
                          />
                        </div>
                      </div>

                      <div className="hud-opacity-presets-row">
                        <button
                          type="button"
                          className="hud-preset-pill"
                          onClick={() =>
                            setSystemOpacities({
                              skeleton: 100,
                              muscles: 25,
                              vascular: 80,
                              nervous: 80,
                              organs: 30,
                            })
                          }
                        >
                          X-Ray Bones
                        </button>
                        <button
                          type="button"
                          className="hud-preset-pill"
                          onClick={() =>
                            setSystemOpacities({
                              skeleton: 30,
                              muscles: 100,
                              vascular: 60,
                              nervous: 40,
                              organs: 30,
                            })
                          }
                        >
                          Myology Focus
                        </button>
                        <button
                          type="button"
                          className="hud-preset-pill reset"
                          onClick={() =>
                            setSystemOpacities({
                              skeleton: 100,
                              muscles: 90,
                              vascular: 95,
                              nervous: 85,
                              organs: 80,
                            })
                          }
                        >
                          Reset 100%
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ANATOMICAL CONTENTS DIRECTORY */}
                  {leftPanelTab === "contents" && (
                    <div className="hud-panel-body hud-contents-panel">
                      <div className="hud-contents-search-box">
                        <input
                          type="text"
                          placeholder="Search anatomical directory..."
                          value={contentsFilter}
                          onChange={(e) => setContentsFilter(e.target.value)}
                        />
                      </div>

                      <div className="hud-contents-groups">
                        <div className="hud-content-group">
                          <div className="hud-group-title">
                            <span>🦴 Osteology (Bones)</span>
                            <span className="hud-group-count">
                              {ANATOMICAL_PARTS_LIBRARY.filter((p) => p.category === "Skeleton").length}
                            </span>
                          </div>
                          {ANATOMICAL_PARTS_LIBRARY.filter(
                            (p) =>
                              p.category === "Skeleton" &&
                              p.name.toLowerCase().includes(contentsFilter.toLowerCase())
                          ).map((p) => (
                            <div
                              key={p.id}
                              className={`hud-content-item ${selectedStructure.id === p.id ? "active" : ""}`}
                              onClick={() => handleSelectStructure(p)}
                            >
                              <span>{p.name}</span>
                              <span className="hud-item-region">{p.region}</span>
                            </div>
                          ))}
                        </div>

                        <div className="hud-content-group">
                          <div className="hud-group-title">
                            <span>🦾 Myology (Musculature)</span>
                            <span className="hud-group-count">
                              {ANATOMICAL_PARTS_LIBRARY.filter((p) => p.category === "Muscles").length}
                            </span>
                          </div>
                          {ANATOMICAL_PARTS_LIBRARY.filter(
                            (p) =>
                              p.category === "Muscles" &&
                              p.name.toLowerCase().includes(contentsFilter.toLowerCase())
                          ).map((p) => (
                            <div
                              key={p.id}
                              className={`hud-content-item ${selectedStructure.id === p.id ? "active" : ""}`}
                              onClick={() => handleSelectStructure(p)}
                            >
                              <span>{p.name}</span>
                              <span className="hud-item-region">{p.region}</span>
                            </div>
                          ))}
                        </div>

                        <div className="hud-content-group">
                          <div className="hud-group-title">
                            <span>🫀 Viscera & Systems</span>
                            <span className="hud-group-count">
                              {ANATOMICAL_PARTS_LIBRARY.filter((p) => p.category === "Organs").length}
                            </span>
                          </div>
                          {ANATOMICAL_PARTS_LIBRARY.filter(
                            (p) =>
                              p.category === "Organs" &&
                              p.name.toLowerCase().includes(contentsFilter.toLowerCase())
                          ).map((p) => (
                            <div
                              key={p.id}
                              className={`hud-content-item ${selectedStructure.id === p.id ? "active" : ""}`}
                              onClick={() => handleSelectStructure(p)}
                            >
                              <span>{p.name}</span>
                              <span className="hud-item-region">{p.region}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* MINIMIZED FLOATING PILL AT TOP-LEFT */
                <button
                  type="button"
                  className="hud-mini-pill left"
                  onClick={() => setIsLeftPanelOpen(true)}
                  title="Expand Anatomy Interface"
                >
                  <span>📂</span>
                  <strong>Anatomy</strong>
                  <span className="mini-badge">{filteredParts.length}</span>
                  <span className="expand-arrow">▾</span>
                </button>
              )}

              {/* =================================================================
                  FLOATING HUD INTERFACE 2: RIGHT STRUCTURE INFO & INSPECTOR
                  Matched directly to User Image 2 with MINIMIZE option
                  Auto-opens when user selects any structure!
                  Includes Full V.A.N. (Vein · Artery · Nerve) Breakdown for Bones
                  ================================================================= */}
              {isRightPanelOpen ? (
                <div className="hud-floating-panel right">
                  {/* PANEL HEADER WITH TABS & MINIMIZE BUTTON */}
                  <div className="hud-panel-header right-header">
                    <div className="hud-inspector-tabs">
                      <button
                        type="button"
                        className={`hud-insp-tab ${rightPanelTab === "view" ? "active" : ""}`}
                        onClick={() => setRightPanelTab("view")}
                      >
                        View & tools
                      </button>
                      <button
                        type="button"
                        className={`hud-insp-tab ${rightPanelTab === "structure" ? "active" : ""}`}
                        onClick={() => setRightPanelTab("structure")}
                      >
                        Structure •
                      </button>
                      <button
                        type="button"
                        className={`hud-insp-tab ${rightPanelTab === "settings" ? "active" : ""}`}
                        onClick={() => setRightPanelTab("settings")}
                      >
                        Settings
                      </button>
                    </div>

                    <button
                      type="button"
                      className="hud-minimize-btn"
                      onClick={() => setIsRightPanelOpen(false)}
                      title="Minimize Structure Info Interface"
                    >
                      −
                    </button>
                  </div>

                  {/* =========================================================
                      TAB 1: VIEW & CAMERA DISSECTION TOOLS
                      ========================================================= */}
                  {rightPanelTab === "view" && (
                    <div className="hud-inspector-body hud-view-tools-body">
                      <div className="hud-section-label">Camera Perspectives & Angles</div>
                      <div className="hud-camera-grid">
                        {[
                          { id: "Anterior", label: "Anterior (Front)" },
                          { id: "Posterior", label: "Posterior (Dorsal)" },
                          { id: "Right Lateral", label: "Right Lateral" },
                          { id: "Left Lateral", label: "Left Lateral" },
                          { id: "Superior", label: "Superior (Cranial)" },
                          { id: "Inferior", label: "Inferior (Caudal)" },
                        ].map((angle) => (
                          <button
                            key={angle.id}
                            type="button"
                            className={`hud-camera-pill ${activeCameraAngle === angle.id ? "active" : ""}`}
                            onClick={() => {
                              setActiveCameraAngle(angle.id);
                              setIframeKey((k) => k + 1);
                            }}
                          >
                            📐 {angle.label}
                          </button>
                        ))}
                      </div>

                      <div className="hud-section-label" style={{ marginTop: "16px" }}>
                        Dissection & Explode Slider
                      </div>
                      <div className="hud-explode-container">
                        <div className="hud-slider-label-row">
                          <span>💥 Explode Anatomy</span>
                          <strong>{explodeValue}%</strong>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={explodeValue}
                          onChange={(e) => setExplodeValue(Number(e.target.value))}
                        />
                        <div className="hud-explode-ticks">
                          <span>Assembled (0%)</span>
                          <span>By System (50%)</span>
                          <span>Full Explode (100%)</span>
                        </div>
                      </div>

                      <div className="hud-section-label" style={{ marginTop: "16px" }}>
                        Viewport Mode Toggles
                      </div>
                      <div className="hud-toggles-list">
                        <button
                          type="button"
                          className={`hud-toggle-btn ${isXrayActive ? "active" : ""}`}
                          onClick={() => setIsXrayActive(!isXrayActive)}
                        >
                          <span>🩻</span>
                          <span>{isXrayActive ? "Disable X-Ray Mode" : "Enable X-Ray Mode"}</span>
                        </button>
                        <button
                          type="button"
                          className={`hud-toggle-btn ${isAutoRotate ? "active" : ""}`}
                          onClick={() => setIsAutoRotate(!isAutoRotate)}
                        >
                          <span>🔄</span>
                          <span>{isAutoRotate ? "Pause 360° Orbit" : "Auto-Rotate 360° Orbit"}</span>
                        </button>
                        <button
                          type="button"
                          className="hud-toggle-btn reset"
                          onClick={() => {
                            setExplodeValue(0);
                            setIsXrayActive(false);
                            setIsAutoRotate(false);
                            setActiveCameraAngle("Anterior");
                            setIframeKey((k) => k + 1);
                          }}
                        >
                          <span>🎯</span>
                          <span>Reset Camera & Viewport</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STRUCTURE DETAILS BODY MATCHING COGNI PHOTO 2 */}
                  {rightPanelTab === "structure" && (
                    <div className="hud-inspector-body">
                    <div className={`structure-category-tag ${selectedStructure.category?.toLowerCase()}`}>
                      <span className="cat-bar" />
                      <span>{selectedStructure.category || "Structure"}</span>
                    </div>

                    <h3 className="structure-title">{selectedStructure.name}</h3>

                    <p className="structure-description">
                      {selectedStructure.description}
                    </p>

                    {/* V.A.N. (VEIN, ARTERY, NERVE) TRIAD FOR BONES & MUSCLES */}
                    <div className="hud-van-box">
                      <div className="van-header-strip">
                        <span className="van-badge-title">🩸 V.A.N. NEUROVASCULAR TRIAD</span>
                        <span className="van-subtitle">Vein · Artery · Nerve</span>
                      </div>

                      {/* 1. ARTERY (धमनी) */}
                      <div className="van-row artery">
                        <div className="van-label-pill artery">
                          <span>🔴 ARTERY (धमनी / Arterial Supply)</span>
                        </div>
                        <p className="van-text">{selectedStructure.arteries || selectedStructure.bloodSupply}</p>
                      </div>

                      {/* 2. VEIN (शीर) */}
                      <div className="van-row vein">
                        <div className="van-label-pill vein">
                          <span>🔵 VEIN (शीर / Venous Drainage)</span>
                        </div>
                        <p className="van-text">
                          {selectedStructure.veins ||
                            "Accompanied by deep venae comitantes with valves and superficial cutaneous networks draining into regional systemic veins."}
                        </p>
                      </div>

                      {/* 3. NERVE (मज्जातंतू) */}
                      <div className="van-row nerve">
                        <div className="van-label-pill nerve">
                          <span>⚡ NERVE (मज्जातंतू / Innervation)</span>
                        </div>
                        <p className="van-text">{selectedStructure.nerves || selectedStructure.innervation}</p>
                      </div>

                      {/* 4. FRACTURE DANGER ZONE (अस्थिभंग धोका) */}
                      {selectedStructure.fractureDanger && (
                        <div className="van-row danger">
                          <div className="van-label-pill danger">
                            <span>⚠️ FRACTURE VASCULAR & NERVE RISK (अस्थिभंग धोका)</span>
                          </div>
                          <p className="van-text danger-text">{selectedStructure.fractureDanger}</p>
                        </div>
                      )}

                      {/* 5. NUTRIENT FORAMEN (पोषण छिद्र) */}
                      {selectedStructure.nutrientForamen && (
                        <div className="van-nutrient-line">
                          <strong>🦴 Nutrient Foramen:</strong> {selectedStructure.nutrientForamen}
                        </div>
                      )}
                    </div>

                    {/* SYSTEM OVERVIEW ACCORDION */}
                    <div className="hud-accordion-box">
                      <button
                        type="button"
                        className="hud-accordion-toggle"
                        onClick={() => setIsOverviewOpen(!isOverviewOpen)}
                      >
                        <span>System overview · bony attachments</span>
                        <span>{isOverviewOpen ? "▴" : "▾"}</span>
                      </button>

                      {isOverviewOpen && (
                        <div className="hud-accordion-content">
                          {selectedStructure.origin && (
                            <div className="accordion-item">
                              <strong>📍 Origin / Articulation:</strong> {selectedStructure.origin}
                            </div>
                          )}
                          {selectedStructure.insertion && (
                            <div className="accordion-item">
                              <strong>📌 Insertion / Distal end:</strong> {selectedStructure.insertion}
                            </div>
                          )}
                          {selectedStructure.action && (
                            <div className="accordion-item">
                              <strong>⚙️ Action / Function:</strong> {selectedStructure.action}
                            </div>
                          )}
                          {selectedStructure.clinicalPearl && (
                            <div className="accordion-item" style={{ color: "#fca5a5" }}>
                              <strong>🩺 High-Yield Pearl:</strong> {selectedStructure.clinicalPearl}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 2X2 ACTION BUTTONS GRID */}
                    <div className="hud-action-grid">
                      <button
                        type="button"
                        className={`hud-action-btn ${isStructureHidden ? "active" : ""}`}
                        onClick={() => setIsStructureHidden(!isStructureHidden)}
                      >
                        <span>{isStructureHidden ? "👁️‍🗨️" : "👁️"}</span>
                        <span>{isStructureHidden ? "Unhide" : "Hide"}</span>
                      </button>

                      <button
                        type="button"
                        className={`hud-action-btn ${isSeeThrough ? "active" : ""}`}
                        onClick={() => setIsSeeThrough(!isSeeThrough)}
                      >
                        <span>👻</span>
                        <span>{isSeeThrough ? "Solid" : "See-through"}</span>
                      </button>

                      <button
                        type="button"
                        className="hud-action-btn"
                        onClick={() => setIframeKey((k) => k + 1)}
                      >
                        <span>🎯</span>
                        <span>Center</span>
                      </button>

                      <button
                        type="button"
                        className="hud-action-btn"
                        onClick={() => {
                          setIsStructureHidden(false);
                          setIsSeeThrough(false);
                          setIsIsolated(false);
                        }}
                      >
                        <span>↩️</span>
                        <span>Undo</span>
                      </button>
                    </div>

                    {/* PRIMARY ACTION BUTTON */}
                    <button
                      type="button"
                      className={`hud-isolate-btn ${isIsolated ? "active" : ""}`}
                      onClick={() => setIsIsolated(!isIsolated)}
                    >
                      <span>🔍</span>
                      <span>{isIsolated ? "Show surrounding anatomy" : "Isolate structure"}</span>
                      <span>›</span>
                    </button>

                    {/* CLEAR SELECTION LINK */}
                    <button
                      type="button"
                      className="hud-clear-btn"
                      onClick={() => {
                        setSelectedStructure(ANATOMICAL_PARTS_LIBRARY[0]);
                      }}
                    >
                      Clear selection
                    </button>
                    </div>
                  )}

                  {/* =========================================================
                      TAB 3: SETTINGS & RENDER PREFERENCES
                      ========================================================= */}
                  {rightPanelTab === "settings" && (
                    <div className="hud-inspector-body hud-settings-body">
                      <div className="hud-section-label">Atlas Display & Rendering</div>

                      <div className="hud-setting-row">
                        <label>Render Quality</label>
                        <select
                          value={hudSettings.renderQuality}
                          onChange={(e) =>
                            setHudSettings({ ...hudSettings, renderQuality: e.target.value })
                          }
                        >
                          <option value="Ultra HD (60fps)">Ultra HD (60fps) · Anti-Aliased</option>
                          <option value="Balanced (30fps)">Balanced (30fps) · Low Power</option>
                        </select>
                      </div>

                      <div className="hud-setting-row">
                        <label>Lighting Mode</label>
                        <select
                          value={hudSettings.lightingMode}
                          onChange={(e) =>
                            setHudSettings({ ...hudSettings, lightingMode: e.target.value })
                          }
                        >
                          <option value="Clinical Surgical Lamp">Clinical Surgical Lamp (Cold White)</option>
                          <option value="Studio Obsidian">Studio Obsidian (Dark High-Contrast)</option>
                          <option value="Radiology Warm">Radiology Warm (Soft Focus)</option>
                        </select>
                      </div>

                      <div className="hud-setting-row">
                        <label>Anatomical Nomenclature</label>
                        <select
                          value={hudSettings.nomenclature}
                          onChange={(e) =>
                            setHudSettings({ ...hudSettings, nomenclature: e.target.value })
                          }
                        >
                          <option value="Bilingual (Latin & English)">Bilingual (Terminologia Anatomica + English)</option>
                          <option value="English (Modern)">English (Modern Clinical)</option>
                          <option value="Latin Only">Latin Only (Standard Medical)</option>
                        </select>
                      </div>

                      <div className="hud-setting-toggle-row">
                        <span>Show 3D Floating Anatomy Pins</span>
                        <input
                          type="checkbox"
                          checked={hudSettings.show3DPins}
                          onChange={(e) =>
                            setHudSettings({ ...hudSettings, show3DPins: e.target.checked })
                          }
                        />
                      </div>

                      <button
                        type="button"
                        className="hud-save-settings-btn"
                        onClick={() => setRightPanelTab("structure")}
                      >
                        ✓ Return to Structure Inspector
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* MINIMIZED FLOATING PILL AT TOP-RIGHT */
                <button
                  type="button"
                  className="hud-mini-pill right"
                  onClick={() => setIsRightPanelOpen(true)}
                  title="Expand Structure Info Interface"
                >
                  <span>ℹ️</span>
                  <strong>{selectedStructure.name}</strong>
                  <span className="expand-arrow">▾</span>
                </button>
              )}
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
                        ? `\n\n#### 🦴 Muscle / Bone Attachments & Action\n- **Origin / Proximal**: ${activePreset.origin}\n- **Insertion / Distal**: ${activePreset.insertion}\n- **Action / Biomechanics**: ${activePreset.action}`
                        : "";
                      onSaveNote(
                        `Cogni Anatomy Comprehensive V.A.N.: ${activePreset.label}`,
                        `### 🧬 Comprehensive 3D Anatomy Study Dossier: ${activePreset.label}\n\n**Latin**: *${activePreset.latin}* | **FMA ID**: \`${activePreset.fmaId}\` | **Region**: ${activePreset.region}\n\n#### 📖 Structural Architecture & Overview\n${activePreset.summary}${oiaiContent}\n\n#### 🩸 V.A.N. Neurovascular Triad\n- **🔴 Arteries (धमन्या)**: ${activePreset.bloodSupply}\n- **🔵 Veins (शिरा)**: ${activePreset.venousDrainage || "Deep venae comitantes and regional systemic veins."}\n- **⚡ Nerves (मज्जातंतू)**: ${activePreset.innervation}\n\n#### 🩺 High-Yield Clinical Pathology & Fracture Risks\n${activePreset.clinicalHighYield}\n\n#### 💡 Board Exam Mnemonic\n> "${activePreset.mnemonic}"\n\n#### 🎯 Board Exam Flashpoint\n${activePreset.examTip}`,
                        "Medicine (MBBS)"
                      );
                    }
                  }}
                >
                  📝 Save Complete V.A.N. Notes (+35 XP)
                </button>
              </div>
            </div>

            {/* DOSSIER SUBNAV NAVIGATION BAR (STUDENTS CAN CHOOSE SPECIFIC TAB OR VIEW ALL) */}
            <div className="dossier-subnav-strip">
              <button
                type="button"
                className={`dossier-subnav-pill ${dossierTab === "all" ? "active" : ""}`}
                onClick={() => setDossierTab("all")}
              >
                📚 All Sections (Textbook Mode)
              </button>
              <button
                type="button"
                className={`dossier-subnav-pill ${dossierTab === "oiai" ? "active" : ""}`}
                onClick={() => setDossierTab("oiai")}
              >
                🎯 O.I.A.I. & Biomechanics
              </button>
              <button
                type="button"
                className={`dossier-subnav-pill ${dossierTab === "architecture" ? "active" : ""}`}
                onClick={() => setDossierTab("architecture")}
              >
                📖 Architecture & Relations
              </button>
              <button
                type="button"
                className={`dossier-subnav-pill ${dossierTab === "neuro" ? "active" : ""}`}
                onClick={() => setDossierTab("neuro")}
              >
                ⚡ V.A.N. (Veins · Arteries · Nerves)
              </button>
              <button
                type="button"
                className={`dossier-subnav-pill ${dossierTab === "clinical" ? "active" : ""}`}
                onClick={() => setDossierTab("clinical")}
              >
                🩺 Clinical Pearls & Exams
              </button>
            </div>

            {/* SECTION 1: DEDICATED O.I.A.I. SPECIFICATION CARD */}
            {(dossierTab === "all" || dossierTab === "oiai") && (activePreset.origin || activePreset.insertion || activePreset.action) && (
              <div className="dossier-oiai-box">
                <div className="oiai-header">
                  <div className="oiai-title-badge">
                    <span className="oiai-icon">🎯</span>
                    <strong>O.I.A.I. & BONE ATTACHMENT SPECIFICATION</strong>
                    <span className="oiai-subtitle">Origin · Insertion · Action · Biomechanics</span>
                  </div>
                  <span className="oiai-status-pill">High-Yield Medical Core</span>
                </div>

                <div className="oiai-breakdown-grid">
                  {/* ORIGIN */}
                  <div className="oiai-cell origin">
                    <div className="oiai-label-pill origin">
                      <span>📍</span> ORIGIN / PROXIMAL ATTACHMENT
                    </div>
                    <p className="oiai-description">{activePreset.origin}</p>
                  </div>

                  {/* INSERTION */}
                  <div className="oiai-cell insertion">
                    <div className="oiai-label-pill insertion">
                      <span>📌</span> INSERTION / DISTAL ATTACHMENT
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

            {/* SECTION 2: ARCHITECTURE & RELATIONS */}
            {(dossierTab === "all" || dossierTab === "architecture") && (
              <div className="dossier-expanded-section">
                <div className="section-title-strip">
                  <span className="section-icon">📖</span>
                  <h3>Anatomical Architecture & 3D Spatial Relations</h3>
                </div>
                <p className="dossier-summary-text" style={{ fontSize: "14px", lineHeight: "1.7" }}>
                  {activePreset.summary}
                </p>
                <div className="architecture-meta-grid">
                  <div className="arch-meta-card">
                    <span className="arch-meta-title">🏛️ Regional Classification</span>
                    <p><strong>Region:</strong> {activePreset.region} · <strong>System:</strong> {activePreset.system}</p>
                  </div>
                  <div className="arch-meta-card">
                    <span className="arch-meta-title">🏷️ Scientific Nomenclature</span>
                    <p><strong>Latin:</strong> <em>{activePreset.latin}</em> · <strong>Ontology:</strong> <code>{activePreset.fmaId}</code></p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: V.A.N. (VEIN, ARTERY, NERVE) NEUROVASCULAR & BONE RELATIONS */}
            {(dossierTab === "all" || dossierTab === "neuro") && (
              <div className="dossier-expanded-section">
                <div className="section-title-strip">
                  <span className="section-icon">🩸</span>
                  <h3>V.A.N. Neurovascular Triad: Arteries, Veins, Nerves & Bone Relations</h3>
                </div>
                <div className="neuro-breakdown-grid four-col">
                  {/* ARTERY */}
                  <div className="neuro-card artery">
                    <span className="neuro-label artery">🔴 Arterial Supply & Branches (धमन्या)</span>
                    <p>{activePreset.bloodSupply}</p>
                  </div>

                  {/* VEIN */}
                  <div className="neuro-card vein">
                    <span className="neuro-label vein">🔵 Venous Drainage & Tributaries (शिरा)</span>
                    <p>
                      {activePreset.venousDrainage ||
                        "Venous return via deep venae comitantes with bicuspid valves, superficial networks, and systemic caval drainage (SVC/IVC)."}
                    </p>
                  </div>

                  {/* NERVE */}
                  <div className="neuro-card nerve">
                    <span className="neuro-label nerve">⚡ Nerve Supply & Roots (मज्जातंतू)</span>
                    <p>{activePreset.innervation}</p>
                  </div>

                  {/* FRACTURE DANGER */}
                  <div className="neuro-card danger">
                    <span className="neuro-label danger">⚠️ Bone Fracture Danger Zone (अस्थिभंग धोका)</span>
                    <p>{activePreset.examTip || activePreset.clinicalHighYield}</p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: CLINICAL CORRELATIONS & BOARD FLASHPOINTS */}
            {(dossierTab === "all" || dossierTab === "clinical") && (
              <div className="cogni-dossier-grid" style={{ marginTop: "16px" }}>
                {/* CARD 1: CLINICAL PATHOLOGY & SURGICAL PEARLS */}
                <div className="dossier-section highlight-red">
                  <h4>🩺 Clinical Pathology & Surgical Correlations</h4>
                  <p>{activePreset.clinicalHighYield}</p>
                </div>

                {/* CARD 2: USMLE / NEET-PG MNEMONICS & FLASHPOINTS */}
                <div className="dossier-section mnemonic-box">
                  <h4>💡 High-Yield Board Exam Mnemonic</h4>
                  <div className="mnemonic-text">"{activePreset.mnemonic}"</div>

                  <h4 style={{ marginTop: "14px" }}>🎯 High-Yield Exam Flashpoint</h4>
                  <p style={{ color: "#fde68a", fontSize: "12.5px", lineHeight: "1.5", margin: 0 }}>
                    {activePreset.examTip}
                  </p>
                </div>
              </div>
            )}

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
                      onClick={() => {
                        setSelectedMuscle(muscle);
                        // Also sync selectedStructure & auto-open right inspector!
                        const struct = ANATOMICAL_PARTS_LIBRARY.find((s) => s.muscleId === muscle.id) || {
                          id: muscle.id,
                          name: muscle.name,
                          category: "Muscles",
                          region: muscle.region,
                          system: "Musculoskeletal",
                          description:
                            "Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.",
                          origin: muscle.origin,
                          insertion: muscle.insertion,
                          action: muscle.action,
                          arteries: muscle.bloodSupply,
                          veins: "Regional muscular veins draining into deep venae comitantes.",
                          nerves: muscle.innervation,
                          clinicalPearl: muscle.clinicalPearl,
                        };
                        setSelectedStructure(struct);
                        setIsRightPanelOpen(true);
                      }}
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
                            `### 🦾 Muscle O.I.A.I. Study Notes: ${selectedMuscle.name}\n\n**Latin**: *${selectedMuscle.latin}* | **FMA**: \`${selectedMuscle.fmaId}\` | **Region**: ${selectedMuscle.region}\n\n#### 📍 Origin (Proximal Attachment)\n${selectedMuscle.origin}\n\n#### 📌 Insertion (Distal Attachment)\n${selectedMuscle.insertion}\n\n#### ⚙️ Action & Biomechanical Motion\n${selectedMuscle.action}\n\n#### ⚡ Innervation & Nerve Supply\n${selectedMuscle.innervation}\n\n#### 🩸 Arterial Blood Supply & Lymphatics\n${selectedMuscle.bloodSupply} (${selectedMuscle.lymphatics})\n\n#### 🩺 High-Yield Clinical Pearl\n${selectedMuscle.clinicalPearl}\n\n#### 🎓 Bedside Test\n${selectedMuscle.bedsideTest}`,
                            "Medicine (MBBS)"
                          );
                        }
                      }}
                    >
                      💾 Save Muscle to Notes (+20 XP)
                    </button>
                  </div>

                  {/* ANATOMICAL HEADS / FIBERS BREAKDOWN IF PRESENT */}
                  {selectedMuscle.heads && selectedMuscle.heads.length > 0 && (
                    <div className="spotlight-heads-container">
                      <span className="heads-title">🔬 Functional Heads & Fiber Sub-Divisions:</span>
                      <div className="heads-grid">
                        {selectedMuscle.heads.map((head, hIdx) => (
                          <div key={hIdx} className="head-card">
                            <span className="head-name">{head.name}</span>
                            <div className="head-detail"><strong>Origin:</strong> {head.origin}</div>
                            <div className="head-detail"><strong>Insertion:</strong> {head.insertion}</div>
                            <div className="head-detail"><strong>Action:</strong> {head.action}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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

                  {/* SYNERGISTS & ANTAGONISTS */}
                  {(selectedMuscle.synergists || selectedMuscle.antagonists) && (
                    <div className="spotlight-functional-strip">
                      {selectedMuscle.synergists && (
                        <div className="functional-col">
                          <strong>🤝 Synergist Muscles:</strong> {selectedMuscle.synergists}
                        </div>
                      )}
                      {selectedMuscle.antagonists && (
                        <div className="functional-col">
                          <strong>⚔️ Antagonist Muscles:</strong> {selectedMuscle.antagonists}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="spotlight-meta-strip">
                    <div className="meta-block">
                      <strong>⚡ Nerve Supply:</strong> {selectedMuscle.innervation}
                    </div>
                    <div className="meta-block">
                      <strong>🩸 Arterial Supply:</strong> {selectedMuscle.bloodSupply}
                    </div>
                    {selectedMuscle.lymphatics && (
                      <div className="meta-block">
                        <strong>🛡️ Lymphatics:</strong> {selectedMuscle.lymphatics}
                      </div>
                    )}
                  </div>

                  {/* BEDSIDE PHYSICAL EXAM TEST */}
                  {selectedMuscle.bedsideTest && (
                    <div className="spotlight-bedside-box">
                      <span className="bedside-badge">🩺 Step-by-Step Bedside Physical Exam Procedure</span>
                      <p>{selectedMuscle.bedsideTest}</p>
                    </div>
                  )}

                  {/* CLINICAL PEARL */}
                  <div className="spotlight-clinical-box">
                    <span className="clinical-badge">🩺 Clinical & Board Exam Pearl</span>
                    <p>{selectedMuscle.clinicalPearl}</p>
                  </div>

                  {/* VIVA VOCE QUESTION & ANSWER */}
                  {selectedMuscle.vivaQuestion && (
                    <div className="spotlight-viva-box">
                      <span className="viva-badge">🎓 Professor's Viva Voce Table Question</span>
                      <div className="viva-question"><strong>Q:</strong> {selectedMuscle.vivaQuestion.q}</div>
                      <div className="viva-answer"><strong>Model Answer:</strong> {selectedMuscle.vivaQuestion.a}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
