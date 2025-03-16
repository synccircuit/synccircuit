import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  PermissionFlagsBits,
  Role,
} from "discord.js";
import Command from "@/classes/Command";
import IntegratedClient from "@/classes/IntegratedClient";

export default class RoleInfo extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "roleinfo",
      description: "Role information.",
      default_member_permissions: PermissionFlagsBits.UseApplicationCommands,
      options: [
        {
          name: "role",
          description: "Select a role from the server.",
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
      enable: true,
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const role = interaction.options.getRole("role") as Role;

    let mentionable;
    switch (role.mentionable) {
      case true:
        mentionable = "Yes";
        break;

      case false:
        mentionable = "No";
        break;
    }

    const embed = new EmbedBuilder()
      .addFields({
        name: "Role info",
        value: `- Name: ${role} \`${role.name}\`\n- ID: \`${role.id}\`\n- Created: <t:${Math.floor((role?.createdTimestamp as number) / 1000)}:f> (<t:${Math.floor((role?.createdTimestamp as number) / 1000)}:R>)\n- Color: ${role.hexColor}\n- Mentionable: ${mentionable}`,
      })
      .setColor(role.hexColor);

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }
}
