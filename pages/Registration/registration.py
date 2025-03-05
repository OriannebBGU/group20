from flask import Blueprint, request, jsonify, render_template
from db_connector import insert_customer, get_customer_by_email

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

# Handle user registration (POST)
@registration.route('/register-user', methods=['POST'])
def register_user():
    try:
        data = request.json
        email = data.get("email").strip().lower()
        first_name = data.get("firstName").strip()
        last_name = data.get("lastName").strip()
        password = data.get("password").strip()
        phone = data.get("phoneNumber").strip()

        # Check if the email already exists using the CRUD function
        if get_customer_by_email(email):
            return jsonify({"error": "Email already registered"}), 400

        # Insert the new user using the existing insert_customer function
        new_user = {
            "firstName": first_name,
            "lastName": last_name,
            "email": email,
            "password": password,  # 🔴 Hash passwords in a real app!
            "phoneNumber": phone,
            "role": 1  # Default role
        }
        insert_customer(new_user)

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
