const countdownMessage = document.getElementById('countdown-message');
const cloudLeft = document.getElementById('cloud-left');
const cloudRight = document.getElementById('cloud-right');
const clock = document.getElementById('clock');

const numRows = 10;
const numCols = 10;

const cellWidth = window.innerWidth / numCols;
const cellHeight = window.innerHeight / numRows;

// JavaScript to create and remove leaves dynamically
const Container = document.querySelector('.container');

let messageShown = false;
let finalMessageTimeout;
let leafSpawnInterval;

// Initially hide the clock
hideClock();

function showMessage(message, duration) {
    if (countdownMessage.innerHTML !== message) {
        // Wrap specific words in spans with different colors
        message = message.replace(/\b(10|9|8|7|6|5|4|3|2|1) seconds\b/g, '<span style="color: red;">$1</span> seconds');
        message = message.replace(/\b(20|19|18|17|16|15|14|13|12|11) seconds\b/g, '<span style="color: orange;">$1</span> seconds');
        message = message.replace('CHEERS', '<span style="color: green;">CHEERS</span>');
        countdownMessage.innerHTML = message;
        countdownMessage.style.display = 'block';
    }

    if (message === '5 minutes till the 20!') {
        countdownMessage.style.animation = 'bounce 0.5s ease-in-out infinite';
        showClock();
    }

    if (finalMessageTimeout) {
        clearTimeout(finalMessageTimeout);
    }

    finalMessageTimeout = setTimeout(() => {
        if (message === 'CHEERS HAPPY 20!!') {
            countdownMessage.style.animation = 'zoomInOut 2s ease-in-out infinite';
            //showClouds();
            //showLeaves();
            setTimeout(() => {
                hideFinalElements();
            }, 60000); // Hide the final elements one minute after the final message
        }
    }, duration);
}

function hideFinalElements() {
    // Smoothly hide the countdown message, clouds, leaves, and individual leaves
    const elementsToHide = document.querySelectorAll('#final-countdown-message, .cloud, .leaf, .leaves, .final-message, .container, .clock, #countdown-message');
    elementsToHide.forEach((element) => {
        element.classList.add('fade-out'); // Add the fade-out class
    });

    setTimeout(() => {
        // Hide the elements and remove them from the DOM
        elementsToHide.forEach((element) => {
            element.style.display = 'none';
            element.classList.remove('fade-out'); // Remove the fade-out class
        });
    }, 2000); // Adjust the duration to match the transition duration
}

function showClock() {
    clock.style.display = 'block';
    updateClock();
}

function hideClock() {
    clock.style.display = 'none';
}

    // Your code for updating the clock goes here
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

    // Use JavaScript to move the clouds randomly
    moveCloudLeftRandomly(cloudLeft);
    moveCloudRightRandomly(cloudRight);
}

function moveCloudLeftRandomly(cloud) {
    const randomPercentage = 5 + Math.random() * 25; // Adjust the range as needed
    cloud.style.animation = `moveCloudLeft ${randomPercentage}s linear, slideBackAndForth 3s linear infinite`;
}

function moveCloudRightRandomly(cloud) {
    const randomPercentage = 5 + Math.random() * 25; // Adjust the range as needed
    cloud.style.animation = `moveCloudRight ${randomPercentage}s linear, slideBackAndForth 3s linear infinite`;
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
        countdownMessage.opacity = 0;
        setTimeout(() => {
            countdownMessage.style.display = 'none';
            countdownMessage.style.animation = 'none';
        }, 1000); // Adjust the duration to match the transition duration
    }
}

function showLeaves() {
    Container.style.display = 'block';
    setInterval(createLeaf, 7000); // Add a new leaf every 7 seconds (adjust as needed)
}

function hideLeaves() {
    Container.style.display = 'none';
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
                hideClock();
            }
        }, 60000);
    } else if (minutes === 18 && !messageShown) {
        showClock();
        if (seconds === 0) {
            const remainingSeconds = 60;
            showMessage(`1 m ${remainingSeconds} s until the 20!`, 1000);
        } else {
            const remainingSeconds = 60 - seconds;
            showMessage(`1 m ${remainingSeconds} s until the 20!`, 1000);
        }

    } else if (minutes === 19 && !messageShown) {
        if (seconds === 0) {
            const remainingSeconds = 60;
            showMessage(`${remainingSeconds} seconds until the 20!`, 1000);

        } else {
            const remainingSeconds = 60 - seconds;
            showMessage(`${remainingSeconds} seconds until the 20!`, 1000);
        
        }
    } else if (minutes === 20 && !messageShown) {
        countdownMessage.style.animation = 'zoomInOut 2s ease-in-out infinite';
        showMessage('CHEERS HAPPY 20!!');
        showClouds();
        showLeaves();
    }  else if (minutes >= 21) {
        // After 5 minutes, hide the final elements
        hideFinalElements();
    }
}

function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');

    // Calculate the initial position at the top of the screen
    const x = Math.random() * window.innerWidth; // Random horizontal position
    const y = 0; // Start at the top of the screen

    // Set the leaf's position
    leaf.style.left = `${x}px`;
    leaf.style.top = `${y}px`;

    document.body.appendChild(leaf); // Append to the body or your desired container

    // Animate the leaf falling
    const fallSpeed = Math.random() * 5 + 2; // Adjust the speed as needed
    const animateLeaf = () => {
        if (y < window.innerHeight) {
            y += fallSpeed;
            leaf.style.top = `${y}px`;
            requestAnimationFrame(animateLeaf);
        } else {
            // Leaf has fallen out of the screen, remove it
            document.body.removeChild(leaf);
        }
    };

    animateLeaf();

    // Optionally, you can remove leaves after a certain time
    setTimeout(() => {
        document.body.removeChild(leaf);
    }, 10000); // Remove leaves after 10 seconds (adjust as needed)
}

// Call createLeaf to spawn leaves
createLeaf(); // Call this function whenever you want to create a new leaf

function startLeafSpawn() {
    leafSpawnInterval = setInterval(createLeaf, 7000); // Add a new leaf every 7 seconds (adjust as needed)
}

function stopLeafSpawn() {
    clearInterval(leafSpawnInterval);
}

// To ensure the message appears at exactly 20 minutes past the hour
// Call updateCountdown every second
setInterval(() => {
    updateCountdown();
    updateClock();
}, 1000);
