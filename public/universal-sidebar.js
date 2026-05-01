/**
 * Bottle Pixel | Universal Sidebar Engine
 */

document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.getElementById('universal-nav');
    if (!navContainer) {
        console.error("Sidebar Error: No element with ID 'universal-nav' found.");
        return;
    }

    // 1. ADMIN CREDENTIALS CHECK
    const ADMIN_U = "Bottle Pixel SMP";
    const ADMIN_P = "bottle@pixel@sharp@52";

    const savedUser = localStorage.getItem('username');
    const savedPass = localStorage.getItem('password');

    const isAdmin = (savedUser === ADMIN_U && savedPass === ADMIN_P);

    // 2. BUILD THE MENU
    let menuHTML = `
        <a href="/announcements.html" class="nav-link" id="link-announcements">📢 Announcements</a>
        <a href="/account.html" class="nav-link" id="link-account">👤 Account</a>
        <a href="https://discord.gg/xb8cpVnA" target="_blank" class="nav-link">💬 Join Our Discord</a>
        <a href="https://www.youtube.com/@SharpPlayz52" target="_blank" class="nav-link">📺 Subscribe YouTube</a>
        <a href="/contact.html" class="nav-link" id="link-contact">📞 Contact Owner</a>
        <a href="/logout.html" class="nav-link" id="link-home">📤Logout</a>
    `;

    // 3. ADD ADMIN OPTIONS IF AUTHORIZED
    if (isAdmin) {
        menuHTML += `
            <div class="admin-divider">ADMIN CONTROL</div>
            <a href="/userdata.html" class="nav-link admin-link" id="link-userdata">📊 User Data</a>
            <a href="/post.html" class="nav-link admin-link" id="link-post">✍️ Post Announcement</a>
        `;
    }

    navContainer.innerHTML = menuHTML;

    // 4. AUTO-HIGHLIGHT THE CURRENT PAGE
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref) {
            link.classList.add('active');
        }
    });
});