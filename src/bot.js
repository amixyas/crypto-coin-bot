// https://discordjs.guide/#before-you-begin

// This going to basically load up all of the environment variables that are inside our env file
require("dotenv").config();

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

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.login(process.env.DISCORDJS_BOT_TOKEN);