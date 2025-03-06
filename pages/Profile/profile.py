from flask import Blueprint, render_template, session
from db_connector import get_pets_by_owner

profile = Blueprint(
    'profile',
    __name__,
    static_folder='static',
    template_folder='templates'
)

@profile.route('/profile')
def profile_func():
    user_email = "Shay@example.com"  # Hardcoded for now; later, use session["user_email"]
    pets = get_pets_by_owner(user_email)

    return render_template('profile.html', pets=pets)
