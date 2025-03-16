import {
  ApplicationCommandOptionType,
  Channel,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildChannel,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../../classes/Command";
import IntegratedClient from "../../classes/IntegratedClient";

export default class ChannelInfo extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "channelinfo",
      description: "Channel information.",
      default_member_permissions: PermissionFlagsBits.UseApplicationCommands,
      options: [
        {
          name: "channel",
          description: "Select a channel from the server.",
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
      enable: true,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel("channel") as Channel;

    const channelFetched = (await interaction.guild?.channels.fetch(
      channel.id,
    )) as GuildChannel;

    const embed = new EmbedBuilder()
      .addFields({
        name: "Channel info",
        value: `- Name: ${channel} \`${channelFetched.name}\`\n- ID: \`${channel.id}\`\n- Created: <t:${Math.floor((channel?.createdTimestamp as number) / 1000)}:f> (<t:${Math.floor((channel?.createdTimestamp as number) / 1000)}:R>)`,
      })
      .setColor("Blurple");

    await interaction.reply({ embeds: [embed], flags: "Ephemeral" });
  }
}
