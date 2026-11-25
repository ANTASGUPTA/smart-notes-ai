# Smart Notes AI

A full-stack knowledge-extraction app that turns unstructured notes into a summary, key points, and action items.

**Stack:** React 18, Node.js, Express, JavaScript, CSS

## What it does

Paste text into the React UI and the app returns:

- A short summary
- Key points
- Action items

The frontend calls a single `POST /analyze` endpoint on the Express backend and renders the result.

## How it works

- `frontend/` — React 18 single-page app with loading and empty states.
- `backend/` — Express server with CORS, JSON parsing, and a `POST /analyze` route.
- The analyzer is currently a rule-based stub: it takes the first sentences as the summary and flags sentences containing "should", "need", or "must" as action items. It runs without an API key and is isolated in `analyzeText()` so a real model call can replace it without changing the API contract.

## Run locally

### Backend

```bash
cd backend
npm install
node server.js
```

Runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend calls `http://localhost:5000/analyze`.

## API

| Method | Route | Body | Returns |
|---|---|---|---|
| POST | `/analyze` | `{ "text": "..." }` | `{ "result": "Summary: ...\nKey Points: ...\nAction Items: ..." }` |

Missing or empty `text` returns `400` with `{ "error": "Text is required" }`.

## Next steps

- Replace the stub analyzer with an LLM API call.
- Return structured JSON instead of a formatted string.
- Add persistence and user accounts.
- Add tests for the analyzer and API contract.
