from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

AGENT_URL = os.getenv("AGENT_URL")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"]
)

class Prompt(BaseModel):
    input: str

@app.post("/agent-response")
def call_agent(prompt: Prompt):
    response = requests.post(
        f"{AGENT_URL}/generate-response",
        json = {"input": prompt.input},
        timeout=60
    )

    data = response.json()

    return {"response": data} 
