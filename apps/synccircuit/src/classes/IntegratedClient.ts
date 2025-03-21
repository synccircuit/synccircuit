import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { Bot } from "@/types/Bot.js";
import Handlers from "./Handlers.js";
import Command from "./Command.js";
import "colors";
import { connect } from "mongoose";
import SubCommand from "./SubCommand.js";
import { DISCORD_TOKEN, MONGODB_URL } from "@/config/config.js";
import Button from "./Button.js";
import ContextMenu from "./ContextMenu.js";

export default class IntegratedClient extends Client implements Bot {
  importHandlers: Handlers;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  buttons: Collection<string, Button>;
  contextMenus: Collection<string, ContextMenu>;

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
    this.buttons = new Collection();
    this.contextMenus = new Collection();
  }

  start(): void {
    console.log(`Starting the client in production mode.`.cyan);
    this.createHandlers();

    connect(`${MONGODB_URL}`).then(() => {
      console.log("Connected to MongoDB database.".blue);
    });

    this.login(DISCORD_TOKEN).catch((err) => console.error(err));
  }

  createHandlers(): void {
    this.importHandlers.createEventHandler();
    this.importHandlers.createCommandHandler();
    this.importHandlers.createButtonHandler();
    this.importHandlers.createContextMenuCommandHandler();
  }
}
