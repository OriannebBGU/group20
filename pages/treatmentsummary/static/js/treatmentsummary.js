let USER_TYPE = localStorage.getItem('userType') || 'patient';

document.addEventListener('DOMContentLoaded', async () => {
    // Add event listener to pet selector dropdown
    const petSelector = document.querySelector('#pet-selector');
    if (petSelector) {
        petSelector.addEventListener('change', async () => {
            const selectedPetName = petSelector.value; // ✅ Use petName instead of _id
            await loadTreatmentsForPet(selectedPetName);
            console.log("Dropdown change triggered, checking extra elements...");
            console.log("Current dropdown parent:", petSelector.parentNode);
            console.log("Child elements:", petSelector.parentNode.children);
        });

        // Load treatments for the initially selected pet
        if (petSelector.value) {
            await loadTreatmentsForPet(petSelector.value);
            console.log("Dropdown change triggered, checking extra elements...");
            console.log("Current dropdown parent:", petSelector.parentNode);
            console.log("Child elements:", petSelector.parentNode.children);
        }
    }
});

async function loadTreatmentsForPet(petId) {
    const historyTable = document.querySelector('#treatment-history');
    if (!historyTable) return;

    try {
        const response = await fetch(`/get-treatments/${petId}`);
        const treatments = await response.json();

        historyTable.innerHTML = "";  // Clear existing table rows

        if (treatments.length === 0) {
            // If no treatments, show a message
            const tableContainer = historyTable.closest('table');
            const noTreatmentsMessage = document.createElement('p');
            noTreatmentsMessage.className = 'no-treatments';
            noTreatmentsMessage.textContent = 'אין היסטוריית טיפולים לחיית מחמד זו';

            tableContainer.parentNode.insertBefore(noTreatmentsMessage, tableContainer);
            tableContainer.style.display = 'none';
            document.querySelector('.open-record-button').style.display = 'none';
        } else {
            // Show the table and hide any previous "no treatments" message
            const tableContainer = historyTable.closest('table');
            tableContainer.style.display = 'table';
            document.querySelector('.open-record-button').style.display = 'block';

            const noTreatmentsMessage = document.querySelector('.no-treatments');
            if (noTreatmentsMessage) {
                noTreatmentsMessage.remove();
            }

            // Add treatment rows
            treatments.forEach(treatment => {
                const row = document.createElement('tr');

                // Store the treatment data in data attributes
                row.setAttribute('data-pet-id', treatment.petName || "MISSING");  // ✅ Fix: Use petName
                row.setAttribute('data-datetime', treatment.datetime || "MISSING");

                const treatmentDate = new Date(treatment.datetime);

                row.innerHTML = `
                    <td><input type="radio" class="select-row" name="select-treatment"></td>
                    <td>${treatmentDate.toLocaleDateString('he-IL')}</td>
                    <td>${treatment.treatment}</td>
                `;
                historyTable.appendChild(row);
            });
        }
    } catch (error) {
        console.error("❌ Error fetching treatments:", error);
    }
}

// Update page view according to user type:
function updateViewBasedOnUser() {
    if (USER_TYPE === 'patient') {
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'block');
    } else if (USER_TYPE === 'doctor') {
        document.querySelectorAll('.doctor-only').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.patient-only').forEach(el => el.style.display = 'none');
    }
}

// Initialize display according to user
updateViewBasedOnUser();

// Set view by user type:
function setUserType(userType) {
    USER_TYPE = userType;
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

// Add treatment to table by doctor:
document.addEventListener('DOMContentLoaded', () => {
    const saveAndSignButton = document.querySelector('.save-button');
    const historyTable = document.querySelector('.history-section table tbody');

    // Validate form input:
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

    // Add record to table:
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
        document.querySelector('#summary').readOnly = false;
    }

    if (saveAndSignButton) {
        saveAndSignButton.addEventListener('click', addRowToHistory);
    }
});

