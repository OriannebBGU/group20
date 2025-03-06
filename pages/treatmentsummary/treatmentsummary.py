from flask import Blueprint, render_template, jsonify
from db_connector import get_treatments_for_pet

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
