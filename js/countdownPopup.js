const countdownMessage = document.getElementById('countdown-message');
const cloudLeft = document.getElementById('cloud-left');
const cloudRight = document.getElementById('cloud-right');
const clock = document.getElementById('clock');

let messageShown = false;
let finalMessageTimeout;

function showMessage(message, duration) {
    if (countdownMessage.innerHTML !== message) {
        // Wrap specific words in spans with different colors
        message = message.replace(/\b(10|9|8|7|6|5|4|3|2|1) seconds\b/g, '<span style="color: red;">$1</span> seconds');
        message = message.replace('CHEERS', '<span style="color: green;">CHEERS</span>');
        countdownMessage.innerHTML = message;
        countdownMessage.style.display = 'block';
        countdownMessage.style.animation = 'bounce 0.5s ease-in-out infinite';
    }

    if (message === '5 minutes till the 20!') {
        showClock();
    }

    if (finalMessageTimeout) {
        clearTimeout(finalMessageTimeout);
    }

    finalMessageTimeout = setTimeout(() => {
        if (message === 'CHEERS HAPPY 20!!') {
            //showClouds();
            setTimeout(() => {
                hideFinalElements();
            }, 60000); // Hide the final elements one minute after the final message
        }
    }, duration);
}

function hideFinalElements() {
    // Add logic to hide final elements here
    // For example, hide any final elements you want to hide one minute after the final message
    hideClouds();
    hideMessage();
    hideClock();
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

function showClouds() {
    // Show the clouds by adjusting the opacity
    cloudLeft.style.display = "block";
    cloudRight.style.display = "block";
    cloudLeft.style.opacity = 0.8;
    cloudRight.style.opacity = 0.8;
    cloudLeft.style.animation = 'moveCloudLeft 10s linear, slideBackAndForth 2s linear infinite';
    cloudRight.style.animation = 'moveCloudRight 10s linear, slideBackAndForth 2s linear infinite';
}

function hideClouds() {
    cloudLeft.style.opacity = 0;
    cloudRight.style.opacity = 0;

    setTimeout(() => {
        cloudLeft.style.display = 'none';
        cloudRight.style.display = 'none';
        hideMessage();
    }, 10000); // Adjust the timeout value as needed
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
        showMessage('5 minutes till the 20!');
        setTimeout(() => {
            if (countdownMessage.innerHTML === '5 minutes till the 20!') {
                hideMessage();
            }
        }, 60000);
    } else if (minutes === 19 && !messageShown) {
        if (seconds === 0) {
            const remainingSeconds = 60;
            showMessage(`${remainingSeconds} seconds until the 20!`, 1000);
        } else {
            const remainingSeconds = 60 - seconds;
            showMessage(`${remainingSeconds} seconds until the 20!`, 1000);
        }
    } else if (minutes === 20 && !messageShown) {
        showMessage('CHEERS HAPPY 20!!');
        showClouds();
    }  else if (minutes >= 21) {
        // After 5 minutes, hide the final elements
        hideFinalElements();
    }
}

// To ensure the message appears at exactly 20 minutes past the hour
// Call updateCountdown every second
setInterval(() => {
    updateCountdown();
    updateClock();
}, 1000);
