import { useState } from 'react';
import VideoPlayer from './VideoPlayer';

const App = () => {
  const [url, setUrl] = useState('https://your-rtsp-stream-url.m3u8');

  return (
    <div className="App">
      <h1>LiveStream Viewer</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter RTSP Stream URL"
      />
      <VideoPlayer url={url} />
    </div>
  );
};

export default App;
