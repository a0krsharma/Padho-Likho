# Padho Likho - Educational Platform

Padho Likho is a comprehensive educational platform designed for students from classes 1-10, connecting them with qualified teachers for personalized learning experiences.

## Core Features

### User Authentication & Profiles
- Login/signup via email
- Separate dashboards for students, parents, and teachers
- Profile customization with academic details and preferences
- Profile verification system for teachers with qualification proof

### Teacher Discovery & Booking
- Advanced search filters: subject, class (1-8), gender, language preference
- Detailed teacher profiles
- Real-time booking system with instant confirmation
- Flexible booking duration (weekly, monthly, yearly)
- Emergency/instant booking option for urgent doubts

### Learning Management
- Interactive live class interface
- Assignment submission portal
- Project help section with milestone tracking

### Assessment System
- Customizable quiz creation
- Topic-wise practice tests
- Performance analytics dashboard
- Achievement badges and rewards

### Parent Dashboard
- Real-time progress monitoring
- Teacher communication channel
- Payment management
- Academic performance reports

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/padho-likho.git
```

2. Install dependencies for both frontend and backend
```
# Install backend dependencies
cd padho-likho/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/padho-likho
JWT_SECRET=your_jwt_secret
```

4. Start the development servers
```
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Technologies Used
- Frontend: React, Redux, Material-UI
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Real-time Communication: Socket.io
- Video Conferencing: WebRTC
