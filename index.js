const fs = require("fs");
const login = require("fca-project-orion");

login(
  { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
  (err, api) => {
    if (err) return console.error(err);

    api.setOptions({
      logLevel: "silent",
      forceLogin: true,
      listenEvents: true,
      autoMarkDelivery: false,
      selfListen: true,
    });

    var stopListening = api.listenMqtt((err, event) => {
      if (err) return console.error(err);

      switch (event.type) {
        case "message":
            const input = event.body.toLowerCase();
            if (input.startsWith("ping")) {
                api.sendMessage("Pong!", event.threadID);
            } else if (input.startsWith("chika")) {
                api.sendMessage("Chika is Online!", event.threadID);
            }
        case "event":
          console.log(event);
          break;
      }
    });
  }
);
