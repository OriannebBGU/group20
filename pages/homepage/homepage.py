from flask import Blueprint, render_template

# homepage blueprint definition
homepage = Blueprint(
    'homepage',
    __name__,
    static_folder='static',
    static_url_path='/homepage',
    template_folder='templates'
)

# Routes
@homepage.route('/homepage')
@homepage.route('/')
def homepage_func():
    return render_template('homepage.html')

# @homepage.route('/homepage')
# def homepage_func():
#     return render_template('homepage.html')

