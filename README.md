# Task AuthFlow RBAC

A full-stack project implementing a basic authentication flow with role-based access control.  
- **Backend:** Flask RestX  
- **Frontend:** Next.js  
- **Database:** SQLite  

---

## 🚀 Features
- User registration & login  
- Role-based access control (Superadmin, User, etc.)  
- JWT authentication  
- Protected routes on backend & frontend  

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
- cd path/to/your/project    # or wherever you keep your projects

- git clone https://github.com/MAZ111101/task-authflow-rbac.git

- cd task-authflow-rbac

- code .

### 2. Backend Setup (Flask RestX + SQLite)
- cd backend

- python -m venv venv

- **On Windows** - venv\Scripts\activate

- pip install -r requirements.txt

- **flask run** / **python app.py**

Backend runs at: http://127.0.0.1:5000

#### 3. Frontend Setup (Next.js)
- cd frontend

- npm install

- npm run dev

Frontend runs at: http://localhost:3000

---

## 📌 Notes
**1.** Running the backend will generate *app.db* inside *backend/instance/*.

**2.** Before starting the project, make sure to set the following environment variables:
- SECRET_KEY
- JWT_SECRET_KEY
- MAIL_USERNAME (Gmail for smtp)
- MAIL_PASSWORD (Generate through app password)

**3.** You can connect the generated .db file in DBeaver as a SQLite database.

**4.** A Super Admin user is automatically seeded into the database for initial access.

