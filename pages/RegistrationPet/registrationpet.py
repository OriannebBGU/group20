from flask import Blueprint, render_template

# registrationpet blueprint definition
registrationpet = Blueprint(
    'registrationpet',
    __name__,
    static_folder='static',
    static_url_path='/registrationpet',
    template_folder='templates'
)


# Routes
@registrationpet.route('/registrationpet')
def registrationpet_func():
    return render_template('registrationpet.html')
