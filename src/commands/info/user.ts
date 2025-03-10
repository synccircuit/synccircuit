import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
  PermissionFlagsBits,
  User,
} from "discord.js";
import Command from "../../classes/Command";
import IntegratedClient from "../../classes/IntegratedClient";

export default class UserInfo extends Command {
  constructor(client: IntegratedClient) {
    super(client, {
      name: "userinfo",
      description: "User information by tag.",
      default_member_permissions: PermissionFlagsBits.UseApplicationCommands,
      options: [
        {
          name: "target",
          description: "Select a user from the server.",
          type: ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    });
  }

  override async execute(interaction: ChatInputCommandInteraction) {
    const target =
      (interaction.options.getUser("target") as User) || interaction.user;

    const member = (await interaction.guild?.members.fetch(
      target.id
    )) as GuildMember;

    const badges = member.user.flags?.toArray();

    const badgeMap: Record<string, string> = {
      Hypesquad: "HypeSquad Events Member",
      BugHunterLevel1: "Bug Hunter Level 1",
      HypeSquadOnlineHouse1: "House Bravery",
      HypeSquadOnlineHouse2: "House Brilliance",
      HypeSquadOnlineHouse3: "House Balance",
      PremiumEarlySupporter: "Early Supporter",
      BugHunterLevel2: "Bug Hunter Level 2",
      VerifiedBot: "Verified Bot",
      VerifiedDeveloper: "Early Verified Bot Developer",
      CertifiedModerator: "Moderator Programs Alumni",
      ActiveDeveloper: "Active Developer",
    };

    const formattedBadges = badges?.map((badge) => badgeMap[badge] || badge);

    const badgeList =
      (formattedBadges?.length as number) > 0
        ? formattedBadges?.join(", ")
        : "No badges";

    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role);

    const roleCount = roles.length;
    const roleList = roleCount > 0 ? roles.join(", ") : "No roles";

    const embed = new EmbedBuilder()
      .setTitle(`@${target.username}`)
      .setThumbnail(target.displayAvatarURL({ size: 4096 }))
      .addFields(
        {
          name: "User info",
          value: `- Name: ${target} \`${target.username}\`\n- ID: \`${target.id}\`\n- Created: <t:${Math.floor(target?.createdTimestamp / 1000)}:f> (<t:${Math.floor(target?.createdTimestamp / 1000)}:R>)\n- Avatar: [${target.avatar}](${target.displayAvatarURL({ size: 4096 })})\n- Badges:\n_${badgeList}_`,
        },
        {
          name: "Member info",
          value: `- Joined: <t:${Math.floor((member?.joinedTimestamp as number) / 1000)}:f> (<t:${Math.floor((member?.joinedTimestamp as number) / 1000)}:R>)\n- Roles (${roleCount}):\n_${roleList}_`,
        }
      )
      .setColor("DarkerGrey");

    await interaction.reply({ embeds: [embed], flags: "Ephemeral" });
  }
}
