const { listen } = require("./login.js");
const config = require("./config");

listen(async (api, event) => {
  if (event.type === "message") {
    require("./handlers/handleMessage.js")({ api, event, config });
  } else if (event.type === "message_reply") {
    require("./handlers/handleReply.js")({ api, event, config });
  } else if (event.type === "event") {
  }
});