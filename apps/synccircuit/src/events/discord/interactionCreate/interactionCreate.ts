import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  ColorResolvable,
  ContextMenuCommandInteraction,
  EmbedBuilder,
  Events,
  GuildMember,
  MessageFlags,
  PermissionsBitField,
} from "discord.js";
import Event from "@/classes/Event";
import Command from "@/classes/Command";
import IntegratedClient from "@/classes/IntegratedClient";
import Button from "@/classes/Button";
import ContextMenu from "@/classes/ContextMenu";
import { LogColors } from "@/consts/loggingSymbols";
import { messageConfig } from "@/messageConfig";

export default class InteractionCreate extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.InteractionCreate,
      once: false,
    });
  }

  override async execute(
    interaction:
      | ChatInputCommandInteraction
      | ButtonInteraction
      | ContextMenuCommandInteraction
  ) {
    const createEmbed = (color: ColorResolvable, description: string) =>
      new EmbedBuilder().setColor(color).setDescription(description);

    if (interaction.isChatInputCommand()) {
      const command: Command = this.client.commands.get(
        interaction.commandName
      )!;

      //@ts-ignore
      if (!command)
        return (
          interaction.reply({ content: "outdated command", ephemeral: true }),
          this.client.commands.delete(interaction.commandName)
        );

      const userPermissions = command.default_member_permissions
        ? new PermissionsBitField(command.default_member_permissions).toArray()
        : [];

      const botPermissions = command.default_bot_permissions
        ? new PermissionsBitField(command.default_bot_permissions).toArray()
        : [];

      const member = interaction.member as GuildMember;
      for (const permission of userPermissions) {
        if (!member.permissions.has(permission)) {
          const rEmbed = createEmbed(
            LogColors.Error,
            messageConfig.userNoPerms
          );
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

    if (interaction.isButton()) {
      const button: Button = this.client.buttons.get(interaction.customId)!;

      //@ts-ignore
      if (!button)
        return (
          interaction.reply({ content: "outdated button", ephemeral: true }),
          this.client.buttons.delete(interaction.customId)
        );

      if (
        interaction.message.interactionMetadata &&
        interaction.message.interactionMetadata.user.id !== interaction.user.id
      ) {
        const rEmbed = createEmbed(
          LogColors.Error,
          messageConfig.cannotUseButton
        );
        await interaction.reply({
          embeds: [rEmbed],
          flags: MessageFlags.Ephemeral,
        });
      }

      try {
        return button.execute(interaction);
      } catch (error) {
        console.log(error);
      }
    }

    if (interaction.isContextMenuCommand()) {
      const contextMenu: ContextMenu = this.client.contextMenus.get(
        interaction.commandName
      )!;

      //@ts-ignore
      if (!contextMenu)
        return (
          interaction.reply({
            content: "outdated context menu",
            ephemeral: true,
          }),
          this.client.contextMenus.delete(interaction.commandName)
        );

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
          const rEmbed = createEmbed(
            LogColors.Error,
            messageConfig.userNoPerms
          );
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

      try {
        const context = `${interaction.commandName}${interaction.commandType}`;

        return (
          this.client.contextMenus.get(context)?.execute(interaction) ||
          contextMenu.execute(interaction)
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}
