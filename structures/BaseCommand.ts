import type AmongUsClient from "../bot";
import {Command as AkarioCommand, CommandOptions as AkarioCommandOptions, ArgumentOptions, ArgumentGenerator} from "discord-akairo";
export default class Command extends AkarioCommand {
  client: AmongUsClient;
  args?: ArgumentOptions[] | ArgumentGenerator;

  constructor(id: string, options: AkarioCommandOptions) {
    super(id, options);
  }
}