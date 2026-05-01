function publishNews() {
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;
    const featured = document.getElementById('isFeatured').checked;

    if(!title || !content) return alert("Please fill all fields!");

    // Log for testing
    console.log("Publishing:", { title, content, featured, date: new Date().toLocaleDateString() });
    
    alert("Announcement broadcasted successfully!");
    window.location.href = "announcements.html";
}