// Set default view and open treatment summary record
document.addEventListener('DOMContentLoaded', () => {
    const summaryTextarea = document.querySelector('#summary');
    const clientNameInput = document.querySelector('#client-name');
    const petNameInput = document.querySelector('#pet-name');
    const treatmentTypeSelect = document.querySelector('#treatment-type');
    const PclientNameInput = document.querySelector('#p-client-name');
    const PpetNameInput = document.querySelector('#P-pet-name');
    const PtreatmentTypeInput = document.querySelector('#P-treatment-type');
    const openRecordButton = document.querySelector('.open-record-button');

    // Reset form display to default setting:
    function displayDefaultSummary() {
        if (USER_TYPE === 'doctor') {
            summaryTextarea.value = '';
            summaryTextarea.placeholder = 'הכנס סיכום טיפול...';
            clientNameInput.value = '';
            clientNameInput.placeholder = 'הכנס שם לקוח';
            petNameInput.value = '';
            petNameInput.placeholder = 'הכנס שם חיית מחמד';
            treatmentTypeSelect.selectedIndex = 0;
            summaryTextarea.readOnly = false;
        } else if (USER_TYPE === 'patient') {
            summaryTextarea.value = 'בחר טיפול מההיסטוריה כדי לראות את פרטי הטיפול.';
            summaryTextarea.readOnly = true;
            PclientNameInput.value = '';
            PpetNameInput.value = '';
            PtreatmentTypeInput.value = '';
        }
    }

    // Display chosen record from treatment table
    async function openSelectedRecord() {
        const selectedRow = document.querySelector('input[name="select-treatment"]:checked');
        if (!selectedRow) {
            alert('יש לבחור שורה בטבלה כדי לפתוח סיכום טיפול.');
            return;
        }

        const row = selectedRow.closest('tr');
        const petId = row.getAttribute('data-pet-id') || "UNKNOWN";
        console.log("📌 Sending petId:", petId);  // ✅ Debugging log
        const datetimeAttr = row.getAttribute('data-datetime');
        const datetime = datetimeAttr ? new Date(datetimeAttr).toISOString() : null;
        console.log("📌 Debug: Formatted datetime:", datetime);
        console.log("📌 Sending datetime:", datetime);  // ✅ Debugging log


        if (!petId || !datetime) {
            alert('מידע חסר בשורה הנבחרת.');
            return;
        }

        try {
            const response = await fetch('/get-treatment-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    petId: petId,
                    datetime: datetime
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const treatmentDetails = await response.json();

            // Update the form with treatment details
            if (USER_TYPE === 'doctor') {
                clientNameInput.value = treatmentDetails.ownerFullName || "לא ידוע";
                petNameInput.value = treatmentDetails.petName;
                
                // Find and select the matching treatment type in the dropdown
                const options = Array.from(treatmentTypeSelect.options);
                const matchingOption = options.find(option => 
                    option.text === treatmentDetails.treatment || 
                    option.value === treatmentDetails.treatment
                );
                
                if (matchingOption) {
                    treatmentTypeSelect.value = matchingOption.value;
                } else {
                    treatmentTypeSelect.value = 'other'; // Default to 'other' if not found
                }
                
                summaryTextarea.value = treatmentDetails.summary;
                summaryTextarea.readOnly = true; // Make read-only for past treatments
            } else {
                PclientNameInput.value = treatmentDetails.ownerFullName || "לא ידוע";
                PpetNameInput.value = treatmentDetails.petName;
                PtreatmentTypeInput.value = treatmentDetails.treatment;
                
                // Format date for display
                const treatmentDate = new Date(treatmentDetails.datetime);
                const formattedDate = treatmentDate.toLocaleDateString('he-IL');
                
                summaryTextarea.value = `תאריך: ${formattedDate}\nסוג טיפול: ${treatmentDetails.treatment}\n\n${treatmentDetails.summary}`;
                summaryTextarea.readOnly = true;
            }
        } catch (error) {
            console.error('❌ Error fetching treatment details:', error);
            alert('אירעה שגיאה בטעינת פרטי הטיפול.');
        }
    }

    if (openRecordButton) {
        openRecordButton.addEventListener('click', openSelectedRecord);
    }

    // Reset user type display:
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