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
            window.location.href = '/treatmentsummary';
        });
    }
});