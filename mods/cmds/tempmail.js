module.exports.config = {
  name: "tempmail",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ainz",
  description: "this command will help you to generate an temporary email address!",
  usage: "",
  usePrefix: true,
  commandCategory: "Fun",
  cooldowns: 0
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require('axios');
    let { threadID, messageID } = event;


    if (!args[0]) {
        api.sendMessage(`🔴 | wrong query pls do this "tempmail generate", "tempmail inbox", or "tempmail passgen"`, threadID, messageID);
    }
    else if (args[0] == "generate") {
        const url1 = await axios.get(`https://gemini-ai-uk.onrender.com/gen`);
        const email = url1.data.email;
  return api.sendMessage(`🗞️ | here's your temporary email :\n${email}`, threadID, messageID);
    }
    
    else if (args[0] == "passgen") {
        const nigga = await axios.get(`https://share-api.onrender.com/tools/passgen`);
        const pass = nigga.data.password;
  return api.sendMessage(`✨ | Here's your generated password : ${pass}`, threadID, messageID);
    }
    
    else if (args[0] == "inbox") {
    const text = args[1];
      const url2 = await axios.get(`https://gemini-ai-uk.onrender.com/inbox/${text}`);
        const jane = url2.data[0];
        const a = jane.from;
        const b = jane.subject;
        const c = jane.body;
        const d = jane.date;

           return api.sendMessage(`✨ | 𝗛𝗲𝗿𝗲'𝘀 𝘁𝗵𝗲 𝗶𝗻𝗯𝗼𝘅 𝗼𝗳 ${text}\n\n𝗙𝗿𝗼𝗺: ${a}\n\n𝗦𝘂𝗯𝗷𝗲𝗰𝘁 𝗼𝗳 𝗺𝗲𝘀𝘀𝗮𝗴𝗲: ${b}\n\n𝗕𝗼𝗱𝘆 𝗼𝗳 𝗺𝗲𝘀𝘀𝗮𝗴𝗲:\n${c}\n${d}`, threadID, messageID);

    }
};
