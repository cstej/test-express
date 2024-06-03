const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

server.listen(3000, () => {
  console.log('Express server listening on port 3000');
});

const messages = [];

const sendMessageToAll = (message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

app.post('/messages', (req, res) => {
  const message = req.body.message;
  messages.push(message);
  console.log('received message:', message);
  sendMessageToAll(message);
  res.sendStatus(200);
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.send('Hello from WebSocket server!');
});


