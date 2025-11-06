// public/script.js
document.addEventListener("DOMContentLoaded", () => {
  const startSessionBtn = document.getElementById("startSessionBtn");
  const sessionLinkDiv = document.getElementById("sessionLink");
  const videoContainer = document.getElementById("videoContainer");
  const videoPlayer = document.getElementById("videoPlayer");

  // When user is visiting /session/:id page → auto show video player
  if (window.location.pathname.startsWith("/session/")) {
    startSessionBtn.style.display = "none";
    videoContainer.style.display = "block";
    return;
  }

  // When admin clicks "Start Session"
  startSessionBtn.addEventListener("click", async () => {
    const res = await fetch("/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "admin" })
    });

    const data = await res.json();

    if (data.success) {
      videoContainer.style.display = "block";
      sessionLinkDiv.innerHTML = `
        <p> Session Created!</p>
        <p>Share this link with student:</p>
        <a href="${data.userurl}" target="_blank">${data.userurl}</a>
      `;
    }
  });
});
