// Function to update the countdown and handle the popup
function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (minutes === 18 && seconds === 0) {
        showPopup("Cheers! Happy 20!!!", 60000);
    } else if (minutes === 20 && seconds === 0) {
        showPopup("1 minute till the 20", 60000);
    } else if (minutes === 21 && seconds === 0) {
        showPopup("5 minutes till the 20", 60000);
    } else {
        hideCountdown();
    }
}

// Function to show the popup with dynamic text and duration
function showPopup(text, duration) {
    const popupElement = document.getElementById('popup');
    const popupTextElement = document.getElementById('popup-text');

    // Show the popup with the given text
    popupTextElement.textContent = text;
    popupElement.style.display = 'block';

    // Hide the text and popup after the specified duration
    setTimeout(function () {
        hidePopup();
    }, duration);
}

// Function to hide the popup
function hidePopup() {
    const popupElement = document.getElementById('popup');

    // Hide the popup and reset animation
    popupElement.style.display = 'none';
}

// Function to hide the countdown
function hideCountdown() {
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.display = 'none';

    // Check for the countdown and clock again in 1 second
    setTimeout(updateCountdown, 1000);
}

// Initial check for the countdown
updateCountdown();
