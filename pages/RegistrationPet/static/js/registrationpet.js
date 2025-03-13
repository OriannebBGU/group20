document.addEventListener('DOMContentLoaded', async () => {
    const Pform = document.querySelector('.RegistrationPetForm');
    const PpetName = Pform.querySelector('input[name="petName"]');
    const Ptype = Pform.querySelector('select[name="type"]');
    const Pgender = Pform.querySelector('select[name="gender"]');
    const photoInput = Pform.querySelector('input[name="photo"]');

    let userEmail = null;

    try {
        const userResponse = await fetch('/get-navbar-info');
        const userData = await userResponse.json();
        if (userData.isLoggedIn) {
            userEmail = userData.email;
            console.log("✅ Logged-in user email:", userEmail);
        } else {
            console.error("❌ User not logged in.");
        }
    } catch (error) {
        console.error("❌ Error fetching user info:", error);
    }

    Pform.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!userEmail) {
            alert("שגיאה: אין משתמש מחובר.");
            return;
        }

        let isValid = true;
        if (!PpetName.value.trim() || Ptype.value === 'unpicked' || Pgender.value === 'unpicked') {
            alert("חובה למלא שם, סוג ומין.");
            return;
        }

        const Pbreed = Pform.querySelector('input[name="breed"]');
        const Pbirthdate = Pform.querySelector('input[name="age"]');
        const Pweight = Pform.querySelector('input[name="weight"]');

        const formData = {
            petName: PpetName.value.trim(),
            type: Ptype.value,
            gender: Pgender.value,
            birthdate: Pbirthdate.value ? Pbirthdate.value : null,
            breed: Pbreed.value.trim() || null,
            weight: Pweight.value.trim() !== "" ? parseFloat(Pweight.value) : null,  // ✅ Ensure null is sent for empty input
            photo: photoInput.files[0] ? photoInput.files[0].name : null,
            ownerEmail: userEmail
        };



        console.log("📤 Sending pet registration data:", formData);

        try {
            const response = await fetch('/register-pet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("📥 JSON response:", result);

            if (response.ok) {
                alert(result.message);
                window.location.href = '/'; // Redirect to homepage
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
            alert("שגיאה במהלך הרישום, נסה שנית.");
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
