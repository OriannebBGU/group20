from flask import Blueprint, request, jsonify, render_template, session
from db_connector import insert_customer, get_customer_by_email
import time

# Registration blueprint
registration = Blueprint(
    'registration',
    __name__,
    static_folder='static',
    static_url_path='/registration',
    template_folder='templates'
)


# Render the registration page
@registration.route('/registration')
def registration_func():
    return render_template('registration.html')


@registration.route('/register-user', methods=['POST'])
def register_user():
    try:
        data = request.json
        email = data.get("email").strip().lower()
        first_name = data.get("firstName").strip()
        last_name = data.get("lastName").strip()
        password = data.get("password").strip()
        phone = data.get("phoneNumber").strip()

        if get_customer_by_email(email):
            return jsonify({"error": "Email already registered"}), 400

        new_user = {
            "firstName": first_name,
            "lastName": last_name,
            "Email": email,  # Store it as "Email" to match MongoDB
            "Password": password,
            "phoneNumber": phone,
            "Role": 1
        }
        insert_customer(new_user)

        time.sleep(0.5)  # Ensure MongoDB has time to commit

        user_data = get_customer_by_email(email)  # Now it should match

        if not user_data:
            return jsonify({"error": "User registration failed. Please try again."}), 500

        session["user_email"] = email
        session["user_id"] = str(user_data["_id"])
        session["first_name"] = first_name
        session["role"] = 1

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
