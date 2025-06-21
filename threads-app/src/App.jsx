import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { VideoCallScreen, CallInitiationScreen } from './components/VideoCall.jsx';
import { 
  Home, 
  Search, 
  Heart, 
  MessageCircle, 
  User, 
  Plus, 
  MoreHorizontal,
  Send,
  Phone,
  Video,
  Settings,
  LogOut,
  ArrowLeft,
  Share,
  Repeat2
} from 'lucide-react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Mock data
const mockUser = {
  id: 1,
  username: 'johndoe',
  name: 'John Doe',
  bio: 'Software developer passionate about building great apps',
  avatar: '/api/placeholder/40/40',
  followers: 1234,
  following: 567
};

const mockPosts = [
  {
    id: 1,
    user: {
      username: 'alice_dev',
      name: 'Alice Johnson',
      avatar: '/api/placeholder/40/40'
    },
    content: 'Just shipped a new feature! The feeling of seeing your code in production never gets old 🚀',
    timestamp: '2h',
    likes: 42,
    replies: 8,
    reposts: 3,
    liked: false
  },
  {
    id: 2,
    user: {
      username: 'tech_guru',
      name: 'Tech Guru',
      avatar: '/api/placeholder/40/40'
    },
    content: 'Hot take: The best code is the code you don\'t have to write. Sometimes the simplest solution is the most elegant one.',
    timestamp: '4h',
    likes: 128,
    replies: 24,
    reposts: 15,
    liked: true
  },
  {
    id: 3,
    user: {
      username: 'design_pro',
      name: 'Design Pro',
      avatar: '/api/placeholder/40/40'
    },
    content: 'Working on a new design system. The attention to detail in micro-interactions can make or break the user experience.',
    timestamp: '6h',
    likes: 89,
    replies: 12,
    reposts: 7,
    liked: false
  }
];

