const form = document.getElementById("jobForm");
const emailInput = document.getElementById("email");
const emailMessage = document.getElementById("emailMessage");
const progressBar = document.getElementById("progressBar");
const successMessage = document.getElementById("successMessage");

// Email live validation
emailInput.addEventListener("input", function () {
    let email = this.value;
    if (!email.includes("@") || !email.includes(".")) {
        emailMessage.textContent = "Invalid email format!";
        emailMessage.style.color = "red";
    } else {
        emailMessage.textContent = "Looks good!";
        emailMessage.style.color = "green";
    }
    updateProgress();
});

// Progress bar update
function updateProgress() {
    const inputs = form.querySelectorAll("input, select, textarea");
    let filled = 0;
    inputs.forEach(input => {
        if (input.value.trim() !== "") filled++;
    });
    let percent = (filled / inputs.length) * 100;
    progressBar.style.width = percent + "%";
}

form.addEventListener("input", updateProgress);

// Form submission
form.addEventListener("submit", function (e) {
    e.preventDefault();
    successMessage.style.display = "block";
    form.reset();
    progressBar.style.width = "0%";
    emailMessage.textContent = "";
});
