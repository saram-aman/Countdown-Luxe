const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timerDisplay");
const targetTimeInput = document.getElementById("targetTime");
let countdownInterval;

function setCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    targetTimeInput.value = `${hours}:${minutes}`;
}

window.onload = setCurrentTime;

startBtn.addEventListener("click", function() {
    const targetTimeInputValue = targetTimeInput.value;

    if (!targetTimeInputValue) {
        alert("Please set a valid time.");
        return;
    }

    const now = new Date();
    const targetTime = new Date();

    const [hours, minutes] = targetTimeInputValue.split(":");
    targetTime.setHours(hours, minutes, 0, 0);

    if (targetTime < now) {
        alert("The target time is in the past! Please choose a future time.");
        return;
    }

    clearInterval(countdownInterval);

    countdownInterval = setInterval(function() {
        const currentTime = new Date();
        const remainingTime = targetTime - currentTime;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "Time's up!";
        } else {
            updateTimerDisplay(remainingTime);
        }
    }, 1000);
});

function updateTimerDisplay(remainingTime) {
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
