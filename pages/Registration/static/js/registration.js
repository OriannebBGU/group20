document.addEventListener('DOMContentLoaded', () => {
    const Rform = document.querySelector('.RegistrationForm');
    const RfirstName = Rform.querySelector('input[name="firstName"]');
    const RlastName = Rform.querySelector('input[name="lastName"]');
    const Remail = Rform.querySelector('input[name="email"]');
    const Rpassword = Rform.querySelector('input[name="password"]');
    const RVpassword = Rform.querySelector('input[name="Vpassword"]');
    const RphoneNumber = Rform.querySelector('input[name="phoneNumber"]');

    Rform.addEventListener('submit', async (event) => {
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
            const formData = {
                firstName: RfirstName.value.trim(),
                lastName: RlastName.value.trim(),
                email: Remail.value.trim(),
                password: Rpassword.value,
                phoneNumber: RphoneNumber.value.trim()
            };

            try {
                const response = await fetch("/register-user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                if (response.ok) {
                    Rform.reset(); // Clear form fields after successful registration
                    window.location.href = '/registrationpet'; // Redirect to registrationpet page
                } else {
                    alert(result.error); // Show error message if email exists
                }
            } catch (error) {
                console.error("Error:", error);
                alert("שגיאה במהלך ההרשמה, נסה שנית.");
            }
        }
    });
});

//Error message function
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
