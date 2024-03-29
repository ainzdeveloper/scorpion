const axios = require('axios');

module.exports.config = {
  name: "gemini",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ainz",
  description: "this command will help you to answer your questions!",
  usage: "[name of cmd] [query]",
  usePrefix: false,
  commandCategory: "Artificial Intelligence",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  try {
    const query = args.join(" ") || "hello";
    const data = await api.getUserInfo(event.senderID);
    const { name } = data[event.senderID];
    
    const apikey = 'AIzaSyBp9HQ69tdYi2TEywbVNYeDZEln0W8BBf8';
      api.setMessageReaction("🟡", event.messageID, (err) => console.log(err), true);
       api.sendMessage(
        `⚔️ Waiting for response on gemini...`,
        event.threadID
      );
const a = "https://gemini-ai-uk.onrender.com/gemini";
      axios.get(a, { params: {
    prompt: query,
    apikey: apikey
}}).then((response)=>{
  console.log(response.data);
          api.setMessageReaction("🟢", event.messageID, (err) => console.log(err), true);
        api.sendMessage(response.data.success, event.threadID, event.messageID) 
          console.log(`Sent Gemini's response to the user`)
      })
  } catch (error) {
    console.error(`🔴 Failed to get Gemini's response: ${error.message}`);
    const errorMessage = "🔴 An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.";
    api.sendMessage(errorMessage, event.threadID);
  }
};
