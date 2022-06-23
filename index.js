require('dotenv').config(); //initialize dotenv
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = "~";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'test':
            msg.reply(`Test OK. Args: ${args}`);
            break;
        case 'hymn':
            playHymn(msg);
            break;
        case 'ping':
            const timeTaken = Date.now() - msg.createdTimestamp;
            msg.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            break;
    }
});



function playHymn(message){
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "You need to be in a voice channel to play music!"
        );
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "I need the permissions to join and speak in your voice channel!"
        );
    }
}






client.login(process.env.CLIENT_TOKEN);