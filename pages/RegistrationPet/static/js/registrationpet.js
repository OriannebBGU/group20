document.addEventListener('DOMContentLoaded', () => {
    const Pform = document.querySelector('.RegistrationPetForm');
    const PpetName = Pform.querySelector('input[name="petName"]');
    const Ptype = Pform.querySelector('select[name="type"]');
    const Pgender = Pform.querySelector('select[name="gender"]');
    const photoInput = Pform.querySelector('input[name="photo"]');

    Pform.addEventListener('submit', async (event) => {
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
            const formData = {
                petName: PpetName.value.trim(),
                type: Ptype.value,
                gender: Pgender.value,
                photo: photoInput.files[0] ? photoInput.files[0].name : null,
                ownerEmail: 'user@example.com' // TODO: Replace with the actual logged-in user's email
            };

            console.log("📤 Sending pet registration data:", formData);

            try {
                const response = await fetch('/register-pet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                console.log("📥 Server response:", response);

                // Ensure response is valid JSON before parsing
                const result = await response.json();
                console.log("📥 JSON response:", result);

                if (response.ok) {
                    alert(result.message); // Success message
                    window.location.href = '/'; // Redirect to homepage
                } else {
                    alert(result.error); // Show error message
                }
            } catch (error) {
                console.error("❌ Fetch error:", error);
                alert("שגיאה במהלך הרישום, נסה שנית.");
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
