from flask import Blueprint, render_template, request, session, flash, url_for, redirect
from db_connector import get_customer_by_email

# login blueprint definition
login = Blueprint(
    'login',
    __name__,
    static_folder='static',
    static_url_path='/login',
    template_folder='templates'
)


# Routes
@login.route('/login', methods=['GET', 'POST'])
def login_func():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        # Query the database for the customer by email
        user = get_customer_by_email(email)

        # Check if the user exists and if the password matches
        if user and user.get('Password') == password:
            session['logged_in'] = True
            session['user_email'] = email
            session["first_name"] = user["firstName"]
            session['user_role'] = user.get('Role')
            return redirect(url_for('homepage.homepage_func'))
        else:
            flash('דואר אלקטרוני או סיסמה שגויים.')
            return redirect(url_for('login.login_func'))
    return render_template('login.html')
