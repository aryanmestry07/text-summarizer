from fastapi import FastAPI , Request
from pydantic import BaseModel
from transformers import T5ForConditionalGeneration , T5Tokenizer
import torch
import re
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title= "Text Summerizer App",
    description= "Text Summerizer using T-5 model",
    version = "1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = T5ForConditionalGeneration.from_pretrained("./saved_summary_model")
tokenizer = T5Tokenizer.from_pretrained("./saved_summary_model")


# Device Selection

if torch.backends.mps.is_available():
    device = torch.device("mps")
elif torch.cuda.is_available():
    device = torch.device("cuda")
else:
    device = torch.device("cpu")

print("device: " , device)
model.to(device) # type: ignore


class DialogueInput(BaseModel):
    dialogue : str

# cleaning data 

def clean_data(text):
    text = re.sub(r"\r\n" , " " , text)
    text = re.sub(r"\s+" , " " , text)
    text = re.sub(r"<.*?>" , " " , text)
    text = text.strip().lower()
    return text


def summerize_dialogue(dialogue):
    dialogue = clean_data(dialogue)  # clean

    # tokenize
    inputs = tokenizer(
        dialogue,
        padding= "max_length",
        max_length= 512,
        truncation= True,
        return_tensors= "pt"
    )

    # Move inputs to the same device as the model
    inputs = {
        key: value.to(device)
        for key, value in inputs.items()
    }

    targets = model.generate( # type: ignore
    input_ids=inputs["input_ids"],
    attention_mask=inputs["attention_mask"],
    max_length=100,
    min_length=30,
    num_beams=5,
    no_repeat_ngram_size=3,
    repetition_penalty=1.2,
    length_penalty=1.0,
    early_stopping=True
)

    # decode out output
    summary = tokenizer.decode(targets[0] , skip_special_tokens=True)
    return summary.capitalize()


# API endpoints

@app.post("/summarize")
async def summerize(dialogue_input : DialogueInput):
    summary = summerize_dialogue(dialogue_input.dialogue)
    return {"summary" : summary}

