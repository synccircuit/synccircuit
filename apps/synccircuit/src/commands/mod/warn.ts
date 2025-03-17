import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  GuildMember,
  MessageFlags,
  PermissionFlagsBits,
  User,
} from "discord.js";
import Command from "@/classes/Command";
import IntegratedClient from "@/classes/IntegratedClient";
import warningSchema from "@/mongo/schemas/warningSchema";

export default class Warn extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "warn",
      description: "Warns a user.",
      userPermissions: PermissionFlagsBits.ModerateMembers,
      botPermissions: PermissionFlagsBits.ModerateMembers,
      options: [
        {
          name: "target",
          description: "Select a user from the server.",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "reason",
          description: "Write the reason.",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
      enable: true,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target") as User;
    const reason =
      (interaction.options.getString("reason") as string) ||
      "No reason specified.";
    try {
      // Moderation system implementation here comming soon...

      let data = await warningSchema.find({
        GuildID: interaction.guildId,
        UserID: target.id,
      });

      let warningID = data?.length + 1;

      if (target.bot || target.id === interaction.user.id) {
        await interaction.reply({
          content: "`❌` You cannot warn a bot or yourself.",
          flags: MessageFlags.Ephemeral,
        });
      }

      const member = interaction.guild?.members.cache.get(
        target.id
      ) as GuildMember;

      if (
        member &&
        member.roles.highest.comparePositionTo(
          (interaction.member as GuildMember).roles.highest
        ) >= 0
      ) {
        await interaction.reply({
          content:
            "`❌` You cannot warn to someone with equal or higher roles.",
          flags: MessageFlags.Ephemeral,
        });
      }

      const newWarning = new warningSchema({
        GuildID: interaction.guildId,
        UserID: target.id,
        Reason: reason,
        ID: warningID,
        ModeratorID: interaction.user.id,
      });

      await newWarning.save();

      // It is planned to put a button at the end of the message to send a message to the DM of the warned user.
      await interaction.reply({
        content: `\`✅\` Warning added for ${target} (\`${target.id}\`).`,
        flags: MessageFlags.Ephemeral,
      });

      // Message for the moderation logging system (Under Evaluation)
    } catch (error) {
      console.error(error);
    }
  }
}
