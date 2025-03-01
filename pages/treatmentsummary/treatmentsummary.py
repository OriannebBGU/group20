from flask import Blueprint, render_template

# treatmentsummary blueprint definition
treatmentsummary = Blueprint(
    'treatmentsummary',
    __name__,
    static_folder='static',
    static_url_path='/treatmentsummary',
    template_folder='templates'
)


# Routes
@treatmentsummary.route('/treatmentsummary')
def treatmentsummary_func():
    return render_template('treatmentsummmary.html')
