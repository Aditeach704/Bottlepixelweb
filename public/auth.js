document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/me");
    const user = await res.json();

    if (!user) {
      window.location.href = "/login.html";
      return;
    }

    const username = document.getElementById("username");
    if (username) username.innerText = user.username;

  } catch (err) {
    window.location.href = "/login.html";
  }
});