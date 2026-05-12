# 🏛️ GovtScheme AI Copilot

**GovtScheme AI Copilot** is an intelligent, conversational AI assistant designed to help citizens easily navigate and discover Indian Government Schemes. By leveraging advanced Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs), the platform provides highly accurate, context-aware answers directly sourced from official government data.

## 🌟 Key Features

- **Conversational Interface**: A ChatGPT-style interface with real-time text streaming for a seamless user experience.
- **Retrieval-Augmented Generation (RAG)**: Uses FAISS vector databases to ensure the AI only answers based on verified scheme data, eliminating hallucinations.
- **Automated Missing-Info Ticketing**: If a user asks about a scheme that is not in the database, the AI automatically logs the query into a SQLite database and issues a Support Ticket ID (e.g., `#TKT-XYZ`) to the user.
- **FastAPI Backend**: A highly concurrent, scalable backend deployed via Docker.
- **Next.js Frontend**: A responsive, accessible, and beautifully designed light-themed UI mimicking official government portals.

---

## 🏗️ System Architecture

The project is decoupled into a frontend and backend architecture:

### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (`https://govtschemecopilot.vercel.app`)
- **Key Mechanics**: Server-Sent Events (SSE) stream parsing for typewriter-effect AI responses.

### Backend
- **Framework**: FastAPI (Python)
- **Embeddings Model**: `sentence-transformers/all-MiniLM-L6-v2`
- **Vector Database**: FAISS (Facebook AI Similarity Search)
- **LLM Provider**: Groq API (`llama-3.1-8b-instant`)
- **Deployment**: Hugging Face Spaces (Docker, 16GB RAM instance)
- **Ticketing Database**: SQLite (`tickets.db`) accessible via `/api/tickets`

---

## 🚀 Live Demo & API Endpoints

- **Frontend Portal**: [GovtScheme Copilot Vercel App](https://govtschemecopilot.vercel.app)
- **Backend API**: [Hugging Face Space](https://chauhanaman01-ovtscheme-backend.hf.space)
- **Ticket Viewer**: [View Logged Tickets](https://chauhanaman01-ovtscheme-backend.hf.space/api/tickets)

---

## 🛠️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AmanChauhan7010/GovtScheme-AI-Copilot.git
cd GovtScheme-AI-Copilot
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create a .env file based on .env.example
# Add your Groq API Key: OPENAI_API_KEY="gsk_..."

# Run the FastAPI server
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create a .env.local file
# Add: NEXT_PUBLIC_API_URL=http://localhost:8000

# Run the Next.js development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## 👥 Team ReLU Rangers
Developed with ❤️ as a Deep Learning project by:
- **Aman Chauhan** 
- **Kunal Pramanik** 
- **Jinal Sasiya**

*(Feel free to update this section with any additional team members or student IDs!)*

---
*Disclaimer: This project was created for educational purposes. All data is sourced from publicly available datasets.*
