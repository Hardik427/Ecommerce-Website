import requests
import random

# Fetch products
response = requests.get("https://dummyjson.com/products?limit=20")
if response.status_code != 200:
    print("❌ Failed to fetch products.")
    exit()

all_products = response.json().get("products", [])

# POST URL
url = "http://localhost:5000/api/products/create-product"

# Color and author options for mock data
colors = ["black", "red", "blue", "green", "brown", "white"]
author = "68382ef2f232c02237e17203"

for product in all_products:
    filtered_product = {
        "id": product.get("id"),
        "name": product.get("title"),
        "category": product.get("category"),
        "description": product.get("description"),
        "price": product.get("price"),
        "oldPrice": round(product.get("price") * (1 + product.get("discountPercentage", 0)/100), 2),
        "image": product.get("thumbnail") or (product.get("images")[0] if product.get("images") else ""),
        "color": random.choice(colors),
        "rating": product.get("rating"),
        "author": author
    }

    # Send to backend
    try:
        res = requests.post(url, json=filtered_product)
        if res.status_code in [200, 201]:
            print(f"✔️ Uploaded: {filtered_product['name']}")
        else:
            print(f"❌ Failed: {filtered_product['name']} - {res.status_code}: {res.text}")
    except Exception as e:
        print(f"❌ Error uploading {filtered_product['name']}: {e}")
