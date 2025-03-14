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

        if not user:  # If no user is found, treat it like a wrong password
            flash('דואר אלקטרוני או סיסמה שגויים.')
            return redirect(url_for('login.login_func'))

        stored_password = user.get('Password') or user.get('password')  # Check both variations

        if user and stored_password == password:

            session['logged_in'] = True
            session['user_email'] = email
            session["first_name"] = user["firstName"]
            session['user_role'] = user.get('Role')
            #  Store user_id in session (assuming user['_id'] exists)
            session['user_id'] = str(user['_id'])  # Convert ObjectId to string if needed
            return redirect(url_for('homepage.homepage_func'))
        else:
            flash('דואר אלקטרוני או סיסמה שגויים.')
            return redirect(url_for('login.login_func'))
    return render_template('login.html')
