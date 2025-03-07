from flask import Blueprint, render_template, jsonify, request
from db_connector import get_treatments_for_pet, get_treatment_details
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
    pet_name = "שטות"  # Hardcoded for now, will be dynamic later
    treatments = get_treatments_for_pet(pet_name)

    return render_template('treatmentsummmary.html', treatments=treatments)


@treatmentsummary.route('/get-treatments/<pet_name>', methods=['GET'])
def get_treatments(pet_name):
    treatments = get_treatments_for_pet(pet_name)
    return jsonify(treatments)


@treatmentsummary.route('/get-treatment-details', methods=['POST'])
def get_treatment_details_func():
    try:
        data = request.get_json()
        print(f"📌 Received request data: {data}")  # ✅ Debugging line

        pet_name = data.get('petName')
        treatment_datetime_str = data.get('datetime')

        if not pet_name or not treatment_datetime_str:
            print("❌ Error: Missing petName or datetime in request")
            return jsonify({"error": "Missing petName or datetime"}), 400

        # Debug datetime conversion
        try:
            treatment_datetime = datetime.fromisoformat(treatment_datetime_str.replace('Z', '+00:00'))
            print(f"✅ Parsed datetime: {treatment_datetime}")  # ✅ Debugging line
        except ValueError as ve:
            print(f"❌ Error converting datetime: {ve}")
            return jsonify({"error": "Invalid datetime format"}), 400

        treatment_details = get_treatment_details(pet_name, treatment_datetime)

        if not treatment_details:
            print(f"❌ Error: No treatment found for {pet_name} at {treatment_datetime}")
            return jsonify({"error": "Treatment not found"}), 404

        print(f"✅ Found treatment details: {treatment_details}")
        return jsonify(treatment_details)

    except Exception as e:
        print(f"❌ Fatal Error in get-treatment-details: {e}")
        return jsonify({"error": "Internal server error"}), 500
