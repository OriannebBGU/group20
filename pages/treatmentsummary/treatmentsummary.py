from flask import Blueprint, render_template, jsonify, request, session
from db_connector import get_treatments_for_pet, get_treatment_details, get_pets_for_owner
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
    print(f"📌 Debug: Session user_id = {session.get('user_id')}")
    print(f"📌 Debug: Session content = {dict(session)}")  # Check full session data
    # Default to empty list if no treatments or user not logged in
    treatments = []
    pets = []
    selected_pet = None
    print(f"📌 Debug: Current session user_id = {session.get('user_id')}")

    if user_id:
        # Get all pets for the current user
        pets = get_pets_for_owner(session.get('user_email'))  # ✅ FIXED: Search by email
        print(f"📌 Debug: Pets for user {user_id} = {pets}")
        # If user has pets, get treatments for the first pet by default
        if pets:
            selected_pet = request.args.get('pet_id', pets[0]['petName'])  # ✅ Use petName
            print(f"📌 Debug: Corrected selected_pet = {selected_pet}")  # Debugging
            treatments = get_treatments_for_pet(selected_pet)
        print(f"📌 Debug: Sending pets to template = {pets}")
        print(f"📌 Debug: Treatments retrieved = {treatments}")
    return render_template('treatmentsummmary.html',
                           treatments=treatments,
                           pets=pets,
                           selected_pet=selected_pet)


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

