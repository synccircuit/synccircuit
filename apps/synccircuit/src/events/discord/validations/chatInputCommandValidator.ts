import IntegratedClient from "@/classes/IntegratedClient";
import {
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  Events,
  GuildMember,
  MessageFlags,
  PermissionsBitField,
} from "discord.js";
import Event from "@/classes/Event";
import Command from "@/classes/Command";
import { messageConfig } from "@/messageConfig";
import { LogColors } from "@/consts/loggingSymbols";

export default class ChatInputCommandValidator extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.InteractionCreate,
      once: false,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command: Command = this.client.commands.get(interaction.commandName)!;

    if (!command) return;

    const createEmbed = (color: ColorResolvable, description: string) =>
      new EmbedBuilder().setColor(color).setDescription(description);

    const userPermissions = command.default_member_permissions
      ? new PermissionsBitField(command.default_member_permissions).toArray()
      : [];

    const botPermissions = command.default_bot_permissions
      ? new PermissionsBitField(command.default_bot_permissions).toArray()
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
