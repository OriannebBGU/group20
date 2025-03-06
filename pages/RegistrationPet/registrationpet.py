from flask import Blueprint, render_template, request, jsonify
from db_connector import insert_pet, get_pet_by_name

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
        print("Module name:", __name__)
        print("✅ Received a POST request to register a pet.")

        # Ensure JSON data exists
        if not request.is_json:
            print("❌ Error: Request does not contain JSON data")
            return jsonify({"error": "Invalid request format. Expected JSON."}), 400

        data = request.json
        petName = data.get("petName").strip().lower()
        type = data.get("type").strip()
        ownerEmail = data.get("ownerEmail").strip()
        gender = data.get("gender").strip()
        print(f"✅ Received pet data: {data}")

        new_pet = {
            "petName": petName,
            "ownerEmail": ownerEmail,
            "type": type,
            "gender": gender
        }
        insert_pet(new_pet)

        return jsonify({"message": "ההרשמה בוצעה בהצלחה!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500