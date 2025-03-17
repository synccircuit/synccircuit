import { ButtonInteraction } from "discord.js";
import IntegratedClient from "@/classes/IntegratedClient";

export type ButtonStructure = {
  client: IntegratedClient;
  custom_id: string;

  execute(interaction: ButtonInteraction): void;
};

export type ButtonManager = {
  customId: string;
};
