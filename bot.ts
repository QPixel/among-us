require('dotenv').config();
// const { AkairoClient, CommandHandler, SQLiteProvider, ListenerHandler } = require('discord-akairo');
// const sqlite = require('sqlite');
// const sqlite3 = require('sqlite3');
// const L = require('./logger');
// const { ApiClient } = require('twitch');
// const { StaticAuthProvider } = require('twitch-auth');
import { AkairoClient, CommandHandler, SQLiteProvider, ListenerHandler } from "discord-akairo";
import {open, Database} from "sqlite";
import sqlite3 from "sqlite3";
import { ApiClient } from "twitch";
import { StaticAuthProvider } from "twitch-auth";
import log from "./logger";

export default class AmongUsClient extends AkairoClient {
	public commandHandler: CommandHandler;
	public listenerHandler: ListenerHandler;
	public database: Database<sqlite3.Database, sqlite3.Statement>;
	public twitch: ApiClient;
	public settings: SQLiteProvider;
	constructor() {
		super({
			ownerID: '194259969359478784',
		}, {});
		// Load Commands
		this.commandHandler = new CommandHandler(this, {
			directory: './commands/',
			prefix: '!'
		});
		this.commandHandler.loadAll();

		this.listenerHandler = new ListenerHandler(this, {
			directory: './listeners/'
		});
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();
		// Set up database

	}
	async login(token: string) {
		this.database = await open({
			filename: './db.sqlite',
			driver: sqlite3.Database
		});
		const table_exists = await this.database.get("SELECT name FROM sqlite_master WHERE type='table' AND name='among_us'");
		// console.log(table_exists);
		if (!table_exists) {
			log("Creating table");
			await this.database.run("create table among_us(id text, code text, queue text)");
		}
		this.settings = new SQLiteProvider(this.database, 'among_us');
		await this.settings.init();

		const auth = new StaticAuthProvider(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_CLIENT_SECRET);

		this.twitch = new ApiClient({ authProvider: auth });

		return super.login(token);
	}
}

const client = new AmongUsClient();
client.login(process.env.TOKEN);