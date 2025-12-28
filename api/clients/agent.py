import requests
from dotenv import load_dotenv
import os

load_dotenv()

AGENT_URL = os.getenv("AGENT_URL")


def request_response(prompt):
    try:
        response = requests.post(
            f"{AGENT_URL}/generate-response",
            json={"input": prompt.input},
            timeout=60,
        )

        response.raise_for_status()
        
        data = response.json()
        return {"response": data}

    except requests.exceptions.Timeout:
        return {"error": "The request timed out."}, 504

    except requests.exceptions.HTTPError as e:
        return {"error": "An HTTP error occurred while processing the request."}, 502
