const countdownMessage = document.getElementById('countdown-message');
const cloudLeft = document.getElementById('cloud-left');
const cloudRight = document.getElementById('cloud-right');
const clock = document.getElementById('clock');

let messageShown = false;
let finalMessageTimeout;

function showMessage(message, duration) {
    if (countdownMessage.innerText !== message) {
        // Only show the message if it's different from the current message
        countdownMessage.innerText = message;
        countdownMessage.style.display = 'block';
        countdownMessage.style.animation = 'bounce 0.5s ease-in-out infinite';
    }

    if (message === '5 minutes till the 20!') {
        showClock(); // Show the clock when the first message appears
    }

    setTimeout(() => {
        if (message === 'CHEERS HAPPY 20!!') {
            messageShown = true; // Mark the message as shown
            finalMessageTimeout = setTimeout(() => {
                hideClouds(); // Hide the clouds 1 minute after the final message
                hideMessage(); // Hide the final message after 1 minute
                stopClockUpdate(); // Stop the clock update
            }, 60000);
        } else {
            countdownMessage.style.display = 'none';
            countdownMessage.style.animation = 'none';
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

function stopClockUpdate() {
    clearInterval(clockUpdateInterval);
}

let clockUpdateInterval;

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = hours % 12 || 12; // Convert to 12-hour format

    const timeString = `${twelveHourFormat}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    clock.innerText = timeString;

    clockUpdateInterval = setTimeout(updateClock, 1000); // Update the clock every second
}

function hideClouds() {
    cloudLeft.style.display = 'none';
    cloudRight.style.display = 'none';
    cloudLeft.style.animation = 'none'; // Stop cloud animation
    cloudRight.style.animation = 'none'; // Stop cloud animation
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
    } else if (minutes === 18 && !messageShown) {
        const remainingMinutes = 20 - minutes - 1; // Adjust for the 2-minute difference
        showMessage(`${remainingMinutes}:${remainingSeconds} until the 20!`, 60000);
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
