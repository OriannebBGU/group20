from flask import Blueprint, render_template

# registration blueprint definition
registration = Blueprint(
    'registration',
    __name__,
    static_folder='static',
    static_url_path='/registration',
    template_folder='templates'
)


# Routes
@registration.route('/registration')
def registration_func():
    return render_template('registration.html')
