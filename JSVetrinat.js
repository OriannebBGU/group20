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
        // if (infoButton) infoButton.style.marginTop = '240px';
        // if (logoutButton) logoutButton.style.marginTop = '320px';
    } else {
        if (welcomeMessage) welcomeMessage.style.display = 'none';
        if (menuButton) menuButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';
        if (animalButtons) animalButtons.style.display = 'none';
        // if (loginButton) loginButton.style.marginTop = '160px';
        // if (regisButton) regisButton.style.marginTop = '240px';
        // if (infoButton) infoButton.style.marginTop = '320px';
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
}

//Login validation
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

});

// Registration validation - page 1
document.addEventListener('DOMContentLoaded', () => {
    const Rform = document.querySelector('.RegistrationForm');
    const RfirstName = Rform.querySelector('input[name="firstName"]');
    const RlastName = Rform.querySelector('input[name="lastName"]');
    const Remail = Rform.querySelector('input[name="email"]');
    const Rpassword = Rform.querySelector('input[name="password"]');
    const RVpassword = Rform.querySelector('input[name="Vpassword"]');
    const RphoneNumber = Rform.querySelector('input[name="phoneNumber"]');

    Rform.addEventListener('submit', (event) => {
        event.preventDefault();
        const existingErrors = Rform.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        let isValid = true;
        if (!RfirstName.value.trim() || !RlastName.value.trim() || !Remail.value.trim() || !Rpassword.value.trim() || !RVpassword.value.trim() || !RphoneNumber.value.trim()) {
            showError(RfirstName, 'חובה למלא את כל השדות.');
            isValid = false;
            return;
        }
        if (RfirstName.value.trim().length < 2) {
            showError(RfirstName, 'שם פרטי חייב להכיל 2 תווים ומעלה.');
            isValid = false;
        }
        if (RlastName.value.trim().length < 2) {
            showError(RlastName, 'שם משפחה חייב להכיל 2 תווים ומעלה.');
            isValid = false;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(Remail.value.trim())) {
            showError(Remail, 'דואר אלקטרוני לא תקין.');
            isValid = false;
        }
        if (Rpassword.value.length < 6) {
            showError(Rpassword, 'סיסמה חייבת להכיל 6 תווים ומעלה.');
            isValid = false;
        }
        if (Rpassword.value !== RVpassword.value) {
            showError(RVpassword, 'הסיסמה אינה תואמת את הסיסמה שהוזנה.');
            isValid = false;
        }
        if (!/^0[0-9]{8,9}$/.test(RphoneNumber.value.trim()) || (RphoneNumber.length === 10 && !/^0(5|7)/.test(RphoneNumber.value.trim()))) {
            showError(RphoneNumber, 'מספר טלפון לא תקין. יש להזין ספרות בלבד ללא מקפים.');
            isValid = false;
        }
        if (isValid) {
            Rform.submit();
        }
    });

});

// Registration validation - page 2
document.addEventListener('DOMContentLoaded', () => {
    const Pform = document.querySelector('.RegistrationPetForm');
    const PpetName = Pform.querySelector('input[name="petName"]');
    const Ptype = Pform.querySelector('input[name="type"]');
    const Pgender = Pform.querySelector('input[name="gender"]');

    Pform.addEventListener('submit', (event) => {
        event.preventDefault();
        const existingErrors = Pform.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        let isValid = true;
        if (!PpetName.value.trim() || !Ptype.value.trim() || !Pgender.value.trim()) {
            showError(PpetName, 'חובה למלא שם, סוג ומין.');
            isValid = false;
            return;
        }
        if (PpetName.value.trim().length < 2) {
            showError(PpetName, 'שם חייב להכיל 2 תווים ומעלה.');
            isValid = false;
        }
        if (isValid) {
            localStorage.setItem('isLoggedIn', 'true');
            Pform.submit();
        }
    });

});

function showError(input, message) {
    const errorContainer = input.parentElement;
    const existingErrors = errorContainer.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    setTimeout(() => {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        errorContainer.appendChild(error);
    }, 100); // Delay of 500 milliseconds
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupButtons();
    updateHomePage();
});

//TreatmentSummary: Initialize radio button
document.querySelectorAll('input[type=radio]').forEach((radio => {
    radio.addEventListener('click', function () {
        if (this.dataset.wasChecked === "true") {
            this.checked = false;
            this.dataset.wasChecked = "false";
        } else {
            this.dataset.wasChecked = "true";
        }
    })
}))

//משהו שצריך הסבר
function toggleAnimal() {
    if (animalButtons.style.display === 'flex') {
        animalButtons.style.display = 'none';
    } else {
        animalButtons.style.display = 'flex';
    }
}


//TreatmentSummary: view by user:
// set as 'patient' or 'doctor'
function setUserType(userType) {
    localStorage.setItem('userType', userType);
    updateViewBasedOnUser(localStorage.getItem('userType'));
}

// Initialize the page
updateViewBasedOnUser(); //

// update page view according to user
function updateViewBasedOnUser() {
    const userType = localStorage.getItem('userType');
    if (userType === 'patient') {// התאמות עבור פציינט
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'block');
    } else if (userType === 'doctor') {// התאמות עבור רופא
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'none');
    }
}

// EventListener for button actions
document.addEventListener('DOMContentLoaded', () => {
    const patientButton = document.querySelector('#patientButton');
    const doctorButton = document.querySelector('#doctorButton');
    if (patientButton) {
        patientButton.addEventListener('click', () => setUserType('patient'));
    }
    if (doctorButton) {
        doctorButton.addEventListener('click', () => setUserType('doctor'));
    }
});


