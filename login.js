const fs = require("fs");
const path = require("path");
const login = require("fca-project-orion");

const proxy = {
  protocol: "socks5",
  host: "104.36.180.119",
  port: 1080,
  username: "BWy1lf55",
  password: "n90zJq8Vw3R",
};

const local = {
  timezone: "Asia/Manila",
  region: "ph",
  headers: {
    "X-Facebook-Locale": "en_US",
    "X-Facebook-Timezone": "Asia/Manila",
    "X-Fb-Connection-Quality": "EXCELLENT",
  },
};

function loadAppState() {
  try {
    const appStatePath = path.join(__dirname, "appstate.json");
    return JSON.parse(fs.readFileSync(appStatePath, "utf8"));
  } catch (error) {
    console.error("Error loading app state:", error);
    return null;
  }
}

async function listen(orion) {
  try {
    login({ appState: loadAppState(), proxy: proxy }, async (err, api) => {
      try {
        if (err) return console.error(err);
        api.setOptions({
          logLevel: "silent",
          forceLogin: true,
          listenEvents: true,
          autoMarkDelivery: false,
          selfListen: true,
          font: { data: "test" },
        });
        api.listenMqtt((err, event) => {
          if (err) return console.error(err);
          orion(api, event);
        });
      } catch (err) {
        if (!!err.errorSummary) {
          console.log(err.errorSummary);
        } else {
          console.log(err);
        }
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { listen };