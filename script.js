const challenges = [
    { challenge: "تحدي 1: قم بحساب حاصل ضرب 5 * 6.", answer: "30", points: 10 },
    { challenge: "تحدي 2: ما هو أكبر عدد أولي أقل من 20؟", answer: "19", points: 15 },
    { challenge: "تحدي 3: احسب مجموع الأعداد من 1 إلى 10.", answer: "55", points: 20 },
    { challenge: "تحدي 4: ما هو ناتج 12 ÷ 4؟", answer: "3", points: 25 },
    { challenge: "تحدي 5: قم بحساب الجذر التربيعي للعدد 49.", answer: "7", points: 30 }
];

let currentChallengeIndex = 0;
let totalPoints = 0;
let codeKey = "free Palestine";
let finalAnswer = "الخيال";
let teamName = "";
let timerInterval;

function verifyPassword() {
    const password = document.getElementById("password-input").value;
    teamName = document.getElementById("team-name-input").value;

    if (teamName === "") {
        alert("يرجى إدخال اسم الفريق.");
        return;
    }

    if (password === "سر") {
        document.getElementById("password-section").style.display = "none";
        document.getElementById("challenges-section").style.display = "block";
        document.getElementById("progress-bar-container").style.display = "block";  // إظهار شريط التقدم
        loadChallenge();
    } else {
        alert("كلمة السر خاطئة! حاول مرة أخرى.");
    }
}

function loadChallenge() {
    if (currentChallengeIndex < challenges.length) {
        document.getElementById("challenge-container").innerText = challenges[currentChallengeIndex].challenge;
        startTimer();  // بدء المؤقت
        updateProgressBar();  // تحديث شريط التقدم
    } else {
        endChallenges();
    }
}

function submitAnswer() {
    const answer = document.getElementById("answer-input").value;
    if (answer === challenges[currentChallengeIndex].answer) {
        totalPoints += challenges[currentChallengeIndex].points;
        currentChallengeIndex++;
        showNotification("إجابة صحيحة!", "#28a745");
        loadChallenge();
    } else {
        showNotification("إجابة خاطئة، حاول مرة أخرى.", "#dc3545");
    }
}

function submitFinalAnswer() {
    const finalAnswerInput = document.getElementById("final-answer-input").value;
    if (finalAnswerInput === finalAnswer) {
        totalPoints += 50;
        document.getElementById("final-section").style.display = "none";
        document.getElementById("result-section").style.display = "block";
        document.getElementById("final-message").innerText = `تهانينا ${teamName}! لقد أكملت جميع التحديات. النقاط النهائية: ${totalPoints}`;

        // إظهار مشغل الصوت
        document.getElementById("audio-player").style.display = "block";
    } else {
        showNotification("إجابة خاطئة!", "#dc3545");
    }
}

function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = 30;  // 30 ثانية لكل تحدي
    timerInterval = setInterval(() => {
        document.getElementById("timer").innerText = `الوقت المتبقي: ${timeLeft} ثانية`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("انتهى الوقت! حاول مرة أخرى.");
            loadChallenge();
        }
        timeLeft--;
    }, 1000);
}

function updateProgressBar() {
    const progressPercentage = (currentChallengeIndex / challenges.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${progressPercentage}%`;
    document.getElementById("progress-text").innerText = `${currentChallengeIndex} من ${challenges.length} تحديات مكتملة`;
}

function showNotification(message, color) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");
    
    notificationMessage.innerText = message;
    notification.style.backgroundColor = color;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function endChallenges() {
    clearInterval(timerInterval);
    document.getElementById("challenges-section").style.display = "none";
    document.getElementById("final-section").style.display = "block";
    document.getElementById("code-key").innerText = codeKey;
}
