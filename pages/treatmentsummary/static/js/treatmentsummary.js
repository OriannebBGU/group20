
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

document.addEventListener('DOMContentLoaded', async () => {
    const petName = "שטות";  // Hardcoded for now, make dynamic later
    const historyTable = document.querySelector('#treatment-history');

    try {
        const response = await fetch(`/get-treatments/${petName}`);
        const treatments = await response.json();

        historyTable.innerHTML = "";  // Clear existing table rows

        treatments.forEach(treatment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="radio" class="select-row" name="select-treatment"></td>
                <td>${new Date(treatment.datetime).toLocaleDateString('he-IL')}</td>
                <td>${treatment.treatment}</td>
            `;
            historyTable.appendChild(row);
        });

    } catch (error) {
        console.error("❌ Error fetching treatments:", error);
    }
});


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
