// const { Command } = require('discord-akairo');
// const L = require('../logger');
// const { inspect } = require('util');
import Command from "../structures/BaseCommand";
// import * as L from "logger";
import log from "../logger";
import { inspect } from "util";
import { Message } from 'discord.js';

const clean = (text: unknown) => {
	if (typeof (text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
}

export default class EvalCommand extends Command {
	constructor() {
		super('eval', {
			aliases: ['eval'],
			ownerOnly: true,
		});
	}
	async exec(msg: Message) {
		const args = msg.content.split(" ").slice(1);

		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = inspect(evaled);

			msg.channel.send(clean(evaled), { code: "xl" });
		} catch (err) {
			msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	}
}

// module.exports = EvalCommand;