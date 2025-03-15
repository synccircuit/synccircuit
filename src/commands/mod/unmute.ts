import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  MessageFlags,
  PermissionFlagsBits,
  User,
} from "discord.js";
import Command from "../../classes/Command";
import IntegratedClient from "../../classes/IntegratedClient";
import muteConfig from "../../mongo/schemas/muteConfig";

export default class UnMute extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "unmute",
      description: "Unmutes a user from the server.",
      default_member_permissions: PermissionFlagsBits.ModerateMembers,
      options: [
        {
          name: "target",
          description: "Select a user from the server.",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target") as User;
    const member = (await interaction.guild?.members.fetch(
      target.id
    )) as GuildMember;

    const data = await muteConfig.findOne({
      GuildID: interaction.guild?.id,
    });

    if (!data) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(
              `\`⚠️\` It seems that you have not configured the module.`
            ),
        ],
        flags: MessageFlags.Ephemeral,
      });
    } else {
      try {
        await member.roles.remove(`${data.RoleID}`);
      } catch (err) {
        return console.error(err);
      }

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${target} \`${target.id}\` was successfully unmuted.`
            )
            .setColor("Blurple"),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}
