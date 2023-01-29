let client = require('../Core/Utils/client')

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {

        if (!interaction.isCommand()) return;
        if (!interaction.guild) return;

        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bir hata oluştu'})

        }
    }
}