import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  User,
} from "discord.js";
import IntegratedClient from "../../../../classes/IntegratedClient";
import SubCommand from "../../../../classes/SubCommand";
import warningSchema from "../../../../mongo/schemas/warningSchema";

export default class Check extends SubCommand {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "warnings.check",
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const target = interaction.options.getUser("target") as User;
    const id = interaction.options.getInteger("id") as number;

    const warnings = await warningSchema.find({
      GuildID: interaction.guildId,
      UserID: target.id,
    });

    const warningCount = warnings.length;

    const warning = await warningSchema.findOne({
      GuildID: interaction.guildId,
      UserID: target.id,
      ID: id,
    });

    if (warningCount === 0) {
      await interaction.reply({
        content: `\`❌\` ${target} has no warnings.`,
        flags: MessageFlags.Ephemeral,
      });
    } else if (!warning) {
      await interaction.reply({
        content: "`❌` No warning found with the specified ID.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    } else {
      const moderator = await interaction.guild?.members.fetch(
        warning.ModeratorID as string
      );

      const embed = new EmbedBuilder()
        .setColor("Blurple")
        .setTitle(`\`⚠️\` @${target.username}'s Warnings`)
        .setDescription(`> ID: **${id}**`)
        .addFields(
          {
            name: "Moderator",
            value: moderator
              ? `${moderator.user} (\`${moderator.id}\`)`
              : "Unkown moderator",
          },
          {
            name: "Reason",
            value: `${warning.Reason}`,
          },
          {
            name: "Timestamp",
            value: `${warning.Timestamp}`,
          }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  }
}
