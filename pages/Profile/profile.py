from flask import Blueprint, render_template, session, url_for, redirect, request
from db_connector import get_pets_by_owner, get_latest_future_appointment, get_pet_by_id
from datetime import datetime
from bson import ObjectId


profile = Blueprint(
    'profile',
    __name__,
    static_folder='static',
    static_url_path='/profile',
    template_folder='templates'
)

@profile.route('/profile/<pet_id>')
def profile_func(pet_id):
    # Check if user is logged in
    if 'user_email' not in session:
        return redirect(url_for('login'))

    user_email = session["user_email"]
    print(f"📌 Debug: Received pet_id = {pet_id}")
    try:
        pet = get_pet_by_id(ObjectId(pet_id))  # Fetch pet using its ID
        print(f"📌 Debug: Retrieved pet from DB = {pet}")
    except Exception as e:
        print(f"❌ Error fetching pet: {e}")
        pet = None

    if not pet or pet.get("owner") != user_email:
        return "חיית המחמד לא נמצאה או שאינה שייכת למשתמש זה", 403

    # Mapping English types/genders to Hebrew
    type_translation = {"cat": "חתול", "dog": "כלב"}
    gender_translation = {"male": "זכר", "female": "נקבה"}

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

    # Ensure weight is formatted correctly (as קילוגרם)
    weight = pet.get("weight")
    pet["weight"] = f"{weight} קילוגרם" if weight else "לא ידוע"

    # Ensure breed is present
    pet["breed"] = pet.get("breed", "לא ידוע")

    upcoming_appointment = get_latest_future_appointment(pet["petName"], user_email)

    print(f"📌 Debug: Sending pet data to profile.html: {pet}")
    return render_template('profile.html', pet=pet, upcoming_appointment=upcoming_appointment)

