# Vetrinat - A Veterinary Website

## Part A

### Project Overview
VetRinat is a platform designed to assist Dr. Rinat PetLover customers in managing their pets' appointments and medical history. Our mission is to provide easy access to treatment summaries, personalized pet profiles and information about the clinic treatments, fostering a healthier and more organized life for pets and their owners.

### Key Features
1. **User Accounts** - 2-step registration process, focusing on the owner and the pet respectively.
2. **Detailed Pet Profiles** - Information on breed, gender, age, weight and more.
3. **Medical Summaries** - Comprehensive treatment history and summaries for each pet.
4. **General Information** - Regarding the user's next appointment, the clinic availability, and popular treatments.

## Part B

### Main Flows on the Site

#### Customers Flows:

- **Registration:** Users can register their pets via a two-step process, providing details like name, breed and gender.
- **Medical History Access:** Pet owners can view their pet's treatment history and summaries directly on the site.

#### Vet Flows:

- **Treatment Updates:** Vet users can add or modify medical records through a dedicated interface, containing treatment type, date, pet and summary.
- **Profile Management:** Logged-in veterinary staff can manage pet profiles and schedule appointments.

---

### Assumptions Regarding Use

- The personalized parts that are currently shown are placeholders for this part of the project only. In P3, these parts will be updated to be read from the DB. The placeholders: 
  - Name in welcome message (אוריין)
  - Shown profile (צ'לסי)
    - Upcoming appointment message ("אין תורים עתידיים")
  - Shown treatment history
- Doctor view and Patient view buttons in Treatment History page will not exist in P3 - they were only created for the purposes of P2, to show the course staff how will each view look.
  - Similarly, the existing functions that allow adding and modifying treatments under Doctor View are placeholders for the functions that will be implemented in P3.
- Every new user receives customer's permissions by default. Defining a user as staff is done manually in the database.
- Adding an upcoming appointment for a pet will be done straight through the database in P3.

---

### Repeating Elements

- **Header:** 
  - Contains navigation buttons (homeButton, infoButton, etc.).
  - Includes the site logo (class icon).
  - Repeating style.
- **Form Layouts:** 
  - RegistrationLine divs with labels and inputs (used in forms for Login, Registration, RegistrationPet, and Treatment Summary).

---

### Responsive Design

The site uses CSS Media queries to ensure responsive design and a good user experience from different screens. There are 3 definitions using Media queries:
- Screens narrower than 768 px
- Screens shorter than 650 px
- Screens longer than 650 px

---

### CSS Animation
The code uses @keyframes to make the Vetrinat icon rotate whenever the user hovers over it, in all the pages it appears (homepage, treatment history, info, profile).

 ---
### Event Functions
1. The code uses addEventListener('DOMContentLoaded', ...) to ensure the DOM is fully loaded before running the attached initialization functions.
2. The code uses addEventListener('click', ...) to respond to button clicks. This function is used in various sections, like toggling views (e.g., setUserType), logging in, or navigating between pages.

---

### Forms and Validations

There are 3 forms in the site, each one with a different validation.
- LogInForm:
  - Email - validates the user inputs a valid email address using regex  
  (/^[a-zA-Z0-9]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/).
  - Password - validates the password is at least 6 characters long.  
In P3, this form will read straight from the database and ensure that the user enters existing credentials.
- RegistrationForm:
  - A general validation that all the fields are filled.
  - First name - validates that the input is at least 2 characters long.
  - Last name - validates that the input is at least 2 characters long.
  - Email - validates the user inputs a valid email address using regex  
  (/^[a-zA-Z0-9]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/).
  - Password - validates the password is at least 6 characters long.
  - VPassword (verify password) - validates that the entered password is identical to the one input in the password field.
  - Phone number - validates that the input is between 9-10 characters long, and:
    - if it's 9 characters long, it starts with 0.
    - if it's 10 characters long, it starts with 05 or 07.
- RegistrationPetForm  
  Unlike the registration form, not all fields are necessary to fill in order to register a pet.
  - A general validation that name, type and gender are filled.
  - Pet name - validates that the input is at least 2 characters long.
  - Photo input - validates that the file uploaded is of type photo.


---
### Submitted by:
- אוריין שקולניק
- שי צפתי


