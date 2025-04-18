const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector(".taskbar");

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Kéo lên: hiện navbar
    navbar.style.top = "0";
  } else {
    // Kéo xuống: ẩn navbar
    navbar.style.top = "-100px"; // cao hơn navbar để ẩn hẳn
  }

  prevScrollPos = currentScrollPos;
});
