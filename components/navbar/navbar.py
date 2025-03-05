from flask import Blueprint, render_template

# navbar blueprint definition
navbar = Blueprint(
    'navbar',
    __name__,
    static_folder='static',
    static_url_path='/navbar',
    template_folder='templates'
)
@navbar.route('/logout')
def logout():
    # session.clear()
    return render_template('homepage.html')