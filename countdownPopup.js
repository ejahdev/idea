function updateCountdown() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (minutes === 20 && seconds === 0) {
        showPopup(); // Call the function to show the popup
    } else if (minutes === 21 && seconds === 0) {
        hidePopup(); // Call the function to hide the popup
    } else {
        hideCountdown();
    }
}

// Function to show the popup
function showPopup() {
    const popupElement = document.getElementById('popup');
    popupElement.style.opacity = '1'; // Set the opacity to make it visible
}

// Function to hide the popup
function hidePopup() {
    const popupElement = document.getElementById('popup');
    popupElement.style.opacity = '0'; // Set the opacity to make it transparent
}
