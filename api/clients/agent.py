import requests
from dotenv import load_dotenv
import os
from fastapi.responses import JSONResponse

load_dotenv()

AGENT_URL = os.getenv("AGENT_URL")


def request_response(prompt):
    try:
        response = requests.post(
            f"{AGENT_URL}/generate-response",
            json={"input": prompt},
            timeout=60,
        )

        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        return {"error": "The request timed out."}, 504

    except requests.exceptions.HTTPError as e:
        return {"error": "An HTTP error occurred while processing the request."}, 502
