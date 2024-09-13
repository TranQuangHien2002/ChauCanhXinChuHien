import React from 'react';

function YouTubeAuth({ token }) {
  const handleAuth = async () => {
    const response = await fetch('http://localhost:3000/youtube/auth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      window.location.href = data.redirectUrl; // URL để chuyển hướng sau khi xác thực thành công
    } else {
      alert('Authorization failed');
    }
  };

  const handleCheckAccess = async () => {
    const videoId = prompt('Enter the YouTube video ID:');
    const response = await fetch(
      `http://localhost:3000/youtube/check?videoId=${videoId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <button onClick={handleAuth}>Authorize YouTube</button>
      <button onClick={handleCheckAccess}>Check Video Access</button>
    </div>
  );
}

export default YouTubeAuth;
