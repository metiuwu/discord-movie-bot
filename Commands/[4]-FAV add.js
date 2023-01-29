const { SlashCommandBuilder, messageLink } = require("discord.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const moviedbs = require(`../Core/Database/Schema/MovieNameDB`);
const axios = require(`axios`);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("favorite")
    .setDescription("You can add favorite list movie/series")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("You can add favorite list movie/series")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Enter the fav movie/series name")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("You can delete favorite list movie/series")
        .addStringOption((option) =>
          option
            .setName("movie_name")
            .setDescription("Enter the fav movie/series name")
            .setRequired(true)
        )
    ),

  async execute(interaction, client) {
    let moviename = interaction.options.getString("name");
    console.log(moviename);
    switch (interaction.options._subcommand) {
      case "add":
        axios
          .get(`http://www.omdbapi.com/?t=${moviename}&apikey=58e6ec5d`)
          .then(async (response) => {
            if (response.data.Response === "True") {
              const movie = await moviedbs.findOne({
                movie: response.data.Title, userID: interaction.user.id
              });
              if (movie) {
                return interaction.reply("This is already in your favourites.");
              }
              if (response.data.Poster !== "N/A") {
                const movievarembed = new EmbedBuilder()
                  .setTitle(`${response.data.Title} added to favorite list`)
                  .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                  })
                  .setImage(response.data.Poster)
                  .setColor("#6a9c83")
                  .addFields(
                    { name: "Years", value: response.data.Year, inline: true },
                    {
                      name: "IMDB",
                      value: response.data.imdbRating,
                      inline: true,
                    },
                    { name: "Genre", value: response.data.Genre, inline: true },
                    {
                      name: "Director",
                      value: response.data.Director,
                      inline: true,
                    },
                    { name: "Plot ", value: response.data.Plot, inline: true },
                    {
                      name: "Actors",
                      value: response.data.Actors,
                      inline: true,
                    }
                  )
                  .setTimestamp();

                let newData = {
                  channelID: interaction.channel.id,
                  guildID: interaction.guild.id,
                  movie: response.data.Title,
                  userID: interaction.user.id,
                };
                let dbna = await new moviedbs(newData).save();
                console.log(dbna);
                interaction.reply({ embeds: [movievarembed] });
              } else {
                const movie = await moviedbs.findOne({
                  movie: response.data.Title,
                });
                if (movie) {
                  return interaction.reply(
                    "This is already in your favourites."
                  );
                }
                const movievarembed2 = new EmbedBuilder()
                  .setTitle(response.data.Title)
                  .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                  })
                  .setColor("#6a9c83")
                  .addFields(
                    { name: "Year", value: response.data.Year, inline: true },
                    {
                      name: "IMDB",
                      value: response.data.imdbRating,
                      inline: true,
                    },
                    { name: "Genre", value: response.data.Genre, inline: true },
                    {
                      name: "Director",
                      value: response.data.Director,
                      inline: true,
                    },
                    { name: "Plot ", value: response.data.Plot, inline: true },
                    {
                      name: "Actors",
                      value: response.data.Actors,
                      inline: true,
                    }
                  )
                  .setTimestamp();

                let newData = {
                  channelID: interaction.channel.id,
                  guildID: interaction.guild.id,
                  movie: response.data.Title,
                  userID: interaction.user.id,
                };
                let dbna = await new moviedbs(newData).save();
                console.log(dbna);
                interaction.reply({ embeds: [movievarembed2] });
              }
            } else {
              interaction.reply(`${moviename} not found`);
            }
          });
        break;
      case "delete":
        let moviename2 = interaction.options.getString("movie_name");
        axios
          .get(`http://www.omdbapi.com/?t=${moviename2}&apikey=58e6ec5d`)
          .then(async (response) => {
            if (response.data.Response === "True") {
              const movies = response.data.Title;
              console.log(movies)
            
              moviedbs.findOne({movie: response.data.Title, userID: interaction.user.id}).remove().exec();
            
              const success = new EmbedBuilder()
              .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setDescription(`**${response.data.Title}** removed to favorite list`)
              .setColor("DarkBlue")
              interaction.reply({
                embeds: [success]
              });
            }
          });
          break;
    }
  },
};
