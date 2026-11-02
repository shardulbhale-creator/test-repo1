import { useState } from "react";

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
    id: "infraspinatus-muscle",
    name: "Infraspinatus (Rotator Cuff)",
    region: "Posterior Shoulder / Rotator Cuff",
    latin: "Musculus infraspinatus",
    fmaId: "FMA:9630",
    heads: [
      {
        name: "Infraspinous Belly",
        origin: "Infraspinous fossa of the scapula and overlying infraspinous fascia.",
        insertion: "Middle facet of the greater tubercle of the humerus.",
        action: "Chief external (lateral) rotator of the arm; posterior dynamic stabilizer of shoulder.",
      },
    ],
    origin: "Medial two-thirds of the infraspinous fossa of the scapula and thick infraspinous fascia.",
    insertion: "Middle facet of the greater tubercle of the humerus and posterior glenohumeral joint capsule.",
    action: "Chief lateral (external) rotator of the humerus at the glenohumeral joint; prevents anterior dislocation of humeral head.",
    synergists: "Teres Minor, Posterior Deltoid.",
    antagonists: "Subscapularis, Pectoralis Major, Latissimus Dorsi, Teres Major, Anterior Deltoid (internal rotators).",
    innervation: "Suprascapular Nerve (C5, C6) passing around the spinoglenoid notch beneath inferior transverse scapular ligament.",
    bloodSupply: "Suprascapular Artery and Circumflex Scapular Artery (branch of subscapular artery forming scapular anastomosis).",
    lymphatics: "Drains into Subscapular Axillary nodes.",
    bedsideTest:
      "External Rotation Lag Sign: Patient seated with elbow flexed at 90° and held against waist; patient externally rotates against examiner's medial resistance.",
    clinicalPearl:
      "Ganglion cysts in the spinoglenoid notch can selectively compress the inferior branch of the suprascapular nerve, causing isolated Infraspinatus atrophy without affecting Supraspinatus.",
    vivaQuestion: {
      q: "What vascular anastomosis around the scapula ensures collateral blood flow if the 1st or 2nd part of the Axillary Artery is ligated?",
      a: "The Scapular Anastomosis between the Suprascapular Artery (from thyrocervical trunk), Deep branch of Transverse Cervical / Dorsal Scapular Artery, and Circumflex Scapular Artery (from subscapular artery of 3rd part of axillary).",
    },
  },
  {
    id: "subscapularis-muscle",
    name: "Subscapularis (Rotator Cuff)",
    region: "Anterior Shoulder / Rotator Cuff",
    latin: "Musculus subscapularis",
    fmaId: "FMA:9632",
    heads: [
      {
        name: "Costal Fossa Belly",
        origin: "Medial two-thirds of the subscapular fossa on the anterior (costal) surface of the scapula.",
        insertion: "Lesser tubercle of the humerus and anterior joint capsule.",
        action: "Chief internal (medial) rotator of the arm; anterior dynamic stabilizer of the glenohumeral joint.",
      },
    ],
    origin: "Medial two-thirds of the subscapular fossa on the costal (anterior) surface of the scapula.",
    insertion: "Lesser tubercle of the humerus and anterior fibrous capsule of the glenohumeral joint.",
    action: "Chief medial (internal) rotator of the humerus; holds head of humerus in glenoid cavity to prevent anterior dislocation.",
    synergists: "Pectoralis Major, Latissimus Dorsi, Teres Major, Anterior Deltoid.",
    antagonists: "Infraspinatus, Teres Minor, Posterior Deltoid (external rotators).",
    innervation: "Upper and Lower Subscapular Nerves (C5, C6) originating from the posterior cord of the brachial plexus.",
    bloodSupply: "Subscapular Artery (largest branch of axillary artery) and lateral thoracic artery.",
    lymphatics: "Drains into Subscapular and Central Axillary lymph nodes.",
    bedsideTest:
      "Gerber's Lift-Off Test: Patient places dorsum of hand against mid-lumbar spine; patient actively lifts hand backward away from spine against examiner's resistance (or Belly-Press / Napoleon test).",
    clinicalPearl:
      "Subscapularis tendon rupture permits medial dislocation or subluxation of the long head of the biceps tendon from the intertubercular groove because subscapularis fibers form the medial roof of the bicipital groove.",
    vivaQuestion: {
      q: "Name the 4 muscles comprising the Rotator Cuff ('SITS') and state which one inserts on the lesser tubercle.",
      a: "Supraspinatus, Infraspinatus, Teres minor (all insert on the greater tubercle facets), and Subscapularis (the only one inserting on the lesser tubercle).",
    },
  },
  {
    id: "rectus-abdominis-muscle",
    name: "Rectus Abdominis",
    region: "Anterior Abdominal Wall",
    latin: "Musculus rectus abdominis",
    fmaId: "FMA:9625",
    heads: [
      {
        name: "Medial & Lateral Tendinous Slips",
        origin: "Pubic crest, pubic tubercle, and anterior surface of pubic symphysis.",
        insertion: "Costal cartilages of 5th, 6th, and 7th ribs and xiphoid process.",
        action: "Flexes lumbar vertebral column; compresses abdominal viscera; increases intra-abdominal pressure.",
      },
    ],
    origin: "Pubic crest, pubic tubercle, and anterior surface of pubic symphysis.",
    insertion: "Costal cartilages of the 5th, 6th, and 7th ribs and the xiphoid process of the sternum.",
    action:
      "Flexes the lumbar vertebral column (curling movement); compresses abdominal contents during micturition, defecation, and parturition; posterior pelvic tilt to maintain lumbar lordosis.",
    synergists: "External Oblique, Internal Oblique, Transversus Abdominis.",
    antagonists: "Erector Spinae, Transversospinales, Quadratus Lumborum.",
    innervation: "Thoracoabdominal Nerves (anterior primary rami of T7 to T11 spinal nerves) and Subcostal Nerve (T12).",
    bloodSupply: "Superior Epigastric Artery (terminal branch of internal thoracic) and Inferior Epigastric Artery (branch of external iliac) anastomosing within the rectus sheath.",
    lymphatics: "Superior to umbilicus: drains to Axillary (pectoral) nodes; Inferior to umbilicus: drains to Superficial Inguinal nodes.",
    bedsideTest:
      "Carnett's Test: Patient lies supine and lifts head and shoulders off the examination bed while examiner palpates tender abdominal point; increased or unchanged pain indicates abdominal wall source (e.g. rectus sheath hematoma) rather than intra-abdominal pathology.",
    clinicalPearl:
      "Rectus Sheath Hematoma results from rupture of the Inferior Epigastric Artery during violent coughing, trauma, or anticoagulation therapy. Confirmed clinically by Fothergill's Sign: the abdominal mass does not cross the midline and remains palpable and tender when the rectus muscles contract.",
    vivaQuestion: {
      q: "Describe the composition of the Rectus Sheath below the Arcuate Line (line of Douglas).",
      a: "Below the arcuate line, all three aponeuroses (External Oblique, Internal Oblique, Transversus Abdominis) pass entirely ANTERIOR to the Rectus Abdominis. Posteriorly, the muscle is in direct contact with only the transversalis fascia and parietal peritoneum.",
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
    id: "quadriceps-muscle",
    name: "Quadriceps Femoris (Rectus Femoris & Vasti)",
    region: "Anterior Compartment of Thigh",
    latin: "Musculus quadriceps femoris",
    fmaId: "FMA:22428",
    heads: [
      {
        name: "Rectus Femoris (Biaricular)",
        origin: "Straight head: Anterior Inferior Iliac Spine (AIIS); Reflected head: groove above acetabular rim.",
        insertion: "Base of patella and tibial tuberosity via patellar ligament.",
        action: "Flexes hip joint and extends knee joint.",
      },
      {
        name: "Vastus Lateralis (Largest)",
        origin: "Greater trochanter, intertrochanteric line, lateral lip of linea aspera of femur.",
        insertion: "Lateral base and border of patella.",
        action: "Extends knee joint.",
      },
      {
        name: "Vastus Medialis & VMO",
        origin: "Intertrochanteric line, spiral line, medial lip of linea aspera.",
        insertion: "Medial border of patella and medial tibial condyle.",
        action: "Extends knee; Vastus Medialis Oblique (VMO) stabilizes patella against lateral subluxation.",
      },
      {
        name: "Vastus Intermedius",
        origin: "Anterior and lateral surfaces of the upper two-thirds of femoral shaft.",
        insertion: "Deep surface of quadriceps tendon and patellar base.",
        action: "Pure knee joint extensor.",
      },
    ],
    origin:
      "Rectus Femoris: AIIS and acetabular margin. Vastus Lateralis: greater trochanter and linea aspera. Vastus Medialis: intertrochanteric line and medial supracondylar line. Vastus Intermedius: anterior femoral shaft.",
    insertion: "Patella via common Quadriceps Tendon, continuing as the Patellar Ligament into the Tibial Tuberosity.",
    action: "Chief powerful extensor of the leg at the knee joint; Rectus femoris also assists in flexing the thigh at the hip joint.",
    synergists: "Tensor Fasciae Latae (assists knee extension when knee is extended).",
    antagonists: "Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus), Gracilis, Sartorius.",
    innervation: "Femoral Nerve (L2, L3, L4 posterior division) in the femoral triangle.",
    bloodSupply: "Lateral Circumflex Femoral Artery, Medial Circumflex Femoral Artery, and Deep Femoral (Profunda Femoris) Artery.",
    lymphatics: "Drains into Deep and Superficial Inguinal lymph nodes.",
    bedsideTest:
      "1. Knee extension test: Seated patient extends knee against downward resistance applied at the ankle. 2. Patellar Tendon Reflex (Knee Jerk Reflex) evaluating L3–L4 spinal segments.",
    clinicalPearl:
      "Weakness of the Vastus Medialis Oblique (VMO) fibers leads to lateral patellar maltracking, causing Patellofemoral Pain Syndrome (runner's knee). Violent sprinting in adolescents can cause avulsion fracture of the AIIS at the rectus femoris origin.",
    vivaQuestion: {
      q: "What are the spinal cord root segments tested by the Knee Jerk (Patellar Tendon) reflex?",
      a: "L3 and L4 nerve roots via the Femoral Nerve.",
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
      "Large superficial trapezoidal extrinsic back muscle. Connects the skull and vertebral spine to the pectoral girdle. Crucial for scapular posture, elevation, retraction, depression, and upward rotation during arm abduction above 90°.",
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
        q: "Where is emergency needle decompression performed for a tension pneumothorax?",
        a: "2nd intercostal space in the midclavicular line, or 5th intercostal space in the midaxillary line, inserting the needle directly OVER the superior border of the rib to avoid the subcostal neurovascular bundle.",
      },
    ],
  },

  // --- 4. ABDOMEN, PELVIS & VISCERA ---
  {
    id: "digestive-gi",
    label: "🍏 Digestive Tract (Stomach, Liver & Intestines)",
    system: "Digestive",
    region: "Abdomen",
    icon: "🍏",
    structuresCount: "GI Organs & Mesentery",
    latin: "Apparatus Digestorius",
    fmaId: "FMA:7152",
    summary:
      "Gastrointestinal tract extending from esophagus to rectum. Divided into Foregut (celiac trunk), Midgut (superior mesenteric artery), and Hindgut (inferior mesenteric artery). Features liver, gallbladder, pancreas, stomach, small bowel, and colon.",
    origin: "Embryonic endodermal gut tube (Foregut, Midgut, Hindgut) suspended by dorsal and ventral mesenteries.",
    insertion: "Anocutaneous line (pectinate line) in the anal canal.",
    action: "Mechanical ingestion, enzymatic digestion, nutrient absorption, endocrine incretin release, and waste elimination.",
    innervation: "Enteric Nervous System (Auerbach/myenteric and Meissner/submucosal plexuses) modulated by Vagus CN X and Sympathetics (T5-L2)",
    bloodSupply: "Foregut: Celiac Trunk; Midgut: Superior Mesenteric Artery (SMA); Hindgut: Inferior Mesenteric Artery (IMA)",
    clinicalHighYield:
      "Appendicitis: Luminal obstruction (fecalith in adults, lymphoid hyperplasia in children) causes periumbilical visceral pain (T10 dermatome via sympathetics) that later migrates to McBurney's point (somatic peritoneal irritation, 1/3 distance from ASIS to umbilicus).",
    mnemonic: "Foregut = Celiac (T12); Midgut = SMA (L1); Hindgut = IMA (L3).",
    examTip: "Internal hemorrhoids (above pectinate line) are painless (visceral innervation via inferior hypogastric plexus); External hemorrhoids (below pectinate line) are excruciatingly painful (somatic innervation via inferior rectal nerve).",
    flashcards: [
      {
        q: "What landmark defines McBurney's point, and what pathology does it indicate?",
        a: "Located 1/3 of the distance from the Right Anterior Superior Iliac Spine (ASIS) to the umbilicus. Tenderness here indicates Acute Appendicitis.",
      },
      {
        q: "What embryonic divisions of the gut correspond to the Celiac Trunk, SMA, and IMA?",
        a: "Celiac Trunk: Foregut (esophagus to 2nd part of duodenum).\nSMA: Midgut (3rd part of duodenum to proximal 2/3 of transverse colon).\nIMA: Hindgut (distal 1/3 of transverse colon to upper anal canal).",
      },
    ],
  },
  {
    id: "urinary-kidneys",
    label: "💧 Kidneys & Urinary Tract",
    system: "Urinary",
    region: "Abdomen & Pelvis",
    icon: "💧",
    structuresCount: "Kidneys, Ureters & Bladder",
    latin: "Organa Urinaria",
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

  // Clinical Dossier Sub-Tab: 'all' (Complete Textbook Mode), 'oiai', 'relations', 'neurovascular', 'clinical', 'viva'
  const [dossierTab, setDossierTab] = useState("all");

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
                        ? `\n\n#### 🦴 Muscle Origin, Insertion & Action (O.I.A.I.)\n- **Origin (Proximal)**: ${activePreset.origin}\n- **Insertion (Distal)**: ${activePreset.insertion}\n- **Action / Biomechanics**: ${activePreset.action}`
                        : "";
                      onSaveNote(
                        `Cogni Anatomy Comprehensive: ${activePreset.label}`,
                        `### 🧬 Comprehensive 3D Anatomy Study Dossier: ${activePreset.label}\n\n**Latin**: *${activePreset.latin}* | **FMA ID**: \`${activePreset.fmaId}\` | **Region**: ${activePreset.region}\n\n#### 📖 Structural Architecture & Overview\n${activePreset.summary}${oiaiContent}\n\n#### ⚡ Innervation & Blood Supply\n- **Innervation**: ${activePreset.innervation}\n- **Blood Supply**: ${activePreset.bloodSupply}\n\n#### 🩺 High-Yield Clinical Pathology & Surgical Anatomy\n${activePreset.clinicalHighYield}\n\n#### 💡 Board Exam Mnemonic\n> "${activePreset.mnemonic}"\n\n#### 🎯 Board Exam Flashpoint\n${activePreset.examTip}`,
                        "Medicine (MBBS)"
                      );
                    }
                  }}
                >
                  📝 Save Complete Textbook Notes (+35 XP)
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
                ⚡ Neurovascular & Blood
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
                    <strong>O.I.A.I. MEDICAL EXAM SPECIFICATION</strong>
                    <span className="oiai-subtitle">Origin · Insertion · Action · Biomechanics</span>
                  </div>
                  <span className="oiai-status-pill">High-Yield Medical Core</span>
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

            {/* SECTION 3: NEUROVASCULAR & BLOOD SUPPLY */}
            {(dossierTab === "all" || dossierTab === "neuro") && (
              <div className="dossier-expanded-section">
                <div className="section-title-strip">
                  <span className="section-icon">⚡</span>
                  <h3>Neurovascular Innervation, Arterial & Venous Drainage</h3>
                </div>
                <div className="neuro-breakdown-grid">
                  <div className="neuro-card">
                    <span className="neuro-label">⚡ Nerve Supply (Innervation)</span>
                    <p>{activePreset.innervation}</p>
                  </div>
                  <div className="neuro-card">
                    <span className="neuro-label">🩸 Arterial Blood Supply</span>
                    <p>{activePreset.bloodSupply}</p>
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
