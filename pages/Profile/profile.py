from flask import Blueprint, render_template, session, url_for
from db_connector import get_pets_by_owner, get_latest_future_appointment

profile = Blueprint(
    'profile',
    __name__,
    static_folder='static',
    # השורה מתחת היא זו שמחקת :)
    static_url_path='/profile',
    template_folder='templates'
)

@profile.route('/profile')
def profile_func():
    user_email = "Shay@example.com"  # Hardcoded for now; later, use session["user_email"]
    pets = get_pets_by_owner(user_email)
    upcoming_appointment = None
    if pets:
        pet_name = pets[0]["petName"]  # Assuming the user has only one pet
        upcoming_appointment = get_latest_future_appointment(pet_name, user_email)
    return render_template('profile.html', pets=pets, upcoming_appointment=upcoming_appointment)
    # return render_template('profile.html')
