from flask import Blueprint, render_template

# info blueprint definition
info = Blueprint(
    'info',
    __name__,
    static_folder='static',
    static_url_path='/info',
    template_folder='templates'
)


# Routes
@info.route('/info')
def info_func():
    return render_template('info.html')
