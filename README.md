# Threads Social Media App

A full-stack social media application inspired by Threads, built with React and Flask.

## Features

- 📱 Mobile-responsive UI design
- 👤 User authentication and profiles
- 📝 Text posts with likes and replies
- 🔍 User and content search
- 📞 Video/Audio calling with Jitsi Meet
- 🔔 Real-time notifications
- 👥 Follow/Unfollow functionality

## Tech Stack

### Frontend
- React 19
- Tailwind CSS
- shadcn/ui components
- Jitsi Meet React SDK
- Lucide React icons

### Backend
- Flask (Python)
- SQLite database
- JWT authentication
- Flask-CORS for cross-origin requests

## Local Development

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.11+
- Git

### Frontend Setup
```bash
cd threads-app
pnpm install
pnpm run dev
```

### Backend Setup
```bash
cd threads-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
```

## Deployment

See [deployment-guide.md](deployment-guide.md) for detailed deployment instructions.

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Posts
- GET `/api/posts` - Get all posts
- POST `/api/posts` - Create new post
- POST `/api/posts/:id/like` - Like/unlike post
- GET `/api/posts/:id/replies` - Get post replies

### Users
- GET `/api/users` - Get all users
- GET `/api/users/profile` - Get current user profile
- PUT `/api/users/profile` - Update user profile
- POST `/api/users/:id/follow` - Follow user

### Search
- GET `/api/search/users?q=query` - Search users
- GET `/api/search/posts?q=query` - Search posts

## License

MIT License - see LICENSE file for details.

