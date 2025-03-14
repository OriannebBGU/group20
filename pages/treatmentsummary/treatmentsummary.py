from flask import Blueprint, render_template, jsonify, request, session
from db_connector import get_treatments_for_pet, get_treatment_details, get_pets_for_owner, get_customer_by_email, \
    get_all_treatments, get_all_pets, get_pet_by_id
from datetime import datetime
from bson.objectid import ObjectId

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
        # For Role 2 users (vets/doctors), get all pets
        if user_role == 2:
            # Get all treatments from the database
            treatments = get_all_treatments()
            # Get all pets for display in the dropdown
            pets = get_all_pets()
        else:
            # For regular users, get only their pets
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

        # Check if a specific pet_id was provided in the URL
        pet_id_param = request.args.get('pet_id')

        if pet_id_param and user_role == 1:
            # Try to get the pet by ID
            try:
                pet = get_pet_by_id(ObjectId(pet_id_param))
                if pet and pet.get('owner') == user_email:
                    # If the pet belongs to the current user, use its name
                    selected_pet = pet.get('petName')
                    treatments = get_treatments_for_pet(selected_pet)
                else:
                    # If pet doesn't exist or doesn't belong to user, fall back to default
                    if pets:
                        selected_pet = pets[0]['petName']
                        treatments = get_treatments_for_pet(selected_pet)
            except:
                # If there's an error (e.g., invalid ObjectId), fall back to default
                if pets:
                    selected_pet = pets[0]['petName']
                    treatments = get_treatments_for_pet(selected_pet)
        # If no pet_id parameter or error, use default behavior
        elif pets and user_role == 1:
            selected_pet = pets[0]['petName']
            treatments = get_treatments_for_pet(selected_pet)
        elif pets and user_role == 2:
            # For Role 2, use the selected pet if specified, otherwise show all
            selected_pet = request.args.get('pet_id')
            if selected_pet:
                treatments = get_treatments_for_pet(selected_pet)

    return render_template('treatmentsummmary.html',
                           treatments=treatments,
                           pets=pets,
                           selected_pet=selected_pet,
                           user_role=user_role)  # Pass user_role to template


@treatmentsummary.route('/get-treatments/<pet_id>', methods=['GET'])
def get_treatments(pet_id):
    treatments = get_treatments_for_pet(pet_id)
    return jsonify(treatments)


@treatmentsummary.route('/get-treatment-details', methods=['POST'])
def get_treatment_details_func():
    try:
        data = request.get_json()

        pet_id = data.get('petId')
        treatment_datetime_str = data.get('datetime')

        if not pet_id or not treatment_datetime_str:
            return jsonify({"error": "Missing petId or datetime"}), 400

        # Debug datetime conversion
        try:
            treatment_datetime = datetime.fromisoformat(treatment_datetime_str.replace('Z', '+00:00'))
        except ValueError as ve:
            print(f"❌ Error converting datetime: {ve}")
            return jsonify({"error": "Invalid datetime format"}), 400

        treatment_details = get_treatment_details(pet_id, treatment_datetime)  # Correct

        if not treatment_details:
            print(f" Error: No treatment found for pet ID {pet_id} at {treatment_datetime}")
            return jsonify({"error": "Treatment not found"}), 404

        print(f" Found treatment details: {treatment_details}")
        return jsonify(treatment_details)

    except Exception as e:
        print(f" Fatal Error in get-treatment-details: {e}")
        return jsonify({"error": "Internal server error"}), 500


@treatmentsummary.route('/get-all-treatments', methods=['GET'])
def get_all_treatments_route():
    # Only allow Role 2 users to access this endpoint
    user_email = session.get('user_email')
    user_data = get_customer_by_email(user_email) if user_email else None
    user_role = user_data.get('Role') if user_data else None

    if user_role != 2:
        return jsonify({"error": "Unauthorized"}), 403

    treatments = get_all_treatments()
    return jsonify(treatments)


@treatmentsummary.route('/debug-session')
def debug_session():
    session['test_value'] = 'working'  # Force setting a session key
    print(f"📌 Debug: Incoming cookies = {request.cookies}")
    return jsonify({
        "session_user_id": session.get('user_id'),
        "test_value": session.get('test_value'),  # Should be 'working' on refresh
        "cookies": request.cookies.get('session')
    })