// Components
const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'create', icon: Plus, label: 'Create' },
    { id: 'activity', icon: Heart, label: 'Activity' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'text-black' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={24} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <Card className="mb-4 border-0 border-b border-gray-100 rounded-none">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-sm">{post.user.name}</span>
              <span className="text-gray-500 text-sm">@{post.user.username}</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{post.timestamp}</span>
            </div>
            <p className="text-sm mb-3 leading-relaxed">{post.content}</p>
            <div className="flex items-center justify-between max-w-xs">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm">{post.replies}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
                <Repeat2 size={18} />
                <span className="text-sm">{post.reposts}</span>
              </button>
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                <span className="text-sm">{likes}</span>
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <Share size={18} />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold text-center">Threads</h1>
      </div>
      <div className="pb-20">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults({ users: [], posts: [] });
        return;
      }
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/search/users?q=${searchQuery}`),
          fetch(`${API_BASE_URL}/api/search/posts?q=${searchQuery}`)
        ]);

        const usersData = await usersResponse.json();
        const postsData = await postsResponse.json();

        setSearchResults({ users: usersData, posts: postsData });
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const handler = setTimeout(() => {
      fetchSearchResults();
    }, 500); // Debounce search

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <Input
          placeholder="Search users and posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="p-4 pb-20">
        {searchQuery.trim() === '' ? (
          <div className="text-center text-gray-500 mt-8">
            <Search size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Search for users and posts</p>
          </div>
        ) : (
          <div>
            {searchResults.users.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Users</h2>
                {searchResults.users.map(user => (
                  <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar_url || '/api/placeholder/40/40'} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-gray-500 text-sm">@{user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchResults.posts.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Posts</h2>
                {searchResults.posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
            {searchResults.users.length === 0 && searchResults.posts.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CreateScreen = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [error, setError] = useState(null);

  const handlePost = async () => {
    if (!postContent.trim()) {
      setError('Post content cannot be empty.');
      return;
    }
    setError(null);
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: postContent })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setPostContent('');
      alert('Post created successfully!');
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (err) {
      setError(err.message);
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between">
          <button className="text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">New Thread</h1>
          <Button 
            onClick={handlePost}
            disabled={!postContent.trim()}
            size="sm"
          >
            Post
          </Button>
        </div>
      </div>
      <div className="p-4 pb-20">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={mockUser.avatar} />
            <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <span className="font-semibold text-sm">{mockUser.name}</span>
            </div>
            <Textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="border-0 resize-none p-0 text-base"
              rows={6}
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {postContent.length}/500
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityScreen = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn("No token found for fetching activities.");
          setActivities([]);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/notifications`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold text-center">Activity</h1>
      </div>
      <div className="pb-20">
        {activities.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Heart size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No activity yet.</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{activity.message.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    {activity.message}
                  </p>
                  <p className="text-gray-500 text-xs">{new Date(activity.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ProfileScreen = ({ onLogout }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [showCallInitiation, setShowCallInitiation] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No authentication token found. Please log in.");
          return;
        }
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleStartCall = (roomName, callType) => {
    setCurrentCall({ roomName, callType });
    setShowCallInitiation(false);
    setShowVideoCall(true);
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
    setCurrentCall(null);
  };

  const handleVideoCallClick = () => {
    setShowCallInitiation(true);
  };

  const handleAudioCallClick = () => {
    setShowCallInitiation(true);
  };

  if (showVideoCall && currentCall) {
    return (
      <VideoCallScreen
        roomName={currentCall.roomName}
        callType={currentCall.callType}
        onEndCall={handleEndCall}
      />
    );
  }

  if (showCallInitiation) {
    return (
      <CallInitiationScreen
        onStartCall={handleStartCall}
        onCancel={() => setShowCallInitiation(false)}
      />
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen p-4 flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader><CardTitle>Error</CardTitle></CardHeader>
          <CardContent>
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={onLogout} className="w-full">Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen p-4 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Profile</h1>
          <button className="text-gray-500">
            <Settings size={24} />
          </button>
        </div>
      </div>
      <div className="p-4 pb-20">
        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={userProfile.avatar_url || '/api/placeholder/40/40'} />
            <AvatarFallback className="text-xl">{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{userProfile.name}</h2>
          <p className="text-gray-500">@{userProfile.username}</p>
          <p className="text-sm mt-2 text-gray-700">{userProfile.bio}</p>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="text-center">
              <div className="font-bold">{userProfile.followers_count}</div>
              <div className="text-gray-500 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{userProfile.following_count}</div>
              <div className="text-gray-500 text-sm">Following</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2"
            onClick={handleVideoCallClick}
          >
            <Video size={18} />
            <span>Video Call</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2"
            onClick={handleAudioCallClick}
          >
            <Phone size={18} />
            <span>Audio Call</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2 text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={onLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogin = async (username, password) => {
    setLoginError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      setLoginError(error.message);
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoginError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, name: username })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoggedIn(true);
      setShowLogin(false);
    } catch (error) {
      setLoginError(error.message);
      console.error("Registration error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setActiveTab('home'); // Reset to home or login screen
    setShowLogin(true); // Show login screen after logout
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return (
        <AuthScreen 
          onLogin={handleLogin} 
          onRegister={handleRegister} 
          showLogin={showLogin} 
          setShowLogin={setShowLogin}
          error={loginError}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'create':
        return <CreateScreen onPostCreated={() => setActiveTab('home')} />;
      case 'activity':
        return <ActivityScreen />;
      case 'profile':
        return <ProfileScreen onLogout={handleLogout} />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {renderScreen()}
      {isLoggedIn && <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
}

const AuthScreen = ({ onLogin, onRegister, showLogin, setShowLogin, error }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      onLogin(username, password);
    } else {
      onRegister(username, email, password);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">
            {showLogin ? 'Login' : 'Register'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {!showLogin && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              {showLogin ? 'Login' : 'Register'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            {showLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setShowLogin(!showLogin)} 
              className="text-blue-600 hover:underline"
            >
              {showLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
