import React from 'react';
import Logo from './Logo';

interface VideoPlayerProps {
  url: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  return (
    <div 
      className="w-full h-full relative"
      // Disable right-click context menu to deter saving the video
      onContextMenu={(e) => e.preventDefault()}
    >
      <video
        key={url} // Add key to force re-render when video source changes
        src={url}
        title={title}
        controls
        // Hide the download button in the video controls
        controlsList="nodownload"
        className="w-full h-full"
      >
        Your browser does not support the video tag.
      </video>
      {/* Watermark Logo */}
      <div className="absolute bottom-4 right-4 pointer-events-none">
          <Logo className="w-12 h-12 text-white opacity-25" />
      </div>
    </div>
  );
};

export default VideoPlayer;