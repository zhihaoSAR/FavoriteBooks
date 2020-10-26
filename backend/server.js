const WebSocket = require('ws');
var book = require('Book')
const wss = new WebSocket.Server({ port: 3030 });

function initService()
{
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });
}

