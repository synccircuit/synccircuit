import {
  ApplicationCommandType,
  ContextMenuCommandInteraction,
} from "discord.js";
import IntegratedClient from "@/classes/IntegratedClient";

export type ContextMenuCommandStructure = {
  client: IntegratedClient;
  name: string;
  type: ApplicationCommandType;
  default_member_permissions: bigint | bigint[];
  default_bot_permissions: bigint | bigint[];
  enable: boolean;

  execute(interaction: ContextMenuCommandInteraction): void;
};

export type ContextMenuCommandManager = {
  name: string;
  type: ApplicationCommandType;
  userPermissions: bigint | bigint[];
  botPermissions: bigint | bigint[];
  enable: boolean;
};
