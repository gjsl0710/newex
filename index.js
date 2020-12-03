const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json')
const { readdirSync } = require('fs');
const { join } = require('path');

client.commands= new Discord.Collection();
require('dotenv').config();

const sleep = (ms) => {return new Promise(resolve=>{setTimeout(resolve,ms)})}
client.on('ready', async() => {   
    while(1) {
      client.user.setActivity(`327명의 사용자와 함께`)
      await sleep(4000)
      client.user.setActivity(`${client.guilds.cache.size}개의 서버안에서`)
      await sleep(4000)
      client.user.setActivity(`문아 도와줘`)
      await sleep(4000)
      client.user.setActivity(`Run with 327 People`)
      await sleep(4000)
      client.user.setActivity(`Run with ${client.guilds.cache.size} Server`)
      await sleep(4000)
    } 
  })
  
  client.on('message', async message => {
    if (/\<\@\![0-9]+\>/.test(message.content) === true) {
        if (message.author.bot) return
        message.channel.send(`**${message.author.tag}** 맨션 감지 :sneezing_face:!`)
      }});

      client.on('message', async message => {
        if (/<@&[0-9]+>/.test(message.content) === true) {
          if (message.author.bot) return
          message.channel.send(`***${message.author.tag}*** 님의 **역할**멘션감지 :sneezing_face:!`)
        }});

const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));

for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(token);
