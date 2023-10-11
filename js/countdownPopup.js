const countdownMessage = document.getElementById('countdown-message');
const cloudLeft = document.getElementById('cloud-left');
const cloudRight = document.getElementById('cloud-right');
const clock = document.getElementById('clock');

let messageShown = false;
let finalMessageTimeout;

function showMessage(message, duration) {
    if (countdownMessage.innerText !== message) {
        countdownMessage.innerText = message;
        countdownMessage.style.display = 'block';
        countdownMessage.style.animation = 'bounce 0.5s ease-in-out infinite';
    }

    if (message === '5 minutes till the 20!') {
        showClock();
    }

    setTimeout(() => {
        if (message === 'CHEERS HAPPY 20!!') {
            messageShown = true;
            hideClouds();
            hideMessage();
            hideClock();
        }
    }, duration);
}

function showClock() {
    clock.style.display = 'block';
    updateClock();
}

function hideClock() {
    clock.style.display = 'none';
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = hours % 12 || 12;

    const timeString = `${twelveHourFormat}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    clock.innerText = timeString;
}

function hideClouds() {
    cloudLeft.style.display = 'none';
    cloudRight.style.display = 'none';
    cloudLeft.style.animation = 'none';
    cloudRight.style.animation = 'none';
}

function hideMessage() {
    if (!messageShown) {
        countdownMessage.style.display = 'none';
        countdownMessage.style.animation = 'none';
    }
}

function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (minutes === 15 && !messageShown) {
        showMessage('5 minutes till the 20!', 60000);
    } else if (minutes === 18 && !messageShown) {
        const remainingSeconds = 120 - (minutes * 60 + seconds);
        showMessage(`${remainingSeconds} seconds until the 20!`, 120000);
        cloudLeft.style.animation = 'moveCloudLeft 10s linear infinite';
        cloudRight.style.animation = 'moveCloudRight 10s linear infinite';
    } else if (minutes === 20 && !messageShown) {
        showMessage('CHEERS HAPPY 20!!', 60000);
    }
}

// To ensure the message appears at exactly 20 minutes past the hour
// Call updateCountdown every second
setInterval(() => {
    updateCountdown();
    updateClock(); // Add this line to update the clock every second
}, 1000);
updateCountdown();
