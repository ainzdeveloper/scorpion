const axios = require('axios');

module.exports.config = {
  name: "autobot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ainz",
  description: "this command will help you to create an facebook bot or ai through appstate",
  usage: "{pref}[name of cmd] [appstate] [prefix] [your_uid] [bot_name]",
  usePrefix: true,
  commandCategory: "system",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
  //Info
  const state = args[0];
  const pref = args[1];
  const uid = args[2];
  const botname = args[3];
  
  try { //catching error
    const url = "https://gemini-ai-uk.onrender.com/autobot"
    const response = await axios.post(url, {
      state: state,
      pref: pref,
      uid: uid,
      botname: botname
    })
    //getting response
    const res = response.data.result;
    api.sendMessage(res, event.threadID, event.messageID);
  } catch(e) {
    api.sendMessage(e, event.threadID, event.messageID);
    console.log(e)
  } //end of catching error
}

//Sabihin nyo gpt tong code na to haha

//loveu
