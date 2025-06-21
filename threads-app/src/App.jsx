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

// Mock data based on provided JSON for UI replication
const uiData = {
  "applicationName": "Connect",
  "version": "1.0",
  "appViews": [
    {
      "screenName": "Connect_AllFeed",
      "style": {
        "themeColor": "#E74C3C",
        "background": {
          "type": "linear-gradient",
          "angle": "160deg",
          "colors": ["#11323C", "#3E1E32"]
        },
        "glassmorphismLayout": {
          "postCard": {
            "backgroundColor": "rgba(231, 76, 60, 0.15)",
            "borderColor": "rgba(255, 255, 255, 0.1)",
            "blur": "20px",
            "borderRadius": "24px"
          },
          "inputField": {
            "backgroundColor": "rgba(44, 62, 80, 0.4)",
            "borderColor": "rgba(255, 255, 255, 0.05)",
            "blur": "10px",
            "borderRadius": "16px"
          },
          "bottomNav": {
            "backgroundColor": "rgba(231, 76, 60, 0.10)",
            "blur": "25px",
            "borderTopColor": "rgba(255, 255, 255, 0.1)"
          }
        }
      },
      "header": {
        "title": "Connect",
        "actions": [
          { "id": "search", "icon": "search_icon" },
          { "id": "settings", "icon": "settings_icon" }
        ]
      },
      "postInput": {
        "userAvatarUrl": "https://example.com/user_avatar_1.png",
        "placeholder": "Post your thoughts...",
        "actionIcon": "camera_icon"
      },
      "stories": {
        "create": {
          "label": "Create your day",
          "icon": "add_circle_outline"
        },
        "items": [
          {
            "id": "story_01",
            "userName": "Afroza Sumona",
            "storyImageUrl": "https://example.com/story_afroza.png",
            "userAvatarUrl": "https://example.com/avatar_afroza.png"
          },
          {
            "id": "story_02",
            "userName": "Shusama",
            "storyImageUrl": "https://example.com/story_shusama.png",
            "userAvatarUrl": "https://example.com/avatar_shusama.png"
          },
          {
            "id": "story_03",
            "userName": "BE",
            "storyImageUrl": "https://example.com/story_be.png",
            "userAvatarUrl": "https://example.com/avatar_be.png"
          }
        ]
      },
      "contentTabs": {
        "tabs": ["All Feed", "News", "Videos", "Reels", "Q&A"],
        "activeIndex": 0
      },
      "feed": [
        {
          "postId": "post_101",
          "type": "standard_post",
          "author": {
            "name": "Borsha Akter",
            "avatarUrl": "https://example.com/avatar_borsha.png"
          },
          "timestamp": "2h ago",
          "content": {
            "text": "Beautiful day in Dhaka! Enjoying the weather.",
            "attachment": {
                "type": "icon",
                "value": "bangladesh_flag"
            }
          },
          "infoIcon": {
            "visible": true,
            "type": "warning"
          },
          "engagement": {
            "likes": "120.0K",
            "comments": 15,
            "shares": "Share"
          }
        },
        {
          "postId": "post_102",
          "type": "standard_post",
          "author": {
            "name": "Rahim Sheikh",
            "avatarUrl": "https://example.com/avatar_rahim.png"
          },
          "timestamp": "5h ago",
          "content": {
            "text": "Just tried the new cafe downtown, amazing coffee!"
          },
          "engagement": {
            "likes": "88.0K",
            "comments": 7,
            "shares": "Share"
          }
        }
      ],
      "bottomNavigationBar": {
        "activeIndex": 0,
        "items": [
          { "label": "Home", "icon": "home_icon" },
          { "label": "Friend", "icon": "people_icon" },
          { "label": "Notification", "icon": "notifications_icon" },
          { "label": "SOS", "icon": "sos_icon" },
          { "label": "Chat", "icon": "chat_bubble_icon" },
          { "label": "More", "icon": "more_horiz_icon" }
        ]
      }
    },
    {
      "screenName": "Connect_News",
      "style": {
        "themeColor": "#E74C3C",
        "background": {
          "type": "linear-gradient",
          "angle": "160deg",
          "colors": ["#11323C", "#3E1E32"]
        },
        "glassmorphismLayout": {
          "postCard": {
            "backgroundColor": "rgba(231, 76, 60, 0.15)",
            "borderColor": "rgba(255, 255, 255, 0.1)",
            "blur": "20px",
            "borderRadius": "24px"
          },
          "inputField": {
            "backgroundColor": "rgba(44, 62, 80, 0.4)",
            "borderColor": "rgba(255, 255, 255, 0.05)",
            "blur": "10px",
            "borderRadius": "16px"
          },
          "bottomNav": {
            "backgroundColor": "rgba(231, 76, 60, 0.10)",
            "blur": "25px",
            "borderTopColor": "rgba(255, 255, 255, 0.1)"
          }
        }
      },
      "header": {
        "title": "Connect",
        "actions": [
          { "id": "search", "icon": "search_icon" },
          { "id": "settings", "icon": "settings_icon" }
        ]
      },
      "postInput": {
        "userAvatarUrl": "https://example.com/user_avatar_1.png",
        "placeholder": "Post your thoughts...",
        "actionIcon": "camera_icon"
      },
      "stories": {
        "create": {
          "label": "Create your day",
          "icon": "add_circle_outline"
        },
        "items": [
          {
            "id": "story_01",
            "userName": "Afroza Sumona",
            "storyImageUrl": "https://example.com/story_afroza.png",
            "userAvatarUrl": "https://example.com/avatar_afroza.png"
          },
          {
            "id": "story_02",
            "userName": "Shusama",
            "storyImageUrl": "https://example.com/story_shusama.png",
            "userAvatarUrl": "https://example.com/avatar_shusama.png"
          },
          {
            "id": "story_03",
            "userName": "BE",
            "storyImageUrl": "https://example.com/story_be.png",
            "userAvatarUrl": "https://example.com/avatar_be.png"
          }
        ]
      },
      "contentTabs": {
        "tabs": ["All Feed", "News", "Videos", "Reels", "Q&A"],
        "activeIndex": 1
      },
      "feed": [
        {
          "postId": "news_201",
          "type": "news_article",
          "author": {
            "name": "BD News 24",
            "avatarUrl": "https://example.com/avatar_bdnews.png"
          },
          "timestamp": "1h ago",
          "content": {
            "text": "Padma Bridge sees record traffic over the weekend. Economic boost expected for the southern region."
          },
          "infoIcon": {
            "visible": true,
            "type": "warning"
          },
          "engagement": {
            "likes": "543.0K",
            "comments": 112,
            "shares": "Share"
          }
        },
        {
          "postId": "news_202",
          "type": "news_article",
          "author": {
            "name": "Dhaka Tribune",
            "avatarUrl": "https://example.com/avatar_dhakatribune.png"
          },
          "timestamp": "30m ago",
          "content": {
            "text": "New metro rail station opens in Uttara, reducing commute time by 40 minutes for thousands of residents."
          },
          "engagement": {
            "likes": null,
            "comments": null,
            "shares": null
          }
        }
      ],
      "bottomNavigationBar": {
        "activeIndex": 0,
        "items": [
          { "label": "Home", "icon": "home_icon" },
          { "label": "Friend", "icon": "people_icon" },
          { "label": "Notification", "icon": "notifications_icon" },
          { "label": "SOS", "icon": "sos_icon" },
          { "label": "Chat", "icon": "chat_bubble_icon" },
          { "label": "More", "icon": "more_horiz_icon" }
        ]
      }
    },
    {
      "screenName": "Connect_Q&A",
      "style": {
        "themeColor": "#E74C3C",
        "background": {
          "type": "linear-gradient",
          "angle": "160deg",
          "colors": ["#11323C", "#3E1E32"]
        },
        "glassmorphismLayout": {
          "postCard": {
            "backgroundColor": "rgba(231, 76, 60, 0.15)",
            "borderColor": "rgba(255, 255, 255, 0.1)",
            "blur": "20px",
            "borderRadius": "24px"
          },
          "inputField": {
            "backgroundColor": "rgba(44, 62, 80, 0.4)",
            "borderColor": "rgba(255, 255, 255, 0.05)",
            "blur": "10px",
            "borderRadius": "16px"
          },
          "bottomNav": {
            "backgroundColor": "rgba(231, 76, 60, 0.10)",
            "blur": "25px",
            "borderTopColor": "rgba(255, 255, 255, 0.1)"
          }
        }
      },
      "header": {
        "title": "Connect",
        "actions": [
          { "id": "search", "icon": "search_icon" },
          { "id": "settings", "icon": "settings_icon" }
        ]
      },
      "postInput": {
        "userAvatarUrl": "https://example.com/user_avatar_1.png",
        "placeholder": "Post your thoughts...",
        "actionIcon": "camera_icon"
      },
      "stories": {
        "create": {
          "label": "Create your day",
          "icon": "add_circle_outline"
        },
        "items": [
          {
            "id": "story_01",
            "userName": "Afroza Sumona",
            "storyImageUrl": "https://example.com/story_afroza.png",
            "userAvatarUrl": "https://example.com/avatar_afroza.png"
          },
          {
            "id": "story_02",
            "userName": "Shusama",
            "storyImageUrl": "https://example.com/story_shusama.png",
            "userAvatarUrl": "https://example.com/avatar_shusama.png"
          },
          {
            "id": "story_03",
            "userName": "BE",
            "storyImageUrl": "https://example.com/story_be.png",
            "userAvatarUrl": "https://example.com/avatar_be.png"
          }
        ]
      },
      "contentTabs": {
        "tabs": ["All Feed", "News", "Videos", "Reels", "Q&A"],
        "activeIndex": 4
      },
      "feed": [
        {
          "postId": "qna_301",
          "type": "question_post",
          "author": {
            "name": "Upendra Prasad",
            "avatarUrl": "https://example.com/avatar_upendra.png"
          },
          "timestamp": "2y ago",
          "content": {
            "text": "Isn't it correct to correct a fool, or he will hate you, correct a wise man, and he will appreciate you?"
          },
          "answerInput": {
            "placeholder": "Type your answer...",
            "buttonText": "Answer"
          },
          "engagement": {
            "likes": 31,
            "comments": 19,
            "shares": 1
          }
        },
        {
          "postId": "qna_302",
          "type": "question_post",
          "author": {
            "name": "Vasudevan Iyengar",
            "avatarUrl": "https://example.com/avatar_vasudevan.png"
          },
          "timestamp": "1y ago",
          "content": {
            "text": "Who will benefit from the Russia-Ukraine..."
          },
          "engagement": {
            "likes": null,
            "comments": null,
            "shares": null
          }
        }
      ],
      "bottomNavigationBar": {
        "activeIndex": 0,
        "items": [
          { "label": "Home", "icon": "home_icon" },
          { "label": "Friend", "icon": "people_icon" },
          { "label": "Notification", "icon": "notifications_icon" },
          { "label": "SOS", "icon": "sos_icon" },
          { "label": "Chat", "icon": "chat_bubble_icon" },
          { "label": "More", "icon": "more_horiz_icon" }
        ]
      }
    }
  ]
};

