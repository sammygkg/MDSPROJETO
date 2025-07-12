@echo off
echo Starting SIGAA Backend API...
cd backend
call .venv\Scripts\activate.bat
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
pause