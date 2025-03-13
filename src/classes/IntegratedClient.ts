import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { Bot } from "../types/Bot.js";
import Handlers from "./Handlers.js";
import Command from "./Command.js";
import "colors";
import { connect } from "mongoose";
import SubCommand from "./SubCommand.js";

export default class IntegratedClient extends Client implements Bot {
  importHandlers: Handlers;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });

    this.importHandlers = new Handlers(this);
    this.commands = new Collection();
    this.subCommands = new Collection();
  }

  start(): void {
    console.log(`Starting the client in production mode.`.cyan);
    this.createHandlers();

    connect(`${process.env.MONGODB_URL}`).then(() => {
      console.log("Connected to MongoDB database.".blue);
    });

    this.login(process.env.DISCORD_TOKEN).catch((err) => console.error(err));
  }

  createHandlers(): void {
    this.importHandlers.createEventHandler();
    this.importHandlers.createCommandHandler();
  }
}
