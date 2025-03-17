import IntegratedClient from "@/classes/IntegratedClient";
import {
  ColorResolvable,
  ContextMenuCommandInteraction,
  EmbedBuilder,
  Events,
  GuildMember,
  MessageFlags,
  PermissionsBitField,
} from "discord.js";
import Event from "@/classes/Event";
import { messageConfig } from "@/messageConfig";
import { LogColors } from "@/consts/loggingSymbols";
import ContextMenu from "@/classes/ContextMenu";

export default class ContextMenuCommandValidator extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.InteractionCreate,
      once: false,
    });
  }

  override async execute(interaction: ContextMenuCommandInteraction) {
    if (!interaction.isContextMenuCommand()) return;

    const contextMenu: ContextMenu = this.client.contextMenus.get(
      interaction.commandName
    )!;

    if (!contextMenu) return;

    const createEmbed = (color: ColorResolvable, description: string) =>
      new EmbedBuilder().setColor(color).setDescription(description);

    const userPermissions = contextMenu.default_member_permissions
      ? new PermissionsBitField(
          contextMenu.default_member_permissions
        ).toArray()
      : [];

    const botPermissions = contextMenu.default_bot_permissions
      ? new PermissionsBitField(contextMenu.default_bot_permissions).toArray()
      : [];

    const member = interaction.member as GuildMember;
    for (const permission of userPermissions) {
      if (!member.permissions.has(permission)) {
        const rEmbed = createEmbed(LogColors.Error, messageConfig.userNoPerms);
        await interaction.reply({
          embeds: [rEmbed],
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
    }

    const bot = interaction.guild?.members.me;
    for (const permission of botPermissions) {
      if (!bot?.permissions.has(permission)) {
        const rEmbed = createEmbed(LogColors.Error, messageConfig.botNoPerms);
        await interaction.reply({
          embeds: [rEmbed],
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
    }
  }
}
