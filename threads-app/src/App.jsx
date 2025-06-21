import React, { useState } from 'react';
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
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold text-center">Threads</h1>
      </div>
      <div className="pb-20">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
        <div className="text-center text-gray-500 mt-8">
          <Search size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Search for users and posts</p>
        </div>
      </div>
    </div>
  );
};

const CreateScreen = () => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim()) {
      // Handle post creation
      setPostContent('');
      alert('Post created!');
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
  const activities = [
    { id: 1, type: 'like', user: 'alice_dev', content: 'liked your post', time: '2h' },
    { id: 2, type: 'follow', user: 'tech_guru', content: 'started following you', time: '4h' },
    { id: 3, type: 'reply', user: 'design_pro', content: 'replied to your post', time: '6h' }
  ];

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <h1 className="text-xl font-bold text-center">Activity</h1>
      </div>
      <div className="pb-20">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>{activity.user.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">@{activity.user}</span> {activity.content}
                </p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  const [showCallInitiation, setShowCallInitiation] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);

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
            <AvatarImage src={mockUser.avatar} />
            <AvatarFallback className="text-xl">{mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{mockUser.name}</h2>
          <p className="text-gray-500">@{mockUser.username}</p>
          <p className="text-sm mt-2 text-gray-700">{mockUser.bio}</p>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="text-center">
              <div className="font-bold">{mockUser.followers}</div>
              <div className="text-gray-500 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{mockUser.following}</div>
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
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'create':
        return <CreateScreen />;
      case 'activity':
        return <ActivityScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {renderScreen()}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;

