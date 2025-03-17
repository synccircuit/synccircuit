import { LogColors } from "../consts/loggingSymbols.js";
import { APIEmbed, EmbedBuilder } from "discord.js";

export function createEmbed(
  description: string,
  color: LogColors,
  title?: string,
  emoji?: string,
  timestamp?: boolean
): APIEmbed {
  const embed = new EmbedBuilder().setColor(color);

  if (title) embed.setTitle(title);
  if (emoji) description = `\`${emoji}\` ${description}`;
  embed.setDescription(description);
  if (timestamp) embed.setTimestamp();

  return embed.toJSON();
}
