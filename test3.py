from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("DB_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["vetrinatDB"]

# List of collections to clear
collections = ["customers", "pets", "appointments"]

appointments_col = db["appointments"]  # This is where treatments are stored

# Get all treatments in the database
all_treatments = list(appointments_col.find({}))

print("📌 All treatments in the database:", all_treatments)

# Get treatments for a specific pet
pet_name = "שטות"  # Make sure this matches exactly
treatments_for_pet = list(appointments_col.find({"petName": pet_name}))

print(f"📌 Treatments for pet {pet_name}:", treatments_for_pet)
