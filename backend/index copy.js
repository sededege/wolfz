const websocket = require("websocket");
  const client = new websocket.client();

  client.on("connect", (connection) => {
    connection.on("message", (message) => {
      if (!message || message.type !== "utf8") return;
      const data = JSON.parse(message.utf8Data);
      if (data === "You have successfully subscribed") {
        return;
      }

      // do logic under here
    });

    connection.sendUTF(
      JSON.stringify({
        action: "subscribe",
        apiKey: "b5ad5dfe-e109-4b7d-945e-b20ba8f7925f",
        subscriptionId: "859eeafc-3bdb-4144-9309-f8b3b7369ac6",
      })
    );
  });

  client.connect("wss://kiki-stream.hellomoon.io");