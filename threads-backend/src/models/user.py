from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    avatar_url = db.Column(db.String(255), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    posts = db.relationship('Post', backref='author', lazy=True, cascade='all, delete-orphan')
    followers = db.relationship('Follow', foreign_keys='Follow.followed_id', backref='followed', lazy='dynamic', cascade='all, delete-orphan')
    following = db.relationship('Follow', foreign_keys='Follow.follower_id', backref='follower', lazy='dynamic', cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def follow(self, user):
        if not self.is_following(user):
            follow = Follow(follower_id=self.id, followed_id=user.id)
            db.session.add(follow)

    def unfollow(self, user):
        follow = self.following.filter_by(followed_id=user.id).first()
        if follow:
            db.session.delete(follow)

    def is_following(self, user):
        return self.following.filter_by(followed_id=user.id).first() is not None

    def get_follower_count(self):
        return self.followers.count()

    def get_following_count(self):
        return self.following.count()

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'bio': self.bio,
            'avatar_url': self.avatar_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'followers_count': self.get_follower_count(),
            'following_count': self.get_following_count()
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.JSON, nullable=False)  # Changed to JSON
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reposts = db.Column(db.Integer, default=0) # Added reposts
    type = db.Column(db.String(50), default='standard_post') # Added type
    info_icon = db.Column(db.JSON, nullable=True) # Added info_icon
    answer_input = db.Column(db.JSON, nullable=True) # Added answer_input
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    likes = db.relationship('Like', backref='post', lazy=True, cascade='all, delete-orphan')
    replies = db.relationship('Reply', backref='post', lazy=True, cascade='all, delete-orphan')

    def get_like_count(self):
        return len(self.likes)

    def get_reply_count(self):
        return len(self.replies)

    def is_liked_by(self, user):
        return any(like.user_id == user.id for like in self.likes)

    def __repr__(self):
        return f'<Post {self.id}>'

    def to_dict(self, current_user=None):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'user': self.author.to_dict() if self.author else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'likes_count': self.get_like_count(),
            'replies_count': self.get_reply_count(),
            'reposts': self.reposts, # Include reposts
            'type': self.type, # Include type
            'info_icon': self.info_icon, # Include info_icon
            'answer_input': self.answer_input, # Include answer_input
            'is_liked': self.is_liked_by(current_user) if current_user else False
        }

class Follow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint('follower_id', 'followed_id', name='unique_follow'),)

    def __repr__(self):
        return f'<Follow {self.follower_id} -> {self.followed_id}>'

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint('user_id', 'post_id', name='unique_like'),)

    def __repr__(self):
        return f'<Like {self.user_id} -> {self.post_id}>'

class Reply(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref='replies')

    def __repr__(self):
        return f'<Reply {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'user': self.user.to_dict() if self.user else None,
            'post_id': self.post_id,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # 'like', 'follow', 'reply'
    message = db.Column(db.String(255), nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref='notifications')

    def __repr__(self):
        return f'<Notification {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            'message': self.message,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
