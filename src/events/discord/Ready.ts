import { ActivityType, Collection, Events, REST, Routes } from "discord.js";
import IntegratedClient from "../../classes/IntegratedClient";
import Event from "../../classes/Event";
import "colors";
import Command from "../../classes/Command";

export default class Ready extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.ClientReady,
      once: true,
    });
  }

  override async execute() {
    const clientId = process.env.APPLICATION_ID as string;
    const guildId = process.env.GUILD_ID as string;
    const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

    const commands: object[] = this.getJSON(this.client.commands);
    const setCommands: any = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: commands,
      }
    );

    console.log(
      `Successfully loaded ${setCommands.length} application commands.`.red
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
      });
    });

    return data;
  }
}
