// const moment = require('moment');
// const chalk = require('chalk');
import moment from "moment";
import chalk from "chalk";


function generateTimestamp() {
	return chalk.green(moment().format("MMM D - HH:mm:ss"));
}

export default function log(...args: unknown[]) {
	console.log(generateTimestamp(), ...args);
}

// module.exports = {
	// log: (...args) => {
		// console.log(generateTimestamp(), ...args);
	// }
// }