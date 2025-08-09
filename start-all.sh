#!/bin/bash
# Navigate to backend and start Flask
cd suite_backend
source .venv/bin/activate
export FLASK_APP=app.py
export FLASK_RUN_PORT=5001
flask run --host=0.0.0.0 --port=5001 &
BACKEND_PID=$!

# Navigate to frontend and start Next.js
cd ../ui
npm run dev &
FRONTEND_PID=$!

# Wait so both stay alive
wait $BACKEND_PID $FRONTEND_PID
