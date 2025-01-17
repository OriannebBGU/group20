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

- **Profile Management:** Logged-in veterinary staff can manage pet profiles, update treatment summaries, and schedule appointments.
- **Treatment Updates:** Vets can add or modify medical records through a dedicated interface.

---

### Assumptions Regarding Use

- The personalized parts that are currently shown are placeholders for this part of the project only. In P3, these parts will be updated to be read from the DB. The placeholders: 
  - Name in welcome message (אוריין)
  - Shown profile (צ'לסי)
    - Upcoming appointment message ("אין תורים עתידיים")
  - Shown treatment history
- Doctor view and Patient view buttons in Treatment History page will not exist in P3 - they were only created for the purposes of P2, to show the course staff how will each view look.

---

### Repeating Elements

- **Header:** Navigation bar with a logo and links to core sections (Home, Pets, About, Contact).
- **Footer:** Includes copyright information, social media links, and consistent styling.
- **Popup Message:** Used for various actions, like adoption confirmation or feature placeholders.

---

### Responsive Design

The site is designed to be fully responsive, using:

- **CSS Media Queries:** Adapts layout for smaller screens (e.g., the navigation bar becomes a hamburger menu).

#### Example:

```css
@media (max-width: 1300px) {
    .nav-links {
        display: none;
        flex-direction: column;
    }

    .nav-links.show {
        display: flex;
    }

    .hamburger {
        display: flex;
    }
}
```
### CSS Animation 

```css
.primary-btn:hover {
    transform: scale(1.08);
    transition: transform 0.3s;
}
```
---

## Event Functions

### Examples:

1. **Hamburger Menu Toggle:**

   ```javascript
   document.querySelector('.hamburger').addEventListener('click', () => {
       document.querySelector('.nav-links').classList.toggle('show');
   });
   ```
2. **Adopt Button Popup:**
   ```javascript
    document.getElementById('adopt-btn').addEventListener('click', () => {
        document.getElementById('popup-message').style.display = 'block';
    });
   ```
---

## Forms and Validations

### Existing Forms:

- Create Account: Name, email, password, and confirm password validation.
- Sign Up Association: Additional fields for phone and address.
- Login Form: Email and password validation.

### Validation Examples

The forms on the site include several input validations to ensure data integrity and user experience:

- Create Account Form: Requires the user's name, email, password, and confirmation password. Fields must adhere to strict validation rules, such as email format and password strength.
- Sign Up Association Form: Includes fields for phone number and address, in addition to those in the Create Account Form, ensuring proper contact details.
- Login Form: Ensures email and password are correctly formatted and provided.

These validations offer real-time feedback, guiding users to correct any mistakes or omissions during input.