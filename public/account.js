document.addEventListener("DOMContentLoaded", () => {
    const accountForm = document.getElementById('accountForm');
    const msg = document.getElementById('msg');
    
    // Load existing data if available
    const savedName = localStorage.getItem('username');
    if(savedName) {
        document.getElementById('username').value = savedName;
    }

    accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const saveBtn = document.getElementById('saveBtn');
        const newName = document.getElementById('username').value;
        
        saveBtn.innerText = "UPDATING...";
        saveBtn.disabled = true;

        // Simulate a save delay
        setTimeout(() => {
            localStorage.setItem('username', newName);
            
            msg.innerText = "✓ Account details synced with server";
            msg.style.color = "#2ecc71";
            msg.style.marginTop = "15px";
            
            saveBtn.innerText = "SAVE CHANGES";
            saveBtn.disabled = false;
            
            // Auto-refresh sidebar to show new name if needed
            location.reload(); 
        }, 1200);
    });
});