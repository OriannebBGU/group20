

document.addEventListener('DOMContentLoaded', async () => {
    const homeButton = document.querySelector('.homeButton');
    const menuButton = document.querySelector('.menuButton');
    const loginButton = document.querySelector('.loginButton');
    const regisButton = document.querySelector('.regisButton');
    const infoButton = document.querySelector('.infoButton');
    const logoutButton = document.querySelector('.logoutButton');
    const welcomeMessage = document.querySelector('.welcome');

    try {
        const response = await fetch('/get-navbar-info');
        const result = await response.json();

        console.log("Navbar API response:", result); // Debugging line

        if (response.ok && result.isLoggedIn) {
            console.log("User is logged in, updating navbar..."); // Debugging line

            // Show only the required buttons for logged-in users
            homeButton.style.display = 'inline-block';
            menuButton.style.display = 'inline-block';
            infoButton.style.display = 'inline-block';
            logoutButton.style.display = 'inline-block';

            // Hide buttons for logged-out users
            loginButton.style.display = 'none';
            regisButton.style.display = 'none';

            if (welcomeMessage) {
                welcomeMessage.textContent = `טוב לראות אותך שוב, ${result.firstName}!`;
                welcomeMessage.style.display = 'block';
            }
        } else {
            console.log("User is logged out, updating navbar..."); // Debugging line

            // Show only the required buttons for logged-out users
            homeButton.style.display = 'inline-block';
            loginButton.style.display = 'inline-block';
            regisButton.style.display = 'inline-block';
            infoButton.style.display = 'inline-block';

            // Hide buttons for logged-in users
            menuButton.style.display = 'none';
            logoutButton.style.display = 'none';

            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }
        }
    } catch (error) {
        console.error("❌ Failed to fetch navbar info:", error);
    }
});




function setupNavbarListeners() {
    const buttonRoutes = {
        infoButton: '/info',
        homeButton: '/homepage',
        loginButton: '/login',
        regisButton: '/registration',
    };

    Object.entries(buttonRoutes).forEach(([buttonClass, route]) => {
        const button = document.querySelector(`.${buttonClass}`);
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = route; // Redirect user to the correct page
            });
        }
    });

    // Handle Logout Button Separately-- NEEDS CHECKING!
    const logoutButton = document.querySelector('.logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                // Send request to change session status
                await fetch('/logout', { method: 'POST' });

                // Redirect user to login page after logout
                window.location.href = '/login';
            } catch (error) {
                console.error("❌ Logout failed:", error);
            }
        });
    }
}

// Run the function after the page loads
document.addEventListener('DOMContentLoaded', setupNavbarListeners);
