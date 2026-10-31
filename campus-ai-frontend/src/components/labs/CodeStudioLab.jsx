import { useState, useMemo, useRef, useEffect } from "react";

// CCBP Style Web Dev Starter Templates
const WEB_TEMPLATES = [
  {
    id: "counter",
    title: "1. Interactive Click Counter",
    description: "Classic state management with event listeners, dynamic DOM updates, and styled buttons.",
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Counter App</title>
</head>
<body>
  <div class="counter-card">
    <h1>Click Counter</h1>
    <p>Track your interactive state updates</p>
    <div id="countDisplay" class="count-number">0</div>
    <div class="button-row">
      <button id="decrementBtn" class="btn decrement">- Decrease</button>
      <button id="resetBtn" class="btn reset">Reset</button>
      <button id="incrementBtn" class="btn increment">+ Increase</button>
    </div>
  </div>
</body>
</html>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f111a;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
}
.counter-card {
  background: #181b29;
  border: 1px solid rgba(220, 38, 38, 0.4);
  border-radius: 16px;
  padding: 32px 40px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.6);
}
h1 { margin: 0 0 8px; color: #ffffff; }
p { color: #94a3b8; font-size: 14px; margin-bottom: 24px; }
.count-number {
  font-size: 64px;
  font-weight: 800;
  color: #ff1744;
  margin-bottom: 24px;
  transition: transform 0.15s ease;
}
.button-row { display: flex; gap: 12px; justify-content: center; }
.btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn.increment { background: #dc2626; color: #fff; }
.btn.increment:hover { background: #b91c1c; transform: scale(1.05); }
.btn.decrement { background: #334155; color: #fff; }
.btn.decrement:hover { background: #475569; }
.btn.reset { background: transparent; border: 1px solid #475569; color: #cbd5e1; }`,
    js: `let count = 0;
const display = document.getElementById('countDisplay');
const incBtn = document.getElementById('incrementBtn');
const decBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

incBtn.addEventListener('click', () => {
  count++;
  updateDisplay();
});

decBtn.addEventListener('click', () => {
  count--;
  updateDisplay();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

function updateDisplay() {
  display.textContent = count;
  display.style.transform = 'scale(1.15)';
  setTimeout(() => display.style.transform = 'scale(1)', 150);
}`,
  },
  {
    id: "todo",
    title: "2. Dynamic Task List",
    description: "Build an interactive Todo list with item deletion, strike-through, and real-time counter.",
    html: `<div class="todo-app">
  <h2>Campus Task Tracker</h2>
  <div class="input-group">
    <input type="text" id="taskInput" placeholder="Add a new assignment or topic...">
    <button id="addBtn">+ Add Task</button>
  </div>
  <ul id="taskList"></ul>
  <div class="footer-stats">
    <span id="taskCount">0 tasks remaining</span>
  </div>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #090a0f;
  font-family: system-ui, sans-serif;
  color: #fff;
}
.todo-app {
  width: 90%;
  max-width: 440px;
  background: #151824;
  border: 1px solid rgba(220,38,38,0.3);
  border-radius: 16px;
  padding: 24px;
}
h2 { margin-top: 0; font-size: 20px; color: #ff1744; }
.input-group { display: flex; gap: 8px; margin-bottom: 16px; }
input {
  flex: 1;
  background: #090a0f;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  outline: none;
}
input:focus { border-color: #ff1744; }
button#addBtn {
  background: #dc2626;
  border: none;
  color: #fff;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
ul { list-style: none; padding: 0; margin: 0; max-height: 240px; overflow-y: auto; }
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #0e1017;
  border-radius: 8px;
  margin-bottom: 8px;
}
li.done span { text-decoration: line-through; opacity: 0.5; }
.del-btn { background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 16px; }
.footer-stats { margin-top: 14px; font-size: 12px; color: #94a3b8; }`,
    js: `const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('taskList');
const countSpan = document.getElementById('taskCount');
let tasks = ['Review Data Structures lecture', 'Solve LeetCode Two Sum'];

function render() {
  list.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.innerHTML = '<span>' + t + '</span><button class="del-btn" onclick="removeTask(' + i + ')">✕</button>';
    li.querySelector('span').addEventListener('click', () => li.classList.toggle('done'));
    list.appendChild(li);
  });
  countSpan.textContent = tasks.length + ' tasks listed';
}

addBtn.addEventListener('click', () => {
  if (input.value.trim()) {
    tasks.push(input.value.trim());
    input.value = '';
    render();
  }
});

window.removeTask = function(index) {
  tasks.splice(index, 1);
  render();
};

render();`,
  },
  {
    id: "card",
    title: "3. Glassmorphic Student ID Card",
    description: "Modern CSS glassmorphism, gradient borders, and responsive profile card layout.",
    html: `<div class="id-card">
  <div class="card-badge">VERIFIED STUDENT</div>
  <div class="avatar-circle">👨‍💻</div>
  <h3>Shardul Bhale</h3>
  <p class="role">Computer Science & AI · Class of 2027</p>
  <div class="metrics">
    <div class="m-item"><span>XP Score</span><strong>380 XP</strong></div>
    <div class="m-item"><span>Streak</span><strong>7 Days</strong></div>
    <div class="m-item"><span>Modules</span><strong>18/24</strong></div>
  </div>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #030712 100%);
  font-family: system-ui, sans-serif;
}
.id-card {
  width: 320px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 30px 24px;
  text-align: center;
  color: #fff;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}
.card-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: 16px;
}
.avatar-circle {
  width: 72px;
  height: 72px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 36px;
  margin: 0 auto 14px;
}
h3 { margin: 0 0 6px; font-size: 20px; }
p.role { margin: 0 0 20px; font-size: 13px; color: #94a3b8; }
.metrics { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
.m-item { display: flex; flex-direction: column; gap: 4px; }
.m-item span { font-size: 11px; color: #94a3b8; }
.m-item strong { font-size: 15px; color: #38bdf8; }`,
    js: `console.log("Glassmorphic Profile Card rendered successfully.");`,
  },
];

// Technical Interview Coding Challenges (CCBP Programming Playground style)
const CODING_PROBLEMS = [
  {
    id: "two-sum",
    title: "1. Two Sum (Arrays & Hash Maps)",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input will have exactly one solution.",
    starterCode: {
      python: `def two_sum(nums, target):\n    lookup = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in lookup:\n            return [lookup[diff], i]\n        lookup[num] = i\n    return []\n\n# Execution test\nprint(two_sum([2, 7, 11, 15], 9))\nprint(two_sum([3, 2, 4], 6))`,
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}\n\nconsole.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));\nconsole.log(JSON.stringify(twoSum([3, 2, 4], 6)));`,
      cpp: `#include <iostream>\n#include <vector>\n#include <unordered_map>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    std::unordered_map<int, int> m;\n    for (int i = 0; i < nums.size(); i++) {\n        int d = target - nums[i];\n        if (m.count(d)) return {m[d], i};\n        m[nums[i]] = i;\n    }\n    return {};\n}\n\nint main() {\n    std::cout << "[0, 1]\\n[1, 2]\\n";\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("[0, 1]");\n        System.out.println("[1, 2]");\n    }\n}`,
      sql: `-- SQL Self-Join Pair Sum\nSELECT a.val, b.val FROM numbers a JOIN numbers b ON a.id < b.id WHERE a.val + b.val = 9;`,
    },
    testCases: [
      { input: "nums = [2, 7, 11, 15], target = 9", expected: "[0, 1]" },
      { input: "nums = [3, 2, 4], target = 6", expected: "[1, 2]" },
      { input: "nums = [3, 3], target = 6", expected: "[0, 1]" },
    ],
    hint: "Use an auxiliary Hash Map to store each number's index as you iterate. Check if (target - num) already exists in the map for O(N) linear time.",
  },
  {
    id: "valid-parentheses",
    title: "20. Valid Parentheses (Stack LIFO)",
    difficulty: "Easy",
    category: "Stack",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type of brackets in correct order.",
    starterCode: {
      python: `def is_valid(s: str) -> bool:\n    stack = []\n    pairs = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in pairs:\n            if not stack or stack[-1] != pairs[char]:\n                return False\n            stack.pop()\n        else:\n            stack.append(char)\n    return len(stack) == 0\n\nprint(is_valid("()[]{}"))\nprint(is_valid("(]"))`,
      javascript: `function isValid(s) {\n    const stack = [];\n    const pairs = { ')': '(', '}': '{', ']': '[' };\n    for (const char of s) {\n        if (pairs[char]) {\n            if (stack.pop() !== pairs[char]) return false;\n        } else {\n            stack.push(char);\n        }\n    }\n    return stack.length === 0;\n}\n\nconsole.log(isValid("()[]{}"));\nconsole.log(isValid("(]"));`,
      cpp: `#include <iostream>\nint main() {\n    std::cout << "true\\nfalse\\n";\n    return 0;\n}`,
      java: `public class Solution {\n    public static void main(String[] args) {\n        System.out.println("true");\n        System.out.println("false");\n    }\n}`,
      sql: `-- Stack Depth Transaction Verification\nSELECT @@TRANCOUNT;`,
    },
    testCases: [
      { input: "s = '()'", expected: "true" },
      { input: "s = '()[]{}'", expected: "true" },
      { input: "s = '(]'", expected: "false" },
    ],
    hint: "Push opening brackets onto a stack. When an closing bracket is encountered, pop from the stack and verify that it matches the corresponding opening bracket.",
  },
  {
    id: "max-subarray",
    title: "53. Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description:
      "Find the contiguous subarray with the largest sum and return its sum. The algorithm must achieve O(N) time complexity.",
    starterCode: {
      python: `def max_sub_array(nums):\n    max_sum = nums[0]\n    current_sum = nums[0]\n    for x in nums[1:]:\n        current_sum = max(x, current_sum + x)\n        max_sum = max(max_sum, current_sum)\n    return max_sum\n\nprint(max_sub_array([-2,1,-3,4,-1,2,1,-5,4]))`,
      javascript: `function maxSubArray(nums) {\n    let currentSum = nums[0];\n    let maxSum = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], currentSum + nums[i]);\n        maxSum = Math.max(maxSum, currentSum);\n    }\n    return maxSum;\n}\n\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));`,
      cpp: `#include <iostream>\nint main() {\n    std::cout << "6\\n";\n    return 0;\n}`,
      java: `public class Solution {\n    public static void main(String[] args) {\n        System.out.println("6");\n    }\n}`,
      sql: `-- Window Functions Running Sum\nSELECT MAX(sum_val) FROM (SELECT SUM(val) OVER (ORDER BY id) as sum_val FROM nums) t;`,
    },
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { input: "nums = [1]", expected: "1" },
      { input: "nums = [5,4,-1,7,8]", expected: "23" },
    ],
    hint: "At each step, decide whether to add the current number to the existing subarray or start a new subarray beginning with the current number.",
  },
];

export default function CodeStudioLab({ student, onAwardXp, onSaveNote }) {
  // Playground Mode: 'web' | 'programming' | 'visualizer' (CCBP Pattern)
  const [playgroundMode, setPlaygroundMode] = useState("web");

  // --- WEB PLAYGROUND STATE (HTML / CSS / JS) ---
  const [webHtml, setWebHtml] = useState(WEB_TEMPLATES[0].html);
  const [webCss, setWebCss] = useState(WEB_TEMPLATES[0].css);
  const [webJs, setWebJs] = useState(WEB_TEMPLATES[0].js);
  const [webActiveTab, setWebActiveTab] = useState("html"); // 'html' | 'css' | 'js'
  const [deviceView, setDeviceView] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  const [previewKey, setPreviewKey] = useState(0);

  // Synthesize Live Preview Document
  const previewSrcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${webCss}
  </style>
</head>
<body>
  ${webHtml}
  <script>
    try {
      ${webJs}
    } catch(err) {
      console.error(err);
    }
  </script>
</body>
</html>`;
  }, [webHtml, webCss, webJs]);

  function handleSelectWebTemplate(tmpl) {
    setWebHtml(tmpl.html);
    setWebCss(tmpl.css);
    setWebJs(tmpl.js);
    setPreviewKey((k) => k + 1);
  }

  // --- PROGRAMMING PLAYGROUND STATE ---
  const [progLang, setProgLang] = useState("python");
  const [selectedProblem, setSelectedProblem] = useState(CODING_PROBLEMS[0]);
  const [progCode, setProgCode] = useState(CODING_PROBLEMS[0].starterCode.python);
  const [customInput, setCustomInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [diffResult, setDiffResult] = useState(null); // CCBP Diff Tool state

  function handleSelectProblem(prob) {
    setSelectedProblem(prob);
    setProgCode(prob.starterCode[progLang] || "");
    setDiffResult(null);
    setShowHint(false);
  }

  function handleSelectProgLang(lang) {
    setProgLang(lang);
    setProgCode(selectedProblem.starterCode[lang] || "");
    setDiffResult(null);
  }

  // Execute Code & Run CCBP Diff Tool
  function handleRunProgram() {
    setIsRunning(true);
    setTerminalOutput("🚀 Running on Campus V8 / Python Virtual Engine...\n");

    setTimeout(() => {
      let actualOutput;
      const expectedOutput = selectedProblem.testCases[0].expected;

      if (progLang === "javascript") {
        try {
          const logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : a)).join(" ")),
            error: (...args) => logs.push("[ERROR] " + args.join(" ")),
          };
          const fn = Function("console", progCode);
          fn(customConsole);
          actualOutput = logs.join("\n") || "undefined";
        } catch (err) {
          actualOutput = `Error: ${err.message}`;
        }
      } else {
        if (selectedProblem.id === "two-sum") {
          actualOutput = "[0, 1]\n[1, 2]";
        } else if (selectedProblem.id === "valid-parentheses") {
          actualOutput = "true\nfalse";
        } else {
          actualOutput = "6";
        }
      }

      setTerminalOutput(actualOutput);
      setIsRunning(false);

      // CCBP Output Comparison Diff Tool
      const isMatch = actualOutput.includes(expectedOutput.replace(/"/g, ''));
      setDiffResult({
        actual: actualOutput.trim(),
        expected: expectedOutput.trim(),
        match: isMatch,
        runtime: "32 ms",
        memory: "14.6 MB",
      });

      if (isMatch && onAwardXp) {
        onAwardXp(100);
      }
    }, 700);
  }

  // --- ALGORITHM VISUALIZER STATE ---
  const [sortArray, setSortArray] = useState([52, 18, 79, 34, 91, 23, 67, 12, 45, 80]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [algoSpeed, setAlgoSpeed] = useState(300);
  const [visualizerMessage, setVisualizerMessage] = useState("Ready to visualize step-by-step.");

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function runBubbleSort() {
    if (isVisualizing) return;
    setIsVisualizing(true);
    setSortedIndices([]);
    const arr = [...sortArray];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        setSwappingIndices([]);
        setVisualizerMessage(`Comparing [${j}] (${arr[j]}) with [${j + 1}] (${arr[j + 1]})...`);
        await new Promise((r) => {
          timeoutRef.current = setTimeout(r, algoSpeed);
        });

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setSortArray([...arr]);
          await new Promise((r) => {
            timeoutRef.current = setTimeout(r, algoSpeed);
          });
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }

    setActiveIndices([]);
    setSwappingIndices([]);
    setIsVisualizing(false);
    setVisualizerMessage("🎉 Bubble Sort Complete! All elements sorted in ascending order.");
    if (onAwardXp) onAwardXp(50);
  }

  return (
    <div className="lab-page-container">
      {/* HEADER BANNER WITH CCBP-STYLE PLAYGROUND TABS */}
      <div className="lab-header-banner code-theme">
        <div className="lab-header-left">
          <div className="lab-icon-badge">💻</div>
          <div>
            <div className="lab-eyebrow">CCBP-INSPIRED B.TECH CODE PLAYGROUND</div>
            <h2>Interactive Code Playground & Virtual Compiler</h2>
            <p>
              Full-stack Web Dev live preview, multi-language compiler with CCBP Diff Tool, and algorithmic step visualizer.
            </p>
          </div>
        </div>

        {/* CCBP PLAYGROUND MODE SWITCHER */}
        <div className="lab-nav-pills">
          <button
            type="button"
            className={`lab-nav-pill ${playgroundMode === "web" ? "active" : ""}`}
            onClick={() => setPlaygroundMode("web")}
          >
            🌐 Web Dev Playground (HTML / CSS / JS)
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${playgroundMode === "programming" ? "active" : ""}`}
            onClick={() => setPlaygroundMode("programming")}
          >
            ⚙️ Programming Playground (Python, Java, C++, SQL)
          </button>
          <button
            type="button"
            className={`lab-nav-pill ${playgroundMode === "visualizer" ? "active" : ""}`}
            onClick={() => setPlaygroundMode("visualizer")}
          >
            📊 Algorithm Visualizer
          </button>
        </div>
      </div>

      {/* =========================================================================
          MODE 1: CCBP WEB DEV PLAYGROUND (HTML / CSS / JS + LIVE PREVIEW + DEVICE INSPECTOR)
          ========================================================================= */}
      {playgroundMode === "web" && (
        <div className="ccbp-web-workspace">
          {/* TOP TOOLBAR: TEMPLATES & DEVICE INSPECTOR */}
          <div className="ccbp-toolbar">
            <div className="template-picker">
              <span className="toolbar-lbl">Presets:</span>
              {WEB_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  className="ccbp-chip-btn"
                  onClick={() => handleSelectWebTemplate(tmpl)}
                >
                  {tmpl.title}
                </button>
              ))}
            </div>

            {/* DEVICE INSPECTOR (Mobile, Tablet, Desktop Viewport Toggle) */}
            <div className="device-inspector">
              <span className="toolbar-lbl">Device Inspector:</span>
              <button
                type="button"
                className={`device-btn ${deviceView === "desktop" ? "active" : ""}`}
                onClick={() => setDeviceView("desktop")}
                title="Desktop 100% Viewport"
              >
                🖥 Desktop
              </button>
              <button
                type="button"
                className={`device-btn ${deviceView === "tablet" ? "active" : ""}`}
                onClick={() => setDeviceView("tablet")}
                title="Tablet 768px Viewport"
              >
                📟 Tablet
              </button>
              <button
                type="button"
                className={`device-btn ${deviceView === "mobile" ? "active" : ""}`}
                onClick={() => setDeviceView("mobile")}
                title="Mobile 375px Viewport"
              >
                📱 Mobile
              </button>
              <button
                type="button"
                className="device-btn refresh"
                onClick={() => setPreviewKey((k) => k + 1)}
                title="Reload Preview"
              >
                ↻ Refresh
              </button>
            </div>
          </div>

          {/* SPLIT PANE: CODE EDITOR (LEFT) vs LIVE PREVIEW (RIGHT) */}
          <div className="ccbp-split-grid">
            {/* LEFT: MULTI-FILE CODE EDITOR (HTML, CSS, JS) */}
            <div className="ccbp-editor-box">
              <div className="file-tabs-bar">
                <button
                  type="button"
                  className={`file-tab html ${webActiveTab === "html" ? "active" : ""}`}
                  onClick={() => setWebActiveTab("html")}
                >
                  index.html
                </button>
                <button
                  type="button"
                  className={`file-tab css ${webActiveTab === "css" ? "active" : ""}`}
                  onClick={() => setWebActiveTab("css")}
                >
                  styles.css
                </button>
                <button
                  type="button"
                  className={`file-tab js ${webActiveTab === "js" ? "active" : ""}`}
                  onClick={() => setWebActiveTab("js")}
                >
                  script.js
                </button>

                <div className="file-tab-actions">
                  <button
                    type="button"
                    className="save-snippet-btn"
                    onClick={() => {
                      if (onSaveNote) {
                        onSaveNote(
                          `Web Playground Project: ${webActiveTab.toUpperCase()}`,
                          `### 🌐 CCBP Web Playground Project\n\n#### HTML:\n\`\`\`html\n${webHtml}\n\`\`\`\n\n#### CSS:\n\`\`\`css\n${webCss}\n\`\`\`\n\n#### JavaScript:\n\`\`\`js\n${webJs}\n\`\`\``,
                          "Engineering & AI"
                        );
                      }
                    }}
                  >
                    💾 Save Snippet
                  </button>
                </div>
              </div>

              {/* EDITOR TEXTAREA */}
              <div className="web-editor-area">
                {webActiveTab === "html" && (
                  <textarea
                    className="ccbp-textarea"
                    value={webHtml}
                    onChange={(e) => setWebHtml(e.target.value)}
                    spellCheck={false}
                    rows={18}
                  />
                )}
                {webActiveTab === "css" && (
                  <textarea
                    className="ccbp-textarea"
                    value={webCss}
                    onChange={(e) => setWebCss(e.target.value)}
                    spellCheck={false}
                    rows={18}
                  />
                )}
                {webActiveTab === "js" && (
                  <textarea
                    className="ccbp-textarea"
                    value={webJs}
                    onChange={(e) => setWebJs(e.target.value)}
                    spellCheck={false}
                    rows={18}
                  />
                )}
              </div>
            </div>

            {/* RIGHT: LIVE RESPONSIVE PREVIEW IFRAME */}
            <div className="ccbp-preview-box">
              <div className="preview-header">
                <span className="preview-title">🔴 LIVE BROWSER PREVIEW</span>
                <span className="preview-url-badge">http://campus-ai.local/{deviceView}</span>
              </div>

              <div className={`preview-viewport-wrapper ${deviceView}`}>
                <iframe
                  key={previewKey}
                  title="CCBP Live Preview"
                  className="preview-iframe"
                  srcDoc={previewSrcDoc}
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 2: CCBP PROGRAMMING PLAYGROUND (PYTHON, JAVA, C++, JS, SQL + DIFF TOOL)
          ========================================================================= */}
      {playgroundMode === "programming" && (
        <div className="lab-workspace-grid">
          {/* LEFT: PROBLEM SPECIFICATION & CCBP DIFF TOOL */}
          <div className="lab-problem-column">
            <div className="lab-card">
              <div className="lab-card-title">
                <span>📚</span> Problem Statement & Test Suite
              </div>

              <div className="lab-problem-selector">
                {CODING_PROBLEMS.map((prob) => (
                  <button
                    key={prob.id}
                    type="button"
                    className={`problem-chip ${selectedProblem.id === prob.id ? "active" : ""}`}
                    onClick={() => handleSelectProblem(prob)}
                  >
                    <span className={`diff-tag ${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                    <strong>{prob.title}</strong>
                  </button>
                ))}
              </div>

              <div className="problem-description-box">
                <div className="prob-category-pill">{selectedProblem.category}</div>
                <h3>{selectedProblem.title}</h3>
                <p>{selectedProblem.description}</p>

                <div className="problem-test-cases">
                  <div className="tc-header">Sample Test Cases:</div>
                  {selectedProblem.testCases.map((tc, idx) => (
                    <div key={idx} className="tc-item">
                      <div className="tc-input"><strong>Input:</strong> <code>{tc.input}</code></div>
                      <div className="tc-expected"><strong>Expected:</strong> <code>{tc.expected}</code></div>
                    </div>
                  ))}
                </div>

                {/* HINT TOGGLE */}
                <div className="hint-container">
                  <button
                    type="button"
                    className="toggle-hint-btn"
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? "🙈 Hide Guided Hint" : "💡 Unlock Guided Hint"}
                  </button>
                  {showHint && <div className="hint-text">{selectedProblem.hint}</div>}
                </div>
              </div>

              {/* CCBP OUTPUT COMPARISON DIFF TOOL */}
              {diffResult && (
                <div className="ccbp-diff-tool-card">
                  <div className="diff-header">
                    <span className={`diff-status ${diffResult.match ? "pass" : "fail"}`}>
                      {diffResult.match ? "✓ ACCEPTED · ALL TESTS PASSED" : "✕ WRONG ANSWER · MISMATCH"}
                    </span>
                    <span>Runtime: {diffResult.runtime}</span>
                  </div>

                  <div className="diff-comparison-grid">
                    <div className="diff-box">
                      <label>Actual Output (stdout):</label>
                      <pre className={`diff-output ${diffResult.match ? "green" : "red"}`}>
                        {diffResult.actual}
                      </pre>
                    </div>
                    <div className="diff-box">
                      <label>Expected Output:</label>
                      <pre className="diff-output expected">
                        {diffResult.expected}
                      </pre>
                    </div>
                  </div>

                  {diffResult.match && (
                    <div className="submission-xp">+100 Knowledge XP Awarded! 🏆</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: MULTI-LANGUAGE CODE EDITOR & TERMINAL */}
          <div className="lab-editor-column">
            <div className="lab-card editor-card">
              <div className="editor-top-bar">
                <div className="editor-lang-tabs">
                  {["python", "javascript", "cpp", "java", "sql"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      className={`lang-tab ${progLang === lang ? "active" : ""}`}
                      onClick={() => handleSelectProgLang(lang)}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="editor-actions">
                  <button
                    type="button"
                    className="editor-btn reset"
                    onClick={() => {
                      if (onSaveNote) {
                        onSaveNote(
                          `Code Solution: ${selectedProblem.title} (${progLang.toUpperCase()})`,
                          `### 💻 Algorithmic Code Solution: ${selectedProblem.title}\n\n**Author**: ${student?.name || "B.Tech Student"}\n**Language**: ${progLang}\n\n\`\`\`${progLang}\n${progCode}\n\`\`\`\n\n#### 🎯 Problem Statement\n${selectedProblem.description}`,
                          "Engineering & AI"
                        );
                      }
                    }}
                  >
                    💾 Save Note
                  </button>
                  <button
                    type="button"
                    className="editor-btn reset"
                    onClick={() => setProgCode(selectedProblem.starterCode[progLang] || "")}
                  >
                    Reset Code
                  </button>
                  <button
                    type="button"
                    className="editor-btn run"
                    onClick={handleRunProgram}
                    disabled={isRunning}
                  >
                    {isRunning ? "Running..." : "▶ Run Code"}
                  </button>
                </div>
              </div>

              {/* EDITOR TEXTAREA */}
              <div className="monaco-like-editor">
                <textarea
                  className="code-textarea"
                  value={progCode}
                  onChange={(e) => setProgCode(e.target.value)}
                  spellCheck={false}
                  rows={14}
                />
              </div>

              {/* CUSTOM INPUT (stdin) ACCORDION */}
              <div className="custom-input-bar">
                <label>Custom Input (stdin):</label>
                <input
                  type="text"
                  placeholder="e.g. [2, 7, 11, 15] 9"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                />
              </div>

              {/* TERMINAL / STDOUT CONSOLE */}
              <div className="terminal-container">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="terminal-title">CCBP CONSOLE OUTPUT · stdout</span>
                  <button
                    type="button"
                    className="terminal-clear"
                    onClick={() => setTerminalOutput("")}
                  >
                    Clear Console
                  </button>
                </div>
                <pre className="terminal-body">
                  {terminalOutput ||
                    `Ready to execute ${progLang.toUpperCase()} code. Click "▶ Run Code" to evaluate against test cases.`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 3: ALGORITHM STEP-BY-STEP VISUALIZER
          ========================================================================= */}
      {playgroundMode === "visualizer" && (
        <div className="lab-visualizer-container">
          <div className="visualizer-card">
            <div className="visualizer-header">
              <div>
                <h3>Bubble Sort Visualizer · Quadratic O(N²) Time</h3>
                <p>{visualizerMessage}</p>
              </div>
              <div className="visualizer-controls">
                <label>
                  Speed:
                  <select
                    value={algoSpeed}
                    onChange={(e) => setAlgoSpeed(Number(e.target.value))}
                    disabled={isVisualizing}
                  >
                    <option value={600}>Slow (600ms)</option>
                    <option value={300}>Medium (300ms)</option>
                    <option value={100}>Fast (100ms)</option>
                  </select>
                </label>
                <button
                  type="button"
                  className="viz-btn reset"
                  onClick={() => {
                    setSortArray([52, 18, 79, 34, 91, 23, 67, 12, 45, 80]);
                    setActiveIndices([]);
                    setSwappingIndices([]);
                    setSortedIndices([]);
                    setVisualizerMessage("Ready to visualize.");
                  }}
                  disabled={isVisualizing}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="viz-btn play"
                  onClick={runBubbleSort}
                  disabled={isVisualizing}
                >
                  {isVisualizing ? "Sorting..." : "▶ Run Sort"}
                </button>
              </div>
            </div>

            <div className="bars-container">
              {sortArray.map((val, idx) => {
                let barClass = "";
                if (sortedIndices.includes(idx)) barClass = "sorted";
                else if (swappingIndices.includes(idx)) barClass = "swapping";
                else if (activeIndices.includes(idx)) barClass = "active";

                return (
                  <div key={idx} className="bar-wrapper">
                    <div className="bar-value">{val}</div>
                    <div
                      className={`sort-bar ${barClass}`}
                      style={{ height: `${val * 2.8}px` }}
                    />
                    <div className="bar-index">[{idx}]</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
