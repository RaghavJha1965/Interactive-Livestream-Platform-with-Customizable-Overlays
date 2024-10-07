import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';
import { createOverlay, getOverlays, updateOverlay, deleteOverlay } from './api';

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const [overlays, setOverlays] = useState([]);
  const [newOverlayText, setNewOverlayText] = useState('');
  const [newOverlayImage, setNewOverlayImage] = useState(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
    }
  
   
    getOverlays()
      .then((response) => {
        setOverlays(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching overlays:", error);
      });
  }, [url]);

  const handleCreateOverlay = () => {
    const randomX = Math.floor(Math.random() * 300); 
    const randomY = Math.floor(Math.random() * 300); 

    const newOverlay = {
      text: newOverlayText,
      image: newOverlayImage,
      x: randomX,
      y: randomY,
      width: 150,
      height: 150,
    };
    createOverlay(newOverlay).then(() => {
      setOverlays([...overlays, newOverlay]);
    });
  };

  const handleOverlayDragStop = (index, d) => {
    const updatedOverlays = [...overlays];
    updatedOverlays[index] = {
      ...updatedOverlays[index],
      x: d.x,
      y: d.y,
    };
    setOverlays(updatedOverlays);  
    updateOverlay(updatedOverlays[index]._id, updatedOverlays[index]); 
  };

  const handleOverlayResizeStop = (index, ref, position) => {
    const updatedOverlays = [...overlays];
    updatedOverlays[index] = {
      ...updatedOverlays[index],
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      x: position.x,
      y: position.y,
    };
    setOverlays(updatedOverlays);  
    updateOverlay(updatedOverlays[index]._id, updatedOverlays[index]); 
  };

  const handleDeleteOverlay = (index) => {
    deleteOverlay(overlays[index]._id).then(() => {
      const updatedOverlays = overlays.filter((_, i) => i !== index);
      setOverlays(updatedOverlays);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewOverlayImage(reader.result); 
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Interactive LiveStream Viewer</h1>

      <div className="relative w-full max-w-4xl rounded-lg shadow-lg overflow-hidden video-wrapper">
        <video ref={videoRef} controls className="w-full rounded-lg" />

        
        {overlays.map((overlay, index) => (
          <Rnd
            key={index}
            size={{ width: overlay.width, height: overlay.height }}
            position={{ x: overlay.x, y: overlay.y }}
            bounds=".video-wrapper"
            onDragStop={(e, d) => handleOverlayDragStop(index, d)}
            onResizeStop={(e, direction, ref, delta, position) => handleOverlayResizeStop(index, ref, position)}
            enableResizing={{
              bottomRight: true,
            }}
            className="absolute bg-black bg-opacity-50 text-white p-2 rounded-lg shadow-lg"
          >
            {overlay.image && <img src={overlay.image} alt="overlay" className="w-full h-full object-cover rounded-lg" />}
            {overlay.text && <span className="absolute top-2 left-2 text-white bg-black bg-opacity-70 px-2 py-1 rounded">{overlay.text}</span>}
            <button
              className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleDeleteOverlay(index)}
            >
              Delete
            </button>
          </Rnd>
        ))}
      </div>

      
      <div className="flex flex-col mt-4 space-y-3">
        <input
          type="text"
          value={newOverlayText}
          onChange={(e) => setNewOverlayText(e.target.value)}
          placeholder="Enter overlay text"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreateOverlay}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Text & Image Overlay
        </button>
      </div>
    </div>
  );
};


VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default VideoPlayer;
