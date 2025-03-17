import { ButtonInteraction, CacheType } from "discord.js";
import IntegratedClient from "./IntegratedClient.js";
import type { ButtonManager, ButtonStructure } from "@/types/ButtonStructs.js";

export default class Button implements ButtonStructure {
  client: IntegratedClient;
  custom_id: string;

  constructor(client: IntegratedClient, on: ButtonManager) {
    this.client = client;
    this.custom_id = on.customId;
  }

  execute(_interaction: ButtonInteraction<CacheType>): void {}
}
