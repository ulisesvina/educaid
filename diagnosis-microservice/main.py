from fastapi import FastAPI
import uvicorn
import openai
import os
from dotenv import dotenv_values
import json
from transformers import pipeline

zeroshot = pipeline(model="facebook/bart-large-mnli")

config = dotenv_values(".env")
openai.api_key = config["API_KEY"]

app = FastAPI()

f = open('data/questions.json')
data = json.load(f)


def patient_description(answer):
    description = "Give a preliminary diagnose for this patient. Consider ALL the following symptoms when doing so. "
    if answer[0] == 1:
        description += "Patient has trouble developing social ties, "
    if answer[1] > 5:
        description += "patient has difficulty identifying emotions of others, "
    if answer[2] > 5:
        description += "patient has difficulty maintaining eye contact, "
    if answer[3] < 5:
        description += "patient dislikes physical contact, "
    if answer[4] > 6:
        description += "patient often have fixation for things to be kept in a certain order, "
    if answer[5] > 5:
        description += "patient dislikes change, "
    if answer[6] > 5:
        description += "patient keeps their interests rigid and without much change, "
    if (answer[9] > 5) or (answer[8] > 5) or (answer[7] > 5):
        description += "patient is sensitive to textures, loud noises or smells, "
    if answer[10] > 5:
        description += "patient has difficulty focusing, "
    else:
        description += "patient has NO problem focusing, "
    if answer[12] > 5:
        description += "patient often forgets things, "
    if answer[13] > 5:
        description += "patient cannot stay still, "
    if answer[14] > 5:
        description += "patient is uncomfortable standing still for too long, "
    if answer[15] > 5:
        description += "patient commonly interrupt others, "
    if answer[16] > 5:
        description += "patient cannot read long texts with ease, "
    if answer[17] > 5:
        description += "patient makes spelling mistakes often, "
    if answer[22] > 5:
        description += "patient often feels in another reality, "
    if answer[23] > 5:
        description += "patient expresses themselves with difficulty."
    if answer[24] > 5:
        description += "patient often thinks people is trying to hurt them, "
    return description


@app.get("/explain")
def explain(subject: str, condition: str, interest: str) -> dict:
    """Explain subject based on a list of interests"""
    base_text = f"Explain {subject} to a {condition} patient interested in {interest}"
    completion = openai.Completion.create(
        model="text-davinci-003",
        prompt=base_text,
        temperature=0,
        max_tokens=100
    )
    return completion


@app.post("/diagnosis")
def diagnosis(answers: list) -> dict:
    description = patient_description(answers)
    if description == "Give a preliminary diagnose for this patient. Consider ALL the following symptoms when doing so. ":
        description += "Patient has no symptoms."
    classification = zeroshot(description,
                              candidate_labels=[
                                  "autism", "adhd", "dyslexia", "schizophrenia", "nothing"],
                              )
    return {"diagnosis": classification["sequence"], "condition": classification["labels"][0]}
