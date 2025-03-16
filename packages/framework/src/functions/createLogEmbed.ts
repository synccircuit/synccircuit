import { createEmbed } from "./createEmbed";
import { LogColors, LogEmojis } from "@/consts/loggingSymbols";
import { ChatInputCommandInteraction, MessageFlags } from "discord.js";

export async function createLogEmbed(
  interaction: ChatInputCommandInteraction,
  message: string,
  type: string,
  timestamp?: boolean
) {
  switch (type) {
    case "Error":
      const errorEmbed = createEmbed(
        message,
        LogColors.Error,
        undefined,
        LogEmojis.Error
      );

      if (timestamp) errorEmbed.timestamp;

      interaction.reply({
        embeds: [errorEmbed],
        flags: MessageFlags.Ephemeral,
      });
      break;

    case "Success":
      const successEmbed = createEmbed(
        message,
        LogColors.Success,
        undefined,
        LogEmojis.Success
      );

      if (timestamp) successEmbed.timestamp;

      interaction.reply({
        embeds: [successEmbed],
        flags: MessageFlags.Ephemeral,
      });
      break;

    case "Warning":
      const warningEmbed = createEmbed(
        message,
        LogColors.Warning,
        undefined,
        LogEmojis.Warning
      );

      if (timestamp) warningEmbed.timestamp;

      interaction.reply({
        embeds: [warningEmbed],
        flags: MessageFlags.Ephemeral,
      });
      break;
  }
}
