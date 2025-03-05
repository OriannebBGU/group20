from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
# Get the MongoDB URI from environment variables
uri = os.environ.get('DB_URI')

# Connect to MongoDB
client = MongoClient(uri)
db = client["vetrinatDB"]

# Fetch all collections in the database
collections = db.list_collection_names()

# Print each collection and its data
if collections:
    print("✅ Collections and their data in vetrinatDB:\n")
    for collection_name in collections:
        collection = db[collection_name]
        documents = list(collection.find())  # Get all documents

        print(f"📂 Collection: {collection_name}")

        if documents:
            for doc in documents:
                print(doc)  # Print each document
        else:
            print("   (No data in this collection)")

        print("-" * 50)  # Separator for readability
else:
    print("⚠️ No collections found in vetrinatDB.")
