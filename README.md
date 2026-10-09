# AI Text Summarizer

An AI-powered text summarization application using a fine-tuned T5-small Transformer model, FastAPI, and a responsive web interface built with HTML, CSS, and JavaScript.

## Features

* AI-based dialogue summarization using T5-small.
* Fine-tuned on the SAMSum dataset.
* FastAPI backend for model inference.
* Responsive web interface.
* CUDA support for GPU inference when available.

## Tech Stack

* **Language:** Python
* **Model:** T5-small, Hugging Face Transformers
* **Dataset:** SAMSum
* **Backend:** FastAPI
* **Frontend:** HTML, CSS, JavaScript
* **Deep Learning:** PyTorch

## Project Structure

text-summarizer/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── requirements.txt
├── .gitignore
└── README.md


## Getting Started

### 1. Clone the Repository


git clone https://github.com/aryanmestry07/text-summarizer.git
cd text-summarizer


### 2. Install Dependencies


pip install -r requirements.txt


### 3. Add the Trained Model

The trained model files are not included in this repository because of their size.

Download or copy the fine-tuned model into:


backend/saved_summary_model/


The directory should contain the model configuration, weights, and tokenizer files.

### 4. Run the Backend

Open a terminal in the project root and run:


cd backend
uvicorn main:app --reload


The API will be available at:

http://127.0.0.1:8000


Open the interactive API documentation at `http://127.0.0.1:8000/docs`.

### 5. Run the Frontend

Open `frontend/index.html` using VS Code Live Server or another local web server.

Ensure the backend is running before generating summaries.

## How It Works

1. Enter dialogue or text into the web interface.
2. The frontend sends the input to the FastAPI backend.
3. The fine-tuned T5-small model generates a summary.
4. The summary is returned and displayed in the interface.

## Future Improvements

* Deploy the application online.
* Host the trained model on Hugging Face Hub.
* Improve summarization quality and evaluation.
* Add support for longer documents.

## Author

**Aryan Mestry**

[GitHub](https://github.com/aryanmestry07)
