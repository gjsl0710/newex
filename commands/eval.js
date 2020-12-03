const Discord = require('discord.js');

module.exports ={
    name: "코드실행",
    description: "eval comands",

    async run (client, message, args) {
        if (message.author.id === '454597868901367808') {
            evalcommand = message.content.substring(9)
            eval(evalcommand)
          }
    }
}