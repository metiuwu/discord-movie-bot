const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('You view the help commands'),
        async execute(interaction, client) {
        let enembed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
          .setFooter({
            text: `© Developed By Metiuw`,
          })
          .setTimestamp()
          .setDescription(
            `
            [] = mandatory
            () = optional

            \` ••❯ \` **How ​​can I get information about the movie?** \`/move info [movie name]\`
            \` ••❯ \` **How ​​can I get information about the series?** \`/series info [series name]\`
            \` ••❯ \` **How ​​do I add a Movie/Series to my favourites?** \`/favorite add [movie/series name]\`
            \` ••❯ \` **How ​​do I delete a Movie/Series from my favourites?** \`/favorite delete [movie/series name]\`
            \` ••❯ \` **How do I view my favorite list?** \`/favlist (user)\``

          );
        interaction.reply({
          embeds: [enembed],
          ephemeral: true
        })
    }

          
};