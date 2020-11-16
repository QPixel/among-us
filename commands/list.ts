// const { Command } = require('discord-akairo');
// const L = require('../logger');
import Command from "../structures/BaseCommand";
// import * as L from "logger";
import log from "../logger";
import { Message, UserResolvable, GuildMember } from "discord.js";

export default class ListCommand extends Command {
	constructor() {
		super('list', {
			aliases: ['list'],
			channel: 'guild'
		});
	}

	async exec(msg: Message) {
		const queue = await this.client.settings.get(msg.guild.id, 'queue', '');
		let list = queue === '' ? [] : queue.split(',');
		list = list.map((id: UserResolvable) => msg.guild.members.resolve(id)).filter((user: unknown) => user);

		list = list.filter((member: GuildMember) => !member.voice.channel);
		await this.client.settings.set(msg.guild.id, 'queue', list.map((member: GuildMember) => member.id).join(','));

		if (list.length === 0)
			return msg.channel.send("**0 users in queue**");
		else
			return msg.channel.send(`**Users in queue:** (${list.length})\n${list.map((user: GuildMember) => user.displayName).join('\n')}`);
	}
}

// module.exports = ListCommand;