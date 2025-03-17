import ContextMenu from "@/classes/ContextMenu";
import IntegratedClient from "@/classes/IntegratedClient";
import {
  ApplicationCommandType,
  ContextMenuCommandInteraction,
  PermissionFlagsBits,
} from "discord.js";

export default class Test extends ContextMenu {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "testctx",
      type: ApplicationCommandType.Message,
      userPermissions: PermissionFlagsBits.UseApplicationCommands,
      botPermissions: PermissionFlagsBits.Administrator,
      enable: false,
    });
  }

  override async execute(interaction: ContextMenuCommandInteraction) {
    interaction.reply("Test");
  }
}
