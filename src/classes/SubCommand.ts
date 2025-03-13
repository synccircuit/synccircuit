import { ChatInputCommandInteraction } from "discord.js";
import IntegratedClient from "./IntegratedClient.js";
import type { CacheType } from "discord.js";
import type {
  SubCommandManager,
  SubCommandStructure,
} from "../types/SubCommandStructs.js";

export default class SubCommand implements SubCommandStructure {
  client: IntegratedClient;
  name: string;

  constructor(client: IntegratedClient, on: SubCommandManager) {
    this.client = client;
    this.name = on.name;
  }

  execute(_interaction: ChatInputCommandInteraction<CacheType>): void {}
}
