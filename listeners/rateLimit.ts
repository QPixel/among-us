// const { Listener } = require('discord-akairo');
// const L = require('../logger');

import { Listener } from "discord-akairo";
import { RateLimitData } from "discord.js"
import log from "../logger";

export default class RateLimitListener extends Listener {
	constructor() {
		super('rateLimit', {
			emitter: 'client',
			event: 'rateLimit'
		});
	}

	async exec(info: RateLimitData) {
		log(`Hit rate limit:`, info);
	}
}

// module.exports = RateLimitListener;