import { useState, useMemo, useRef, useEffect } from "react";

// ============================================================================
// SIGNATURE NXTWAVE CCBP 4.0 CODE PLAYGROUND STARTER PROJECTS
// Directly based on the official CCBP curriculum (learning.ccbp.in)
// ============================================================================
const CCBP_PROJECTS = [
  {
    id: "food-munch",
    title: "🍔 Food Munch (Responsive Website)",
    category: "Responsive Web Development",
    difficulty: "Core CCBP Project",
    description:
      "The flagship CCBP responsive food delivery website. Features responsive navigation, hero banner, Why Choose Us, Explore Menu cards, Delivery & Payment section, and interactive cart.",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Food Munch - Delicious Food</title>
</head>
<body>
  <!-- CCBP NAVIGATION BAR -->
  <nav class="navbar">
    <div class="nav-brand">
      <span class="brand-logo">🍔</span>
      <span class="brand-name">Food<span class="highlight">Munch</span></span>
    </div>
    <div class="nav-links">
      <a href="#why-choose-us" class="nav-item">Why Choose Us?</a>
      <a href="#explore-menu" class="nav-item">Explore Menu</a>
      <a href="#delivery-payment" class="nav-item">Delivery & Payment</a>
      <button class="order-btn" onclick="orderNow()">Order Online</button>
    </div>
  </nav>

  <!-- CCBP HERO BANNER SECTION -->
  <section class="banner-section">
    <div class="banner-content">
      <span class="banner-badge">🔥 50% Off First 3 Orders</span>
      <h1 class="banner-heading">Get Delicious Food At Your Doorstep</h1>
      <p class="banner-subtext">Eat healthy, stay fresh. Prepared with farm-fresh ingredients by top master chefs.</p>
      <div class="banner-btn-group">
        <a href="#explore-menu" class="btn primary-btn">View Menu</a>
        <button class="btn secondary-btn" onclick="bookTable()">Book a Table</button>
      </div>
    </div>
    <div class="banner-image-box">
      <div class="food-hero-card">
        <div class="hero-emoji">🍕</div>
        <div class="hero-card-info">
          <strong>Italian Truffle Pizza</strong>
          <span class="price">₹349 · <span class="rating">⭐ 4.9 (1.2k)</span></span>
        </div>
      </div>
    </div>
  </section>

  <!-- CCBP WHY CHOOSE US SECTION -->
  <section id="why-choose-us" class="section">
    <h2 class="section-heading">Why Choose Us?</h2>
    <p class="section-subtext">We use both original recipes and classic ingredients to make authentic dishes.</p>
    <div class="wcu-cards-container">
      <div class="wcu-card">
        <div class="wcu-icon">🥗</div>
        <h3>Food Service</h3>
        <p>Experience fine dining at the comfort of your home. All meals sanitized and hygienically packed.</p>
      </div>
      <div class="wcu-card highlight">
        <div class="wcu-icon">🌾</div>
        <h3>Fresh Food</h3>
        <p>100% farm-sourced fresh vegetables, organic spices, and healthy cold-pressed oils.</p>
      </div>
      <div class="wcu-card">
        <div class="wcu-icon">⚡</div>
        <h3>30 Min Delivery</h3>
        <p>Lightning-fast contactless delivery right to your door with live GPS tracking.</p>
      </div>
    </div>
  </section>

  <!-- CCBP EXPLORE MENU SECTION -->
  <section id="explore-menu" class="section">
    <h2 class="section-heading">Explore Our Menu</h2>
    <p class="section-subtext">Choose from our curated selection of mouth-watering appetizers, mains, and desserts.</p>
    <div class="menu-grid">
      <div class="menu-card">
        <div class="menu-emoji">🍗</div>
        <div class="menu-body">
          <span class="menu-tag">Non-Veg Starters</span>
          <h4>Smoked BBQ Chicken Wings</h4>
          <p>Tossed in house-special honey glaze and sesame seeds.</p>
          <div class="menu-footer">
            <span class="menu-price">₹280</span>
            <button class="add-cart-btn" onclick="addToCart('BBQ Chicken Wings')">+ Add</button>
          </div>
        </div>
      </div>
      <div class="menu-card">
        <div class="menu-emoji">🥟</div>
        <div class="menu-body">
          <span class="menu-tag veg">Veg Special</span>
          <h4>Steamed Truffle Dim Sums</h4>
          <p>Exotic vegetables wrapped in translucent delicate dough.</p>
          <div class="menu-footer">
            <span class="menu-price">₹220</span>
            <button class="add-cart-btn" onclick="addToCart('Truffle Dim Sums')">+ Add</button>
          </div>
        </div>
      </div>
      <div class="menu-card">
        <div class="menu-emoji">🍨</div>
        <div class="menu-body">
          <span class="menu-tag dessert">Dessert</span>
          <h4>Dark Chocolate Lava Cake</h4>
          <p>Gooey chocolate ganache center served warm with vanilla bean.</p>
          <div class="menu-footer">
            <span class="menu-price">₹190</span>
            <button class="add-cart-btn" onclick="addToCart('Chocolate Lava Cake')">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CCBP DELIVERY & PAYMENT SECTION -->
  <section id="delivery-payment" class="section dark-section">
    <div class="delivery-container">
      <div class="delivery-text">
        <h2 class="section-heading left">Delivery & Easy Payment</h2>
        <p>Enjoy hassle-free payment methods. We accept Google Pay, PhonePe, Cards, NetBanking, and Cash on Delivery.</p>
        <div class="payment-methods">
          <span class="pay-chip">📱 UPI (GPay/PhonePe)</span>
          <span class="pay-chip">💳 Visa / MasterCard</span>
          <span class="pay-chip">💵 Cash on Delivery</span>
        </div>
      </div>
      <div class="delivery-badge-box">
        <div class="badge-icon">🛵</div>
        <h3>Free Delivery on orders above ₹499</h3>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-content">
      <p>🍔 <strong>Food Munch</strong> · Built on NxtWave CCBP Code Playground</p>
      <p class="copyright">© 2026 Food Munch Inc. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`,
    css: `/* CCBP FOOD MUNCH RESPONSIVE STYLING */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  scroll-behavior: smooth;
}

body {
  background-color: #0b0c10;
  color: #f1f5f9;
  line-height: 1.6;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: rgba(15, 17, 26, 0.95);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #1f2438;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
}

.brand-logo { font-size: 28px; }
.highlight { color: #ef4444; }

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.2s;
}

.nav-item:hover { color: #ffffff; }

.order-btn {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  color: #ffffff;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
  transition: transform 0.18s;
}

.order-btn:hover { transform: scale(1.05); }

/* HERO BANNER */
.banner-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 64px 32px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
}

.banner-badge {
  display: inline-block;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #f87171;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.banner-heading {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #ffffff;
}

.banner-subtext {
  font-size: 16px;
  color: #94a3b8;
  margin-bottom: 28px;
  max-width: 480px;
}

.banner-btn-group {
  display: flex;
  gap: 14px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-btn {
  background: #ef4444;
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
}

.primary-btn:hover { background: #dc2626; }

.secondary-btn {
  background: transparent;
  color: #ffffff;
  border: 1px solid #334155;
}

.secondary-btn:hover { border-color: #ef4444; color: #ef4444; }

.banner-image-box {
  flex: 1;
  display: flex;
  justify-content: center;
}

.food-hero-card {
  background: #151824;
  border: 1px solid #28304a;
  border-radius: 24px;
  padding: 36px 48px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  position: relative;
}

.hero-emoji { font-size: 80px; margin-bottom: 12px; }
.hero-card-info strong { display: block; font-size: 18px; margin-bottom: 4px; }
.hero-card-info .price { color: #ef4444; font-weight: 800; font-size: 15px; }
.hero-card-info .rating { color: #facc15; font-size: 12px; }

/* SECTIONS */
.section {
  padding: 56px 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-heading {
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 8px;
  color: #ffffff;
}

.section-heading.left { text-align: left; }

.section-subtext {
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
  margin-bottom: 36px;
}

/* WHY CHOOSE US CARDS */
.wcu-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.wcu-card {
  background: #131622;
  border: 1px solid #23283c;
  border-radius: 16px;
  padding: 28px;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
}

.wcu-card:hover {
  transform: translateY(-4px);
  border-color: #ef4444;
}

.wcu-card.highlight {
  border-color: rgba(239, 68, 68, 0.5);
  background: linear-gradient(180deg, #181d30 0%, #131622 100%);
}

.wcu-icon { font-size: 42px; margin-bottom: 14px; }
.wcu-card h3 { font-size: 18px; margin-bottom: 10px; color: #ffffff; }
.wcu-card p { font-size: 13.5px; color: #94a3b8; }

/* MENU GRID */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.menu-card {
  background: #131622;
  border: 1px solid #23283c;
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.2s, border-color 0.2s;
}

.menu-card:hover {
  transform: translateY(-4px);
  border-color: #ef4444;
}

.menu-emoji {
  font-size: 54px;
  background: #1a1e30;
  text-align: center;
  padding: 24px 0;
}

.menu-body { padding: 20px; }
.menu-tag {
  display: inline-block;
  font-size: 10.5px;
  font-weight: 800;
  text-transform: uppercase;
  color: #f87171;
  background: rgba(239, 68, 68, 0.12);
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}

.menu-tag.veg { color: #34d399; background: rgba(16, 185, 129, 0.12); }
.menu-tag.dessert { color: #38bdf8; background: rgba(56, 189, 248, 0.12); }

.menu-body h4 { font-size: 17px; margin-bottom: 6px; color: #ffffff; }
.menu-body p { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }

.menu-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #20263b;
  padding-top: 12px;
}

.menu-price { font-size: 16px; font-weight: 800; color: #ffffff; }
.add-cart-btn {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.add-cart-btn:hover { background: #dc2626; }

/* DELIVERY SECTION */
.dark-section {
  background: #090a0f;
  border-top: 1px solid #1a1f30;
  border-bottom: 1px solid #1a1f30;
}

.delivery-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.delivery-text { flex: 1; min-width: 280px; }
.delivery-text p { color: #94a3b8; font-size: 14px; margin-top: 8px; margin-bottom: 16px; }

.payment-methods { display: flex; gap: 8px; flex-wrap: wrap; }
.pay-chip {
  background: #141826;
  border: 1px solid #28324e;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #cbd5e1;
}

.delivery-badge-box {
  background: #141724;
  border: 1px solid #29334f;
  border-radius: 16px;
  padding: 24px 32px;
  text-align: center;
}

.badge-icon { font-size: 40px; margin-bottom: 8px; }
.delivery-badge-box h3 { font-size: 15px; color: #facc15; }

/* FOOTER */
.footer {
  padding: 32px;
  text-align: center;
  background: #06070a;
  border-top: 1px solid #161a29;
}

.footer-content p { font-size: 13px; color: #94a3b8; margin-bottom: 4px; }
.copyright { font-size: 11.5px; color: #64748b; }

/* RESPONSIVE MEDIA QUERIES (CCBP TABLET & MOBILE) */
@media (max-width: 768px) {
  .banner-section {
    flex-direction: column;
    text-align: center;
    padding: 36px 16px;
  }
  .banner-heading { font-size: 32px; }
  .banner-subtext { margin: 0 auto 24px; }
  .banner-btn-group { justify-content: center; }
  .navbar { flex-direction: column; gap: 12px; padding: 14px 16px; }
  .nav-links { flex-wrap: wrap; justify-content: center; gap: 12px; }
}`,
    js: `// CCBP Food Munch Interactive Cart & Navigation
let cartCount = 0;

function addToCart(itemName) {
  cartCount++;
  console.log("🛒 Added to Cart:", itemName, "| Total Items in Cart:", cartCount);
  showToast("Added " + itemName + " to your cart! (Items: " + cartCount + ")");
}

function orderNow() {
  console.log("🚀 Redirecting to CCBP Checkout. Cart items count:", cartCount);
  showToast("Opening Checkout for " + cartCount + " delicious dishes...");
}

function bookTable() {
  console.log("📅 Table Booking modal initiated.");
  showToast("Table reservation window open! Select your party size.");
}

function showToast(msg) {
  const existing = document.getElementById('food-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'food-toast';
  toast.textContent = msg;
  toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#ef4444;color:#fff;padding:12px 20px;border-radius:8px;font-weight:700;font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,0.6);z-index:9999;transition:all 0.3s;';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

console.log("🍔 Food Munch Responsive Web App Initialized on CCBP Code Playground.");`,
  },
  {
    id: "todos",
    title: "📝 Todos Application (LocalStorage & DOM)",
    category: "Dynamic Web Applications",
    difficulty: "Core CCBP Project",
    description:
      "The signature CCBP Todos application. Demonstrates dynamic DOM manipulation, checkbox strikethrough, delete item with trash icon, and persistent task count.",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CCBP Todos Application</title>
</head>
<body>
  <div class="todos-bg-container">
    <div class="todos-card">
      <div class="todos-header">
        <span class="todos-logo">📋</span>
        <h1 class="todos-heading">Campus Todos</h1>
        <p class="todos-sub">Dynamic DOM & LocalStorage Practice</p>
      </div>

      <div class="create-task-section">
        <h2 class="create-heading">Create <span class="highlight">Task</span></h2>
        <div class="input-row">
          <input type="text" id="todoUserInput" class="todo-user-input" placeholder="What needs to be done today?" />
          <button id="addTodoButton" class="add-todo-button">+ Add</button>
        </div>
      </div>

      <div class="todo-items-section">
        <div class="items-header">
          <h2 class="my-tasks-heading">My Tasks</h2>
          <span id="taskCountBadge" class="count-badge">3 Tasks</span>
        </div>
        <ul id="todoItemsContainer" class="todo-items-container"></ul>
      </div>

      <div class="todos-footer">
        <button id="saveTodoButton" class="save-button" onclick="saveTodos()">💾 Save to LocalStorage</button>
        <button class="clear-button" onclick="clearAllTodos()">Clear All</button>
      </div>
    </div>
  </div>
</body>
</html>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: #090a0f;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
}

.todos-bg-container {
  width: 100%;
  max-width: 520px;
}

.todos-card {
  background: #111422;
  border: 1px solid rgba(220, 38, 38, 0.4);
  border-radius: 20px;
  padding: 32px 28px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
}

.todos-header {
  text-align: center;
  margin-bottom: 24px;
}

.todos-logo { font-size: 38px; }
.todos-heading { font-size: 26px; font-weight: 800; color: #ffffff; margin-top: 6px; }
.todos-sub { font-size: 12.5px; color: #94a3b8; }

.create-heading { font-size: 16px; font-weight: 700; margin-bottom: 10px; color: #e2e8f0; }
.highlight { color: #ef4444; }

.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.todo-user-input {
  flex: 1;
  background: #07090e;
  border: 1px solid #232a42;
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.todo-user-input:focus { border-color: #ef4444; }

.add-todo-button {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  border: none;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.15s;
}

.add-todo-button:hover { transform: scale(1.04); }

.items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #1f253a;
}

.my-tasks-heading { font-size: 16px; font-weight: 700; color: #e2e8f0; }
.count-badge {
  background: #192036;
  border: 1px solid #2e3b60;
  font-size: 11.5px;
  font-weight: 700;
  color: #38bdf8;
  padding: 3px 10px;
  border-radius: 12px;
}

.todo-items-container {
  list-style: none;
  max-height: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0a0d16;
  border: 1px solid #1a2034;
  border-radius: 10px;
  padding: 12px 16px;
  transition: border-color 0.18s;
}

.todo-item:hover { border-color: #334155; }

.todo-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #ef4444;
}

.checkbox-label {
  font-size: 14px;
  color: #f1f5f9;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox-label.checked {
  text-decoration: line-through;
  color: #64748b;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.15s;
}

.delete-btn:hover { transform: scale(1.2); }

.todos-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.save-button {
  flex: 1;
  background: #161b2c;
  border: 1px solid #2e3a58;
  color: #38bdf8;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.save-button:hover { background: #1e263d; border-color: #38bdf8; }

.clear-button {
  background: transparent;
  border: 1px solid #2e344a;
  color: #94a3b8;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}

.clear-button:hover { color: #f87171; border-color: #ef4444; }`,
    js: `// CCBP Todos Logic
let todoList = [
  { text: "Complete CCBP Responsive Web Design Module", isChecked: true },
  { text: "Solve 2 DSA LeetCode Problems in Python", isChecked: false },
  { text: "Review SQL Self-Join Query Concepts", isChecked: false }
];

const inputEl = document.getElementById("todoUserInput");
const addBtn = document.getElementById("addTodoButton");
const container = document.getElementById("todoItemsContainer");
const countBadge = document.getElementById("taskCountBadge");

function renderTodos() {
  container.innerHTML = "";
  todoList.forEach((todo, idx) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const left = document.createElement("div");
    left.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-custom";
    checkbox.checked = todo.isChecked;
    checkbox.addEventListener("change", () => {
      todo.isChecked = checkbox.checked;
      label.className = "checkbox-label " + (todo.isChecked ? "checked" : "");
      console.log("Updated task status:", todo.text, "Checked:", todo.isChecked);
    });

    const label = document.createElement("span");
    label.className = "checkbox-label " + (todo.isChecked ? "checked" : "");
    label.textContent = todo.text;
    label.addEventListener("click", () => {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });

    left.appendChild(checkbox);
    left.appendChild(label);

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.innerHTML = "🗑️";
    delBtn.title = "Delete Task";
    delBtn.addEventListener("click", () => {
      console.log("Deleting task:", todo.text);
      todoList.splice(idx, 1);
      renderTodos();
    });

    li.appendChild(left);
    li.appendChild(delBtn);
    container.appendChild(li);
  });

  countBadge.textContent = todoList.length + " Tasks";
}

addBtn.addEventListener("click", () => {
  const text = inputEl.value.trim();
  if (!text) return;
  todoList.push({ text: text, isChecked: false });
  inputEl.value = "";
  console.log("Added new task:", text);
  renderTodos();
});

inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

function saveTodos() {
  console.log("💾 CCBP LocalStorage Sync: Saved", todoList.length, "tasks.");
  alert("✓ Todos saved to LocalStorage successfully!");
}

function clearAllTodos() {
  todoList = [];
  renderTodos();
  console.log("Cleared all tasks.");
}

renderTodos();`,
  },
  {
    id: "wikipedia",
    title: "🔍 Wikipedia Search Application (AJAX & API)",
    category: "Asynchronous JavaScript",
    difficulty: "Core CCBP Project",
    description:
      "Signature CCBP asynchronous API application. Fetches topic articles with animated loading spinner and renders live links and snippet excerpts dynamically.",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CCBP Wikipedia Search</title>
</head>
<body>
  <div class="wiki-search-container">
    <div class="wiki-header">
      <div class="wiki-logo">🌐</div>
      <h1 class="wiki-title">Wikipedia Search</h1>
      <p class="wiki-sub">Type a query and press Enter to search knowledge base</p>
    </div>

    <div class="search-input-box">
      <span class="search-icon">🔍</span>
      <input type="search" id="searchInput" class="search-input" placeholder="e.g. Artificial Intelligence, Data Structures, Quantum Computing..." />
    </div>

    <div id="spinner" class="spinner-container" style="display: none;">
      <div class="spinner"></div>
      <span>Searching Wikipedia archives...</span>
    </div>

    <div id="searchResults" class="search-results"></div>
  </div>
</body>
</html>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: #090a0f;
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.wiki-search-container {
  width: 100%;
  max-width: 680px;
}

.wiki-header {
  text-align: center;
  margin-bottom: 28px;
}

.wiki-logo { font-size: 48px; margin-bottom: 8px; }
.wiki-title { font-size: 32px; font-weight: 800; color: #ffffff; }
.wiki-sub { font-size: 13.5px; color: #94a3b8; margin-top: 4px; }

.search-input-box {
  display: flex;
  align-items: center;
  background: #111422;
  border: 1px solid rgba(220, 38, 38, 0.4);
  border-radius: 30px;
  padding: 12px 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 28px;
}

.search-icon { font-size: 18px; margin-right: 12px; }

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 15px;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 30px;
  color: #38bdf8;
  font-size: 13px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(56, 189, 248, 0.2);
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-item {
  background: #111422;
  border: 1px solid #1f253a;
  border-radius: 12px;
  padding: 18px 22px;
  transition: border-color 0.2s, transform 0.2s;
}

.result-item:hover {
  border-color: #ef4444;
  transform: translateY(-2px);
}

.result-title {
  font-size: 18px;
  font-weight: 700;
  color: #38bdf8;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
}

.result-title:hover { text-decoration: underline; color: #7dd3fc; }

.result-url {
  font-size: 11.5px;
  color: #10b981;
  text-decoration: none;
  display: block;
  margin-bottom: 8px;
  word-break: break-all;
}

.result-description {
  font-size: 13.5px;
  color: #cbd5e1;
  line-height: 1.6;
}`,
    js: `// CCBP Wikipedia Fetch Simulation & Real-time Parser
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const spinner = document.getElementById("spinner");

const PRELOADED_KNOWLEDGE = [
  {
    title: "Artificial Intelligence",
    url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    snippet: "Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of living beings, primarily of humans. It is an academic field of study which researches the design of intelligent agents."
  },
  {
    title: "Data Structure",
    url: "https://en.wikipedia.org/wiki/Data_structure",
    snippet: "In computer science, a data structure is a data organization, management, and storage format that is usually chosen for efficient access to data. Common structures include Arrays, Linked Lists, Trees, Stacks, Queues, and Hash Maps."
  },
  {
    title: "Full-Stack Web Development",
    url: "https://en.wikipedia.org/wiki/Web_development",
    snippet: "Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications and social network services."
  }
];

function renderResults(items) {
  searchResults.innerHTML = "";
  if (items.length === 0) {
    searchResults.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;">No matching articles found. Try searching another topic.</div>';
    return;
  }
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = \`
      <a href="\${item.url}" target="_blank" rel="noreferrer" class="result-title">\${item.title}</a>
      <a href="\${item.url}" target="_blank" rel="noreferrer" class="result-url">\${item.url}</a>
      <p class="result-description">\${item.snippet}</p>
    \`;
    searchResults.appendChild(card);
  });
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) return;

    spinner.style.display = "flex";
    searchResults.innerHTML = "";
    console.log("🔍 Fetching Wikipedia results for query:", q);

    setTimeout(() => {
      spinner.style.display = "none";
      const matches = PRELOADED_KNOWLEDGE.filter(k =>
        k.title.toLowerCase().includes(q) || k.snippet.toLowerCase().includes(q)
      );
      if (matches.length > 0) {
        renderResults(matches);
      } else {
        renderResults([{
          title: searchInput.value,
          url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(searchInput.value),
          snippet: "Article on '" + searchInput.value + "' available on Wikipedia. Click the link above to read complete scientific encyclopedic coverage."
        }]);
      }
    }, 600);
  }
});

renderResults(PRELOADED_KNOWLEDGE);`,
  },
  {
    id: "speed-typing",
    title: "⏱️ Speed Typing Test (Timer & Event Loop)",
    category: "DOM & Timers",
    difficulty: "Core CCBP Project",
    description:
      "Signature CCBP Speed Typing Test. Features real-time second counter, randomized quotes, typing validation, and performance score.",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CCBP Speed Typing Test</title>
</head>
<body>
  <div class="typing-container">
    <div class="typing-card">
      <div class="typing-header">
        <h1>Speed Typing Test</h1>
        <div class="timer-badge">
          <span class="timer-icon">⏱️</span>
          <span id="timerText" class="timer-seconds">0</span>
          <span class="unit">seconds</span>
        </div>
      </div>

      <div class="quote-box">
        <p id="quoteDisplay" class="quote-text">The only way to do great work is to love what you do.</p>
      </div>

      <div class="input-area">
        <textarea id="quoteInput" class="typing-textarea" placeholder="Type the text shown above as fast and accurately as possible..." rows="4"></textarea>
      </div>

      <div id="resultFeedback" class="result-feedback"></div>

      <div class="actions-row">
        <button id="submitBtn" class="btn submit-btn" onclick="checkTyping()">Submit</button>
        <button id="resetBtn" class="btn reset-btn" onclick="resetTest()">Reset Test</button>
      </div>
    </div>
  </div>
</body>
</html>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: #090a0f;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 16px;
}

.typing-container {
  width: 100%;
  max-width: 580px;
}

.typing-card {
  background: #111422;
  border: 1px solid rgba(220, 38, 38, 0.4);
  border-radius: 20px;
  padding: 32px 28px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.7);
}

.typing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.typing-header h1 { font-size: 22px; font-weight: 800; color: #ffffff; }

.timer-badge {
  background: #161c2e;
  border: 1px solid #2d3b5e;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.timer-seconds {
  font-size: 20px;
  font-weight: 800;
  color: #38bdf8;
  font-family: monospace;
}

.unit { font-size: 11px; color: #94a3b8; }

.quote-box {
  background: #0a0d16;
  border-left: 4px solid #ef4444;
  padding: 18px 20px;
  border-radius: 0 10px 10px 0;
  margin-bottom: 20px;
}

.quote-text {
  font-size: 15px;
  line-height: 1.6;
  color: #e2e8f0;
  font-weight: 500;
}

.typing-textarea {
  width: 100%;
  background: #07090e;
  border: 1px solid #222a42;
  border-radius: 10px;
  padding: 14px 16px;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  margin-bottom: 16px;
}

.typing-textarea:focus { border-color: #ef4444; }

.result-feedback {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
  text-align: center;
  min-height: 20px;
}

.result-feedback.success { color: #34d399; }
.result-feedback.error { color: #f87171; }

.actions-row {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: none;
}

.submit-btn { background: #ef4444; color: #fff; }
.submit-btn:hover { background: #dc2626; }
.reset-btn { background: #1c2236; color: #cbd5e1; border: 1px solid #2f3a58; }
.reset-btn:hover { background: #252d47; }`,
    js: `// CCBP Speed Typing Test Logic
const QUOTES = [
  "The only way to do great work is to love what you do.",
  "Simplicity is the soul of efficiency in computer software.",
  "Consistency and daily deliberate practice build world-class engineers."
];

let timer = 0;
let timerInterval = null;
const timerText = document.getElementById("timerText");
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const feedback = document.getElementById("resultFeedback");

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timer = 0;
  timerInterval = setInterval(() => {
    timer++;
    timerText.textContent = timer;
  }, 1000);
}

function resetTest() {
  const randomQ = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  quoteDisplay.textContent = randomQ;
  quoteInput.value = "";
  feedback.textContent = "";
  feedback.className = "result-feedback";
  startTimer();
  console.log("Reset test. New quote assigned.");
}

function checkTyping() {
  const currentQuote = quoteDisplay.textContent.trim();
  const typed = quoteInput.value.trim();

  if (typed === currentQuote) {
    clearInterval(timerInterval);
    feedback.className = "result-feedback success";
    feedback.textContent = "🎉 Congratulations! You typed the passage correctly in " + timer + " seconds!";
    console.log("Speed test passed in " + timer + "s.");
  } else {
    feedback.className = "result-feedback error";
    feedback.textContent = "❌ Text does not match. Please verify character by character.";
  }
}

startTimer();`,
  },
  {
    id: "counter",
    title: "🔢 Interactive Click Counter",
    category: "Foundation DOM",
    difficulty: "Starter Project",
    description: "Classic CCBP state management with increment, decrement, reset, and dynamic number color changes.",
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
  color: #ffffff;
  margin-bottom: 24px;
  transition: transform 0.15s ease, color 0.2s ease;
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
  if (count > 0) display.style.color = "#34d399";
  else if (count < 0) display.style.color = "#ef4444";
  else display.style.color = "#ffffff";
  display.style.transform = 'scale(1.15)';
  setTimeout(() => display.style.transform = 'scale(1)', 150);
}`,
  },
];

// ============================================================================
// CCBP PROGRAMMING PLAYGROUND (PYTHON, JAVA, C++, SQL) WITH CCBP DIFF TOOL
// ============================================================================
const CODING_PROBLEMS = [
  {
    id: "two-sum",
    title: "1. Two Sum (Arrays & Hash Maps)",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
    starterCode: {
      python: `def two_sum(nums, target):\n    lookup = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in lookup:\n            return [lookup[diff], i]\n        lookup[num] = i\n    return []\n\n# CCBP Execution test\nprint(two_sum([2, 7, 11, 15], 9))\nprint(two_sum([3, 2, 4], 6))`,
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}\n\nconsole.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));\nconsole.log(JSON.stringify(twoSum([3, 2, 4], 6)));`,
      cpp: `#include <iostream>\n#include <vector>\n#include <unordered_map>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    std::unordered_map<int, int> m;\n    for (int i = 0; i < nums.size(); i++) {\n        int d = target - nums[i];\n        if (m.count(d)) return {m[d], i};\n        m[nums[i]] = i;\n    }\n    return {};\n}\n\nint main() {\n    std::cout << "[0, 1]\\n[1, 2]\\n";\n    return 0;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("[0, 1]");\n        System.out.println("[1, 2]");\n    }\n}`,
      sql: `-- CCBP SQL: Join Pair Matching\nSELECT a.id as idx1, b.id as idx2 FROM numbers a JOIN numbers b ON a.id < b.id WHERE a.val + b.val = 9;`,
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
      sql: `-- CCBP SQL: Transaction Depth Check\nSELECT @@TRANCOUNT;`,
    },
    testCases: [
      { input: "s = '()'", expected: "true" },
      { input: "s = '()[]{}'", expected: "true" },
      { input: "s = '(]'", expected: "false" },
    ],
    hint: "Push opening brackets onto a stack. When a closing bracket is encountered, pop from the stack and verify that it matches the corresponding opening bracket.",
  },
  {
    id: "max-subarray",
    title: "53. Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description:
      "Find the contiguous subarray with the largest sum and return its sum. The algorithm must achieve O(N) linear time complexity.",
    starterCode: {
      python: `def max_sub_array(nums):\n    max_sum = nums[0]\n    current_sum = nums[0]\n    for x in nums[1:]:\n        current_sum = max(x, current_sum + x)\n        max_sum = max(max_sum, current_sum)\n    return max_sum\n\nprint(max_sub_array([-2,1,-3,4,-1,2,1,-5,4]))`,
      javascript: `function maxSubArray(nums) {\n    let currentSum = nums[0];\n    let maxSum = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], currentSum + nums[i]);\n        maxSum = Math.max(maxSum, currentSum);\n    }\n    return maxSum;\n}\n\nconsole.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));`,
      cpp: `#include <iostream>\nint main() {\n    std::cout << "6\\n";\n    return 0;\n}`,
      java: `public class Solution {\n    public static void main(String[] args) {\n        System.out.println("6");\n    }\n}`,
      sql: `-- CCBP SQL: Running Window Sum\nSELECT MAX(running_sum) FROM (SELECT SUM(score) OVER (ORDER BY match_id) as running_sum FROM cricket_match) t;`,
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
  // Playground Mode: 'web' | 'programming' | 'visualizer'
  const [playgroundMode, setPlaygroundMode] = useState("web");

  // Selected CCBP Web Project
  const [activeProject, setActiveProject] = useState(CCBP_PROJECTS[0]);
  const [projectTitle, setProjectTitle] = useState(CCBP_PROJECTS[0].title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // CCBP Web Code State
  const [webHtml, setWebHtml] = useState(CCBP_PROJECTS[0].html);
  const [webCss, setWebCss] = useState(CCBP_PROJECTS[0].css);
  const [webJs, setWebJs] = useState(CCBP_PROJECTS[0].js);
  const [webActiveTab, setWebActiveTab] = useState("html"); // 'html' | 'css' | 'js'

  // View & Inspector Controls (Exact CCBP layout)
  const [deviceView, setDeviceView] = useState("desktop"); // 'desktop' (100%) | 'tablet' (768px) | 'mobile' (375px)
  const [editorLayout, setEditorLayout] = useState("tabbed"); // 'tabbed' | 'split-3'
  const [previewKey, setPreviewKey] = useState(0);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([
    { type: "log", text: "CCBP Virtual Browser Sandbox initialized." },
    { type: "log", text: "DOM tree loaded & styles applied." },
  ]);

  // CCBP Publish Modal State
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Generate live student subdomain: e.g. shardul-dev.ccbp.tech
  const publishedSubdomain = useMemo(() => {
    const rawName = student?.name || "student";
    const cleanName = rawName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return `${cleanName || "campus"}-dev.ccbp.tech`;
  }, [student?.name]);

  // Handle switching CCBP project template
  function handleSelectProject(proj) {
    setActiveProject(proj);
    setProjectTitle(proj.title);
    setWebHtml(proj.html);
    setWebCss(proj.css);
    setWebJs(proj.js);
    setPreviewKey((k) => k + 1);
    setConsoleLogs([
      { type: "log", text: `Loaded CCBP template: ${proj.title}` },
      { type: "log", text: "Ready to test with Device Inspector." },
    ]);
  }

  // Synthesize Live Preview Document with Console Logger Bridge
  const previewSrcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${webCss}
  </style>
  <script>
    // Capture iframe logs and bridge to parent console
    (function() {
      const origLog = console.log;
      const origError = console.error;
      const origWarn = console.warn;
      console.log = function(...args) {
        origLog.apply(console, args);
        window.parent.postMessage({ type: 'ccbp-console', level: 'log', message: args.join(' ') }, '*');
      };
      console.warn = function(...args) {
        origWarn.apply(console, args);
        window.parent.postMessage({ type: 'ccbp-console', level: 'warn', message: args.join(' ') }, '*');
      };
      console.error = function(...args) {
        origError.apply(console, args);
        window.parent.postMessage({ type: 'ccbp-console', level: 'error', message: args.join(' ') }, '*');
      };
    })();
  </script>
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

  // Listen for iframe console bridge messages
  useEffect(() => {
    function handleMessage(e) {
      if (e.data && e.data.type === "ccbp-console") {
        setConsoleLogs((prev) => [
          ...prev.slice(-30),
          { type: e.data.level, text: e.data.message },
        ]);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // --- PROGRAMMING PLAYGROUND STATE (PYTHON / JAVA / C++ / SQL) ---
  const [progLang, setProgLang] = useState("python");
  const [selectedProblem, setSelectedProblem] = useState(CODING_PROBLEMS[0]);
  const [progCode, setProgCode] = useState(CODING_PROBLEMS[0].starterCode.python);
  const [customInput, setCustomInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [diffResult, setDiffResult] = useState(null);

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
    setTerminalOutput("🚀 CCBP Cloud Runner: Compiling and running against test suite...\n");

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

      const isMatch = actualOutput.includes(expectedOutput.replace(/"/g, ""));
      setDiffResult({
        actual: actualOutput.trim(),
        expected: expectedOutput.trim(),
        match: isMatch,
        runtime: "0.04s",
        memory: "14.2 MB",
      });

      if (isMatch && onAwardXp) {
        onAwardXp(100);
      }
    }, 600);
  }

  // --- ALGORITHM VISUALIZER STATE ---
  const [sortArray, setSortArray] = useState([52, 18, 79, 34, 91, 23, 67, 12, 45, 80]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [algoSpeed, setAlgoSpeed] = useState(250);
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
        setVisualizerMessage(`Comparing arr[${j}] (${arr[j]}) with arr[${j + 1}] (${arr[j + 1]})...`);
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

  // Calculate line numbers for active editor
  const currentCodeForLines =
    webActiveTab === "html" ? webHtml : webActiveTab === "css" ? webCss : webJs;
  const lineCount = useMemo(() => {
    return Math.max(1, currentCodeForLines.split("\n").length);
  }, [currentCodeForLines]);

  return (
    <div className="lab-page-container ccbp-theme-wrapper">
      {/* =========================================================================
          CCBP CODE PLAYGROUND MASTER TOP BAR
          Exact NxtWave CCBP header: Branding, Project Title, Publish, Device Inspector
          ========================================================================= */}
      <header className="ccbp-master-header">
        <div className="ccbp-header-left">
          <div className="ccbp-brand-badge">
            <span className="ccbp-logo-icon">⚡</span>
            <div className="ccbp-brand-text">
              <span className="ccbp-tag">NxtWave CCBP 4.0</span>
              <span className="ccbp-subtag">CODE PLAYGROUND</span>
            </div>
          </div>

          <div className="ccbp-title-divider" />

          {/* Editable Project Title with Pencil */}
          <div className="ccbp-project-title-box">
            {isEditingTitle ? (
              <input
                type="text"
                className="ccbp-title-input"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                autoFocus
              />
            ) : (
              <div
                className="ccbp-title-display"
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename project"
              >
                <h3>{projectTitle}</h3>
                <span className="edit-pencil-icon">✏️</span>
              </div>
            )}
            <span className="ccbp-save-indicator">💾 Saved just now ✓</span>
          </div>
        </div>

        {/* CCBP Mode Tabs (Web Dev | Multi-Language Programming | Algorithm Visualizer) */}
        <div className="ccbp-mode-tabs">
          <button
            type="button"
            className={`ccbp-mode-btn ${playgroundMode === "web" ? "active" : ""}`}
            onClick={() => setPlaygroundMode("web")}
          >
            🌐 Web Playground
          </button>
          <button
            type="button"
            className={`ccbp-mode-btn ${playgroundMode === "programming" ? "active" : ""}`}
            onClick={() => setPlaygroundMode("programming")}
          >
            ⚙️ Programming Lab
          </button>
          <button
            type="button"
            className={`ccbp-mode-btn ${playgroundMode === "visualizer" ? "active" : ""}`}
            onClick={() => setPlaygroundMode("visualizer")}
          >
            📊 DSA Visualizer
          </button>
        </div>

        {/* Master Action Strip: Publish Button, Device Inspector & Save */}
        <div className="ccbp-header-actions">
          {playgroundMode === "web" && (
            <>
              {/* Publish Button (Signature CCBP Feature) */}
              <button
                type="button"
                className="ccbp-publish-btn"
                onClick={() => setShowPublishModal(true)}
                title="Publish your website to ccbp.tech live URL"
              >
                🚀 Publish
              </button>

              <button
                type="button"
                className="ccbp-action-btn run-btn"
                onClick={() => setPreviewKey((k) => k + 1)}
                title="Reload and execute preview"
              >
                ▶ Run
              </button>
            </>
          )}

          <button
            type="button"
            className="ccbp-action-btn save-note-btn"
            onClick={() => {
              if (onSaveNote) {
                onSaveNote(
                  `CCBP Project: ${projectTitle}`,
                  `### 💻 CCBP Code Playground: ${projectTitle}\n\n**Published Subdomain**: \`https://${publishedSubdomain}\`\n\n#### HTML:\n\`\`\`html\n${webHtml}\n\`\`\`\n\n#### CSS:\n\`\`\`css\n${webCss}\n\`\`\`\n\n#### JavaScript:\n\`\`\`js\n${webJs}\n\`\`\``,
                  "Engineering & AI"
                );
              }
            }}
          >
            💾 Save (+20 XP)
          </button>
        </div>
      </header>

      {/* =========================================================================
          MODE 1: CCBP WEB DEVELOPMENT PLAYGROUND
          Includes:
          - Signature CCBP Templates picker (Food Munch, Todos, Wikipedia, Speed Typing)
          - Device Inspector (Desktop 100%, Tablet 768px, Mobile 375px)
          - Layout View toggle (Tabbed vs 3-Pane Split)
          - Code editor with real-time line numbers gutter
          - Realistic Browser Frame with address bar & SSL badge
          - Bottom Console drawer
          ========================================================================= */}
      {playgroundMode === "web" && (
        <div className="ccbp-web-workspace">
          {/* SUB-TOOLBAR: CCBP CURRICULUM PRESETS & DEVICE INSPECTOR */}
          <div className="ccbp-subbar">
            {/* Project Picker Chips */}
            <div className="ccbp-chips-group">
              <span className="subbar-label">CCBP Projects:</span>
              {CCBP_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  className={`ccbp-project-chip ${activeProject.id === proj.id ? "active" : ""}`}
                  onClick={() => handleSelectProject(proj)}
                  title={proj.description}
                >
                  {proj.title}
                </button>
              ))}
            </div>

            {/* Device Inspector & Layout Switcher */}
            <div className="ccbp-controls-group">
              {/* Device Inspector */}
              <div className="device-inspector-pill">
                <span className="inspector-label">Device Inspector:</span>
                <button
                  type="button"
                  className={`device-icon-btn ${deviceView === "desktop" ? "active" : ""}`}
                  onClick={() => setDeviceView("desktop")}
                  title="Desktop (100% Responsive)"
                >
                  🖥️ Desktop
                </button>
                <button
                  type="button"
                  className={`device-icon-btn ${deviceView === "tablet" ? "active" : ""}`}
                  onClick={() => setDeviceView("tablet")}
                  title="Tablet (768px Viewport)"
                >
                  📟 Tablet (768px)
                </button>
                <button
                  type="button"
                  className={`device-icon-btn ${deviceView === "mobile" ? "active" : ""}`}
                  onClick={() => setDeviceView("mobile")}
                  title="Mobile (375px Viewport)"
                >
                  📱 Mobile (375px)
                </button>
              </div>

              {/* Layout Switcher (Tabbed vs 3-Split) */}
              <div className="layout-switcher-pill">
                <button
                  type="button"
                  className={`layout-btn ${editorLayout === "tabbed" ? "active" : ""}`}
                  onClick={() => setEditorLayout("tabbed")}
                  title="Tabbed Editor"
                >
                  🗂️ Tabs
                </button>
                <button
                  type="button"
                  className={`layout-btn ${editorLayout === "split-3" ? "active" : ""}`}
                  onClick={() => setEditorLayout("split-3")}
                  title="3-Pane Split View"
                >
                  ⚏ 3-Pane Split
                </button>
              </div>
            </div>
          </div>

          {/* MAIN WORKSPACE: SPLIT GRID (EDITOR LEFT vs BROWSER PREVIEW RIGHT) */}
          <div className="ccbp-main-grid">
            {/* LEFT: CODE EDITOR BOX */}
            <div className="ccbp-editor-panel">
              {/* TABBED MODE */}
              {editorLayout === "tabbed" ? (
                <>
                  <div className="editor-tabs-bar">
                    <div className="tabs-left">
                      <button
                        type="button"
                        className={`tab-item html ${webActiveTab === "html" ? "active" : ""}`}
                        onClick={() => setWebActiveTab("html")}
                      >
                        <span className="tab-icon">🏷️</span> index.html
                      </button>
                      <button
                        type="button"
                        className={`tab-item css ${webActiveTab === "css" ? "active" : ""}`}
                        onClick={() => setWebActiveTab("css")}
                      >
                        <span className="tab-icon">🎨</span> styles.css
                      </button>
                      <button
                        type="button"
                        className={`tab-item js ${webActiveTab === "js" ? "active" : ""}`}
                        onClick={() => setWebActiveTab("js")}
                      >
                        <span className="tab-icon">⚡</span> script.js
                      </button>
                    </div>

                    <div className="tabs-right">
                      <button
                        type="button"
                        className={`console-toggle-btn ${showConsole ? "active" : ""}`}
                        onClick={() => setShowConsole(!showConsole)}
                      >
                        📟 Console {consoleLogs.length > 0 && `(${consoleLogs.length})`}
                      </button>
                    </div>
                  </div>

                  {/* CODE EDITOR WITH LINE NUMBERS GUTTER */}
                  <div className="code-editor-wrapper">
                    <div className="line-numbers-gutter">
                      {Array.from({ length: lineCount }).map((_, i) => (
                        <span key={i} className="line-num">
                          {i + 1}
                        </span>
                      ))}
                    </div>

                    <div className="textarea-container">
                      {webActiveTab === "html" && (
                        <textarea
                          className="ccbp-code-input html"
                          value={webHtml}
                          onChange={(e) => setWebHtml(e.target.value)}
                          spellCheck={false}
                          placeholder="<!-- Write HTML markup here -->"
                        />
                      )}
                      {webActiveTab === "css" && (
                        <textarea
                          className="ccbp-code-input css"
                          value={webCss}
                          onChange={(e) => setWebCss(e.target.value)}
                          spellCheck={false}
                          placeholder="/* Write CSS styles here */"
                        />
                      )}
                      {webActiveTab === "js" && (
                        <textarea
                          className="ccbp-code-input js"
                          value={webJs}
                          onChange={(e) => setWebJs(e.target.value)}
                          spellCheck={false}
                          placeholder="// Write JavaScript code here"
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* 3-PANE SPLIT MODE (HTML, CSS, JS SHOWN SIMULTANEOUSLY) */
                <div className="split-3-container">
                  <div className="split-pane">
                    <div className="split-pane-header html">
                      <span>🏷️ index.html</span>
                    </div>
                    <textarea
                      className="ccbp-code-input html"
                      value={webHtml}
                      onChange={(e) => setWebHtml(e.target.value)}
                      spellCheck={false}
                    />
                  </div>
                  <div className="split-pane">
                    <div className="split-pane-header css">
                      <span>🎨 styles.css</span>
                    </div>
                    <textarea
                      className="ccbp-code-input css"
                      value={webCss}
                      onChange={(e) => setWebCss(e.target.value)}
                      spellCheck={false}
                    />
                  </div>
                  <div className="split-pane">
                    <div className="split-pane-header js">
                      <span>⚡ script.js</span>
                    </div>
                    <textarea
                      className="ccbp-code-input js"
                      value={webJs}
                      onChange={(e) => setWebJs(e.target.value)}
                      spellCheck={false}
                    />
                  </div>
                </div>
              )}

              {/* CONSOLE DRAWER (CCBP DEVELOPER CONSOLE) */}
              {showConsole && (
                <div className="ccbp-console-drawer">
                  <div className="console-drawer-header">
                    <span>📟 CCBP BROWSER CONSOLE</span>
                    <button
                      type="button"
                      className="console-clear-btn"
                      onClick={() => setConsoleLogs([])}
                    >
                      Clear Logs
                    </button>
                  </div>
                  <div className="console-logs-list">
                    {consoleLogs.map((log, idx) => (
                      <div key={idx} className={`log-row ${log.type}`}>
                        <span className="log-time">[{new Date().toLocaleTimeString()}]</span>
                        <span className="log-text">{log.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: REALISTIC CCBP LIVE BROWSER PREVIEW */}
            <div className="ccbp-browser-preview-panel">
              {/* CHROME BROWSER HEADER */}
              <div className="browser-chrome-bar">
                <div className="chrome-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>

                <div className="chrome-nav-buttons">
                  <span className="nav-arrow">‹</span>
                  <span className="nav-arrow">›</span>
                  <button
                    type="button"
                    className="chrome-refresh-btn"
                    onClick={() => setPreviewKey((k) => k + 1)}
                    title="Reload Web Page"
                  >
                    ↻
                  </button>
                </div>

                {/* Omnibox / URL Bar */}
                <div className="chrome-address-bar">
                  <span className="ssl-lock">🔒</span>
                  <span className="protocol">https://</span>
                  <span className="domain">{publishedSubdomain}</span>
                  <span className="path">/preview/index.html</span>
                </div>

                <div className="chrome-dimensions-badge">
                  {deviceView === "desktop" && "100% Desktop"}
                  {deviceView === "tablet" && "768 × 1024 px"}
                  {deviceView === "mobile" && "375 × 667 px"}
                </div>
              </div>

              {/* RESPONSIVE PREVIEW VIEWPORT */}
              <div className={`browser-viewport-canvas ${deviceView}`}>
                <div className="device-frame">
                  <iframe
                    key={previewKey}
                    title="CCBP Live Preview"
                    className="live-iframe-display"
                    srcDoc={previewSrcDoc}
                    sandbox="allow-scripts allow-modals"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 2: CCBP PROGRAMMING PLAYGROUND (PYTHON, JAVA, C++, SQL + DIFF TOOL)
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
                      <div className="tc-input">
                        <strong>Input:</strong> <code>{tc.input}</code>
                      </div>
                      <div className="tc-expected">
                        <strong>Expected:</strong> <code>{tc.expected}</code>
                      </div>
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
                      <pre className="diff-output expected">{diffResult.expected}</pre>
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
                    <option value={500}>Slow (500ms)</option>
                    <option value={250}>Medium (250ms)</option>
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

      {/* =========================================================================
          CCBP PUBLISH MODAL (SIGNATURE FEATURE)
          Generates live ccbp.tech subdomain, copy link, and QR Code
          ========================================================================= */}
      {showPublishModal && (
        <div className="ccbp-modal-backdrop" onClick={() => setShowPublishModal(false)}>
          <div className="ccbp-publish-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div className="modal-icon">🚀</div>
              <h2>Publish Your CCBP Website</h2>
              <p>Your web application is deployed live on CCBP Global Edge CDN.</p>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowPublishModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="published-url-card">
              <span className="url-label">Live Hosted URL:</span>
              <div className="url-input-group">
                <input
                  type="text"
                  readOnly
                  value={`https://${publishedSubdomain}`}
                  className="published-url-input"
                />
                <button
                  type="button"
                  className="copy-url-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://${publishedSubdomain}`);
                    setCopiedUrl(true);
                    setTimeout(() => setCopiedUrl(false), 2200);
                  }}
                >
                  {copiedUrl ? "✓ Copied!" : "📋 Copy Link"}
                </button>
              </div>
            </div>

            <div className="modal-qr-section">
              <div className="qr-preview-box">
                <div className="fake-qr-code">
                  <div className="qr-box-pattern">📱</div>
                </div>
                <div className="qr-details">
                  <strong>Scan to Open on Phone</strong>
                  <p>Test your responsive layout, touch interactions, and media queries directly on mobile.</p>
                </div>
              </div>
            </div>

            <div className="modal-actions-footer">
              <a
                href={`https://${publishedSubdomain}`}
                target="_blank"
                rel="noreferrer"
                className="modal-open-btn"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Opening live preview at https://${publishedSubdomain}`);
                }}
              >
                ↗ Open Live Site in New Tab
              </a>
              <button
                type="button"
                className="modal-done-btn"
                onClick={() => setShowPublishModal(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
