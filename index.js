const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const cmds = fs.readdirSync(`./cmds`).filter(file => file.endsWith('.js'));
for(const file of cmds){
    const cmd = require(`./cmds/${file}`);

    bot.commands.set(cmd.name, cmd);
}

bot.on('message', async msg => {
    if(msg.author.bot || !msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = bot.commands.get(cmdName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmd) return msg.reply(`\`${cmd}\` is not a valid command.`);

    try{
        cmd.execute(bot, msg, args);
    }catch(err){
        msg.reply(`there was an error in the console.`);
        console.log(err);
    }

    // const cmd = args.shift().toLowerCase();

    // try{
    //     bot.commands.get(cmd).execute(bot, msg, args);
    // }catch(e){
    //     msg.reply(`there was an error in the console.`);
    //     console.log(e);
    // }
})

bot.on('ready', () => {
    cmds.forEach(cmd => {
        console.log(`${cmd} loaded.`)
    })

    console.log(`${bot.user.tag} successfully logged in!`)
})

bot.login(process.env.token);