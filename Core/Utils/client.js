const Discord = require('discord.js');
const client = new Discord.Client({ intents: [3276799] });
const moment = require("moment")
const config = client.config = require('../Settings/config');
client.slashCommands = new Discord.Collection();
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { ActivityType } = require("discord.js");


client.login(config.token)
let statuses = [`/movie info`, `/favlist`,`/help`];
setInterval(function() {
  let status = statuses[Math.floor(Math.random()*statuses.length)];
  client.user.setPresence({
    activities: [{ name: status, type: ActivityType.Listening }],
    status: 'dnd',
  });
}, 10000)


client.on("guildCreate", async (guild) => {
    const channel = client.channels.cache.get("1065229677586817074");
    let own = await guild.fetchOwner();
  
    //Metiuw Tada Bot
    const embed = new EmbedBuilder()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setAuthor({
        name: "Joined a Guild !!"
    })
    .setDescription(`
Name: \`${guild.name}\`

ID: \`${guild.id}\`

Owner: \`${
    guild.members.cache.get(own.id)
      ? guild.members.cache.get(own.id).user.tag
      : "Unknown user"
  }\` \`${own.id}\`

Member Count: \`${guild.memberCount}\` Members

Creation Date: \`${moment.utc(guild.createdAt).format("DD/MMM/YYYY")}\`

Server Count: ${client.user.username}'s Server Count \`${client.guilds.cache.size}\` Severs
  `)
    .setColor("Random")
    .setTimestamp();
    channel.send({ embeds: [embed] });
})
client.on("guildDelete", async (guild) => {
    const channel = client.channels.cache.get("1065229677586817074");
    let own = await guild.fetchOwner();
  
    //Metiuw Tada Bot
    const embed = new EmbedBuilder()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
    .setAuthor({
        name: "Leave a Guild !"
    })
    .setDescription(`
Name: \`${guild.name}\`

ID: \`${guild.id}\`

Owner: \`${
    guild.members.cache.get(own.id)
      ? guild.members.cache.get(own.id).user.tag
      : "Unknown user"
  }\` \`${own.id}\`

Member Count: \`${guild.memberCount}\` Members

Creation Date: \`${moment.utc(guild.createdAt).format("DD/MMM/YYYY")}\`

Server Count: ${client.user.username}'s Server Count \`${client.guilds.cache.size}\` Severs
  `)
    .setColor("Random")
    .setTimestamp();
    channel.send({ embeds: [embed] });
})

module.exports = client