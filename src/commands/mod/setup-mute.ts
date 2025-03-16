import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  PermissionFlagsBits,
  Role,
} from "discord.js";
import Command from "../../classes/Command";
import IntegratedClient from "../../classes/IntegratedClient";
import muteConfig from "../../mongo/schemas/muteConfig";

export default class SetupMute extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "setup-mute",
      description: "Configures the mute system.",
      default_member_permissions: PermissionFlagsBits.ManageGuild,
      options: [
        {
          name: "role",
          description: "Select the mute role.",
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
      enable: true,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const role = interaction.options.getRole("role") as Role;

    await muteConfig.findOneAndUpdate(
      {
        GuildID: interaction.guild?.id,
      },
      { RoleID: role.id },
      { new: true, upsert: true },
    );

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Muting System")
          .setDescription("The mute system was successfully configured.")
          .setColor("Blurple"),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }
}
