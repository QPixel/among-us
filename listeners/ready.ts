// const { Listener } = require('discord-akairo');
// const L = require('../logger');

import { Listener } from "discord-akairo";
import log from "../logger";
export default class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready'
		});
	}

	async exec() {
		await this.client.user.setActivity('Made by Ottomated');
		log(`Logged in as ${this.client.user.tag}`);
	}
}

// module.exports = ReadyListener;