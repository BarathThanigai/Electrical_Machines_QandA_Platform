import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env


def get_answer_from_chatgpt(question: str) -> str:
    """Return an electrical machines answer from OpenAI Chat Completion."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return "Error: OPENAI_API_KEY is not configured. Please set it in .env."

    client = OpenAI(api_key=api_key)
    model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
    prompt = (
        "You are a helpful assistant that answers questions about electrical machines. "
        "Provide clear, concise explanations and mention relevant concepts like motors, generators, rotors, stators, torque, and efficiency."
    )

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": question},
            ],
            max_tokens=500,
            temperature=0.2,
        )
        answer = response.choices[0].message.content
        return answer.strip()
    except Exception as exception:
        return f"Error: {str(exception)}"
