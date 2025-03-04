from pymongo import MongoClient
import os

MONGO_URI = os.environ.get('DB_URI')

try:
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client["vetrinatDB"]

    # Create or get the "customers" collection
    customers_collection = db["customers"]

    # Insert multiple customer records
    customers_to_delete = ["Orianne", "Shay", "Rinat"]

    # Delete customers
    deleted_count = 0
    for name in customers_to_delete:
        result = customers_collection.delete_one({"firstName": name})
        if result.deleted_count > 0:
            print(f"✅ Deleted customer: {name}")
            deleted_count += 1
        else:
            print(f"⚠️ Customer '{name}' not found.")

except Exception as e:
    print(f"❌ Error: {e}")  # This handles any MongoDB connection or query errors.