const WebSocket = require('ws');
const getPowerData = require('./generator');

const port = process.env.PORT || 3000;
const interval = process.env.INTERVAL || 500;

const wss = new WebSocket.Server({
  perMessageDeflate: false,
  port
});

// Broadcast to all.
wss.broadcast = broadcast;

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

setInterval(() => wss.broadcast(JSON.stringify(getPowerData())), interval);
console.log('Websocket server started at port ' + port);
