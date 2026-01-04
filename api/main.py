from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from clients import agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"]
)

class Prompt(BaseModel):
    input: str

@app.post("/agent-response")
def handle_agent_request(prompt: Prompt):
        response = agent.request_response(prompt.input)
        return response