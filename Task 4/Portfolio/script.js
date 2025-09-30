// Scroll to section function
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Contact Form Submit
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  status.textContent = "Message sent successfully! ✅";
  status.style.color = "#ffd369";
  form.reset();
});
