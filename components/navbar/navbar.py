from flask import Blueprint, render_template, session, jsonify, send_from_directory
import os
from db_connector import get_customer_name_by_email, get_pets_for_owner

navbar = Blueprint(
    'navbar',
    __name__,
    static_folder='static',  # This remains, but we add another route below
    template_folder='templates'
)


# Serve navbar.js explicitly from its current location
@navbar.route('/components/navbar/static/<path:filename>')
def serve_navbar_static(filename):
    return send_from_directory(os.path.join('components', 'navbar', 'static'), filename)


@navbar.route('/get-navbar-info', methods=['GET'])
def get_navbar_info():
    # # FORCE A FAKE LOGIN FOR TESTING
    # session["user_email"] = "shay@example.com"
    # session["first_name"] = "Shay"0++*-
    print("🛠️ DEBUG: Session Data:", session)  # Debugging line
    if "user_email" in session:
        user_data = get_customer_name_by_email(session["user_email"])
        if user_data:
            session["first_name"] = user_data.get("firstName", "")  # Store first name in session
            session["Role"] = user_data.get("Role", "")
        return jsonify({
            "isLoggedIn": True,
            "firstName": session.get("first_name", ""),
            "role":session.get("Role", "")
        })
    return jsonify({"isLoggedIn": False})


@navbar.route('/logout', methods=['POST'])
def logout():
    if "user_email" in session:
        session["logged_in"] = False
        session.pop("user_email", None)
        session.pop("first_name", None)
        return jsonify({"message": 'Logged out successfully'})



@navbar.context_processor
def inject_user_animals():
    if "user_email" in session:
        # Retrieve the pets for the current user
        pets = get_pets_for_owner(session["user_email"])
        # Keep the pet names only
        pet_names = [{"name": pet.get("petName", "Unknown")} for pet in pets]
        return {"user_animals": pet_names}
    return {"user_animals": []}