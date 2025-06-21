# Threads Social Media App - Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Threads social media application, which consists of:

- **Frontend**: React web application with Threads-like UI and Jitsi Meet video calling
- **Backend**: Flask API server with SQLite database for user management, posts, and social features

## Prerequisites

Before deploying, ensure you have:

- Git installed on your local machine
- GitHub account
- Render account (for backend hosting)
- Basic knowledge of command line operations

## Project Structure

```
threads-social-media/
├── threads-app/          # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── threads-backend/      # Flask backend API
│   ├── src/
│   ├── venv/
│   ├── requirements.txt
│   └── ...
└── deployment-guide.md  # This file
```



## Part 1: Preparing Your Code for GitHub

### Step 1: Initialize Git Repository

1. Open terminal/command prompt and navigate to your project root directory
2. Initialize a new Git repository:

```bash
git init
```

3. Create a `.gitignore` file to exclude unnecessary files:

```gitignore
# Dependencies
node_modules/
*/node_modules/

# Production builds
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Python virtual environment
venv/
__pycache__/
*.pyc
*.pyo
*.pyd

# Database files
*.db
*.sqlite
*.sqlite3

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log
```

### Step 2: Prepare Frontend for Deployment

1. Navigate to the frontend directory:

```bash
cd threads-app
```

2. Ensure all dependencies are properly listed in `package.json`
3. Test the build process:

```bash
npm run build
# or
pnpm run build
```

4. Verify the build works correctly by serving it locally:

```bash
npm run preview
# or
pnpm run preview
```

### Step 3: Prepare Backend for Deployment

1. Navigate to the backend directory:

```bash
cd threads-backend
```

2. Activate virtual environment and update requirements:

```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip freeze > requirements.txt
```

3. Create a `render.yaml` file for Render deployment:

```yaml
services:
  - type: web
    name: threads-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python src/main.py
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
```

4. Ensure your Flask app is configured for production in `src/main.py`:

```python
if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
```


