from flask import Blueprint, render_template, request, jsonify
from db_connector import insert_pet, get_pet_by_name
from datetime import datetime

# Pet Registration blueprint
registrationpet = Blueprint(
    'registrationpet',
    __name__,
    static_folder='static',
    static_url_path='/registrationpet',
    template_folder='templates'
)

@registrationpet.route('/registrationpet')
def registrationpet_func():
    return render_template('registrationpet.html')

@registrationpet.route('/register-pet', methods=['POST'])
def register_pet():
    try:
        print("✅ Received a POST request to register a pet.")

        if not request.is_json:
            print("❌ Error: Request does not contain JSON data")
            return jsonify({"error": "Invalid request format. Expected JSON."}), 400

        data = request.json
        petName = data.get("petName", "").strip().lower()
        type = data.get("type", "").strip()
        gender = data.get("gender", "").strip()
        ownerEmail = data.get("ownerEmail", "").strip()

        if not ownerEmail:
            print("❌ Error: Missing owner email")
            return jsonify({"error": "No owner email provided."}), 400

        print(f"✅ Received pet data: {data}")

        birthdate_str = data.get("birthdate")
        breed = data.get("breed")

        # Ensure birthdate_str and breed are strings before calling .strip()
        birthdate_str = birthdate_str.strip() if isinstance(birthdate_str, str) else ""
        breed = breed.strip() if isinstance(breed, str) else ""

        weight_raw = data.get("weight", None)  # ✅ Ensure we get None if weight is missing
        weight = None
        if weight_raw not in (None, "", "null"):  # ✅ Handle empty or null values properly
            try:
                weight = float(weight_raw)  # ✅ Convert to float safely
            except (ValueError, TypeError):
                print(f"❌ Invalid weight format received: {weight_raw}")
                return jsonify({"error": "Invalid weight format"}), 400

        # Convert birthdate to datetime object if provided
        birthdate = None
        if birthdate_str:
            try:
                birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
            except ValueError:
                print(f"❌ Invalid birthdate format received: {birthdate_str}")
                return jsonify({"error": "Invalid birthdate format"}), 400

        new_pet = {
            "petName": petName,
            "owner": ownerEmail,
            "type": type,
            "gender": gender,
            "birthdate": birthdate,
            "breed": breed if breed else None,
            "weight": weight  # ✅ Store weight as a float
        }

        insert_pet(new_pet)

        return jsonify({"message": "ההרשמה בוצעה בהצלחה!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
