import IntegratedClient from "@/classes/IntegratedClient";
import {
  ButtonInteraction,
  ColorResolvable,
  EmbedBuilder,
  Events,
  MessageFlags,
} from "discord.js";
import Event from "@/classes/Event";
import Button from "@/classes/Button";
import { LogColors } from "@/consts/loggingSymbols";
import { messageConfig } from "@/messageConfig";

export default class ButtonValidator extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.InteractionCreate,
      once: false,
    });
  }

  override async execute(interaction: ButtonInteraction) {
    if (!interaction.isButton()) return;

    const button: Button = this.client.buttons.get(interaction.customId)!;

    if (!button) return;

    const createEmbed = (color: ColorResolvable, description: string) =>
      new EmbedBuilder().setColor(color).setDescription(description);

    if (
      interaction.message.interactionMetadata &&
      interaction.message.interactionMetadata.user.id !== interaction.user.id
    ) {
      const rEmbed = createEmbed(
        LogColors.Error,
        messageConfig.cannotUseButton
      );
      await interaction.reply({
        embeds: [rEmbed],
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
  }
}
