const countdownMessage = document.getElementById('countdown-message');
const cloudLeft = document.getElementById('cloud-left');
const cloudRight = document.getElementById('cloud-right');

let messageShown = false;
let finalMessageTimeout;

function showMessage(message, duration) {
    countdownMessage.innerText = message;
    countdownMessage.style.display = 'block';
    countdownMessage.style.animation = 'bounce 0.5s ease-in-out infinite'; // Apply the bounce animation

    setTimeout(() => {
        countdownMessage.style.display = 'none';
        countdownMessage.style.animation = 'none'; // Remove the animation
        if (message === 'CHEERS HAPPY 20!!') {
            hideClouds();
        }
    }, duration);
}

function hideClouds() {
    cloudLeft.style.opacity = 0; // Set opacity to 0 to start the fade-out transition
    cloudRight.style.opacity = 0; // Set opacity to 0 to start the fade-out transition
    setTimeout(() => {
        cloudLeft.style.display = 'none';
        cloudRight.style.display = 'none';
    }, 5000); // Hide clouds after 5 seconds (adjust to match the transition duration)
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
        messageShown = true;
        setTimeout(() => {
            hideClouds();
        }, 60000); // Hide clouds 1 minute after the message appears
    }
}

// To ensure the message appears at exactly 20 minutes past the hour
// Call updateCountdown every second
setInterval(updateCountdown, 1000);
updateCountdown();