module.exports = function({ api, models }) {
setInterval(function () {
	if(global.config.notification) {
require("./handle/handleNotification.js")({ api });
	}
}, 1000*60);
const Users = require("./controllers/users")({ models, api }),
Threads = require("./controllers/threads")({ models, api }),
Currencies = require("./controllers/currencies")({ models });
const logger = require("../catalogs/system-settings/console/console-logger.js");
const chalk = require("chalk");
const gradient= require("gradient-string");
const crayon = gradient('yellow', 'lime', 'green');
const sky = gradient('#3446eb', '#3455eb', '#3474eb');
	
(async function () {
		try {
      const process = require("process");
			const [threads, users] = await Promise.all([Threads.getAll(), Users.getAll(['userID', 'name', 'data'])]);
			threads.forEach(data => {
				const idThread = String(data.threadID);
				global.data.allThreadID.push(idThread);
				global.data.threadData.set(idThread, data.data || {});
				global.data.threadInfo.set(idThread, data.threadInfo || {});
				if (data.data && data.data.banned) {
					global.data.threadBanned.set(idThread, {
						'reason': data.data.reason || '',
						'dateAdded': data.data.dateAdded || ''
					});
				}
				if (data.data && data.data.commandBanned && data.data.commandBanned.length !== 0) {
					global.data.commandBanned.set(idThread, data.data.commandBanned);
				}
				if (data.data && data.data.NSFW) {
					global.data.threadAllowNSFW.push(idThread);
				}
			});
			users.forEach(dataU => {
				const idUsers = String(dataU.userID);
				global.data.allUserID.push(idUsers);
				if (dataU.name && dataU.name.length !== 0) {
					global.data.userName.set(idUsers, dataU.name);
				}
				if (dataU.data && dataU.data.banned) {
					global.data.userBanned.set(idUsers, {
						'reason': dataU.data.reason || '',
						'dateAdded': dataU.data.dateAdded || ''
					});
				}
				if (dataU.data && dataU.data.commandBanned && dataU.data.commandBanned.length !== 0) {
					global.data.commandBanned.set(idUsers, dataU.data.commandBanned);
				}
			});
			global.loading(`Deployed ${gradient.instagram(`${global.data.allThreadID.length}`)} groups and ${gradient.instagram(`${global.data.allUserID.length}`)} users\n\n${gradient.instagram(`AINZ PROJECT VERSION 4.0.0`)}\n`, "[ 𝙳𝙰𝚃𝙰 ]");
		} catch (error) {
			logger.loader(`can't load environment variable, error : ${error}`, 'error');
		}
	})();	

const operator = global.config.OPERATOR.length;
const admin = global.config.ADMINBOT.length;
const approved = global.approved.APPROVED.length;

console.log(`${crayon(``)}${gradient.instagram(`[ 𝙳𝙰𝚃𝙰 ]`)} NAME_OF_BOT : ${gradient.instagram((!global.config.BOTNAME) ? "𝙰𝙸𝙽𝚉" : global.config.BOTNAME)} \n${gradient.instagram(`[ 𝙳𝙰𝚃𝙰 ]`)} UID_OF_BOT : ${gradient.instagram(api.getCurrentUserID())} \n${gradient.instagram(`[ 𝙳𝙰𝚃𝙰 ]`)} PREFIX_OF_BOT : ${gradient.instagram(global.config.PREFIX)}\n${gradient.instagram(`[ 𝙳𝙰𝚃𝙰 ]`)} deployed ${gradient.instagram(operator)} bot operators and ${gradient.instagram(admin)} admins`);
if (global.config.approval) {
  console.log(`${gradient.instagram(`[ 𝙳𝙰𝚃𝙰 ]`)} deployed ${gradient.instagram(approved)} approved groups`)
} 


const handleCommand = require("./handle/handleCommand.js")({ api, Users, Threads, Currencies, models });
const handleCommandEvent = require("./handle/handleCommandEvent.js")({ api, Users, Threads, Currencies, models });
const handleReply = require("./handle/handleReply.js")({ api, Users, Threads, Currencies, models });
const handleReaction = require("./handle/handleReaction.js")({ api, Users, Threads, Currencies, models });
const handleEvent = require("./handle/handleEvent.js")({ api,  Users, Threads, Currencies, models });
const handleCreateDatabase = require("./handle/handleCreateDatabase.js")({  api, Threads, Users, Currencies, models });

	
return (event) => {
		switch (event.type) {
			case "message":
			case "message_reply":
			case "message_unsend":
				handleCreateDatabase({ event });
				handleCommand({ event });
				handleReply({ event });
				handleCommandEvent({ event });
				break;
			case "change_thread_image": 
				break;
			case "event":
				handleEvent({ event });
				break;
			case "message_reaction":
				handleReaction({ event });
				break;
			default:
				break;
		}
	};
}; 