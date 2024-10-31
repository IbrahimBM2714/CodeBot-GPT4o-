import os
from dotenv import load_dotenv
from pydantic import BaseModel
from openai import OpenAI
from instructor import patch

load_dotenv()

os.getenv('OPENAI_API_KEY')

client = patch(OpenAI())


class ChallengeIdeaResponse(BaseModel):
    story_intro: str
    challenge_details: str
    test_cases: str


class CodeCheckResponse(BaseModel):
    result: str
    feedback: str


class HintResponse(BaseModel):
    hint: str


class solutionResponse(BaseModel):
    solution: str


prev_story = []
hints = []


def ask_language_and_level():
    language = input("Please enter your programming language: ")
    level = input(
        "Please enter your skill level (beginner, intermediate, or advanced): ")
    return language, level


def generate_challenge_idea():

    global prev_story
    global hints

    hints = []
    prev_story = []

    system_prompt = f"""
    You are an expert coding challenge generator. Create a unique programming challenge based on the following criteria:

    The challenge should be embedded within an engaging story, set in one of the following genres:
    - Fantasy
    - Sci-Fi
    - Dystopian
    - Historical

    **Story Requirements:**
    - Introduce unique characters, places, and quests that fit the chosen genre.
    - Develop a vivid setting and backstory to make the challenge immersive.
    - Explain the context and objective clearly, so the user understands what problem they need to solve.
    - The problem should align with the skill level specified.

    **Challenge Requirements:**
    - The coding problem must be easy.
    - The coding problem must involve a clear and realistic task that could be solved programmatically.
    - Clearly state the inputs, expected outputs, and any constraints.
    - Make sure the problem aligns with the skill level, using relevant concepts (e.g., data structures, algorithms, recursion).
    - Make sure to clearly express the problem so that there can be no question raised regarding the understanding of the problem

    **Test Cases:**
    - Provide a set of unique and comprehensive test cases, including edge cases.
    - Specify input examples and expected output for each case.
    - Make sure to explain the test case too.
    - Ensure that the test cases thoroughly cover different scenarios, demonstrating the range of valid inputs.

    Please ensure the story and problem are connected, with the programming task naturally arising from the scenario. Be creative and imaginative to make the challenge engaging and fun to solve.

    Also make sure the text is formatted in such a way that it can be properly displayed in html tags
    """

    user_message = "Please create one unique programming challenge."

    response = client.chat.completions.create(
        model="gpt-4o",
        response_model=ChallengeIdeaResponse,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        max_tokens=5000
    )

    prev_story.append(response.story_intro)

    print(f"\n\n{prev_story}\n\n")

    return response


def follow_up_challenge():
    global prev_story
    global hints

    hints = []

    print(f"\n\n{prev_story}\n\n")

    system_prompt = f"""
        You are a coding challenge generator that creates challenges in the form of a story. The current story has been: {prev_story}.

        I want you to create a follow-up story that continues the main narrative. The new challenge should be an extension of the existing story, introducing slightly more complexity but remaining accessible.

        **Requirements for the Follow-Up Story:**
        - Build upon the existing characters and setting from the original story.
        - Introduce new elements or obstacles that create a sense of progression.
        - Clearly define the new programming task related to the story, ensuring it feels natural and connected to the previous challenge.
        - The difficulty of the new challenge should be slightly increased, maintaining engagement without overwhelming the user.

        Please make the follow-up engaging, ensuring it captures the essence of the original story while offering a fresh and challenging experience.

        Also make sure the text is formatted in such a way that it can be properly displayed in html tags
    """

    user_message = "Please generate the follow-up story."

    response = client.chat.completions.create(
        model="gpt-4o",
        response_model=ChallengeIdeaResponse,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        max_tokens=5000
    )

    prev_story.append(response.story_intro)

    return response


def check_solution(user_code, challenge, challenge_description, challenge_cases):

    system_prompt = f"You are a code evaluator. The challenge is {challenge}. The description of the challenge {challenge_description} the test cases of the challenge are: {
        challenge_cases}. You should test case the user's code to see if it solves the challenge and passes all the test cases. If the challenge was successfully passed, return the result (e.g. Correct or Wrong). If the result was Correct, give some affirmation. After that explain the time and space complexity of the solution, check the readability of the code and give general advice what can be done to improve the code if applicable. If the result was Wrong, show the test cases it did not pass, point out anything wrong in the syntax, and dont give any hints on how to solve the solution.Also make sure the text is formatted in such a way that it can be properly displayed in html tags"
    user_message = f"Here is the user code: {user_code}"

    response = client.chat.completions.create(
        model="gpt-4o",
        response_model=CodeCheckResponse,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        max_tokens=5000
    )

    return response.result, response.feedback


def provide_hint(user_code, challenge, challenge_description, challenge_cases):

    global hints

    print(f"\n\n{hints}\n\n")

    system_prompt = f"You are a hint provider for a coding game. The user is trying to solve the problem: {challenge}. The description of the challenge is {challenge_description}The problem has the following test cases that need to be passed: {
        challenge_cases}. The user wasn't able to solve this problem. Its your job to give the user a very gentle hint that wont give away the entire solution. Up till now the following hints have been: {hints}. Give a new hint and dont give the code.Also make sure the text is formatted in such a way that it can be properly displayed in html tags"
    user_message = f"User's code: {
        user_code} Provide a hint or suggest an alternative approach."

    response = client.chat.completions.create(
        model="gpt-4o",
        response_model=HintResponse,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        max_tokens=5000
    )

    hints.append(response.hint)
    return response.hint


def get_solution(challenge, challenge_description, challenge_cases):
    global hints
    global prev_story
    system_prompt = f"You are problem solver. Your task is to solve and explain the following problem. The problem statement is {
        challenge}. The problem description is {challenge_description}. The problem test cases that need to be passed are: {challenge_cases}."
    user_message = f"Solve the problem in Java, Python, and C++ and explain the solution in detail. Also make sure the text is formatted in such a way that it can be properly displayed in html tags"

    response = client.chat.completions.create(
        model="gpt-4o",
        response_model=solutionResponse,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        max_tokens=5000
    )

    prev_story = []
    hints = []

    return response.solution
