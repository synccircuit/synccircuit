import { ChatInputCommandInteraction } from "discord.js";
import IntegratedClient from "./IntegratedClient.js";
import type { CacheType } from "discord.js";
import type {
  CommandManager,
  CommandStructure,
} from "@/types/CommandStructs.js";

export default class Command implements CommandStructure {
  client: IntegratedClient;
  name: string;
  description: string;
  options: object;
  default_member_permissions: bigint | bigint[];
  default_bot_permissions: bigint | bigint[];
  enable: boolean;

  constructor(client: IntegratedClient, on: CommandManager) {
    this.client = client;
    this.name = on.name;
    this.description = on.description;
    this.options = on.options;
    this.default_member_permissions = on.userPermissions;
    this.default_bot_permissions = on.botPermissions;
    this.enable = on.enable;
  }

  execute(_interaction: ChatInputCommandInteraction<CacheType>): void {}
}
