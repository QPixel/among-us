// const { Command } = require('discord-akairo');
// const L = require('../logger');

import Command from "../structures/BaseCommand";
import log from "../logger";
import { Message, GuildMember } from "discord.js";
// import {  } from 'discord.js';

export default class QueueCommand extends Command {
	constructor() {
		super('queue', {
			aliases: ['queue'],
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
		const list = queue === '' ? [] : queue.split(',');

		if (list.find((id: string) => id === args.target.id)) return;

		list.push(args.target.id);
		await this.client.settings.set(msg.guild.id, 'queue', list.join(','));
		await msg.react('✔');
		log(`Queued ${args.target.user.tag}`);
		setTimeout(async () => {
			const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
			let list = queue === '' ? [] : queue.split(',');

			if (!list.find((id: string) => id === args.target.id)) return;

			list = list.filter((id: string) => id !== args.target.id);
			await this.client.settings.set(msg.guild.id, 'queue', list.join(','));
			try {
				await args.target.send(`You have been automatically dequeued from ${msg.guild.name} after 6 hours. Use \`!queue\` again in the server to re-queue yourself.`);
			} catch (e) {
				log(`Failed to DM ${args.target.user.tag}`, e);
			}
		 	log(`Dequeued ${args.target.user.tag} after 6 hours`);
		}, 1000 * 60 * 60 * 6);
	}
}

// module.exports = QueueCommand;