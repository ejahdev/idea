// Function to update the countdown and handle the popup
function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    console.log(`Minutes: ${minutes}, Seconds: ${seconds}`); // Log the current time

    if (minutes === 15 && seconds === 0) {
        showPopup('5 minutes till the 20', 60); // Show the first message for 1 minute
    } else if (minutes === 19 && seconds === 0) {
        showPopup('1 minute till the 20', 60); // Show the second message for 1 minute
    } else if (minutes === 20 && seconds === 0) {
        showPopup('Cheers! Happy 20!!!', 60); // Show the final message for 1 minute
    } else {
        hideCountdown();
    }
}

// Function to show the popup with a specific message for a given duration
function showPopup(message, durationInSeconds) {
    try {
        console.log('showPopup() called');
        const popupElement = document.getElementById('popup');

        if (!popupElement) {
            throw new Error('Popup element not found');
        }

        popupElement.style.display = 'block';

        const popupTextElement = document.getElementById('popup-text');
        if (!popupTextElement) {
            throw new Error('Popup text element not found');
        }

        // Hide the clock when the popup appears
        const clockElement = document.getElementById('clock');
        clockElement.style.display = 'none';

        popupTextElement.textContent = message;

        // Determine the direction of the cloud animation (left or right)
        const direction = Math.random() < 0.5 ? 'slide-in-left' : 'slide-in-right';
        popupElement.classList.add(direction);

        setTimeout(function () {
            popupTextElement.style.opacity = '1';
        }, 1000); // Show text after 1 second

        // Hide the text after the specified duration (in milliseconds)
        setTimeout(function () {
            popupTextElement.style.opacity = '0';

            // Show the clock when the popup disappears
            clockElement.style.display = 'block';

            // Hide the cloud popup
            popupElement.style.display = 'none';
        }, durationInSeconds * 1000);
    } catch (error) {
        console.error('Error in showPopup():', error);
    }
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
