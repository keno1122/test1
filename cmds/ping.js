module.exports = {
    name: "ping",
    description: "(check the bot s latency",
    async execute(bot, msg, args){
        msg.channel.send(`${bot.ws.ping}ms`)

    },
}