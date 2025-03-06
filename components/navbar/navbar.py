from flask import Blueprint, render_template, session, jsonify, send_from_directory
import os

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
    # session["first_name"] = "Shay"
    if "user_email" in session:
        return jsonify({
            "isLoggedIn": True,
            "firstName": session.get("first_name", "")
        })
    return jsonify({"isLoggedIn": False})
