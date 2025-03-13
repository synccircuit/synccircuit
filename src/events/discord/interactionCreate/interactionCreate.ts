import { ChatInputCommandInteraction, Events } from "discord.js";
import Event from "../../../classes/Event";
import Command from "../../../classes/Command";
import IntegratedClient from "../../../classes/IntegratedClient";

export default class InteractionCreate extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.InteractionCreate,
      once: false,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command: Command = this.client.commands.get(interaction.commandName)!;

    //@ts-ignore
    if (!command)
      return (
        interaction.reply({ content: "outdated command", ephemeral: true }),
        this.client.commands.delete(interaction.commandName)
      );

    try {
      const subCommandGroup = interaction.options.getSubcommandGroup(false);
      const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}` : ""}.${interaction.options.getSubcommand(false) || ""}`;

      return (
        this.client.subCommands.get(subCommand)?.execute(interaction) ||
        command.execute(interaction)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
