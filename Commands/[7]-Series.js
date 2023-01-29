const { SlashCommandBuilder, messageLink } = require("discord.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const moviedbs = require(`../Core/Database/Schema/MovieNameDB`);
const axios = require(`axios`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("seriesinfo")
    .setDescription("Get Series info")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Enter the series name")
            .setRequired(true)
        ),
    
  async execute(interaction, client) {
    let moviename = interaction.options.getString("name");
    console.log(moviename);

    axios
    .get(`http://www.omdbapi.com/?t=${moviename}&apikey=58e6ec5d`)
    .then(async (response) => {
        if (response.data.Response === "True") {
            if(response.data.Poster !== "N/A") {
                const movievarembed = new EmbedBuilder()
                .setTitle(`${response.data.Title}`)
                .setImage(response.data.Poster)
                .setColor("Random")
                .addFields(
                    { name: 'Years', value: response.data.Year, inline: true},
                    { name: 'IMDB', value: response.data.imdbRating, inline: true},
                    { name: 'Genre', value: response.data.Genre, inline: true  },
                    { name: 'Director', value: response.data.Director, inline: true },
                    { name: 'Plot ', value: response.data.Plot, inline: true},
                    { name: 'Actors', value: response.data.Actors,inline: true },
                )
                .setTimestamp()
    
              interaction.reply({embeds: [movievarembed]})
            } else {
                const movievarembed2 = new EmbedBuilder()
                .setTitle(response.data.Title)
                .setColor('Red')
                .addFields(
                    { name: 'Year', value: response.data.Year, inline: true},
                    { name: 'IMDB', value: response.data.imdbRating, inline: true },
                    { name: 'Genre', value: response.data.Genre, inline: true },
                    { name: 'Director', value: response.data.Director, inline: true},
                    { name: 'Plot ', value: response.data.Plot, inline: true},
                    { name: 'Actors', value: response.data.Actors, inline: true },
                )
                .setTimestamp()
         
              interaction.reply({embeds: [movievarembed2]})
            }
           
        } else {
            interaction.reply(`${moviename} not found`)
        }
      });
  },
};
