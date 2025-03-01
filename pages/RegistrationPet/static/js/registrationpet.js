

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
