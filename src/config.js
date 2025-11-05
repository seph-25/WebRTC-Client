const config = {
  WEBSOCKET_URL: window.location.hostname === 'localhost' 
    ? 'ws://localhost:8000'
    : 'wss://webrtc-server-app.azurewebsites.net',
};

export default config;
