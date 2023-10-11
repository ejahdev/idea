const countdownMessage = document.getElementById('countdown-message');
const cloudLeft = document.getElementById('cloud-left');
const cloudRight = document.getElementById('cloud-right');
const clock = document.getElementById('clock');

let messageShown = false;
let finalMessageTimeout;

function showMessage(message, duration) {
    countdownMessage.innerText = message;
    countdownMessage.style.display = 'block';
    countdownMessage.style.animation = 'bounce 0.5s ease-in-out infinite';

    if (message === '5 minutes till the 20!') {
        showClock(); // Show the clock when the first message appears
    }

    setTimeout(() => {
        countdownMessage.style.display = 'none';
        countdownMessage.style.animation = 'none';

        if (message === 'CHEERS HAPPY 20!!') {
            messageShown = true; // Mark the message as shown
            finalMessageTimeout = setTimeout(() => {
                hideClouds(); // Hide the clouds 1 minute after the final message
                hideMessage(); // Hide the final message after 1 minute
            }, 60000);
        }
    }, duration);
}

function showClock() {
    clock.style.display = 'block';
    updateClock(); // Call the function to update the clock
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
    const twelveHourFormat = hours % 12 || 12; // Convert to 12-hour format

    const timeString = `${twelveHourFormat}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    clock.innerText = timeString;

    setTimeout(updateClock, 1000); // Update the clock every second
}

function hideClouds() {
    cloudLeft.style.display = 'none';
    cloudRight.style.display = 'none';
}

function hideMessage() {
    if (!messageShown) {
        // Ensure the final message is hidden only once
        countdownMessage.style.display = 'none';
        countdownMessage.style.animation = 'none';
    }
}

function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const remainingSeconds = 60 - seconds;

    if (minutes === 15 && !messageShown) {
        showMessage('5 minutes till the 20!', 60000);
    } else if (minutes === 19) {
        showMessage(`${remainingSeconds} seconds till the 20`, 60000);
        cloudLeft.style.animation = 'moveCloudLeft 10s linear infinite';
        cloudRight.style.animation = 'moveCloudRight 10s linear infinite';
    } else if (minutes === 20 && !messageShown) {
        showMessage('CHEERS HAPPY 20!!', 60000);
    }
}

// To ensure the message appears at exactly 20 minutes past the hour
// Call updateCountdown every second
setInterval(updateCountdown, 1000);
updateCountdown();
