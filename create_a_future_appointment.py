from datetime import datetime, timedelta
from db_connector import insert_appointment, get_latest_future_appointment

# Define test data
pet_name = "שטות"
owner_email = "Shay@example.com"
future_date = datetime.now() + timedelta(days=5)  # Appointment 5 days from now

# Create a sample appointment
test_appointment = {
    "petName": pet_name,
    "owner": owner_email,
    "datetime": future_date,
    "treatment": "בדיקה כללית",
    "summary": "בדיקה רפואית שגרתית",
    "doctor": "rinat@vetrinat.com"
}

# Insert appointment into DB
insert_appointment(test_appointment)
print(f"✅ Inserted appointment for {pet_name} on {future_date.strftime('%d/%m/%Y %H:%M')}")
