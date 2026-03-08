// Scroll-triggered animations
const sections = document.querySelectorAll(".content");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeUp 1.5s forwards";
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => observer.observe(sec));

// Scroll progress bar
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.background = "linear-gradient(90deg, #6f4e37, #d2691e)";
progressBar.style.width = "0%";
progressBar.style.zIndex = "9999";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  let docHeight = document.body.scrollHeight - window.innerHeight;
  let progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});
