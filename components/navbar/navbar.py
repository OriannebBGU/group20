from flask import Blueprint, session, jsonify, send_from_directory
import os
from db_connector import get_customer_name_by_email, get_pets_for_owner

navbar = Blueprint(
    'navbar',
    __name__,
    static_folder='static',
    template_folder='templates'
)


# Serve navbar.js explicitly from its current location
@navbar.route('/components/navbar/static/<path:filename>')
def serve_navbar_static(filename):
    return send_from_directory(os.path.join('components', 'navbar', 'static'), filename)


@navbar.route('/get-navbar-info', methods=['GET'])
def get_navbar_info():
    if "user_email" in session:
        user_data = get_customer_name_by_email(session["user_email"])
        if user_data:
            session["first_name"] = user_data.get("firstName", "")  # Store first name in session
            session["Role"] = user_data.get("Role", user_data.get("role", ""))
        return jsonify({
            "isLoggedIn": True,
            "firstName": session.get("first_name", ""),
            "role": session.get("Role", ""),
            "email": session["user_email"]  # ✅ Include email
        })
    return jsonify({"isLoggedIn": False})


@navbar.route('/logout', methods=['POST'])
def logout():
    if "user_email" in session:
        session["logged_in"] = False
        session.pop("user_email", None)
        session.pop("first_name", None)
        return jsonify({"message": 'Logged out successfully'})


@navbar.route('/get-user-animals', methods=['GET'])
def get_user_animals():
    if "user_email" in session:
        pets = get_pets_for_owner(session["user_email"])
        pet_names = [{"name": pet.get("petName", "Unknown"), "id": str(pet.get("_id", ""))} for pet in pets]
        return jsonify({"animals": pet_names})
    return jsonify({"animals": []})
