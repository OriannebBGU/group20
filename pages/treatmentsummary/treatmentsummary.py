from flask import Blueprint, render_template, jsonify, request, session
from db_connector import get_treatments_for_pet, get_treatment_details, get_pets_for_owner, get_customer_by_email
from datetime import datetime

treatmentsummary = Blueprint(
    'treatmentsummary',
    __name__,
    static_folder='static',
    static_url_path='/treatmentsummary',
    template_folder='templates'
)


@treatmentsummary.route('/treatmentsummary')
def treatmentsummary_func():
    # Get the current user's information from session
    user_id = session.get('user_id')
    user_email = session.get('user_email')

    # Get user role from database
    user_data = get_customer_by_email(user_email) if user_email else None
    user_role = user_data.get('Role') if user_data else None

    # Default to empty list if no treatments or user not logged in
    treatments = []
    pets = []
    selected_pet = None

    if user_id:
        # Get all pets for the current user
        pets = get_pets_for_owner(session.get('user_email'))

        # Add owner full name to each pet object
        for pet in pets:
            owner_email = pet.get('owner')
            if owner_email:
                owner_data = get_customer_by_email(owner_email)
                if owner_data:
                    pet['ownerFullName'] = f"{owner_data.get('firstName', '')} {owner_data.get('lastName', '')}"
                else:
                    pet['ownerFullName'] = "משתמש לא ידוע"

        # If user has pets, get treatments for the first pet by default
        if pets:
            selected_pet = request.args.get('pet_id', pets[0]['petName'])
            treatments = get_treatments_for_pet(selected_pet)

    return render_template('treatmentsummmary.html',
                           treatments=treatments,
                           pets=pets,
                           selected_pet=selected_pet,
                           user_role=user_role)  # Pass user_role to template


@treatmentsummary.route('/get-treatments/<pet_id>', methods=['GET'])
def get_treatments(pet_id):
    treatments = get_treatments_for_pet(pet_id)
    print(f"📌 Debug: Treatments for pet {pet_id} = {treatments}")
    return jsonify(treatments)


@treatmentsummary.route('/get-treatment-details', methods=['POST'])
def get_treatment_details_func():
    try:
        data = request.get_json()
        print(f"📌 Received request data: {data}")  # ✅ Debugging line

        pet_id = data.get('petId')
        treatment_datetime_str = data.get('datetime')

        if not pet_id or not treatment_datetime_str:
            print("❌ Error: Missing petId or datetime in request")
            return jsonify({"error": "Missing petId or datetime"}), 400

        # Debug datetime conversion
        try:
            treatment_datetime = datetime.fromisoformat(treatment_datetime_str.replace('Z', '+00:00'))
            print(f"✅ Parsed datetime: {treatment_datetime}")  # ✅ Debugging line
        except ValueError as ve:
            print(f"❌ Error converting datetime: {ve}")
            return jsonify({"error": "Invalid datetime format"}), 400

        treatment_details = get_treatment_details(pet_id, treatment_datetime)  # ✅ Correct

        if not treatment_details:
            print(f"❌ Error: No treatment found for pet ID {pet_id} at {treatment_datetime}")
            return jsonify({"error": "Treatment not found"}), 404

        print(f"✅ Found treatment details: {treatment_details}")
        return jsonify(treatment_details)

    except Exception as e:
        print(f"❌ Fatal Error in get-treatment-details: {e}")
        return jsonify({"error": "Internal server error"}), 500


@treatmentsummary.route('/debug-session')
def debug_session():
    session['test_value'] = 'working'  # Force setting a session key
    print(f"📌 Debug: Incoming cookies = {request.cookies}")
    return jsonify({
        "session_user_id": session.get('user_id'),
        "test_value": session.get('test_value'),  # Should be 'working' on refresh
        "cookies": request.cookies.get('session')
    })