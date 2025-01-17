// Define initial user state
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const welcomeMessage = document.querySelector('.welcome');
const menuButton = document.querySelector('.menuButton');
const loginButton = document.querySelector('.loginButton');
const regisButton = document.querySelector('.regisButton');
const animalButtons = document.querySelector('.animalButtons');
const infoButton = document.querySelector('.infoButton');
const logoutButton = document.querySelector('.logoutButton');
let UESER_Type = localStorage.getItem('userType') || 'patient';

class Treatment {
    constructor(clientName, petName, date, type, summary) {
        this.clientName = clientName;
        this.petName = petName;
        this.date = date;
        this.type = type;
        this.summary = summary;
    }
}

const treatments = [];
treatments.push(
    {clientName: 'אוריין שקולניק', petName: 'צלסי', date: '05.5.23', type: 'בדיקה', summary: 'הכל תקין'},
    {
        clientName: 'אוריין שקולניק',
        petName: 'צלסי',
        date: '06.5.23',
        type: 'חיסון',
        summary: 'ניתן חיסון לכלבת ללא תופעות לוואי'
    },)

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
            localStorage.setItem('isLoggedIn', 'true');
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

//Pet registration validation - page 1
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

// Pet registration validation - page 2
document.addEventListener('DOMContentLoaded', () => {
    const Pform = document.querySelector('.RegistrationPetForm');
    const PpetName = Pform.querySelector('input[name="petName"]');
    const Ptype = Pform.querySelector('select[name="type"]');
    const Pgender = Pform.querySelector('select[name="gender"]');
    const photoInput = Pform.querySelector('input[name="photo"]');

    Pform.addEventListener('submit', (event) => {
        event.preventDefault();
        const existingErrors = Pform.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());

        let isValid = true;
        if (!PpetName.value.trim() || Ptype.value === 'unpicked' || Pgender.value === 'unpicked') {
            showError(PpetName, 'חובה למלא שם, סוג ומין.');
            isValid = false;
            return;
        }
        if (PpetName.value.trim().length < 2) {
            showError(PpetName, 'שם חייב להכיל 2 תווים ומעלה.');
            isValid = false;
        }
        if (photoInput.files.length > 0 && !photoInput.files[0].type.startsWith('image/')) {
            showError(photoInput, 'יש להעלות קובץ תמונה בלבד.');
            isValid = false;
        }
        if (isValid) {
            localStorage.setItem('isLoggedIn', 'true');
            Pform.submit();
        }
    });
});

//Error message
function showError(input, message) {
    const errorContainer = input.parentElement;
    const existingErrors = errorContainer.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    setTimeout(() => {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        errorContainer.appendChild(error);
    }, 100);
}

//Initialize the home page
document.addEventListener('DOMContentLoaded', () => {
    setupButtons();
    updateHomePage();
});

//Update display of animal-buttons menu
function toggleAnimal() {
    if (animalButtons.style.display === 'flex') {
        animalButtons.style.display = 'none';
    } else {
        animalButtons.style.display = 'flex';
    }
}

//Update page view according to user type:
function updateViewBasedOnUser() {
    if (UESER_Type === 'patient') {
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'block');
    } else if (UESER_Type === 'doctor') {
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'none');
    }
}

//Initialize display according to user
updateViewBasedOnUser();

//Set view by user type:
function setUserType(userType) {
    UESER_Type = userType;
    localStorage.setItem('userType', userType);
    updateViewBasedOnUser();
}

// EventListener for doctor/patient button actions:
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

