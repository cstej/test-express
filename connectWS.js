const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000');

socket.on('open', () => {
  console.log('WebSocket connection established');
});

socket.on('message', (message) => {
  console.log('Received message:', message.toString());
});

socket.on('close', () => {
  console.log('WebSocket connection closed');
});

socket.on('error', (error) => {
  console.error('WebSocket error:', error);
});
