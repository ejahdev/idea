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

function hidePopup() {
    const popupElement = document.getElementById('popup');
    popupElement.style.display = 'none';
    document.getElementById('popup-text').textContent = '';
    document.getElementById('popup-text').style.opacity = '0';
    popupElement.classList.remove('slide-in-left', 'slide-in-right'); // Remove animation classes
}
