const Discord = require('discord.js')

module.exports = {
    name: "핑",
    description: "test command",
    usage: "",
    aliases: ["ping", "퐁", "pong"],

    async run (client, message, args) {
        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓\`${Date.now() - message.createdTimestamp}\`ms 입니당!`)
        .setColor('#FFFF')
        message.channel.send(ping);
    }
}