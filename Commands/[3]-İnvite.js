const { SlashCommandBuilder, messageLink } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot'),
    
        async execute(interaction, client) {
            const row = new ActionRowBuilder().addComponents(
          
                new ButtonBuilder()
                  .setLabel("Invite")
                  .setStyle("Link")
                  .setURL("https://discord.com/api/oauth2/authorize?client_id=934189357693280366&permissions=8&scope=bot%20applications.commands"),
                  new ButtonBuilder()
                  .setLabel("Github")
                  .setStyle("Link")                  
                  .setURL("https://github.com/metiuwu"),
                  new ButtonBuilder()
                  .setLabel("My Developer")
                  .setStyle("Link")
                  .setURL("https://discord.com/users/368813104668213250")
              );

              interaction.reply({content: "Hey You can invite the bot from the options below and check my developer", components: [row]})
    }

          
};