//Add treatment to table by doctor:
document.addEventListener('DOMContentLoaded', () => {
    const saveAndSignButton = document.querySelector('.save-button');
    const historyTable = document.querySelector('.history-section table tbody');

    //validate form input :
    function validateForm() {
        const clientName = document.querySelector('#client-name').value.trim();
        const petName = document.querySelector('#pet-name').value.trim();
        const treatmentType = document.querySelector('#treatment-type').value;
        const summary = document.querySelector('#summary').value.trim();

        const errorMessages = [];

        if (!clientName) {
            errorMessages.push('יש להזין את שם הלקוח.');
        }
        if (!petName) {
            errorMessages.push('יש להזין את שם חיית המחמד.');
        }
        if (!treatmentType) {
            errorMessages.push('יש לבחור סוג טיפול.');
        }
        if (!summary) {
            errorMessages.push('יש להזין סיכום טיפול.');
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join('\n'));
            return false;
        }

        return true;
    }

    //add record to table :
    function addRowToHistory(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const clientName = document.querySelector('#client-name').value.trim();
        const petName = document.querySelector('#pet-name').value.trim();
        const treatmentTypeSelect = document.querySelector('#treatment-type');
        const selectedTreatmentType = treatmentTypeSelect.options[treatmentTypeSelect.selectedIndex].text;
        const summary = document.querySelector('#summary').value.trim();

        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('he-IL');

        const newTreatment = new Treatment(clientName, petName, dateString, selectedTreatmentType, summary);
        treatments.push(newTreatment);

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <input type="radio" class="select-row" name="select-treatment">
            </td>
            <td>${dateString}</td>
            <td>${selectedTreatmentType}</td>
        `;

        historyTable.appendChild(newRow);

        alert('הטיפול נשמר ונחתם בהצלחה!');
        document.querySelector('#client-name').value = '';
        document.querySelector('#pet-name').value = '';
        document.querySelector('#treatment-type').selectedIndex = 0;
        document.querySelector('#summary').value = '';
        document.querySelector('#summary').readOnly = none;
    }

    saveAndSignButton.addEventListener('click', addRowToHistory);
});

//Set default view and open treatment summary record
document.addEventListener('DOMContentLoaded', () => {
    const summaryTextarea = document.querySelector('#summary');
    const clientNameInput = document.querySelector('#client-name');
    const petNameInput = document.querySelector('#pet-name');
    const treatmentTypeSelect = document.querySelector('#treatment-type');
    const PclientNameInput = document.querySelector('#p-client-name');
    const PpetNameInput = document.querySelector('#p-pet-name');
    const PtreatmentTypeSelect = document.querySelector('#p-treatment-type');
    const openRecordButton = document.querySelector('.open-record-button');

    //Reset form display to default setting :
    function displayDefaultSummary() {
        if (UESER_Type === 'doctor') {
            summaryTextarea.value = '';
            summaryTextarea.placeholder = 'הכנס סיכום טיפול...';
            clientNameInput.value = '';
            clientNameInput.placeholder = 'הכנס שם לקוח';
            petNameInput.value = '';
            petNameInput.placeholder = 'הכנס שם חיית מחמד';
            treatmentTypeSelect.selectedIndex = 0;
            summaryTextarea.readOnly = false;
        } else if (UESER_Type === 'patient') {
            if (treatments.length > 0) {
                const lastTreatment = treatments[treatments.length - 1];
                summaryTextarea.value = `תאריך: ${lastTreatment.date}\nסוג טיפול: ${lastTreatment.type}\n\n${lastTreatment.summary}`;
                PclientNameInput.value = lastTreatment.clientName;
                PpetNameInput.value = lastTreatment.petName;
            } else {
                summaryTextarea.value = 'אין טיפולים להצגה.';
            }
        }
    }

    //Display chosen record from treatment table
    function openSelectedRecord() {
        const selectedRow = document.querySelector('input[name="select-treatment"]:checked');
        if (!selectedRow) {
            alert('יש לבחור שורה בטבלה כדי לפתוח סיכום טיפול.');
            return;
        }

        const row = selectedRow.closest('tr');
        const date = row.cells[1].textContent.trim();
        const type = row.cells[2].textContent.trim();

        const treatment = treatments.find(t => t.date === date && t.type === type);
        if (!treatment) {
            alert('לא נמצא סיכום לטיפול זה.');
            return;
        }

        clientNameInput.value = treatment.clientName;
        petNameInput.value = treatment.petName;
        treatmentTypeSelect.value = treatment.selectedIndex;
        summaryTextarea.value = `תאריך: ${treatment.date}\nסוג טיפול: ${treatment.type}\n\n${treatment.summary}`;
        summaryTextarea.readOnly = UESER_Type === 'patient';
    }

    openRecordButton.addEventListener('click', openSelectedRecord);

    //Reset user type display :
    const patientButton = document.querySelector('#patientButton');
    const doctorButton = document.querySelector('#doctorButton');
    if (patientButton) {
        patientButton.addEventListener('click', () => {
            setUserType('patient');
            displayDefaultSummary();
        });
    }
    if (doctorButton) {
        doctorButton.addEventListener('click', () => {
            setUserType('doctor');
            displayDefaultSummary();
        });
    }

    displayDefaultSummary();
});
