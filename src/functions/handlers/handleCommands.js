/*
A Command Handler is essentially a way to separate your commands into different files, instead of having a bunch of if/else conditions inside your code (or a switch/case if you're being fancy).

In this case, the code shows you how to separate each command into its own file. This means that each command can be edited separately, and also reloaded without the need to restart your bot.
*/

const fs = require('fs');

module.exports = (client) => {
    client.handleCommandes = async () => {
        const commandFolders = fs.readdirSync('./src/commands')
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('js'));
            
            const {commands, commandArray} = client;
            for (const file of commandFiles) {
                const command = requrie (`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJson());
            }
        }
    }
}