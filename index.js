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
      client.user.setActivity(`327명의 사용자 감지!`)
      await sleep(4000)
      client.user.setActivity(`${client.guilds.cache.size}개의 서버에서 사용중!`)
      await sleep(4000)
      client.user.setActivity(`문아 도와줘`)
      await sleep(4000)
      client.user.setActivity(`업데이트!`)
      await sleep(4000)
      client.user.setActivity(`Update!`)
      await sleep(4000)
      client.user.setActivity(`V2.12.3.0325`)
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

client.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content) return // 임베드로 인한 수정같은 경우 
  let img = oldMessage.author.avatar ? `https://cdn.discordapp.com/avatars/${oldMessage.author.id}/${oldMessage.author.avatar}.gif?size=256` : undefined;
  let embed = new Discord.MessageEmbed()
  .setTitle('채팅로그')
  .setColor('#FFFF')
  .addField('수정로그', '감지!')
  .addField('메시지를 보낸사람 : ', oldMessage.author.tag)
  .addField('보낸 채널 : ', oldMessage.channel.name)
  .addField('삭제한 메시지: ', oldMessage.content)
  .addField('변경 후 메시지:', newMessage.content)
  .setFooter(oldMessage.author.tag, img)
  .setTimestamp()

  oldMessage.channel.send(embed)
}) // 메세지 수정로그

client.on('messageDelete', async message => {
let img = message.author.avatar ? `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.gif?size=256` : undefined;
let embed = new Discord.MessageEmbed()
.setTitle('채팅로그')
.setColor('#FFFF')
.addField('삭제로그', '감지!')
.addField('메시지를 보낸사람:', message.author.tag)
.addField('보낸 채널:', message.channel.name)
.addField('삭제한 메시지:', message.content)
.setFooter(message.author.tag, img)
.setTimestamp()

message.channel.send(embed)

}) // 메세지 삭제로그 (embed)


client.login(token);