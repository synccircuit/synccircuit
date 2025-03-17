import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from "discord.js";
import Command from "@/classes/Command";
import IntegratedClient from "@/classes/IntegratedClient";

export default class Warnings extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "warnings",
      description: "Warn command actions.",
      userPermissions: PermissionFlagsBits.ModerateMembers,
      botPermissions: PermissionFlagsBits.ModerateMembers,
      options: [
        {
          name: "check",
          description: "Check a warning to from user.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "target",
              description: "Select a user from the server.",
              type: ApplicationCommandOptionType.User,
              required: true,
            },
            {
              name: "id",
              description: "Type the ID of the warning you want to inspect.",
              type: ApplicationCommandOptionType.Integer,
              required: true,
            },
          ],
        },
        {
          name: "delete",
          description: "Delete a warning to from user..",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "target",
              description: "Select a user from the server.",
              type: ApplicationCommandOptionType.User,
              required: true,
            },
            {
              name: "id",
              description: "Type the ID of the warning you want to delete.",
              type: ApplicationCommandOptionType.Integer,
              required: true,
            },
          ],
        },
      ],
      enable: true,
    });
  }

  override async execute(_interaction: ChatInputCommandInteraction) {}
}
