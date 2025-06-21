import os
import sys
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Add parent directory to path for module imports
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

# Import db and app from main.py
from src.main import db, app

with app.app_context():
    print("Dropping all database tables...")
    db.drop_all()
    print("Creating all database tables...")
    db.create_all()
    print("Database migration complete.")
