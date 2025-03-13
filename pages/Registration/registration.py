from flask import Blueprint, request, jsonify, render_template, session
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


import time  # Import time for delay

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
            "Email": email,  # ✅ Store it as "Email" to match MongoDB
            "Password": password,
            "phoneNumber": phone,
            "role": 1
        }
        insert_customer(new_user)

        import time
        time.sleep(0.5)  # Ensure MongoDB has time to commit

        user_data = get_customer_by_email(email)  # ✅ Now it should match
        print(f"📌 Debug: Retrieved user data after insert = {user_data}")

        if not user_data:
            print("❌ Error: Newly inserted user not found in the database!")
            return jsonify({"error": "User registration failed. Please try again."}), 500

        session["user_email"] = email
        session["user_id"] = str(user_data["_id"])
        session["first_name"] = first_name
        session["role"] = 1

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        print(f"❌ Fatal Error in register_user: {e}")
        return jsonify({"error": str(e)}), 500



