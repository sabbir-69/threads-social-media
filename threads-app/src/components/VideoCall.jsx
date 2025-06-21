import React, { useState, useRef } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { 
  Phone, 
  Video, 
  PhoneOff, 
  VideoOff, 
  ArrowLeft,
  Users
} from 'lucide-react';
import './VideoCall.css';

const VideoCallScreen = ({ roomName, onEndCall, callType = 'video' }) => {
  const apiRef = useRef();

  const handleApiReady = (externalApi) => {
    apiRef.current = externalApi;
    
    // Configure call based on type
    if (callType === 'audio') {
      externalApi.executeCommand('toggleVideo');
    }

    // Add event listeners
    externalApi.addEventListeners({
      readyToClose: onEndCall,
      participantLeft: (participant) => {
        console.log('Participant left:', participant);
      },
      participantJoined: (participant) => {
        console.log('Participant joined:', participant);
      }
    });
  };

  const configOverwrite = {
    startWithAudioMuted: false,
    startWithVideoMuted: callType === 'audio',
    disableModeratorIndicator: true,
    startScreenSharing: false,
    enableEmailInStats: false,
    enableWelcomePage: false,
    enableClosePage: false,
    prejoinPageEnabled: false,
    disableInviteFunctions: true,
    disableAddingBackgroundImages: true,
    disableVirtualBackground: true,
    enableInsecureRoomNameWarning: false,
    disableProfile: true,
    disablePolls: true,
    disableReactions: true,
    disableRemoteMute: true,
    disableKick: true,
    disablePrivateChat: true,
    disableLobbyMode: true,
    disableDeepLinking: true,
    disableShortcuts: true,
    disableLocalVideoFlip: true,
    disableFilmstripAutohiding: true,
    channelLastN: 2,
    enableLayerSuspension: true,
    p2p: {
      enabled: true,
      preferH264: true,
      disableH264: false,
      useStunTurn: true
    }
  };

  const interfaceConfigOverwrite = {
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    DISABLE_PRESENCE_STATUS: true,
    DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
    HIDE_INVITE_MORE_HEADER: true,
    DISABLE_VIDEO_BACKGROUND: true,
    DISABLE_TRANSCRIPTION_SUBTITLES: true,
    SHOW_JITSI_WATERMARK: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    SHOW_BRAND_WATERMARK: false,
    BRAND_WATERMARK_LINK: '',
    SHOW_POWERED_BY: false,
    SHOW_PROMOTIONAL_CLOSE_PAGE: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    TOOLBAR_BUTTONS: [
      'microphone', 'camera', 'hangup'
    ],
    SETTINGS_SECTIONS: ['devices', 'language'],
    MOBILE_APP_PROMO: false
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={onEndCall}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft size={16} className="mr-2" />
          End Call
        </Button>
      </div>
      
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={roomName}
        configOverwrite={configOverwrite}
        interfaceConfigOverwrite={interfaceConfigOverwrite}
        userInfo={{
          displayName: 'User'
        }}
        onApiReady={handleApiReady}
        getIFrameRef={(iframeRef) => {
          if (iframeRef) {
            iframeRef.style.height = '100vh';
            iframeRef.style.width = '100vw';
          }
        }}
      />
    </div>
  );
};

const CallInitiationScreen = ({ onStartCall, onCancel }) => {
  const [roomName, setRoomName] = useState('');
  const [callType, setCallType] = useState('video');

  const generateRoomName = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    return `threads-call-${randomId}`;
  };

  const handleStartCall = () => {
    const finalRoomName = roomName || generateRoomName();
    onStartCall(finalRoomName, callType);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="flex items-center justify-between">
          <button onClick={onCancel} className="text-gray-500">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Start Call</h1>
          <div></div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users size={20} />
              <span>Call Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Room Name (Optional)
              </label>
              <Input
                placeholder="Enter room name or leave empty for random"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Share this room name with others to join the call
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Call Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={callType === 'video' ? 'default' : 'outline'}
                  onClick={() => setCallType('video')}
                  className="flex items-center justify-center space-x-2"
                >
                  <Video size={16} />
                  <span>Video</span>
                </Button>
                <Button
                  variant={callType === 'audio' ? 'default' : 'outline'}
                  onClick={() => setCallType('audio')}
                  className="flex items-center justify-center space-x-2"
                >
                  <Phone size={16} />
                  <span>Audio</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button
          onClick={handleStartCall}
          className="w-full py-3 text-lg"
          size="lg"
        >
          {callType === 'video' ? (
            <>
              <Video size={20} className="mr-2" />
              Start Video Call
            </>
          ) : (
            <>
              <Phone size={20} className="mr-2" />
              Start Audio Call
            </>
          )}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Powered by Jitsi Meet - End-to-end encrypted calls
          </p>
        </div>
      </div>
    </div>
  );
};

export { VideoCallScreen, CallInitiationScreen };

