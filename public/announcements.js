document.addEventListener("DOMContentLoaded", () => {
    const newsFeed = document.getElementById('news-feed');

    // Sample News Data (You can change these!)
    const announcementData = [
        {
            title: "Season 1 is Officially LIVE!",
            date: "APRIL 30, 2026",
            content: "Welcome to Bottle Pixel Lifesteal SMP. The server is now open for everyone. Join now and start your journey!",
            isFeatured: true
        },
        {
            title: "New Web Dashboard Launched",
            date: "APRIL 28, 2026",
            content: "You can now check server info, contact the owner, and view your account directly from this website.",
            isFeatured: false
        },
        {
            title: "Anti-Cheat Update",
            date: "APRIL 25, 2026",
            content: "We have improved our anti-cheat system to ensure a fair experience for all players.",
            isFeatured: false
        }
    ];

    // Clear loading text
    newsFeed.innerHTML = '';

    // Inject News Cards
    announcementData.forEach((news, index) => {
        const card = document.createElement('div');
        card.className = `news-card ${news.isFeatured ? 'featured' : ''} fade-in`;
        card.style.animationDelay = `${index * 0.15}s`;

        card.innerHTML = `
            <span class="news-date">${news.date}</span>
            <h3>${news.title}</h3>
            <p>${news.content}</p>
        `;

        newsFeed.appendChild(card);
    });
});