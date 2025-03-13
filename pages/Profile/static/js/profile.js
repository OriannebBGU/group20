document.addEventListener('DOMContentLoaded', function() {
    const editDetailsBtn = document.querySelector('.editDetails');
    const historyBtn = document.querySelector('.history');

    if (editDetailsBtn) {
        editDetailsBtn.addEventListener('click', function() {
            window.location.href = '/registrationpet';
        });
    }

    if (historyBtn) {
        historyBtn.addEventListener('click', function() {
            // Get the current pet ID from the URL
            const currentPath = window.location.pathname;
            const petId = currentPath.split('/profile/')[1];

            // Redirect to treatment summary with the pet ID as a parameter
            window.location.href = `/treatmentsummary?pet_id=${petId}`;
        });
    }
});