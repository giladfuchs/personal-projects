#!/bin/bash
echo Starting server
python -m uvicorn app.main:app --workers 3 --host 0.0.0.0 --port 80
