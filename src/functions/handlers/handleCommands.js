require("dotenv").config();

/*
A Command Handler is essentially a way to separate your commands into different files, instead of having a bunch of if/else conditions inside your code (or a switch/case if you're being fancy).

In this case, the code shows you how to separate each command into its own file. This means that each command can be edited separately, and also reloaded without the need to restart your bot.
*/

/*
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
*/
const { REST, Routes } = require('discord.js');

const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands')
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const clientID = '1040672117160689684';
        const guildID = '1040672658129432607';

        // Construct and prepare an instance of the REST module
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORDJS_BOT_TOKEN);

        // and deploy your commands!
        (async () => {
            try {
                console.log(`Started refreshing application (/) commands.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                    Routes.applicationGuildCommands(clientID, guildID),
                    { body: client.commandArray },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
            }
        })();
        /*
        const rest = new REST({ verison: '9' }).setToken(process.env.DISCORDJS_BOT_TOKEN);


        try {
            console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationGuildCommands(clientID, guildID), {
                body: client.commandArray,
            });

            console.log("Successfully reloaded application (/) commands.");

        } catch (error) {
            console.error(error)
        }
        */
    }
}