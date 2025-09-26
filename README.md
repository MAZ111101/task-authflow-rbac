# Task AuthFlow RBAC

A full-stack project implementing a basic authentication flow with role-based access control.  
- **Backend:** Flask RestX  
- **Frontend:** Next.js  
- **Database:** SQLite  

---

## 🚀 Features Implemnented
**1. User Authentication**  

- Registeration implemented with all fields and OTP verification sent via email.

- Login implemented using Email and Password

**2. Token Management (Superadmin, User, etc.)** 

- Used JWT Access and Refresh tokens for authentication

- Ensured secure token handling 

**3. RBAC**

- Super Admin credentials predefined

- Super Admin is be able to create multiple user accounts

- Users created by the Super Admin are be able to log in with their credentials

**4. Admin Dashboard**  

- Provided a simple web-based dashboard for the Super Admin
  
- Dashboard allows managing users for Super Admin (view, create, edit, delete) 

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


