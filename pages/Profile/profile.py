from flask import Blueprint, render_template, session, url_for, redirect
from db_connector import get_pets_by_owner, get_latest_future_appointment
from datetime import datetime

profile = Blueprint(
    'profile',
    __name__,
    static_folder='static',
    static_url_path='/profile',
    template_folder='templates'
)

@profile.route('/profile')
def profile_func():
    # Check if user is logged in
    if 'user_email' not in session:
        return redirect(url_for('login'))

    user_email = session["user_email"]
    pets = get_pets_by_owner(user_email)

    # Mapping English types/genders to Hebrew
    type_translation = {"cat": "חתול", "dog": "כלב"}
    gender_translation = {"male": "זכר", "female": "נקבה"}

    for pet in pets:
        # Only translate if the type is in English
        if pet["type"] in type_translation:
            pet["type"] = type_translation[pet["type"]]

        # Only translate if gender is in English
        if pet["gender"] in gender_translation:
            pet["gender"] = gender_translation[pet["gender"]]

        # Convert datetime birthdate to string if it exists
        if isinstance(pet.get("birthdate"), datetime):
            pet["birthdate"] = pet["birthdate"].strftime('%d/%m/%Y')
        else:
            pet["birthdate"] = "לא ידוע"

        weight = pet.get("weight")
        pet["weight"] = f"{weight} קילוגרם " if weight else "לא ידוע"
        # Ensure breed is present
        pet["breed"] = pet.get("breed", "לא ידוע")

    # Get upcoming appointment for the first pet (if any)
    upcoming_appointment = None
    if pets:
        pet_name = pets[0]["petName"]
        upcoming_appointment = get_latest_future_appointment(pet_name, user_email)

    return render_template('profile.html', pets=pets, upcoming_appointment=upcoming_appointment)
