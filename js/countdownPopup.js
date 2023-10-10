// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const clockElement = document.getElementById('clock');
    clockElement.textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
}

// Call updateClock() every second
setInterval(updateClock, 1000);


// Function to update the countdown and handle the popup
function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    console.log(`Minutes: ${minutes}, Seconds: ${seconds}`); // Log the current time

    if (minutes === 15 && seconds === 0) {
        console.log('Calling showPopup()'); // Log when showPopup() is called
        showPopup(); // Call the function to show the popup
    } else if (minutes === 16 && seconds === 0) {
        console.log('Calling hidePopup()'); // Log when hidePopup() is called
        hidePopup(); // Call the function to hide the popup
    } else {
        hideCountdown();
    }
}



// Function to show the popup
function showPopup() {
    try {
        console.log('showPopup() called');
        const popupElement = document.getElementById('popup');

        if (!popupElement) {
            throw new Error('Popup element not found');
        }

        popupElement.style.display = 'block';

        // Determine the direction of the cloud animation (left or right)
        const direction = Math.random() < 0.5 ? 'slide-in-left' : 'slide-in-right';
        popupElement.classList.add(direction);

        setTimeout(function () {
            const popupTextElement = document.getElementById('popup-text');
            if (!popupTextElement) {
                throw new Error('Popup text element not found');
            }

            popupTextElement.textContent = '5 Minutes till the 20!!';
        }, 500); // Delay showing text for half a second

        setTimeout(function () {
            const popupTextElement = document.getElementById('popup-text');
            if (!popupTextElement) {
                throw new Error('Popup text element not found');
            }

            popupTextElement.style.opacity = '1';
        }, 1000); // Show text after 1 second

        // Hide the popup after 1 minute (60000 milliseconds)
        setTimeout(function () {
            hidePopup();
        }, 60000);
    } catch (error) {
        console.error('Error in showPopup():', error);
    }
}

// Function to hide the popup
function hidePopup() {
    const popupElement = document.getElementById('popup');
    const popupTextElement = document.getElementById('popup-text');

    // Add the moveDown animation
    popupElement.style.animation = 'moveDown 5s ease-in-out forwards';

    setTimeout(function () {
        // Hide the popup and reset animation
        popupElement.style.display = 'none';
        popupElement.style.animation = '';
        popupTextElement.textContent = '';
        popupTextElement.style.opacity = '0';
    }, 5000); // Delay for 5 seconds to match the moveDown animation duration
}

// Function to hide the countdown
function hideCountdown() {
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.display = 'none';

    // Check for the countdown and clock again in 1 second
    setTimeout(updateCountdown, 1000);
}

// Initial check for the countdown and clock
updateCountdown();