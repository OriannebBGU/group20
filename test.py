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

# Delete all documents in each collection
for collection_name in collections:
    collection = db[collection_name]
    delete_result = collection.delete_many({})  # Deletes all documents
    print(f"✅ Deleted {delete_result.deleted_count} documents from '{collection_name}'")

print("\n⚠️ All data has been deleted, but collections still exist.")
