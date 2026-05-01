let isLogin = true;

// 1. Bubbles Background
const bg = document.getElementById('bubble-bg');
if (bg) {
    for(let i=0; i<15; i++) {
        const b = document.createElement('div');
        b.className = 'bubble';
        b.style.left = Math.random() * 100 + 'vw';
        b.style.animationDuration = (Math.random() * 10 + 10) + 's';
        b.style.animationDelay = Math.random() * 5 + 's';
        bg.appendChild(b);
    }
}

// 2. Toggle UI
function toggleAuth() {
    isLogin = !isLogin;
    document.getElementById('title').innerText = isLogin ? "Welcome" : "Sign Up";
    document.getElementById('btn').innerText = isLogin ? "Login to SMP" : "Register Now";
    document.getElementById('toggleText').innerHTML = isLogin ? 
        `New here? <span onclick="toggleAuth()">Create Account</span>` : 
        `Have an account? <span onclick="toggleAuth()">Login</span>`;
    document.getElementById('status').innerText = "";
}

// 3. Auth Logic (Hybrid: Server + Local Fallback)
document.getElementById('authForm').onsubmit = async (e) => {
    e.preventDefault();
    const status = document.getElementById('status');
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;
    
    status.style.color = "#53bdeb";
    status.innerText = "⏳ Authenticating...";
    
    try {
        // Attempt to connect to your Wrangler/Cloudflare worker
        const res = await fetch(isLogin ? '/api/login' : '/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        
        if (data.success) {
            // Success! Save credentials locally for future offline use
            localStorage.setItem(`user_${username}`, password);
            loginSuccess(username);
        } else {
            status.style.color = "#ff4757";
            status.innerText = "❌ " + data.message;
        }

    } catch (err) {
        // --- WRANGLER OFFLINE / DB DISCONNECTED FALLBACK ---
        console.log("Cloud connection failed. Checking local memory...");

        if (isLogin) {
            // Check if this user exists in the browser's LocalStorage
            const localPass = localStorage.getItem(`user_${username}`);
            
            if (localPass && localPass === password) {
                status.style.color = "#00ff99";
                status.innerText = "✅ Offline Access Granted (Local)";
                loginSuccess(username);
            } else {
                status.style.color = "#ff4757";
                status.innerText = "❌ Offline: User not found on this device.";
            }
        } else {
            // Sign Up while offline: Save to local device only
            localStorage.setItem(`user_${username}`, password);
            status.style.color = "#00ff99";
            status.innerText = "✅ Saved to device! (Local Mode)";
            setTimeout(() => toggleAuth(), 1000);
        }
    }
};

function loginSuccess(user) {
    localStorage.setItem('chatUser', user);
    const status = document.getElementById('status');
    status.style.color = "#00ff99";
    status.innerText = "🚀 Entering SMP...";
    
    // Redirect to the HTML file directly
    setTimeout(() => {
        window.location.href = "/announcements.html";
    }, 1000);
}