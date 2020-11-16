// const { Command } = require('discord-akairo');
// const L = require('../logger');
import Command from "../structures/BaseCommand";
// import * as L from "../logger";
import log from "../logger";
import { Message, GuildMember } from 'discord.js';


export default class QueueCommand extends Command {
	constructor() {
		super('dequeue', {
			aliases: ['dequeue', 'remove', 'unqueue'],
			channel: 'guild',
			args: [
				{
					id: 'target',
					type: 'member',
					unordered: true,
					default: (msg: Message) => msg.member
				}
			]
		});
	}

	async exec(msg: Message, args: {target: GuildMember}) {
		const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
		let list = queue === '' ? [] : queue.split(',');
		
		if (!list.find((id: string) => id === args.target.id)) return;

		list = list.filter((id: string) => id !== args.target.id);
		await this.client.settings.set(msg.guild.id, 'queue', list.join(','));
		await msg.react('✔');
		log(`Dequeued ${args.target.user.tag}`);
	}
}

// module.exports = QueueCommand;