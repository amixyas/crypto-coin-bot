// This going to basically load up all of the environment variables that are inside our env file
require("dotenv").config();

/* Before proceeding, we need to complete these steps :
- Go to https://discord.com/developers/applications
- Create new application and give it a name
- G to Bot section and copy the Token then intilize the env var 'DISCORDJS_BOT_TOKEN' in .env file with this token
- Go to OAuth2 section and get the 'CLIENT ID'
- Login to discord account and create new discord server with 'Add a Server'
- Link the new server to new application :  https://discord.com/oauth2/authorized?client_id=<COPY_THE_CLIENT_ID_HERE>&scope=bot
*/

// console.log(process.env.DISCORDJS_BOT_TOKEN);
