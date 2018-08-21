const moment  = module.require("moment-timezone");
const config  = module.require("../config.json");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args)  => {
    console.log(`kick`);
    return;
}

module.exports.help = {
    name: "kick",
    desc: "Kick a User",
    category: "admin"
}