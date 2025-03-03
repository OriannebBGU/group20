
// Define initial user state

let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const welcomeMessage = document.querySelector('.welcome');
const menuButton = document.querySelector('.menuButton');
const loginButton = document.querySelector('.loginButton');
const regisButton = document.querySelector('.regisButton');
const animalButtons = document.querySelector('.animalButtons');
const infoButton = document.querySelector('.infoButton');
const logoutButton = document.querySelector('.logoutButton');

// Update the homepage based on login state
function updateHomePage() {

    if (isLoggedIn) {
        if (welcomeMessage) welcomeMessage.style.display = 'block';
        if (regisButton) regisButton.style.display = 'none';
        if (loginButton) loginButton.style.display = 'none';
    } else {
        if (welcomeMessage) welcomeMessage.style.display = 'none';
        if (menuButton) menuButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';
        if (animalButtons) animalButtons.style.display = 'none';
    }
}

// Add button functionality
function setupButtons() {
    // Home button
    const homeButton = document.querySelector('.homeButton');
    if (homeButton) {
        homeButton.onclick = () => {
            //updateHomePage()
            window.location.href = 'homepage.html';
        };
    }

    // Info button
    const infoButton = document.querySelector('.infoButton');
    if (infoButton) {
        infoButton.onclick = () => {
            window.location.href = 'info.html';
        };
    }

    const logoutButton = document.querySelector('.logoutButton');
    if (logoutButton) {
        logoutButton.onclick = () => {
            localStorage.setItem('isLoggedIn', 'false');
            window.location.href = 'homepage.html';
        };
    }

    const loginButton = document.querySelector('.loginButton');
    if (loginButton) {
        loginButton.onclick = () => {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'login.html';
        };
    }

    const regisButton = document.querySelector('.regisButton');
    if (regisButton) {
        regisButton.onclick = () => {
            window.location.href = 'Registration.html';
        };
    }

    // Animal buttons
    const animalButtons = document.querySelectorAll('.animalButtons button');
    animalButtons[0].onclick = () => {
        window.location.href = 'Profile.html';
    };
    animalButtons[1].onclick = () => {
        window.location.href = 'RegistrationPet.html';
    };


    // History button
    const historyButton = document.querySelector('.history');
    if (historyButton) {
        historyButton.onclick = () => {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'treatmentsummary.html';
        };
    }

    // Edit details button
    const editDetailsButton = document.querySelector('.editDetails');
    if (editDetailsButton) {
        editDetailsButton.onclick = () => {
            window.location.href = 'RegistrationPet.html';
        };
    }
}


//Update display of animal-buttons menu
function toggleAnimal() {
    if (animalButtons.style.display === 'flex') {
        animalButtons.style.display = 'none';
    } else {
        animalButtons.style.display = 'flex';
    }
}