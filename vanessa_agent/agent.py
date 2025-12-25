import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("API_URL")

def generate_response(prompt):
    try:
        response = requests.post(
            f"{API_URL}/generate-text", 
            json = {"prompt": prompt},
            timeout=60
        )
        
        data = response.json()

        if ("result" in data):
            data = data["result"]
        else:
            data = "The response did not provide the expected parameters."
    except Exception:
        data = "An error has occurred"
        
    return data