const mockUser = {
  id: 1,
  username: 'johndoe',
  name: 'John Doe',
  bio: 'Software developer passionate about building great apps',
  avatar: uiData.appViews[0].postInput.userAvatarUrl, // Use avatarUrl from uiData
  followers: 1234,
  following: 567
};

// Components
const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const bottomNavItems = uiData.appViews[0].bottomNavigationBar.items;

  const iconMap = {
    home_icon: Home,
    people_icon: User, // Assuming 'Friend' maps to User icon
    notifications_icon: Heart, // Assuming 'Notification' maps to Heart icon for activity
    sos_icon: Phone, // Placeholder, adjust as needed
    chat_bubble_icon: MessageCircle, // Placeholder, adjust as needed
    more_horiz_icon: MoreHorizontal // Placeholder, adjust as needed
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 py-2 glass-bottom-nav">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {bottomNavItems.map((item, index) => {
          const Icon = iconMap[item.icon] || Home; // Fallback to Home icon
          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label.toLowerCase().replace(/\s/g, ''))}
              className={`p-3 rounded-lg transition-colors flex flex-col items-center text-white ${
                activeTab === item.label.toLowerCase().replace(/\s/g, '')
                  ? 'text-red-400' // Active color
                  : 'text-white text-opacity-70 hover:text-opacity-100'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const PostCard = ({ post, onPostUpdated, type }) => {
  const [liked, setLiked] = useState(post.is_liked);
  const [likes, setLikes] = useState(post.likes_count);
  const [repliesCount, setRepliesCount] = useState(post.replies_count);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState(null);

  const handleLike = async () => {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError("You need to be logged in to like posts.");
      return;
    }

    const endpoint = liked ? 'unlike' : 'like';
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (err) {
      setError(err.message);
      console.error(`Error ${endpoint}ing post:`, err);
    }
  };

  const handleReply = async () => {
    setError(null);
    if (!replyContent.trim()) {
      setError("Reply content cannot be empty.");
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setError("You need to be logged in to reply to posts.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${post.id}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: replyContent })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      setReplyContent('');
      setShowReplyInput(false);
      setRepliesCount(repliesCount + 1); // Optimistically update reply count
      alert('Reply posted successfully!');
      if (onPostUpdated) {
        onPostUpdated();
      }
    } catch (err) {
      setError(err.message);
      console.error("Error posting reply:", err);
    }
  };

  const handleShare = () => {
    alert('Share functionality not yet implemented.');
  };

  const formatCount = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  const renderAttachment = () => {
    if (post.content.attachment) {
      if (post.content.attachment.type === 'icon') {
        // Placeholder for icons, you might need a component or a map for actual icons
        return <span className="ml-2">{post.content.attachment.value === 'bangladesh_flag' ? '🇧🇩' : ''}</span>;
      }
    }
    return null;
  };

  return (
    <Card className="mb-4 border-0 rounded-none glass-post-card text-white">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.user?.avatar || post.user?.avatar_url} />
            <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-sm">{post.user?.name}</span>
              <span className="text-gray-300 text-sm">@{post.user?.username}</span>
              <span className="text-gray-300 text-sm">·</span>
              <span className="text-gray-300 text-sm">{post.timestamp}</span>
              <MoreHorizontal size={18} className="text-gray-300 ml-auto" />
            </div>
            <p className="text-sm mb-3 leading-relaxed">
              {post.content?.text}
              {renderAttachment()}
            </p>
            {type === 'question_post' && post.answerInput && (
              <div className="mt-3 mb-4">
                <Input
                  type="text"
                  placeholder={post.answerInput.placeholder}
                  className="w-full glass-input-field text-white placeholder-gray-300"
                />
                <Button className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white rounded-lg">
                  {post.answerInput.buttonText}
                </Button>
              </div>
            )}
            <div className="flex items-center justify-between max-w-xs text-gray-300">
              <button 
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex items-center space-x-1 hover:text-blue-300 transition-colors"
              >
                <MessageCircle size={18} />
                <span className="text-sm">{formatCount(repliesCount)}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-green-300 transition-colors">
                <Repeat2 size={18} />
                <span className="text-sm">{post.reposts}</span>
              </button>
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  liked ? 'text-red-400' : 'hover:text-red-400'
                }`}
              >
                <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
                <span className="text-sm">{formatCount(likes)}</span>
              </button>
              <button 
                onClick={handleShare}
                className="hover:text-gray-100 transition-colors"
              >
                <Share size={18} />
              </button>
            </div>
            {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
            {showReplyInput && (
              <div className="mt-4 flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="flex-1 glass-input-field text-white placeholder-gray-300"
                />
                <Button onClick={handleReply} size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-lg">Reply</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Header = ({ title, actions }) => {
  const iconMap = {
    search_icon: Search,
    settings_icon: Settings
  };
  return (
    <div className="sticky top-0 p-4 z-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex space-x-4">
          {actions.map(action => {
            const Icon = iconMap[action.icon];
            return Icon ? <Icon key={action.id} size={24} className="text-white" /> : null;
          })}
        </div>
      </div>
    </div>
  );
};

const PostInput = ({ userAvatarUrl, placeholder, actionIcon }) => {
  const Icon = actionIcon === 'camera_icon' ? Video : Plus; // Placeholder for camera icon
  return (
    <div className="p-4 flex items-center space-x-3 glass-input-field mx-4 rounded-2xl">
      <Avatar className="w-10 h-10">
        <AvatarImage src={userAvatarUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Input
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none text-white placeholder-gray-300 focus-visible:ring-0"
      />
      <Icon size={24} className="text-white" />
    </div>
  );
};

const Stories = ({ create, items }) => {
  const CreateIcon = create.icon === 'add_circle_outline' ? Plus : null; // Placeholder
  return (
    <div className="flex space-x-4 p-4 overflow-x-auto no-scrollbar">
      <div className="flex-shrink-0 flex flex-col items-center text-white">
        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-1">
          {CreateIcon && <CreateIcon size={32} className="text-white" />}
        </div>
        <span className="text-xs">{create.label}</span>
      </div>
      {items.map(story => (
        <div key={story.id} className="flex-shrink-0 flex flex-col items-center text-white">
          <Avatar className="w-16 h-16 rounded-full border-2 border-red-500 mb-1">
            <AvatarImage src={story.storyImageUrl} className="object-cover w-full h-full rounded-full" />
            <AvatarFallback>{story.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs">{story.userName}</span>
        </div>
      ))}
    </div>
  );
};

const ContentTabs = ({ tabs, activeIndex, setActiveIndex }) => {
  return (
    <div className="flex justify-around border-b border-gray-700 text-gray-300 text-sm mx-4 mt-4">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          className={`py-2 px-4 transition-colors ${
            activeIndex === index
              ? 'text-red-400 border-b-2 border-red-400'
              : 'hover:text-white'
          }`}
          onClick={() => setActiveIndex(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(uiData.appViews[0].contentTabs.activeIndex);

  const currentView = uiData.appViews[activeTab];

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Transform mock data from JSON to match PostCard's expected structure
      const transformedPosts = currentView.feed.map(post => ({
        id: post.postId, // Use postId from JSON for consistency with mock data
        user: {
          username: post.author.name.toLowerCase().replace(/\s/g, ''), // Derive username
          name: post.author.name,
          avatar: post.author.avatarUrl // Map avatarUrl to avatar
        },
        content: post.content, // Keep content as object for attachment
        timestamp: post.timestamp,
        likes_count: parseInt(String(post.engagement.likes).replace(/[^0-9.]/g, '')), // Ensure numeric, handle "K"
        replies_count: post.engagement.comments,
        reposts: post.engagement.shares,
        is_liked: false, // Default, as mock data doesn't provide this
        type: post.type, // Pass the type for conditional rendering in PostCard
        answerInput: post.answerInput // Pass answerInput for Q&A posts
      }));
      setPosts(transformedPosts);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTab]); // Re-fetch when activeTab changes

  const handlePostUpdated = () => {
    fetchPosts(); // Re-fetch posts when a post is updated (e.g., liked/unliked)
  };

  return (
    <div className="max-w-md mx-auto min-h-screen text-white">
      <Header title={currentView.header.title} actions={currentView.header.actions} />
      <PostInput 
        userAvatarUrl={currentView.postInput.userAvatarUrl}
        placeholder={currentView.postInput.placeholder}
        actionIcon={currentView.postInput.actionIcon}
      />
      <Stories 
        create={currentView.stories.create} 
        items={currentView.stories.items} 
      />
      <ContentTabs 
        tabs={currentView.contentTabs.tabs} 
        activeIndex={activeTab} 
        setActiveIndex={setActiveTab} 
      />
      <div className="p-4 pb-20">
        {loading ? (
          <p className="text-center text-gray-300 mt-8">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-red-400 mt-8">Error: {error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-300 mt-8">No posts yet. Be the first to create one!</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.postId} post={post} onPostUpdated={handlePostUpdated} type={post.type} />
          ))
        )}
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
    <div className="max-w-md mx-auto min-h-screen text-white">
      <Header title="Connect" actions={[{ id: "search", icon: "search_icon" }, { id: "settings", icon: "settings_icon" }]} />
      <div className="p-4">
        <Input
          placeholder="Search users and posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full glass-input-field text-white placeholder-gray-300"
        />
      </div>
      <div className="p-4 pb-20">
        {searchQuery.trim() === '' ? (
          <div className="text-center text-gray-300 mt-8">
            <Search size={48} className="mx-auto mb-4 text-gray-500" />
            <p>Search for users and posts</p>
          </div>
        ) : (
          <div>
            {searchResults.users.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Users</h2>
                {searchResults.users.map(user => (
                  <div key={user.id} className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar_url || '/api/placeholder/40/40'} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-gray-300 text-sm">@{user.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchResults.posts.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Posts</h2>
                {searchResults.posts.map(post => (
                  <PostCard key={post.id} post={post} type={post.type} />
                ))}
              </div>
            )}
            {searchResults.users.length === 0 && searchResults.posts.length === 0 && (
              <div className="text-center text-gray-300 mt-8">
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
  const currentUser = JSON.parse(localStorage.getItem('user'));

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
    <div className="max-w-md mx-auto min-h-screen text-white">
      <div className="sticky top-0 p-4 z-10">
        <div className="flex items-center justify-between">
          <button className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">New Thread</h1>
          <Button 
            onClick={handlePost}
            disabled={!postContent.trim()}
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Post
          </Button>
        </div>
      </div>
      <div className="p-4 pb-20">
        <div className="flex space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser?.avatar_url || mockUser.avatar} />
            <AvatarFallback>{currentUser?.name?.charAt(0) || mockUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <span className="font-semibold text-sm">{currentUser?.name || mockUser.name}</span>
            </div>
            <Textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="border-0 resize-none p-0 text-base bg-transparent text-white placeholder-gray-300 focus-visible:ring-0"
              rows={6}
            />
            <div className="text-right text-sm text-gray-300 mt-2">
              {postContent.length}/500
            </div>
            {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityScreen = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No authentication token found. Please log in.");
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
      } catch (err) {
        setError(err.message);
        console.error("Error fetching activities:", err);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen text-white">
      <Header title="Activity" actions={[]} />
      <div className="pb-20">
        {loading ? (
          <p className="text-center text-gray-300 mt-8">Loading activities...</p>
        ) : error ? (
          <p className="text-center text-red-400 mt-8">Error: {error}</p>
        ) : activities.length === 0 ? (
          <div className="text-center text-gray-300 mt-8">
            <Heart size={48} className="mx-auto mb-4 text-gray-500" />
            <p>No activity yet.</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{activity.message.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    {activity.message}
                  </p>
                  <p className="text-gray-300 text-xs">{new Date(activity.created_at).toLocaleString()}</p>
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
  const currentUser = JSON.parse(localStorage.getItem('user'));

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
      <div className="max-w-md mx-auto min-h-screen p-4 flex items-center justify-center text-white">
        <Card className="w-full max-w-sm glass-post-card">
          <CardHeader><CardTitle className="text-white">Error</CardTitle></CardHeader>
          <CardContent>
            <p className="text-red-300 mb-4">{error}</p>
            <Button onClick={onLogout} className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg">Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="max-w-md mx-auto min-h-screen p-4 flex items-center justify-center text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen text-white">
      <Header title="Profile" actions={[{ id: "settings", icon: "settings_icon" }]} />
      <div className="p-4 pb-20">
        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={userProfile.avatar_url || mockUser.avatar} />
            <AvatarFallback className="text-xl">{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{userProfile.name}</h2>
          <p className="text-gray-300">@{userProfile.username}</p>
          <p className="text-sm mt-2 text-gray-300">{userProfile.bio}</p>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="text-center">
              <div className="font-bold">{userProfile.followers_count}</div>
              <div className="text-gray-300 text-sm">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{userProfile.following_count}</div>
              <div className="text-gray-300 text-sm">Following</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Button variant="outline" className="w-full text-white border-gray-700 hover:bg-gray-800 rounded-lg">
            Edit Profile
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2 text-white border-gray-700 hover:bg-gray-800 rounded-lg"
            onClick={handleVideoCallClick}
          >
            <Video size={18} />
            <span>Video Call</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2 text-white border-gray-700 hover:bg-gray-800 rounded-lg"
            onClick={handleAudioCallClick}
          >
            <Phone size={18} />
            <span>Audio Call</span>
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center space-x-2 text-red-400 border-red-400 hover:bg-red-900 hover:text-red-300 rounded-lg"
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
    <div className="min-h-screen">
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
    <div className="max-w-md mx-auto min-h-screen flex items-center justify-center p-4 text-white">
      <Card className="w-full max-w-sm glass-post-card">
        <CardHeader>
          <CardTitle className="text-center text-white">
            {showLogin ? 'Login' : 'Register'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="glass-input-field text-white placeholder-gray-300"
              />
            </div>
            {!showLogin && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input-field text-white placeholder-gray-300"
                />
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="glass-input-field text-white placeholder-gray-300"
              />
            </div>
            {error && <p className="text-red-300 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg">
              {showLogin ? 'Login' : 'Register'}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-300 mt-4">
            {showLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setShowLogin(!showLogin)} 
              className="text-blue-400 hover:underline"
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
