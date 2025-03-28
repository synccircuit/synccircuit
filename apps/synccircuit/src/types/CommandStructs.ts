import { ChatInputCommandInteraction } from "discord.js";
import IntegratedClient from "@/classes/IntegratedClient";

export type CommandStructure = {
  client: IntegratedClient;
  name: string;
  description: string;
  options: object;
  default_member_permissions: bigint | bigint[];
  default_bot_permissions: bigint | bigint[];
  enable: boolean;

  execute(interaction: ChatInputCommandInteraction): void;
};

export type CommandManager = {
  name: string;
  description: string;
  options: object;
  userPermissions: bigint | bigint[];
  botPermissions: bigint | bigint[];
  enable: boolean;
};
