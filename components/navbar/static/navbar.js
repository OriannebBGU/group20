//Setting the button display according to user type
async function setNavbarDisplay() {
// document.addEventListener('DOMContentLoaded', async () => {
    const homeButton = document.querySelector('.homeButton');
    const menuButton = document.querySelector('.menuButton');
    const treatmentSummaryButton = document.querySelector('.treatmentSummaryButton');
    const loginButton = document.querySelector('.loginButton');
    const regisButton = document.querySelector('.regisButton');
    const infoButton = document.querySelector('.infoButton');
    const logoutButton = document.querySelector('.logoutButton');
    const welcomeMessage = document.querySelector('.welcome');

    try {
        const response = await fetch('/get-navbar-info');
        const result = await response.json();
        const role = result.role;

        console.log("Navbar API response:", result); // Debugging line
        console.log("Navbar role response:", role); // Debugging line

        if (response.ok && result.isLoggedIn) {
            console.log("User is logged in, updating navbar..."); // Debugging line

            // Show only the required buttons for logged-in users
            homeButton.style.display = 'inline-block';
            infoButton.style.display = 'inline-block';
            logoutButton.style.display = 'inline-block';
            if (role === 1) {
                if (menuButton) menuButton.style.display = 'inline-block';
                if (treatmentSummaryButton) treatmentSummaryButton.style.display = 'none';
            } else if (role === 2) {
                if (treatmentSummaryButton) treatmentSummaryButton.style.display = 'inline-block';
                if (menuButton) menuButton.style.display = 'none';
            }
            if (welcomeMessage) {
                welcomeMessage.textContent = `טוב לראות אותך שוב, ${result.firstName}!`;
                welcomeMessage.style.display = 'block';
            }

            // Hide buttons for logged-out users
            loginButton.style.display = 'none';
            regisButton.style.display = 'none';

        } else {
            console.log("User is logged out, updating navbar..."); // Debugging line

            // Show only the required buttons for logged-out users
            homeButton.style.display = 'inline-block';
            loginButton.style.display = 'inline-block';
            regisButton.style.display = 'inline-block';
            infoButton.style.display = 'inline-block';

            // Hide buttons for logged-in users
            logoutButton.style.display = 'none';
            if (menuButton) menuButton.style.display = 'none';
            if (treatmentSummaryButton) treatmentSummaryButton.style.display = 'none';
            if (welcomeMessage) welcomeMessage.style.display = 'none';

        }
    } catch (error) {
        console.error("❌ Failed to fetch navbar info:", error);
    }
}

//Setting the button functionality for use
function setupNavbarListeners() {
    const buttonRoutes = {
        homeButton: '/homepage',
        loginButton: '/login',
        regisButton: '/registration',
        infoButton: '/info',
        treatmentSummaryButton: '/treatmentsummary'
    };

    //add event listener to every button
    Object.entries(buttonRoutes).forEach(([buttonClass, route]) => {
        const button = document.querySelector(`.${buttonClass}`);
        if (button) {
            button.addEventListener('click', () => {
                window.location.href = route;
            });
        }
    });

    // Logout button functionality
    const logoutButton = document.querySelector('.logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/logout', {method: 'POST'});
                if (response.ok) {
                    window.location.href = '/homepage';
                } else {
                    console.error('Logout failed.');
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
        });
    }


    // Menu button to toggle animalButtons (HIDE/SHOW PET NAMES)
    const menuButton = document.querySelector('.menuButton');
    menuButton.addEventListener('click', async () => {
        // Toggle the display of animal buttons
        const animalButtonsContainer = document.querySelector('.animalButtons');
        animalButtonsContainer.style.display = (animalButtonsContainer.style.display === 'none' || animalButtonsContainer.style.display === '')
            ? 'flex'
            : 'none';

        // If now visible and not yet populated, fetch animal names from backend
        if (animalButtonsContainer.style.display === 'flex' && animalButtonsContainer.children.length === 0) {
            try {
                const response = await fetch('/get-user-animals');
                //לוודא שיש את הפונקצויואליות והתאמה של שם הנתיב לקבלת הנתונים הרצויים! - get-user-animals

                if (!response.ok) {// Debugging line
                    console.error('Error: Response status', response.status);// Debugging line
                    return;// Debugging line
                }// Debugging line

                const result = await response.json();

                console.log("Fetched pet names:", result.animals); // Debugging line
                if (!Array.isArray(result.animals)) {// Debugging line
                    console.error("Error: animals is not an array", result.animals);// Debugging line
                    return;// Debugging line
                }// Debugging line

                if (response.ok && result.animals) {
                    // Clear any existing content
                    animalButtonsContainer.innerHTML = '';

                    // Create a button for each pet returned
                    result.animals.forEach(animal => {
                        const btn = document.createElement('button');
                        btn.textContent = animal.name;
                        btn.addEventListener('click', () => {
                            window.location.href = '/profile';
                        });
                        animalButtonsContainer.appendChild(btn);
                    });

                    // Add an "Add" button for new pets
                    const addBtn = document.createElement('button');
                    addBtn.textContent = 'הוספה...';
                    addBtn.addEventListener('click', () => {
                        window.location.href = '/registrationpet';
                    });
                    animalButtonsContainer.appendChild(addBtn);
                }
            } catch (error) {
                console.error('Error fetching animal names:', error);
            }
        }

    });
}

// Run the functions after the page loads
document.addEventListener('DOMContentLoaded', async () => {
    await setNavbarDisplay();
    setupNavbarListeners();
});