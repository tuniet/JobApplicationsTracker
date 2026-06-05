# Job Tracker

A full-stack web application for tracking job applications throughout the hiring process. Users can create an account, manage applications, update statuses, and monitor their job search progress from a centralized dashboard.

## Features

- User authentication (Register/Login)
- Secure JWT-based authorization
- Create, edit, and delete job applications
- Track application statuses
- Search and filter applications
- Dashboard with application statistics
- Responsive user interface
- RESTful API architecture

## Application Statuses

- Applied
- Interview
- Technical Interview
- Offer
- Rejected

## Tech Stack

### Frontend

- React
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database

- PostgreSQL
- Prisma ORM

### Development Tools

- Vite
- Nodemon
- Git
- GitHub

### Deployment

- Vercel (Frontend)
- Render (Backend)
- Neon PostgreSQL (Database)

## Project Structure

```text
job-tracker/
│
├── frontend/
│   ├── src/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── config/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── prisma/
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd job-tracker
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Applications

```http
GET    /applications
GET    /applications/:id
POST   /applications
PUT    /applications/:id
DELETE /applications/:id
```

## Future Improvements

- Kanban board view
- Email notifications
- Application deadlines
- Resume storage
- Interview notes
- Analytics charts
- Dark mode

## License

This project is licensed under the MIT License.
