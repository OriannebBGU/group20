from flask import Blueprint, render_template, session, url_for, redirect
from db_connector import get_pets_by_owner, get_latest_future_appointment

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
        # Redirect to login page if not logged in
        return redirect(url_for('login'))

    # Get the current user's email from the session
    user_email = session["user_email"]

    # Get pets for the logged-in user
    pets = get_pets_by_owner(user_email)

    # Get upcoming appointment for the first pet (if any)
    upcoming_appointment = None
    if pets:
        pet_name = pets[0]["petName"]
        upcoming_appointment = get_latest_future_appointment(pet_name, user_email)

    return render_template('profile.html', pets=pets, upcoming_appointment=upcoming_appointment)