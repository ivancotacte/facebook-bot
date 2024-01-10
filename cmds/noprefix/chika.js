const axios = require("axios");

module.exports = async ({ api, event }) => {
  let data = event.body.split(" ");
  if (data.length < 2) {
    const messages = ["Hello", "Oy", "Wassup", "Hey"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    api.sendMessage(message, event.threadID, event.messageID);
  } else {
    try {
    data.shift();
    let txt = data.join(" ");
    let response = await axios.get(
      `https://hercai.onrender.com/v3/hercai?question=${txt}`
    );
    api.sendMessage(response.data.reply, event.threadID, event.messageID);
    } catch (err) {
      api.sendMessage(
        `Error: ${response.data.reply}`,
        event.threadID,
        event.messageID
      );
    }
  }
}