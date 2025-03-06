

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
            // localStorage.setItem('isLoggedIn', 'true');
            form.submit();
        }
    });

});
