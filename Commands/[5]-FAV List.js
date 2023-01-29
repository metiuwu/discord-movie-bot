const { SlashCommandBuilder, messageLink } = require("discord.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { ComponentType } = require('discord.js');
const moviedbs = require(`../Core/Database/Schema/MovieNameDB`);

const axios = require(`axios`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("favlist")
    .setDescription("favorite list")
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('shows user favorite list')
        ),
    
  async execute(interaction, client) {
    
    if(interaction.options._hoistedOptions?.[0]?.user){
      const user = interaction.options._hoistedOptions?.[0]?.user
      const movies = await moviedbs.find({ userID: user.id });
      if(!movies) {
       return interaction.reply("aa")
      }
      if(!movies.movie){
         new EmbedBuilder().setDescription(`There are no movies/series in the user's favorite list`).setTitle(`Opss.`).setColor("Random").setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
      }
      let moviescount = movies.length;
      let pages;
      try {
          pages = movies
      }
      catch (err) {
          return console.log(err)
      }
      
      const generateEmbed = (start) => {
        let moviesString = "";
        let count = start + 1;
        for (let i = start; i < start + 5; i++) {
            if (i >= movies.length) {
                break;
            }
            moviesString += `${count}. **${movies[i].movie}**\n`;
            count++;
        }
        return new EmbedBuilder().setDescription(`**Movies/Series saved to Favorites by the user are listed below.** \n\n${moviesString}`).setTitle(`${user.username} Favorite List`).setColor("Random").setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL({ dynamic: true }),
        })
    }
    
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle("Secondary")
        .setEmoji("1065185084870758410")
        .setCustomId("backred"),
        new ButtonBuilder()
        .setStyle("Danger")                  
        .setEmoji("1064909062791254106")
        .setCustomId("cancel"),
        new ButtonBuilder()
        .setStyle("Secondary")                  
        .setEmoji("1065185083163676692")
        .setCustomId("nextgreen")
    );

    let currentIndex = 0;

    const embedMessage = await interaction.reply({
      embeds: [await generateEmbed(currentIndex)],
      components: [row]
  })

const collector = embedMessage.createMessageComponentCollector({ componentType: ComponentType.Button, time: 45000 });

collector.on('collect', async (int) => {
  if (int.user.id === interaction.user.id) {

  if (int.customId == "backred") {

    currentIndex--;
  }

  else if (int.customId == "nextgreen") {
      currentIndex++;
  }

  if (currentIndex < 0) {
      currentIndex = 0;
  }
  if (currentIndex == pages.length) {
      currentIndex = pages.length - 1;
  }

  let embed = await generateEmbed(currentIndex)

  int.update({
      embeds: [embed],
      components: [row]
  })
} else {
  console.log("You canttt!!")
}
}) } else {
      const movies = await moviedbs.find({ userID: interaction.user.id });
      let moviescount = movies.length;
      let pages;
      try {
          pages = movies
      }
      catch (err) {
          return console.log(err)
      }

      const generateEmbed = (start) => {
        let moviesString = "";
        let count = start + 1;
        for (let i = start; i < start + 5; i++) {
            if (i >= movies.length) {
                break;
            }
            moviesString += `${count}. **${movies[i].movie}**\n`;
            count++;
        }
        return new EmbedBuilder().setDescription(`**Movies/Series saved to Favorites by the user are listed below.** \n\n${moviesString}`).setTitle(`${interaction.user.username} Favorite List`).setColor("Random").setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        
    }
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle("Secondary")
        .setEmoji("1065185084870758410")
        .setCustomId("backred"),
        new ButtonBuilder()
        .setStyle("Danger")                  
        .setEmoji("1064909062791254106")
        .setCustomId("cancel"),
        new ButtonBuilder()
        .setStyle("Secondary")                  
        .setEmoji("1065185083163676692")
        .setCustomId("nextgreen")
    );

    let currentIndex = 0;

    const embedMessage = await interaction.reply({
      embeds: [await generateEmbed(currentIndex)],
      components: [row]
  })
  const collector = embedMessage.createMessageComponentCollector({ componentType: ComponentType.Button, time: 45000 });

  collector.on('collect', async (int) => {
    if (int.user.id === interaction.user.id) {
  
    if (int.customId == "backred") {
  
      currentIndex--;
    }
  
    else if (int.customId == "nextgreen") {
        currentIndex++;
    }
  
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    if (currentIndex == pages.length) {
        currentIndex = pages.length - 1;
    }
  
    let embed = await generateEmbed(currentIndex)
  
    int.update({
        embeds: [embed],
        components: [row]
    })
    } else {
      console.log("You cant")
    }
  })}
  },
};
