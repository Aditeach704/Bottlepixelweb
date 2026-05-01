// =======================
// PROFESSIONAL script.js
// Continue from previous line
// =======================

const ADMIN_USER = "SharpPlayz52";

document.addEventListener("DOMContentLoaded", () => {
    const username =
        localStorage.getItem("bp_username") || "Guest";

    displayUsername(username);

    // Show admin only to owner
    if (username === ADMIN_USER) {
        const adminBtn =
            document.getElementById("adminBtn");

        if (adminBtn) {
            adminBtn.style.display = "inline-block";
        }
    }

    loadSavedAccount();
    loadChatMessages();
    bootLogs();
});

// =======================
// USER DISPLAY
// =======================
function displayUsername(name) {
    const userBox =
        document.getElementById("username-display");

    if (userBox) userBox.textContent = name;
}

// =======================
// LOGIN
// =======================
function loginUser() {
    const input =
        document.getElementById("usernameInput");

    if (!input) return;

    const username = input.value.trim();

    if (!username) {
        alert("Enter Username");
        return;
    }

    localStorage.setItem("bp_username", username);
    location.reload();
}

// =======================
// LOGOUT
// =======================
function logoutUser() {
    localStorage.removeItem("bp_username");
    location.reload();
}

// =======================
// ACCOUNT SAVE
// =======================
function saveAccount() {
    const email =
        document.getElementById("email")?.value || "";

    const phone =
        document.getElementById("phone")?.value || "";

    localStorage.setItem("bp_email", email);
    localStorage.setItem("bp_phone", phone);

    alert("Account Saved");
}

function loadSavedAccount() {
    const email =
        localStorage.getItem("bp_email") || "";

    const phone =
        localStorage.getItem("bp_phone") || "";

    if (document.getElementById("email"))
        document.getElementById("email").value = email;

    if (document.getElementById("phone"))
        document.getElementById("phone").value = phone;
}

// =======================
// BOT PANEL
// =======================
function startBot() {
    addLog("🟢 Bot Started");
}

function stopBot() {
    addLog("🔴 Bot Stopped");
}

function restartBot() {
    addLog("🟡 Bot Restarted");
}

function addLog(text) {
    const log =
        document.getElementById("bot-log");

    if (!log) return;

    const time =
        new Date().toLocaleTimeString();

    log.textContent +=
        `[${time}] ${text}\n`;

    log.scrollTop = log.scrollHeight;
}

function bootLogs() {
    addLog("System Loaded");
    addLog("Server Connected");
    addLog("Website Ready");
}

// =======================
// GLOBAL CHAT
// =======================
function sendMessage() {
    const input =
        document.getElementById("chat-input");

    const chat =
        document.getElementById("chat-window");

    if (!input || !chat) return;

    const msg = input.value.trim();

    if (!msg) return;

    const user =
        localStorage.getItem("bp_username") || "Guest";

    const line =
        document.createElement("div");

    line.className = "chatLine";
    line.innerHTML =
        `<b>${user}:</b> ${msg}`;

    chat.appendChild(line);

    saveMessage(line.innerHTML);

    chat.scrollTop = chat.scrollHeight;
    input.value = "";
}

function saveMessage(msg) {
    let arr =
        JSON.parse(
            localStorage.getItem("bp_chat") || "[]"
        );

    arr.push(msg);

    if (arr.length > 60) arr.shift();

    localStorage.setItem(
        "bp_chat",
        JSON.stringify(arr)
    );
}

function loadChatMessages() {
    const chat =
        document.getElementById("chat-window");

    if (!chat) return;

    let arr =
        JSON.parse(
            localStorage.getItem("bp_chat") || "[]"
        );

    arr.forEach(msg => {
        const div =
            document.createElement("div");

        div.className = "chatLine";
        div.innerHTML = msg;

        chat.appendChild(div);
    });
}

// =======================
// ADMIN OPEN
// =======================
function openAdmin() {
    const user =
        localStorage.getItem("bp_username") || "";

    if (user !== ADMIN_USER) {
        alert("Access Denied");
        return;
    }

    window.location.href = "admin.html";
}

// =======================
// ENTER KEY SUPPORT
// =======================
document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        if (
            document.activeElement?.id ===
            "usernameInput"
        ) loginUser();

        if (
            document.activeElement?.id ===
            "chat-input"
        ) sendMessage();
    }
});