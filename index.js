const Discord = require('discord.js');
const client = new Discord.Client();
const { readdirSync } = require('fs');
const { join } = require('path');
const token = proces.env.token;
const prefix = process.env.prefix;

client.on('ready', () => { //봇이 준비 되었을때
  console.log('DISCORD BOT LOGIN') //콘솔 창에 DISCORD BOT LOGIN 이란 문구를 띄웁니다
})

client.commands= new Discord.Collection();
require('dotenv').config();

const sleep = (ms) => {return new Promise(resolve=>{setTimeout(resolve,ms)})}
client.on('ready', async() => {   
    while(1) {
      client.user.setActivity(`!!코로나`)
      await sleep(4000)
      client.user.setActivity(`!!서버정보`)
      await sleep(4000)
      client.user.setActivity(`!!핑`)
      await sleep(4000)
      client.user.setActivity(`!!날씨`)
      await sleep(4000)
      client.user.setActivity(`prefix : !!`)
      await sleep(4000)
    } 
  })
  
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