// const { Command } = require('discord-akairo');
// const L = require('../logger');

import Command from "../structures/BaseCommand";
import { Message, User, Guild } from "discord.js";
import { Collection } from 'discord.js';
import log from "../logger";

export default class ClearQueueCommand extends Command {
	constructor() {
		super('setqueue', {
			aliases: ['setqueue'],
			ownerOnly: true,
			args: [
				{
					id: 'guild',
					type: 'guild'
				},
				{
					id: 'users',
					type: 'user',
					match: 'separate',

				}
			]
		});
	}
	async exec(msg: Message, args: {guild: Guild, users: Collection<string, User>}) {
		if (args.guild) {
			await this.client.settings.set(args.guild.id, 'queue', args.users.map(user => user.id).join(','));
			await msg.react('✔');
			await msg.channel.send(`Set queue for ${args.guild.name} to:\n${args.users.map(user => user.tag).join('\n')}`);
		}
	}
}

// module.exports = ClearQueueCommand;