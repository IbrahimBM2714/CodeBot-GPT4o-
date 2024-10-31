from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm import generate_challenge_idea, check_solution, provide_hint, get_solution, follow_up_challenge
from pydantic import BaseModel


class Code_and_hint(BaseModel):
    code: str
    idea: str
    story: str
    test_cases: str


class Solution(BaseModel):
    idea: str
    story: str
    test_cases: str


class Story(BaseModel):
    story: str
    test_cases: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/generate-challenge")
async def generate_challenge():
    challenge = generate_challenge_idea()

    return challenge


@app.get("/generate-follow-up-challenge")
async def generate_follow_up_story():
    follow_up_story = follow_up_challenge()

    return follow_up_story


@app.post("/check-code")
async def check_code(obj: Code_and_hint):
    print(f"\n\n{obj.code}\n\n")
    result, feedback = check_solution(
        obj.code, obj.idea, obj.story, obj.test_cases)

    return result, feedback


@app.post("/provide-hint")
async def provide_hint_for_solution(obj: Code_and_hint):
    hint = provide_hint(obj.code, obj.idea, obj.story, obj.test_cases)

    return hint


@app.post("/get-solution")
async def get_solution_of_problem(obj: Solution):
    solution = get_solution(obj.idea, obj.story, obj.test_cases)

    return solution


@app.get("/")
async def root():
    return {"message": "Hello World"}
