// Define initial user state
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//let showAnimalButton = localStorage.getItem('showAnimalButton') === 'true';
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

//TreatmentSummary: Initialize radio button
document.querySelectorAll('input[type=radio]').forEach((radio=>{
    radio.addEventListener('click', function (){
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






//TreatmentSummary: view by user
// הגדרת סוג משתמש: 'patient' או 'doctor'
function setUserType(userType) {
    localStorage.setItem('userType', userType);
    updateViewBasedOnUser();
}

// עדכון העמוד על פי סוג המשתמש
function updateViewBasedOnUser() {
    const userType = localStorage.getItem('userType');
    if (userType === 'patient') {
        // התאמות עבור פציינט
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'block');
        // document.body.style.backgroundColor = 'green'; // צבע רקע מותאם לפציינט
        console.log('User is a patient_in updateViewBasedOnUser function');

    } else if (userType === 'doctor') {
        // התאמות עבור רופא
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'none');
        document.body.style.backgroundColor = 'blue'; // צבע רקע מותאם לרופא
        console.log('User is a doctor_in updateViewBasedOnUser function');
    }
}
// הוספת אירועי לחיצה לקביעת סוג המשתמש
document.addEventListener('DOMContentLoaded', () => {
    const patientButton = document.querySelector('#patientButton');
    const doctorButton = document.querySelector('#doctorButton');
    if (patientButton) {
        console.log('in EventListener PATIENT if');
        patientButton.addEventListener('click', () => setUserType('patient'));
    }
    if (doctorButton) {
        console.log('in EventListener DOCTOR if');
        doctorButton.addEventListener('click', () => setUserType('doctor'));
    }
    // התאמת העמוד בעת טעינה
    updateViewBasedOnUser();
});



//!!בדיקת מעבר ביןמשתמשים בהיסטוריית טיפולים!!:

// function setUserType(userType) {
//     localStorage.setItem('userType', userType); // שמירת סוג המשתמש ב-localStorage
//     updateViewBasedOnUser(); // עדכון התצוגה
// }

// function updateViewBasedOnUser() {
//     const userType = localStorage.getItem('userType'); // שליפת סוג המשתמש
//
//     if (userType === 'patient') {
//         document.body.classList.add('patient'); // הוספת מחלקת עיצוב לפציינט
//         document.body.classList.remove('doctor'); // הסרת מחלקת עיצוב לרופא
//         console.log('User is a patient');
//     } else if (userType === 'doctor') {
//         document.body.classList.add('doctor'); // הוספת מחלקת עיצוב לרופא
//         document.body.classList.remove('patient'); // הסרת מחלקת עיצוב לפציינט
//         console.log('User is a doctor');
//     } else {
//         console.log('No user type set');
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     // הוספת מאזינים לכפתורי הבדיקה
//     const patientButton = document.querySelector('#patientButton');
//     const doctorButton = document.querySelector('#doctorButton');
//
//     if (patientButton) {
//         patientButton.addEventListener('click', () => setUserType('patient'));
//     }
//
//     if (doctorButton) {
//         doctorButton.addEventListener('click', () => setUserType('doctor'));
//     }
//
//     // // עדכון הנראות בעת טעינת העמוד
//     // updateViewBasedOnUser();
// });
//
