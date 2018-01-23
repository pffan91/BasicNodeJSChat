const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: process.env.PORT || 5000 });
console.log("websocket server created")

wss.on("connection", function(ws) {
  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
  })

  ws.on('error', () => console.log('errored'));

  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data, function ack(error) {
        });
      }
    });
  });

})
