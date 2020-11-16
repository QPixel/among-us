// const { Command } = require('discord-akairo');
// const L = require('../logger');

import Command from "../structures/BaseCommand";
// import * as L from "logger";
import log from "../logger"
import { Message, GuildMember, UserResolvable } from "discord.js"

export default class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping'],
			channel: 'guild',
			args: [
				{
					id: 'action',
					type: ['first', 'all'],
					default: 'all'
				}
			]
		});
	}

	async exec(msg: Message, args: {action: unknown}) {
		const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
		let list = queue === '' ? [] : queue.split(',');
		list = list.map((id: UserResolvable) => msg.guild.members.resolve(id)).filter((user: GuildMember) => user);

		list = list.filter((member: GuildMember) => !member.voice.channel);
		await this.client.settings.set(msg.guild.id, 'queue', list.map((member: GuildMember) => member.id).join(','));

		if (list.length === 0)
			return msg.channel.send("**0 users in queue**");
		else {
			if (args.action === 'first') {
				let otherUsersText = '';
				if (list.length > 1) otherUsersText = `\n**Other users:**\n${list.slice(1).map((user: GuildMember) => user.displayName).join('\n')}`;
				return msg.channel.send(`**Pinging first in queue:**\n<@${list[0].id}>${otherUsersText}`);
			}
			return msg.channel.send(`**Pinging ${list.length} user${list.length === 1 ? '' : 's'}:**\n${list.map((user:  GuildMember) => `<@${user.id}>`).join('\n')}`);
		}
	}
}

// module.exports = PingCommand;