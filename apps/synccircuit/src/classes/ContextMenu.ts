import IntegratedClient from "./IntegratedClient.js";
import {
  ApplicationCommandType,
  CacheType,
  ContextMenuCommandInteraction,
} from "discord.js";
import {
  ContextMenuCommandManager,
  ContextMenuCommandStructure,
} from "@/types/ContextMenuStructs.js";

export default class ContextMenu implements ContextMenuCommandStructure {
  client: IntegratedClient;
  name: string;
  type: ApplicationCommandType;
  default_member_permissions: bigint | bigint[];
  default_bot_permissions: bigint | bigint[];
  enable: boolean;

  constructor(client: IntegratedClient, on: ContextMenuCommandManager) {
    this.client = client;
    this.name = on.name;
    this.type = on.type;
    this.default_member_permissions = on.userPermissions;
    this.default_bot_permissions = on.botPermissions;
    this.enable = on.enable;
  }

  execute(_interaction: ContextMenuCommandInteraction<CacheType>): void {}
}
