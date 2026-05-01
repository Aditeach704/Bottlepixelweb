document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById('userList');
    
    // Example Data - In a real app, this comes from a database/Firebase
    const players = [
        { name: "Aditya_Ghatak", status: "Online", rank: "Owner" },
        { name: "Player_Zero", status: "Offline", rank: "Member" },
        { name: "SkyWalker_99", status: "Online", rank: "VIP" }
    ];

    userList.innerHTML = players.map(p => `
        <tr>
            <td>**${p.name}**</td>
            <td><span class="status-pill ${p.status.toLowerCase()}">${p.status}</span></td>
            <td>${p.rank}</td>
            <td><button class="ban-btn" onclick="alert('Action restricted')">BAN</button></td>
        </tr>
    `).join('');
});