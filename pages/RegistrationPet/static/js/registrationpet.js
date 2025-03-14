document.addEventListener('DOMContentLoaded', async () => {
    const Pform = document.querySelector('.RegistrationPetForm');
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('pet_id'); // Get pet ID from URL

    const PpetName = Pform.querySelector('input[name="petName"]');
    const Ptype = Pform.querySelector('select[name="type"]');
    const Pgender = Pform.querySelector('select[name="gender"]');
    const Pbreed = Pform.querySelector('input[name="breed"]');
    const Pbirthdate = Pform.querySelector('input[name="age"]');
    const Pweight = Pform.querySelector('input[name="weight"]');
    const photoInput = Pform.querySelector('input[name="photo"]');

    let userEmail = null;

    // Fetch logged-in user info
    try {
        const userResponse = await fetch('/get-navbar-info');
        const userData = await userResponse.json();
        if (userData.isLoggedIn) {
            userEmail = userData.email;
            console.log(" Logged-in user email:", userEmail);
        } else {
            console.error(" User not logged in.");
        }
    } catch (error) {
        console.error(" Error fetching user info:", error);
    }

    //  If editing an existing pet, load pet details
    if (petId) {
        try {
            const petResponse = await fetch(`/get-pet-details/${petId}`);
            const petData = await petResponse.json();

            if (petResponse.ok) {
                PpetName.value = petData.petName;
                Ptype.value = petData.type;
                Pgender.value = petData.gender;
                Pbreed.value = petData.breed || "";
                Pbirthdate.value = petData.birthdate || "";
                Pweight.value = petData.weight || "";
            } else {
                console.error(" Error loading pet details:", petData.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    // Handle form submission (new registration or update)
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

        const formData = {
            petName: PpetName.value.trim(),
            type: Ptype.value,
            gender: Pgender.value,
            birthdate: Pbirthdate.value ? Pbirthdate.value : null,
            breed: Pbreed.value.trim() || null,
            weight: Pweight.value.trim() !== "" ? parseFloat(Pweight.value) : null,
            photo: photoInput.files[0] ? photoInput.files[0].name : null,
            ownerEmail: userEmail
        };

        console.log("Sending pet data:", formData);

        try {
            const endpoint = petId ? `/update-pet/${petId}` : '/register-pet';
            const method = petId ? 'PUT' : 'POST'; // Use PUT for updates, POST for new pets

            const response = await fetch(endpoint, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(" JSON response:", result);

            if (response.ok) {
                alert(result.message);
                window.location.href = `/profile/${petId || result.petId}`; // Redirect to correct profile
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error(" Fetch error:", error);
            alert("שגיאה במהלך העדכון, נסה שנית.");
        }
    });
});

//Existing error message function
function showError (input, message) {
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
