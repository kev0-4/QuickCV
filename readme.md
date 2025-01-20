# HR Tech Web Application

This project is an HR Tech web application designed to simplify the hiring process by enabling CV uploads, extracting candidate information using advanced AI, and managing data efficiently.
# Hosting:
1. Frontend on Vercel : `https://quickcvfrontend-git-main-kev0-4s-projects.vercel.app/`
2. Backend on Render : ` ` // localhost renderer not working
## Backend Setup

1. Navigate to the `/backend` directory.
2. Install the dependencies: `pip install -r requirements.txt`
3. Run the local server: `uvicorn main:app --reload`

**Routes:**

* `http://127.0.0.1:8000/api/get_details`
* `http://127.0.0.1:8000/api/upload_cv`
* `http://127.0.0.1:8000/docs`

**Note:** The backend is built using **FastAPI** and **Uvicorn**.

## Frontend Setup

1. Navigate to the `/HRwebapp` directory.
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`

## Database

CVs are stored in Cloudflare R2 object storage. Candidate details are stored as an Excel file (`.xlsx`) in R2.

## Frontend Technology

The frontend is built using Vite and React (JavaScript).
