# GovtScheme AI Copilot

A complete production-grade AI chatbot platform specialized for Indian Government schemes, built with RAG architecture.

## Features
- **Conversational AI**: Works like ChatGPT / Microsoft Copilot with memory.
- **RAG Architecture**: Uses FAISS vector DB and `all-MiniLM-L6-v2` local embeddings to find relevant schemes instantly.
- **Streaming UI**: Next.js App Router, Tailwind CSS, streaming text generation, markdown rendering.
- **Accuracy Built-in**: System prompt constraints and distance thresholds prevent hallucinations on out-of-domain questions.

## Project Structure

- `backend/`: FastAPI Python backend for RAG and LLM integration.
- `frontend/`: Next.js 15 + Tailwind v4 application.

## Prerequisites
- Python 3.10+
- Node.js 18+
- An API Key compatible with OpenAI client (OpenAI, OpenRouter, Groq, etc.)

## Local Development Guide

### 1. Start the Backend

1. Navigate to the backend:
```bash
cd backend
```
2. Set up the virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
3. Run the data pipeline to generate the FAISS index (Only needed once, or when data changes):
```bash
python data_pipeline.py
```
4. Set your LLM API Key:
Rename `.env.example` to `.env` and fill in your API Key.
```bash
cp .env.example .env
```
5. Run the FastAPI server:
```bash
uvicorn main:app --reload
```

### 2. Start the Frontend

1. Navigate to the frontend:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment Guides

### Backend (Render)
1. Push the repository to GitHub.
2. In Render, create a new "Web Service" and connect your repo.
3. Choose the `backend` directory as the Root Directory.
4. Set the Build Command: `pip install -r requirements.txt` (or use the Dockerfile option by pointing Render to `backend/Dockerfile`).
5. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Set Environment Variables (`OPENAI_API_KEY`, etc.).
7. Make sure you commit the `faiss_index` folder or build it during the deploy phase.

### Frontend (Vercel)
1. In Vercel, import your GitHub repo.
2. Set the "Root Directory" to `frontend`.
3. Framework Preset: Next.js.
4. Deploy!
*(Note: If your backend URL changes on Render, update the `fetch` calls in `ChatInterface.tsx` to use `process.env.NEXT_PUBLIC_API_URL` instead of localhost).*
