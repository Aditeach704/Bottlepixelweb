document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    const statusMsg = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const category = document.getElementById('category').value;
        const message = document.getElementById('contactMessage').value;
        const sendBtn = document.getElementById('sendBtn');

        // Change button state
        sendBtn.innerText = "SENDING...";
        sendBtn.style.opacity = "0.7";
        sendBtn.disabled = true;

        // Simulated sending delay
        setTimeout(() => {
            statusMsg.innerText = "✓ Message dispatched to Aditya Ghatak successfully!";
            statusMsg.style.color = "#2ecc71";
            
            // Reset form
            contactForm.reset();
            sendBtn.innerText = "DISPATCH MESSAGE";
            sendBtn.style.opacity = "1";
            sendBtn.disabled = false;
        }, 1500);

        /* 
        PRO TIP: To receive these messages on Discord, use:
        fetch('YOUR_DISCORD_WEBHOOK_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `**New Support Ticket**\nCategory: ${category}\nMessage: ${message}` })
        });
        */
    });
});