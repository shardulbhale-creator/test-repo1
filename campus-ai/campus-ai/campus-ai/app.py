import os
import streamlit as st
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

st.set_page_config(page_title="Campus AI", page_icon="🎓")

st.title("🎓 Campus AI")
st.subheader("Your AI Study Assistant")

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    st.error("API key missing. Please check your .env file.")
    st.stop()

client = genai.Client(
    api_key=api_key,
    http_options=types.HttpOptions(timeout=60000)
)

question = st.text_area("Ask a question about your studies:")

if st.button("Ask AI"):
    if question.strip():
        with st.spinner("AI is thinking..."):
            try:
                response = client.models.generate_content(
                    model="gemini-3.5-flash-lite",
                    contents=f"Answer briefly in simple English: {question}",
                    config={"max_output_tokens": 256}
                )

                st.markdown("### 🤖 AI Answer")
                st.write(response.text)

            except Exception as e:
                st.error(f"Something went wrong: {e}")
    else:
        st.warning("Please enter a question.")