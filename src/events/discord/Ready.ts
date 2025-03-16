import { ActivityType, Collection, Events, REST, Routes } from "discord.js";
import IntegratedClient from "@/classes/IntegratedClient";
import Event from "@/classes/Event";
import "colors";
import Command from "@/classes/Command";
import { APPLICATION_ID, DISCORD_TOKEN, GUILD_ID } from "@/config/config";

export default class Ready extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.ClientReady,
      once: true,
    });
  }

  override async execute() {
    const rest = new REST().setToken(`${DISCORD_TOKEN}`);

    const enabledCommands: object[] = this.getJSON(
      this.client.commands.filter((command) => command.enable)
    );

    const setEnabledCommands: any = await rest.put(
      Routes.applicationCommands(`${APPLICATION_ID}`),
      {
        body: enabledCommands,
      }
    );

    console.log(
      `Successfully loaded ${setEnabledCommands.length} application commands.`
        .red
    );

    const developmentCommands: object[] = this.getJSON(
      this.client.commands.filter((command) => !command.enable)
    );

    const setDevelopmentCommands: any = await rest.put(
      Routes.applicationGuildCommands(`${APPLICATION_ID}`, `${GUILD_ID}`),
      {
        body: developmentCommands,
      }
    );

    console.log(
      `Successfully loaded ${setDevelopmentCommands.length} development commands.`
        .yellow
    );

    console.log(`Logged as ${this.client.user?.tag}`.green);
    this.client.user?.setPresence({
      activities: [
        {
          name: `SyncCircuit Beta`,
          url: "https://twitch.tv/discord",
          type: ActivityType.Streaming,
        },
      ],
    });
  }

  private getJSON(commands: Collection<string, Command>): object[] {
    const data: object[] = [];

    commands.forEach((command) => {
      data.push({
        name: command.name,
        description: command.description,
        options: command.options,
        default_member_permissions:
          command.default_member_permissions.toString(),
        enable: command.enable,
      });
    });

    return data;
  }
}
