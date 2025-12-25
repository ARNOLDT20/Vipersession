const PastebinAPI = require('pastebin-js'),
	pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const { makeid } = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: starboy,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function FEE_XMD_QR() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_starboy = starboy({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_starboy.ev.on('creds.update', saveCreds)
			Qr_Code_By_starboy.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(50000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(8000);
					let b64data = Buffer.from(data).toString('base64');
					let session = await Qr_Code_By_starboy.sendMessage(Qr_Code_By_starboy.user.id, { text: 'EXPERT-MD%>' + b64data });

					let FEE_XMD_TEXT = `
*═════════════════════*
*_VIPER MD device connected_*
______________________________________
╔════◇
║ *『 THANKS 👍 FOR  CHOOSING US』*
║ _You Have Completed the First Step to Deploy a Whatsapp Bot._
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ *Owner:* _https://wa.me/255625606354_
║❒ *Instagram:* _https://www.instagram.com/official_arnold.1_
║❒ *Send Text:* _https://wa.me/255625606354 (text: hi)_
║❒ *Song:* _https://files.catbox.moe/vkq31o.mp3_
║❒ *WaChannel:* _https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d_
║❒ 
╚════════════════════════╝
_____________________________________
> regards VIPER MD`
					await Qr_Code_By_starboy.sendMessage(Qr_Code_By_starboy.user.id, { text: FEE_XMD_TEXT }, { quoted: session })



					await delay(100);
					await Qr_Code_By_starboy.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					FEE_XMD_QR();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await FEE_XMD_QR()
});
module.exports = router
