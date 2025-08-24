// ---------------------------
// Contact Form Submission
// ---------------------------
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  alert("Thank you! Your message has been received.");
});

// ---------------------------
// Background Video Error Handling
// ---------------------------
document.addEventListener("DOMContentLoaded", function() {
  var video = document.getElementById("bg-video");
  if (video) {
    video.onerror = function() {
      console.error("Error loading video");
      // Fallback action if video fails to load
    };
  }
});

// ---------------------------
// Highlight Active Navigation Link
// ---------------------------
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", function() {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// ---------------------------
// Smooth Scroll for Navigation
// ---------------------------
document.querySelectorAll(".nav-links a").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
