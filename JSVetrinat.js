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
        if (infoButton) infoButton.style.marginTop = '240px';
        if (logoutButton) logoutButton.style.marginTop = '320px';
    } else {
        if (welcomeMessage) welcomeMessage.style.display = 'none';
        if (menuButton) menuButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';
        if (animalButtons) animalButtons.style.display = 'none';
        if (loginButton) loginButton.style.marginTop = '160px';
        if (regisButton) regisButton.style.marginTop = '240px';
        if (infoButton) infoButton.style.marginTop = '320px';
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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.LogInForm');
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    form.addEventListener('submit', (event) => {
        // Prevent form submission
        event.preventDefault();

        // Reset any existing error messages
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        let isValid = true;

        // Email Validation
        if (!emailInput.value.trim()) {
            showError(emailInput, 'יש להזין כתובת דואר אלקטרוני.');
            isValid = false;
        } else if (!/^[a-zA-Z0-9]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(emailInput.value.trim())) {
            showError(emailInput, 'דואר אלקטרוני לא תקין.');
            isValid = false;
        }

        // Password Validation
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'יש להזין סיסמה.');
            isValid = false;
        } else if (passwordInput.value.trim().length < 6) {
            showError(passwordInput, 'סיסמה לא תקינה.');
            isValid = false;
        }

        // If form is valid, you can proceed with submission
        if (isValid) {
            localStorage.setItem('isLoggedIn', 'true');
            form.submit();
        }
    });

    // Function to show error messages
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '14px';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupButtons();
    updateHomePage();
});

//Initialize radio button
document.querySelectorAll('input[type=radio]').forEach((radio=>{
    radio.addEventListener('click',function (event){
        if (this.dataset.wasChecked === "true"){
            this.checked = false;
            this.dataset.wasChecked = "false";
        } else {
            this.dataset.wasChecked = "true";
        }
    })
}))

function toggleAnimal(){
    if (animalButtons.style.display === 'flex') {
        animalButtons.style.display = 'none';
    } else {
        animalButtons.style.display = 'flex';
    }
}

