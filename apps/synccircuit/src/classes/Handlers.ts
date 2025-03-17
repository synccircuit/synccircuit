import type { Handler } from "@/types/Handler.js";
import path from "path";
import { glob } from "glob";
import IntegratedClient from "./IntegratedClient.js";
import Event from "./Event.js";
import Command from "./Command.js";
import type { ClientEvents } from "discord.js";
import SubCommand from "./SubCommand.js";
import Button from "./Button.js";

export default class Handlers implements Handler {
  client: IntegratedClient;
  constructor(client: IntegratedClient) {
    this.client = client;
  }

  async createEventHandler() {
    const files = (await glob(`dist/events/**/*.js`)).map((filePath: string) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const event: Event = new (await import(file)).default(this.client);

      if (!event.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have name`)
        );

      const execute = (...args: any) => event.execute(...args);

      if (event.once)
        this.client.once(event.name as keyof ClientEvents, execute);
      else this.client.on(event.name as keyof ClientEvents, execute);

      return delete require.cache[require.resolve(file)];
    });
  }

  async createCommandHandler() {
    const files = (await glob(`dist/commands/**/*.js`)).map(
      (filePath: string) => path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const command: Command | SubCommand = new (await import(file)).default(
        this.client
      );

      if (!command.name)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a valid name.`)
        );

      if (command instanceof SubCommand)
        return this.client.subCommands.set(command.name, command);

      this.client.commands.set(command.name, command as Command);

      return delete require.cache[require.resolve(file)];
    });
  }

  async createButtonHandler() {
    const files = (await glob(`dist/buttons/**/*.js`)).map((filePath: string) =>
      path.resolve(filePath)
    );

    files.map(async (file: string) => {
      const button: Button = new (await import(file)).default(this.client);

      if (!button.custom_id)
        return (
          delete require.cache[require.resolve(file)] &&
          console.log(`${file.split("/").pop()} does not have a valid id.`)
        );

      this.client.buttons.set(button.custom_id, button as Button);

      return delete require.cache[require.resolve(file)];
    });
  }
}
