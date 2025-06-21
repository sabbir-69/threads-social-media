from flask import Blueprint, jsonify, request
from src.models.user import User, Post, Like, Reply, Follow, Notification, db
from werkzeug.security import check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps

user_bp = Blueprint('user', __name__)

# JWT Secret Key (in production, use environment variable)
JWT_SECRET = 'your-secret-key-here'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

# Authentication routes
@user_bp.route('/auth/register', methods=['POST'])
def register():
    try:
        data = request.json
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'message': 'Username already exists'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already exists'}), 400
        
        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            name=data['name'],
            bio=data.get('bio', '')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(days=30)
        }, JWT_SECRET, algorithm='HS256')
        
        return jsonify({
            'message': 'User created successfully',
            'token': token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.check_password(data['password']):
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.utcnow() + timedelta(days=30)
            }, JWT_SECRET, algorithm='HS256')
            
            return jsonify({
                'message': 'Login successful',
                'token': token,
                'user': user.to_dict()
            }), 200
        
        return jsonify({'message': 'Invalid credentials'}), 401
        
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# User routes
@user_bp.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/users/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    try:
        return jsonify(current_user.to_dict())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/users/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    try:
        data = request.json
        current_user.name = data.get('name', current_user.name)
        current_user.bio = data.get('bio', current_user.bio)
        current_user.avatar_url = data.get('avatar_url', current_user.avatar_url)
        
        db.session.commit()
        return jsonify(current_user.to_dict())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Follow/Unfollow routes
@user_bp.route('/users/<int:user_id>/follow', methods=['POST'])
@token_required
def follow_user(current_user, user_id):
    try:
        user_to_follow = User.query.get_or_404(user_id)
        
        if current_user.id == user_id:
            return jsonify({'message': 'Cannot follow yourself'}), 400
        
        current_user.follow(user_to_follow)
        db.session.commit()
        
        # Create notification
        notification = Notification(
            user_id=user_id,
            type='follow',
            message=f'{current_user.username} started following you'
        )
        db.session.add(notification)
        db.session.commit()
        
        return jsonify({'message': 'User followed successfully'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/users/<int:user_id>/unfollow', methods=['POST'])
@token_required
def unfollow_user(current_user, user_id):
    try:
        user_to_unfollow = User.query.get_or_404(user_id)
        current_user.unfollow(user_to_unfollow)
        db.session.commit()
        
        return jsonify({'message': 'User unfollowed successfully'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Post routes
@user_bp.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.order_by(Post.created_at.desc()).all()
        return jsonify([post.to_dict() for post in posts])
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/posts', methods=['POST'])
@token_required
def create_post(current_user):
    try:
        data = request.json
        post = Post(
            content=data['content'],
            user_id=current_user.id
        )
        
        db.session.add(post)
        db.session.commit()
        
        return jsonify(post.to_dict(current_user)), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    try:
        post = Post.query.get_or_404(post_id)
        return jsonify(post.to_dict())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/posts/<int:post_id>/like', methods=['POST'])
@token_required
def like_post(current_user, post_id):
    try:
        post = Post.query.get_or_404(post_id)
        
        # Check if already liked
        existing_like = Like.query.filter_by(user_id=current_user.id, post_id=post_id).first()
        if existing_like:
            return jsonify({'message': 'Post already liked'}), 400
        
        like = Like(user_id=current_user.id, post_id=post_id)
        db.session.add(like)
        
        # Create notification
        if post.user_id != current_user.id:
            notification = Notification(
                user_id=post.user_id,
                type='like',
                message=f'{current_user.username} liked your post'
            )
            db.session.add(notification)
        
        db.session.commit()
        
        return jsonify({'message': 'Post liked successfully'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/posts/<int:post_id>/unlike', methods=['POST'])
@token_required
def unlike_post(current_user, post_id):
    try:
        like = Like.query.filter_by(user_id=current_user.id, post_id=post_id).first()
        if not like:
            return jsonify({'message': 'Post not liked'}), 400
        
        db.session.delete(like)
        db.session.commit()
        
        return jsonify({'message': 'Post unliked successfully'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/posts/<int:post_id>/replies', methods=['GET'])
def get_post_replies(post_id):
    try:
        replies = Reply.query.filter_by(post_id=post_id).order_by(Reply.created_at.desc()).all()
        return jsonify([reply.to_dict() for reply in replies])
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/posts/<int:post_id>/replies', methods=['POST'])
@token_required
def create_reply(current_user, post_id):
    try:
        post = Post.query.get_or_404(post_id)
        data = request.json
        
        reply = Reply(
            content=data['content'],
            user_id=current_user.id,
            post_id=post_id
        )
        
        db.session.add(reply)
        
        # Create notification
        if post.user_id != current_user.id:
            notification = Notification(
                user_id=post.user_id,
                type='reply',
                message=f'{current_user.username} replied to your post'
            )
            db.session.add(notification)
        
        db.session.commit()
        
        return jsonify(reply.to_dict()), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Notification routes
@user_bp.route('/notifications', methods=['GET'])
@token_required
def get_notifications(current_user):
    try:
        notifications = Notification.query.filter_by(user_id=current_user.id).order_by(Notification.created_at.desc()).all()
        return jsonify([notification.to_dict() for notification in notifications])
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/notifications/<int:notification_id>/read', methods=['POST'])
@token_required
def mark_notification_read(current_user, notification_id):
    try:
        notification = Notification.query.filter_by(id=notification_id, user_id=current_user.id).first_or_404()
        notification.is_read = True
        db.session.commit()
        
        return jsonify({'message': 'Notification marked as read'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Search routes
@user_bp.route('/search/users', methods=['GET'])
def search_users():
    try:
        query = request.args.get('q', '')
        if not query:
            return jsonify([])
        
        users = User.query.filter(
            User.username.contains(query) | User.name.contains(query)
        ).limit(20).all()
        
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@user_bp.route('/search/posts', methods=['GET'])
def search_posts():
    try:
        query = request.args.get('q', '')
        if not query:
            return jsonify([])
        
        posts = Post.query.filter(Post.content.contains(query)).order_by(Post.created_at.desc()).limit(20).all()
        
        return jsonify([post.to_dict() for post in posts])
    except Exception as e:
        return jsonify({'message': str(e)}), 500

