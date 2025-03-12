import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
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
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const role = interaction.options.getRole("role") as Role;

    const data = await muteConfig.findOne({
      GuildID: interaction.guild?.id,
      RoleID: role.id,
    });

    if (data) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(
              `\`⚠️\` It seems that you have configured this module before.`
            ),
        ],
      });
    } else {
      await muteConfig.create({
        GuildID: interaction.guild?.id,
        RoleID: role.id,
      });

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Muting System")
            .setDescription("The mute system was successfully configured.")
            .setColor("Blurple"),
        ],
      });
    }
  }
}
