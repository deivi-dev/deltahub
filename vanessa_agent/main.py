from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import agent

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

@app.post("/generate-response")
def run_agent(prompt: Prompt):
    response = agent.generate_response(prompt.input)
    return response