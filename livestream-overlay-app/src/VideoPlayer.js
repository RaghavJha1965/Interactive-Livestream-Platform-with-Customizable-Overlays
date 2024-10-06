import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import './Overlay.css'; // Create a CSS file for overlay styles

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const [overlay, setOverlay] = useState({ text: 'Custom Overlay', x: 50, y: 50, size: 20 });

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
    }
  }, [url]);

  const handleOverlayDrag = (e) => {
    setOverlay({
      ...overlay,
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }} />
      <div
        className="overlay"
        style={{
          position: 'absolute',
          left: `${overlay.x}px`,
          top: `${overlay.y}px`,
          fontSize: `${overlay.size}px`,
          cursor: 'move',
        }}
        onMouseDown={handleOverlayDrag}
      >
        {overlay.text}
      </div>
    </div>
  );
};

export default VideoPlayer;
