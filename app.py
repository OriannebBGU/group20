from flask import Flask
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



