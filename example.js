const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
 
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {    headless: false,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    }
 
});
 
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});
 
client.on('ready', () => {
    console.log('Client is ready!');
});
 
const prefix = "!";
 
client.on('message', async msg => {
 
    if (msg.body[0] == prefix){
        
        var [cmd, ...args] = msg.body.slice(1).split(" ");
        args = args.join(" ");
 
        if (cmd == "say"){
            client.sendMessage(msg.from, args);
        }
        
        if (cmd === "s") {
            const attachmentData = await msg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, {sendMediaAsSticker: true});
        }
    }
});
 
client.initialize();