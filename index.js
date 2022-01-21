const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const { exec } = require("child_process");
const http = require('http');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

// Place your client and guild ids here
const clientId = '933853508439003196';
const guildId = '873199853767917648';

//for (const file of commandFiles) {
//	const command = require(`./commands/${file}`);
//	commands.push(command.data.toJSON());
//}

const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('ip')
	.setDescription('Replies with the server IP');

commands.push(data.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	/*if (interaction.commandName === 'ip') {
        console.log("Yay");
        exec("curl http://myexternalip.com/raw", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            interaction.reply(`IP: `);
            console.log(`stdout: ${stdout}`);
        });
	} */

    var options = {
        host: 'http://myexternalip.com',
        port: 80,
        path: '/raw'
      };
      var ipadd;
      await http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
        resp.on('data', function(ip) {
          console.log("My public IP address is: " + ip);
          interaction.reply(`My public IP address is: ${ip}`);
        });
      });
});