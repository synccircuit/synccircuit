import { ButtonInteraction } from "discord.js";
import Button from "@/classes/Button";
import IntegratedClient from "@/classes/IntegratedClient";

export default class Test extends Button {
  constructor(client: IntegratedClient) {
    super(client, {
      customId: "test",
    });
  }

  override async execute(interaction: ButtonInteraction) {
    interaction.reply("Test");
  }
}
