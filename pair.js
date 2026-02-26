const PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: starboy,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
};
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    async function FEE_XMD_PAIR() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id)
        try {
            let Pair_Code_By_starboy = starboy({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS('Chrome')
            });
            if (!Pair_Code_By_starboy.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                try {
                    const code = await Pair_Code_By_starboy.requestPairingCode(num);
                    const waLink = `https://wa.me/${num}?text=${encodeURIComponent(code)}`;
                    if (!res.headersSent) {
                        res.json({ code: code, link: waLink });
                    }
                } catch (e) {
                    if (!res.headersSent) {
                        res.status(500).json({ error: e.message });
                    }
                }
            }
            Pair_Code_By_starboy.ev.on('creds.update', saveCreds)
            Pair_Code_By_starboy.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                    await delay(50000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(8000);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_starboy.sendMessage(Pair_Code_By_starboy.user.id, { text: 'VIPER-MD%>' + b64data });

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

                    await Pair_Code_By_starboy.sendMessage(Pair_Code_By_starboy.user.id, { text: FEE_XMD_TEXT }, { quoted: session })


                    await delay(100);
                    await Pair_Code_By_starboy.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    FEE_XMD_PAIR();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service is Currently Unavailable" });
            }
        }
    }
    return await FEE_XMD_PAIR()
});
module.exports = router
