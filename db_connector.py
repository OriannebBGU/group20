import os
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
# Get your MongoDB URI from .env file
uri = os.environ.get('DB_URI')

# Create cluster
cluster = MongoClient(uri, server_api=ServerApi('1'))

# Connect to the database
vetrinat_DB = cluster['vetrinatDB']

# Create collections
customers_col = vetrinat_DB['customers']
pets_col = vetrinat_DB['pets']
appointments_col = vetrinat_DB['appointments']


# ----------------- INSERT SAMPLE DATA ----------------- #
def insert_first_users():
    customers_data = [
        {"firstName": "אוריין", "lastName": "שקולניק", "Email": "orianne@post.bgu.ac.il", "Password": "Vetrinat123",
         "PhoneNumber": "0544315107", "Role": 1},
        {"firstName": "שי", "lastName": "צפתי", "Email": "Shay@example.com", "Password": "Secret123",
         "PhoneNumber": "0521234567", "Role": 1},
        {"firstName": "רינת", "lastName": "אוהבת-חיות", "Email": "rinat@vetrinat.com", "Password": "Password456",
         "PhoneNumber": "0539876543", "Role": 2}
    ]
    customers_col.insert_many(customers_data)
    print(f"✅ הוזנו {len(customers_data)} לקוחות")


def insert_first_pets():
    pets_data = [
        {"petName": "צ'לסי", "type": "חתול", "gender": "נקבה", "birthdate": datetime(2021, 7, 1),
         "weight": 5, "owner": "oriane@post.bgu.ac.il"},
        {"petName": "שטות", "type": "כלב", "gender": "נקבה", "birthdate": datetime(2015, 5, 13),
         "breed": "מעורב", "weight": 10, "owner": "Shay@example.com"}
    ]
    pets_col.insert_many(pets_data)
    print(f"✅ הוזנו {len(pets_data)} חיות מחמד")


def insert_first_appointments():
    appointments_data = [
        {"petName": "צ'לסי", "owner": "oriane@post.bgu.ac.il", "datetime": datetime(2024, 3, 10, 10, 0),
         "treatment": "חיסון", "summary": "חיסון שגרתי", "doctor": "rinat@vetrinat.com"},
        {"petName": "צ'לסי", "owner": "oriane@post.bgu.ac.il", "datetime": datetime(2024, 4, 5, 14, 30),
         "treatment": "בדיקה כללית", "summary": "בדיקה רפואית שנתית", "doctor": "rinat@vetrinat.com"},
        {"petName": "שטות", "owner": "Shay@example.com", "datetime": datetime(2024, 5, 20, 9, 45),
         "treatment": "ניקוי שיניים", "summary": "ניקוי שיניים יסודי", "doctor": "rinat@vetrinat.com"}
    ]
    appointments_col.insert_many(appointments_data)
    print(f"✅ הוזנו {len(appointments_data)} פגישות")


# ----------------- CRUD FUNCTIONS ----------------- #
# Customers
def get_list_of_customers():
    return list(customers_col.find())


def insert_customer(customer_dict):
    customers_col.insert_one(customer_dict)


def get_customer_by_email(email):
    return customers_col.find_one({"Email": email})


def update_customer(email, update_data):
    customers_col.update_one({"Email": email}, {"$set": update_data})


def delete_customer(email):
    customers_col.delete_one({"Email": email})


# Pets
def get_list_of_pets():
    return list(pets_col.find())


def insert_pet(pet_dict):
    pets_col.insert_one(pet_dict)


def get_pet_by_name(pet_name):
    return pets_col.find_one({"petName": pet_name})


def update_pet(pet_name, update_data):
    pets_col.update_one({"petName": pet_name}, {"$set": update_data})


def delete_pet(pet_name):
    pets_col.delete_one({"petName": pet_name})


# Appointments
def get_list_of_appointments():
    return list(appointments_col.find())


def insert_appointment(appointment_dict):
    appointments_col.insert_one(appointment_dict)


def get_appointment_by_pet_owner(pet_name, owner_email):
    return appointments_col.find_one({"petName": pet_name, "owner": owner_email})


def update_appointment(pet_name, owner_email, update_data):
    appointments_col.update_one({"petName": pet_name, "owner": owner_email}, {"$set": update_data})


def delete_appointment(pet_name, owner_email):
    appointments_col.delete_one({"petName": pet_name, "owner": owner_email})


# ----------------- INITIAL DATA INSERTION ----------------- #
if __name__ == "__main__":
    insert_first_users()
    insert_first_pets()
    insert_first_appointments()
