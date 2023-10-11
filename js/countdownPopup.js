const countdownMessage = document.getElementById('countdown-message');
const cloudLeft = document.getElementById('cloud-left');
const cloudRight = document.getElementById('cloud-right');

let messageShown = false;
let finalMessageTimeout;

function showMessage(message, duration) {
    countdownMessage.innerText = message;
    countdownMessage.style.display = 'block';
    if (finalMessageTimeout) {
        clearTimeout(finalMessageTimeout);
    }
    finalMessageTimeout = setTimeout(() => {
        countdownMessage.style.display = 'none';
        if (message === 'CHEERS HAPPY 20!!') {
            hideClouds();
        }
    }, duration);
}

function hideClouds() {
    cloudLeft.style.display = 'none';
    cloudRight.style.display = 'none';
}

function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const remainingSeconds = 60 - seconds;

    if (minutes === 15 && !messageShown) {
        showMessage('5 minutes till the 20!', 30000);
        messageShown = true;
    } else if (minutes === 19) {
        showMessage(`${remainingSeconds} seconds till the 20`, 60000);
        cloudLeft.style.animation = 'moveCloudLeft 10s linear infinite';
        cloudRight.style.animation = 'moveCloudRight 10s linear infinite';
    } else if (minutes === 20 && !messageShown) {
        showMessage('CHEERS HAPPY 20!!', 60000);
    }
    cloudLeft.style.animation = 'none';
    cloudRight.style.animation = 'none';
}

setInterval(updateCountdown, 1000);
updateCountdown();