## Part 2: Deploying to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Fill in the repository details:
   - **Repository name**: `threads-social-media` (or your preferred name)
   - **Description**: "Full-stack social media application with React frontend and Flask backend"
   - **Visibility**: Choose Public or Private based on your preference
   - **Initialize**: Do NOT initialize with README, .gitignore, or license (we'll add these manually)
4. Click "Create repository"

### Step 2: Connect Local Repository to GitHub

1. In your project root directory, add the GitHub remote:

```bash
git remote add origin https://github.com/YOUR_USERNAME/threads-social-media.git
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Commit and Push Your Code

1. Add all files to Git:

```bash
git add .
```

2. Create your first commit:

```bash
git commit -m "Initial commit: Full-stack Threads social media app

- React frontend with Threads-like UI
- Flask backend with SQLite database
- Jitsi Meet integration for video/audio calls
- User authentication and social features
- Ready for deployment"
```

3. Push to GitHub:

```bash
git branch -M main
git push -u origin main
```

### Step 4: Create README.md

Create a comprehensive README.md file in your repository root:

```markdown
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
\`\`\`bash
cd threads-app
pnpm install
pnpm run dev
\`\`\`

### Backend Setup
\`\`\`bash
cd threads-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/main.py
\`\`\`

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
\`\`\`

Add this README.md to your repository and commit it:

```bash
git add README.md
git commit -m "Add comprehensive README with setup instructions"
git push
```


## Part 3: Deploying Backend to Render

### Step 1: Prepare Backend for Render

1. Ensure your `requirements.txt` is up to date:

```bash
cd threads-backend
source venv/bin/activate
pip freeze > requirements.txt
```

2. Modify `src/main.py` to work with Render's environment:

```python
import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.routes.user import user_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')

# Enable CORS for all routes
CORS(app, origins=['*'])

app.register_blueprint(user_bp, url_prefix='/api')

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Threads API Server Running", 200

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "Threads API Server Running", 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
```

### Step 2: Deploy to Render

1. Go to [Render.com](https://render.com) and sign in/create an account
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository:
   - Choose "Build and deploy from a Git repository"
   - Connect your GitHub account if not already connected
   - Select your `threads-social-media` repository
4. Configure the service:
   - **Name**: `threads-backend` (or your preferred name)
   - **Region**: Choose the region closest to your users
   - **Branch**: `main`
   - **Root Directory**: `threads-backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python src/main.py`
5. Set environment variables (optional):
   - `SECRET_KEY`: A secure random string for Flask sessions
   - `PYTHON_VERSION`: `3.11.0`
6. Click "Create Web Service"

### Step 3: Monitor Deployment

1. Render will automatically build and deploy your backend
2. Monitor the deployment logs for any errors
3. Once deployed, you'll receive a URL like: `https://threads-backend-xxxx.onrender.com`
4. Test your API endpoints:
   - `GET https://your-backend-url.onrender.com/api/users`
   - `POST https://your-backend-url.onrender.com/api/auth/register`

### Step 4: Update Frontend Configuration

1. In your React app, update API calls to use the Render backend URL
2. Create a `.env` file in `threads-app/`:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

3. Update your API calls to use this environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Example API call
const response = await fetch(`${API_BASE_URL}/api/users`);
```


## Part 4: Deploying Frontend

### Option 1: Deploy to Vercel (Recommended)

1. Go to [Vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `threads-app`
   - **Build Command**: `pnpm run build` (or `npm run build`)
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_API_BASE_URL`: Your Render backend URL
6. Click "Deploy"
7. Your frontend will be available at a URL like: `https://threads-app-xxxx.vercel.app`

### Option 2: Deploy to Netlify

1. Go to [Netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `threads-app`
   - **Build command**: `pnpm run build`
   - **Publish directory**: `threads-app/dist`
5. Add environment variables in Site settings > Environment variables:
   - `VITE_API_BASE_URL`: Your Render backend URL
6. Click "Deploy site"

### Option 3: Deploy to GitHub Pages

1. In your `threads-app` directory, install gh-pages:

```bash
cd threads-app
pnpm add -D gh-pages
```

2. Add deployment scripts to `package.json`:

```json
{
  "scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/threads-social-media"
}
```

3. Deploy:

```bash
pnpm run deploy
```

4. Enable GitHub Pages in your repository settings

## Part 5: Post-Deployment Configuration

### Update CORS Settings

Update your Flask backend to allow requests from your frontend domain:

```python
# In src/main.py
CORS(app, origins=[
    'http://localhost:5173',  # Local development
    'https://your-frontend-domain.vercel.app',  # Production frontend
    'https://your-custom-domain.com'  # If you have a custom domain
])
```

### Database Considerations

**Important**: The current setup uses SQLite, which works for development but has limitations in production:

- SQLite files are ephemeral on Render (reset on each deployment)
- No persistent data storage
- Not suitable for production use

**For production, consider upgrading to:**

1. **PostgreSQL on Render**:
   - Create a PostgreSQL database on Render
   - Update connection string in your Flask app
   - Install `psycopg2-binary` for PostgreSQL support

2. **External database services**:
   - Supabase (PostgreSQL)
   - PlanetScale (MySQL)
   - MongoDB Atlas

### Environment Variables Security

1. Never commit sensitive data to Git
2. Use environment variables for:
   - Database URLs
   - API keys
   - JWT secrets
   - Third-party service credentials

### Custom Domain (Optional)

1. Purchase a domain from a registrar
2. Configure DNS settings to point to your hosting provider
3. Update CORS settings to include your custom domain

## Part 6: Monitoring and Maintenance

### Backend Monitoring

1. Monitor your Render service logs
2. Set up health checks
3. Monitor API response times
4. Track error rates

### Frontend Monitoring

1. Use browser developer tools to check for errors
2. Monitor Core Web Vitals
3. Test on different devices and browsers
4. Set up analytics (Google Analytics, etc.)

### Regular Updates

1. Keep dependencies updated
2. Monitor security vulnerabilities
3. Regular database backups (if using persistent storage)
4. Performance optimization

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend CORS is configured correctly
   - Check frontend API URLs

2. **Build Failures**:
   - Check Node.js/Python versions
   - Verify all dependencies are listed
   - Review build logs for specific errors

3. **Database Issues**:
   - Ensure database tables are created
   - Check file permissions
   - Verify connection strings

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names and values
   - Restart services after changes

### Getting Help

1. Check service logs first
2. Review documentation for your hosting provider
3. Search for similar issues on Stack Overflow
4. Check GitHub Issues for your dependencies

## Conclusion

You now have a fully deployed Threads social media application! The frontend provides a modern, responsive interface while the backend handles all data operations and API requests. The Jitsi Meet integration enables real-time video and audio communication between users.

Remember to regularly update your application, monitor performance, and consider upgrading to a production database for serious use cases.

Happy coding! 🚀

