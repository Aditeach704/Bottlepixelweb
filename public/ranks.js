function handleRank(rank) {
    const toast = document.getElementById('god-toast');
    const isSocial = ['YouTube', 'Insta', 'TikTok', 'X'].includes(rank);
    
    if(isSocial) {
        toast.innerHTML = `OPENING ${rank.toUpperCase()} APPLICATION...`;
        toast.style.background = "linear-gradient(90deg, #ff007a, #bc1888)";
        toast.style.color = "#fff";
    } else {
        toast.innerHTML = `RANK GRANTED: ${rank.toUpperCase()}`;
        toast.style.background = "#00ffaa";
        toast.style.color = "#000";
    }

    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
        if(isSocial) window.open('https://discord.gg/xb8cpVnA', '_blank');
    }, 3000);
}

// God Level Perspective & Mouse Glow
document.querySelectorAll('.rank-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        let centerX = rect.width / 2;
        let centerY = rect.height / 2;
        
        let rotateX = (y - centerY) / 8;
        let rotateY = (centerX - x) / 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        // Dynamic Lighting Spot
        card.querySelector('.card-inner').style.background = `
            radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 80%),
            #0b0e14
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        card.querySelector('.card-inner').style.background = `#0b0e14`;
    });
});