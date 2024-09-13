import React, { useState } from 'react';
import Login from './Login';
import YouTubeAuth from './YouTubeAuth';

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <YouTubeAuth token={token} />;
}

export default App;
