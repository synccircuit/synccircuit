import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from "discord.js";
import Command from "@/classes/Command";
import IntegratedClient from "@/classes/IntegratedClient";

export default class Test extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "test",
      description: "Test command.",
      userPermissions: PermissionFlagsBits.UseApplicationCommands,
      botPermissions: PermissionFlagsBits.UseApplicationCommands,
      options: [],
      enable: false,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("test")
            .setLabel("Test")
            .setStyle(ButtonStyle.Secondary)
        ),
      ],
    });
  }
}
