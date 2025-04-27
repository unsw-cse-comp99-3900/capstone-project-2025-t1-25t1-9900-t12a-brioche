# Project Title: Capstone Project - SDG Knowledge Management System

## Project Structure

```
capstone-project-final-for-submit/
├── Backend/
│   ├── djangoProject/
│   │   ├── auth_api/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   ├── brioche_backup.sql
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   ├── test.py
│   ├── wait_for_db.sh
│
├── Frontend/
│   └── sdg/
│       ├── public/
│       ├── src/
│       ├── build/
│       ├── node_modules/
│       ├── Dockerfile
│       ├── package.json
│       ├── package-lock.json
│
├── docker-compose.yml
├── brioche_backup.sql
```

## How to Run

### Prerequisites

- Docker
- Docker Compose

No additional installation of Python, Node.js, or MySQL is required locally.  
Only Docker and Docker Compose are needed.

### Start the Project

In the project root directory, execute the following command:

```
docker compose up --build
```

This will automatically:

- Start the Django backend server at `localhost:8000`
- Start the React frontend server at `localhost:3000`
- Start the MySQL database server at `localhost:3307`

### Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Included Dependencies

### Backend (Python)

From `requirements.txt`:

- Django==5.1.7
- djangorestframework==3.15.2
- djangorestframework_simplejwt==5.5.0
- django-cors-headers==4.7.0
- mysqlclient==2.2.7
- Other common libraries (requests, pandas, scipy, torch, etc.)

All necessary backend dependencies are included in `requirements.txt` and will be automatically installed during container build.

### Frontend (Node.js)

From `package.json`:

- react
- react-dom
- react-router-dom
- formik
- yup
- axios
- firebase
- pptxgenjs
- react-scripts
- web-vitals

All necessary frontend dependencies are declared in `package.json` and will be automatically installed during container build.

## Important Configuration Details

- CORS configuration allows the frontend (localhost:3000) to communicate with the backend (localhost:8000).
- JWT authentication is implemented using SimpleJWT.
- MySQL database connection is configured for the `brioche` database inside the db container.
- `wait_for_db.sh` ensures the backend service starts only after the database is ready.
- Static files and API endpoints are properly exposed through the container settings.

## Special Notes

- Do not run `python manage.py runserver` or `npm start` individually.  
  Always use `docker compose up` to start all services together.
- Default ports:
  - Backend: 8000
  - Frontend: 3000
  - Database: 3307
- If the port is already occupied, please stop the conflicting process or change the ports as necessary.

## Remarks

All dependencies and configurations have been completely updated and synchronized.  
No additional installation steps are required beyond using Docker Compose.

