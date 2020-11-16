// const { Command } = require('discord-akairo');
// const L = require('../logger');
// const { VoiceChannel } = require('discord.js');
// const { ApiClient } = require('twitch');
// import * as L from "../logger";
import Command from '../structures/BaseCommand';
import log from "../logger";
import { VoiceChannel, Message,GuildChannel } from 'discord.js';
import { ApiClient } from 'twitch';

export default class CloutCommand extends Command {
	constructor() {
		super('clout', {
			aliases: ['clout'],
			channel: 'guild',
			args: [
				{
					id: 'channel',
					type: 'voiceChannel',
					default: (msg: Message) => msg.member.voice.channel,
					match: "content",
				}
			]
		});
	}

	async exec(msg: Message, args: {channel: VoiceChannel}) {
		const message = await msg.channel.send('Calculating clout...');
		if (args.channel) {
			return message.edit(`**Viewers in ${args.channel.name}:** ${await getViewersOfChannel(args.channel, this.client.twitch)}`);
		} else {
			let text = [];
			for (let channel of msg.guild.channels.cache.values()) {
				if (channel.type === 'voice' && channel.members.size > 0) {
					text.push(`**Viewers in ${channel.name}:** ${await getViewersOfChannel(channel, this.client.twitch)}`);
				}
			}
			return message.edit(text.join('\n\n'));
		}
	}
}
/**
 * @param {VoiceChannel} channel
 * @param {ApiClient} twitch
 */
async function getViewersOfChannel(channel: GuildChannel, twitch: ApiClient) {
	let totalViewers = 0;
	for (const member of channel.members.values()) {
		const twitchUrl = member.presence.activities.find(a => a.name === 'Twitch')
		if (twitchUrl) {
			let split = twitchUrl.url.split('/');
			const user = await twitch.kraken.users.getUserByName(split[split.length - 1]);
			if (user) {
				const stream = await twitch.kraken.streams.getStreamByChannel(user.id);
				if (stream) {
					totalViewers += stream.viewers;
				}
			}
		}
	}
	return totalViewers;
}
