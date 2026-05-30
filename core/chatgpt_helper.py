import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

model_name = os.getenv("GEMINI_MODEL", "models/gemini-3.5-flash")
model = genai.GenerativeModel(model_name)


def get_answer_from_chatgpt(question: str) -> str:
    prompt = (
        "You are a helpful assistant that answers questions about electrical machines. "
        "Provide clear, concise explanations and mention relevant concepts like motors, "
        "generators, rotors, stators, torque, and efficiency when relevant."
    )

    try:
        response = model.generate_content(f"{prompt}\n\nQuestion: {question}")

        return response.text

    except Exception as e:
        return f"Error: {str(e)}"
