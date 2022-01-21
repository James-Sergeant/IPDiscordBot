const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('ip')
	.setDescription('Replies with the server IP');
