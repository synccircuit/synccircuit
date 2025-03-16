import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  PermissionFlagsBits,
  VoiceChannel,
} from "discord.js";
import Command from "../../classes/Command";
import IntegratedClient from "../../classes/IntegratedClient";
import joinToCreate from "../../mongo/schemas/joinToCreate";

export default class SetupJoinToCreate extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "setup-jointocreate",
      description: "Configures the join to create system.",
      default_member_permissions: PermissionFlagsBits.ManageGuild,
      options: [
        {
          name: "channel",
          description: "Select the join to create channel.",
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildVoice],
          required: true,
        },
        {
          name: "category",
          description:
            "Select the category where the channels will be created.",
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildCategory],
          required: false,
        },
      ],
      enable: true,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.options.getChannel("channel") as VoiceChannel;
    const category = interaction.options.getChannel("category") || null;

    await joinToCreate.findOneAndUpdate(
      {
        GuildID: interaction.guild?.id,
      },
      {
        ChannelID: channel.id,
        ParentID: category?.id,
      },
      { new: true, upsert: true },
    );

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Join To Create System")
          .setDescription(
            "The join to create system was successfully configured.",
          )
          .setColor("Blurple"),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }
}
