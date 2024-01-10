const axios = require("axios");

module.exports = async ({ api, event }) => {
  let data = event.body.split(" ");
  if (data.length < 2) {
    const messages = ["Boboka!", "Bakit?!", "Pota bakit?", "Oy!!!!!!!"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    api.sendMessage(message, event.threadID, event.messageID);
  } else {
    try {
      data.shift();
      let txt = data.join(" ");
      let response = await axios.get(
        `https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${txt}&filter=false`
      );
      api.sendMessage(response.data.success, event.threadID, event.messageID);
    } catch (err) {
      api.sendMessage(
        `Error: Please try again.`,
        event.threadID,
        event.messageID
      );
    }
  }
};
