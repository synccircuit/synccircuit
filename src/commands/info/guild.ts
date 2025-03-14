import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  Guild,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../../classes/Command";
import IntegratedClient from "../../classes/IntegratedClient";

export default class GuildInfo extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "guildinfo",
      description: "Server information.",
      default_member_permissions: PermissionFlagsBits.UseApplicationCommands,
      options: [],
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild as Guild;

    const embed = new EmbedBuilder()
      .setThumbnail(guild.iconURL({ size: 4096 }))
      .addFields({
        name: "Server info",
        value: `- Name: \`${guild.name}\`\n- ID: \`${guild.id}\`\n- Created: <t:${Math.floor(guild.createdTimestamp / 1000)}:f> (<t:${Math.floor(guild.createdTimestamp / 1000)}:R>)\n- Icon: [${guild.icon}](${guild.iconURL({ size: 4096 })})\n- Members: \`${guild.memberCount}\``,
      })
      .setColor("Blurple");

    await interaction.reply({ embeds: [embed] });
  }
}
