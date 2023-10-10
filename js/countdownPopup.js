// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const clockElement = document.getElementById('clock');
    clockElement.textContent = `Current Time: ${hours}:${minutes}:${seconds}`;
}

// Function to update the countdown and handle the popup
function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (minutes === 17 && seconds === 0) {
        showPopup(); // Call the function to show the popup
    } else if (minutes === 18 && seconds === 0) {
        hidePopup(); // Call the function to hide the popup
    } else {
        hideCountdown();
    }
}

// Function to show the popup
function showPopup() {
    const popupElement = document.getElementById('popup');
    popupElement.style.display = 'block';

    // Determine the direction of the cloud animation (left or right)
    const direction = Math.random() < 0.5 ? 'slide-in-left' : 'slide-in-right';
    popupElement.classList.add(direction);

    setTimeout(function () {
        document.getElementById('popup-text').textContent = 'Cheers! Happy 20!!';
    }, 500); // Delay showing text for half a second

    setTimeout(function () {
        document.getElementById('popup-text').style.opacity = '1';
    }, 1000); // Show text after 1 second
}

// Function to hide the popup
function hidePopup() {
    const popupElement = document.getElementById('popup');
    popupElement.style.display = 'none';
    document.getElementById('popup-text').textContent = '';
    document.getElementById('popup-text').style.opacity = '0';
    popupElement.classList.remove('slide-in-left', 'slide-in-right'); // Remove animation classes
}

// Function to hide the countdown
function hideCountdown() {
    const countdownElement = document.getElementById('countdown');
    countdownElement.style.display = 'none';

    // Check for the countdown and clock again in 1 second
    setTimeout(updateCountdown, 1000);
    setTimeout(updateClock, 1000);
}

// Initial check for the countdown and clock
updateCountdown();
updateClock();
