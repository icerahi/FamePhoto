
# 📸 FamePhoto

**FamePhoto** is a feature-rich photo and album sharing social platform. It allows users to create profiles, organize memories into albums, manage privacy settings, and discover content from other users.

> **Note:** This project utilizes a decoupled architecture with a **Django REST Framework** backend and a **React.js** frontend.

## 🚀 Tech Stack

### Frontend
- **Framework:** React.js
- **State Management:** Context API
- **Routing:** React Router
- **Styling:** Bootstrap 4, CSS3
- **Hosting:** Firebase (originally)

### Backend
- **Framework:** Django (Python)
- **API:** Django REST Framework (DRF)
- **Authentication:** Token-based Auth
- **Database:** SQLite (Dev) / PostgreSQL (Prod)

## ✨ Features

- **User Management:** Secure Login/Registration and Profile customization.
- **Photo Management:** Upload photos with captions and privacy settings.
- **Album System:**
  - Create, Update, and Delete albums.
  - **Privacy Control:** Users can mark albums as public or private.
- **Discovery:**
  - **Global Feed:** View all public photos from the community.
  - **Album Explore:** Browse public albums.
  - **User Directory:** Discover other registered photographers.
- **Responsive UI:** Fully optimized flexible interface for mobile and desktop.

## 📂 Project Structure

```bash
FamePhoto/
├── backend/         # Django REST API
│   ├── api/         # API endpoints and logic
│   ├── media/       # User uploaded content
│   ├── manage.py    # Django CLI
│   └── requirements.txt
│
└── frontend/        # React SPA
    ├── src/         # Components and Pages
    ├── public/      # Static assets
    └── package.json # Frontend dependencies
```

## 🛠️ Getting Started

To run this project, you need to set up both the backend and frontend servers.

### 1\. Clone the Repository

```bash
git clone [https://github.com/icerahi/FamePhoto.git](https://github.com/icerahi/FamePhoto.git)
cd FamePhoto
```

### 2\. Backend Setup (Django)

Navigate to the backend folder and set up the Python environment.

```bash
cd backend

# Create Virtual Environment
python -m venv venv

# Activate Virtual Environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

# Apply Database Migrations
python manage.py makemigrations
python manage.py migrate

# Create Admin User
python manage.py createsuperuser

# Run Backend Server
python manage.py runserver
```

*The backend API will run at `http://127.0.0.1:8000`*

### 3\. Frontend Setup (React)

Open a new terminal, navigate to the frontend folder, and start the client.

```bash
cd frontend

# Install Dependencies
npm install

# Run Frontend Server
npm start
```

*The application will run at `http://localhost:3000`*

## 🔌 API Endpoints

The backend provides the following key REST endpoints:

  - `GET /api/photos/` - List all public photos
  - `GET /api/albums/` - List all public albums
  - `POST /api/register/` - Register a new user
  - `POST /api/token/` - Obtain authentication token

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes (`git commit -m 'Add NewFeature'`).
4.  Push to the branch (`git push origin feature/NewFeature`).
5.  Open a Pull Request.

-----

**Developed by [Imran Hasan](https://github.com/icerahi)**
