// https://discordjs.guide/#before-you-begin

// This going to basically load up all of the environment variables that are inside our env file
require("dotenv").config();

// Import the filesystem module
const fs = require('fs')

/* 1- Adding the Bot to our Server */

/* Before proceeding, we need to complete these steps :
- Go to https://discord.com/developers/applications
- Create new application and give it a name
- G to Bot section and copy the Token then intilize the env var 'DISCORDJS_BOT_TOKEN' in .env file with this token
- Go to OAuth2 section and get the 'CLIENT ID'
- Login to discord account and create new discord server with 'Add a Server'
- Link the new server to new application :  https://discord.com/oauth2/authorized?client_id=<COPY_THE_CLIENT_ID_HERE>&scope=bot
*/

console.log(process.env.DISCORDJS_BOT_TOKEN);

/* The next step is to make the Bot online */

// Module is just an object that has a bunch of different exports

/*
Gateway Intents were introduced to the library in v12 and allow you to pick which events your bot will receive. 

Intents are groups of pre-defined events that the discord.js client will conditionally subscribe to. 

For example, omitting the DIRECT_MESSAGE_TYPING intent would prevent the discord.js client from receiving any typing events from direct messages.

Se we have to go to Discord Developer Portal, choose our application, then go to the Bot section, and enable all the intents. (Or the ones we are using.)
*/

const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

/*
Because we're creating a separate file (module) for each event and each commands, our main file (app.js, or index.js, or whatever you're calling it) will change drastically from a list of commands to a simple file that loads other files.
*/

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions')
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles)
        // For each file we are passing in client as param, so then we can call client functions and use it anywhere in our code
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(process.env.DISCORDJS_BOT_TOKEN);



/*
The fs.readdirSync() method is used to synchronously read the contents of a given directory. The method returns an array with all the file names or objects in the directory.
*/

/*
In NodeJS, require() is a built-in function to include external modules that exist in separate files. require() statement basically reads a JavaScript file, <<executes it>>, and then proceeds to return the export object.

require() statement not only allows to add built-in core NodeJS modules but also community-based and local modules, and it's not part of the standard JavaScript API.

var myVar = require('http'); //to use built-in modules

Var myVar2 = require('./myLocaModule') to use local modules
*/