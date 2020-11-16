// const { Command } = require('discord-akairo');
// const L = require('../logger');
import Command from "../structures/BaseCommand";
// import * as L from "../logger";
import log from "logger";
import { Message } from 'discord.js';

export default class ClearQueueCommand extends Command {
	constructor() {
		super('clearqueue', {
			aliases: ['clearqueue', 'clearq'],
			channel: 'guild'
		});
	}

	async exec(msg: Message) {
		await this.client.settings.set(msg.guild.id, 'queue', '');
		await msg.react('✔');
	}
}

// module.exports = ClearQueueCommand;