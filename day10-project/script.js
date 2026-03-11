let questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
let currentIndex = 0;
let score = 0;
let timerInterval;


function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");


    if (sectionId === "savedPage") {
        renderSaved();
    }
}


function addQuestion() {
    const question = document.getElementById("questionInput").value.trim();
    const optionA = document.getElementById("optionA").value.trim();
    const optionB = document.getElementById("optionB").value.trim();
    const optionC = document.getElementById("optionC").value.trim();
    const optionD = document.getElementById("optionD").value.trim();
    const answer = document.getElementById("answerInput").value.trim().toUpperCase();

    if (question && optionA && optionB && optionC && optionD && answer) {
        questions.push({
            question,
            options: { A: optionA, B: optionB, C: optionC, D: optionD },
            answer
        });
        localStorage.setItem("quizQuestions", JSON.stringify(questions));
        alert("✅ Question Added!");
        showSection('homePage');
    } else {
        alert("❌ Fill all fields!");
    }
}


function startQuiz() {
    if (questions.length === 0) {
        alert("No questions added yet!");
        return;
    }
    currentIndex = 0;
    score = 0;
    showSection('quizPage');
    loadQuestion();
}


function loadQuestion() {
    clearInterval(timerInterval);
    let q = questions[currentIndex];
    document.getElementById("quizQuestion").innerText = q.question;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    for (let key in q.options) {
        let btn = document.createElement("button");
        btn.innerText = `${key}. ${q.options[key]}`;
        btn.onclick = () => checkAnswer(key);
        optionsDiv.appendChild(btn);
    }
    startTimer();
}

// Timer
function startTimer() {
    let timeLeft = 20;
    document.getElementById("timer").innerText = `⏳ Time Left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `⏳ Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            skipQuestion();
        }
    }, 1000);
}

// Check Answer
function checkAnswer(selected) {
    clearInterval(timerInterval);
    if (selected === questions[currentIndex].answer) {
        score++;
        alert("✅ Correct!");
    } else {
        alert("❌ Wrong!");
    }
    document.getElementById("scoreBox").innerText = `Score: ${score}`;
    nextQuestion();
}

// Skip Question
function skipQuestion() {
    clearInterval(timerInterval);
    alert("⏩ Skipped!");
    nextQuestion();
}

// Next Question
function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        alert(`🎉 Quiz Finished! Final Score: ${score}`);
        showSection('homePage');
    }
}


function renderSaved() {
    const savedList = document.getElementById("savedList");
    savedList.innerHTML = "";
    if (questions.length === 0) {
        savedList.innerHTML = "<p>No questions saved yet.</p>";
        return;
    }
    questions.forEach((q, index) => {
        const card = document.createElement("div");
        card.className = "quiz-card";
        card.innerHTML = `
      <h3>${q.question}</h3>
      <p>A. ${q.options.A}</p>
      <p>B. ${q.options.B}</p>
      <p>C. ${q.options.C}</p>
      <p>D. ${q.options.D}</p>
      <p>Answer: ${q.answer}</p>
      <button onclick="deleteQuestion(${index})">🗑 Delete</button>
    `;
        savedList.appendChild(card);
    });
}


function deleteQuestion(index) {
    questions.splice(index, 1);
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
    renderSaved();
}