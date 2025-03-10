import { ChatInputCommandInteraction } from "discord.js";
import IntegratedClient from "./IntegratedClient.js";
import type { CacheType } from "discord.js";
import type {
  CommandManager,
  CommandStructure,
} from "../types/CommandStructs.js";

export default class Command implements CommandStructure {
  client: IntegratedClient;
  name: string;
  description: string;
  options: object;
  default_member_permissions: bigint;

  constructor(client: IntegratedClient, on: CommandManager) {
    this.client = client;
    this.name = on.name;
    this.description = on.description;
    this.options = on.options;
    this.default_member_permissions = on.default_member_permissions;
  }

  execute(_interaction: ChatInputCommandInteraction<CacheType>): void {}
}
