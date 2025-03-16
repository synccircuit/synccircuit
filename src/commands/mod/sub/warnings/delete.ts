import { ChatInputCommandInteraction, User } from "discord.js";
import IntegratedClient from "../../../../classes/IntegratedClient";
import SubCommand from "../../../../classes/SubCommand";
import warningSchema from "../../../../mongo/schemas/warningSchema";

export default class Delete extends SubCommand {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "warnings.delete",
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
      });
    } else if (!warning) {
      await interaction.reply({
        content: "`❌` No warning found with the specified ID.",
      });
      return;
    } else {
      await warningSchema.findOneAndDelete({
        GuildID: interaction.guildId,
        UserID: target.id,
        ID: id,
      });

      await interaction.reply({
        content: `\`✅\` Warning deleted for ${target} (\`${target.id}\`).`,
        // flags: MessageFlags.Ephemeral,
      });
    }
  }
}
