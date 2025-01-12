// Define initial user state
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let showAnimalButton = localStorage.getItem('showAnimalButton') === 'true';
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
        regisButton.style.display = 'none';
        loginButton.style.display = 'none';
        infoButton.style.marginTop = '240px';
        logoutButton.style.marginTop = '320px';
    } else {
        if (welcomeMessage) welcomeMessage.style.display = 'none';
        menuButton.style.display = 'none';
        logoutButton.style.display = 'none';
        animalButtons.style.display = 'none';
        loginButton.style.marginTop = '160px';
        regisButton.style.marginTop = '240px';
        infoButton.style.marginTop = '320px';
    }

    if (showAnimalButton) {
        animalButtons.style.display = 'flex';
    } else {
        animalButtons.style.display = 'none';
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

    document.addEventListener('DOMContentLoaded', () => {
        if (!menuButton || !animalButtons) {
            console.error('Menu button or button list not found in the DOM.');
            return;
        }

      menuButton.addEventListener('click', () => {
        animalButtons.style.display = animalButtons.style.display === 'none' || animalButtons.style.display === ''
          ? 'block'
          : 'none';
      });
    });

    // Info button
    const infoButton = document.querySelector('.infoButton');
    if (infoButton) {
        infoButton.onclick = () => {
            window.location.href = 'Info.html';
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
            window.location.href = 'LogIn.html';
        };
    }
/*
    const menuButton = document.querySelector('.menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            if (animalButtons.style.display === 'none' || animalButtons.style.display === '') {
                animalButtons.style.display = 'flex';
                localStorage.setItem('showAnimalButton', 'true');
            } else {
                animalButtons.style.display = 'none';
                localStorage.setItem('showAnimalButton', 'false');
            }
        });
    }*/

    const regisButton = document.querySelector('.regisButton');
    if (regisButton) {
        regisButton.onclick = () => {
            window.location.href = 'Registration.html';
        };
    }

    // Animal buttons
    const animalButtons = document.querySelectorAll('.animalButtons button');
    if (animalButtons.length >= 3) {
        animalButtons[0].onclick = () => {
            window.location.href = 'Profile.html';
        };
        animalButtons[1].onclick = () => {
            window.location.href = 'Profile.html';
        };
        animalButtons[2].onclick = () => {
            window.location.href = 'RegistrationPet.html';
        };
    }

    // History button
    const historyButton = document.querySelector('.history');
    if (historyButton) {
        historyButton.onclick = () => {
            window.location.href = 'TreatmentSummmary.html';
        };
    }

    // Edit details button
    const editDetailsButton = document.querySelector('.editDetails');
    if (editDetailsButton) {
        editDetailsButton.onclick = () => {
            window.location.href = 'RegistrationPet.html';
        };
    }

    // Login submit button
    const executeLoginButton = document.querySelector('input[type="submit"][value="התחבר/י"]');
    if (executeLoginButton) {
        executeLoginButton.onclick = (e) => {
            e.preventDefault(); // Prevent form submission
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'homepage.html';
            //updateHomePage(true)
        };
    }

    // Continue registration button
    const continueButton = document.querySelector('input[type="submit"][value="המשך"]');
    if (continueButton) {
        continueButton.onclick = (e) => {
            e.preventDefault(); // Prevent form submission
            window.location.href = 'RegistrationPet.html';
        };
    }

    // Register pet button
    const registerPetButton = document.querySelector('input[type="submit"][value="בצע הרשמה"]');
    if (registerPetButton) {
        registerPetButton.onclick = (e) => {
            e.preventDefault(); // Prevent form submission
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'homepage.html';
        };
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupButtons();
    updateHomePage();
});
