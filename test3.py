from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("DB_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["vetrinatDB"]

# List of collections to clear
collections = ["customers", "pets", "appointments"]

appointments_col = db["appointments"]  # This is where treatments are stored

treatment_data = {
    "petName": "מישל",
    "owner": "Shay@example.com",
    "datetime": datetime(2024, 2, 15, 9, 0),  # 🕒 Past date: February 15, 2024, at 09:00
    "treatment": "בדיקה שגרתית",
    "summary": "בדיקה כללית לבדיקת מצב הבריאות של מישל",
    "doctor": "rinat@vetrinat.com"  # 🩺 Vet handling the treatment
}

# Insert into the database
result = appointments_col.insert_one(treatment_data)

# Confirmation
if result.inserted_id:
    print(f"✅ Treatment added for מישל (Michelle) with ID: {result.inserted_id}")
else:
    print("❌ Failed to add treatment.")
