from flask import Flask, session
from flask_session import Session


# from db import db  # Import the db connection

###### App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')

###### Pages
## homepage
from pages.homepage.homepage import homepage
app.register_blueprint(homepage)

## info
from pages.Info.info import info
app.register_blueprint(info)

## login
from pages.login.login import login
app.register_blueprint(login)

## profile
from pages.Profile.profile import profile
app.register_blueprint(profile)

## registration
from pages.Registration.registration import registration
app.register_blueprint(registration)

## registration pet
from pages.RegistrationPet.registrationpet import registrationpet
app.register_blueprint(registrationpet)

## treatment summary
from pages.treatmentsummary.treatmentsummary import treatmentsummary
app.register_blueprint(treatmentsummary)

##navbar
from components.navbar.navbar import navbar
app.register_blueprint(navbar)

## Footer
from components.footer.footer import footer
app.register_blueprint(footer)

app.config['SESSION_TYPE'] = 'filesystem'  # Stores session data on the server
app.config['SESSION_PERMANENT'] = True
app.config['SESSION_COOKIE_NAME'] = 'session'  # This should be the default
app.config['SECRET_KEY'] = 'your_secret_key'  # Important for session encryption
Session(app)

if __name__ == '__main__':
    app.run(debug=True)

