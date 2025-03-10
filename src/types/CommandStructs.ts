import { ChatInputCommandInteraction } from "discord.js";
import IntegratedClient from "../classes/IntegratedClient";

export type CommandStructure = {
  client: IntegratedClient;
  name: string;
  description: string;
  options: object;
  default_member_permissions: bigint;

  execute(interaction: ChatInputCommandInteraction): void;
};

export type CommandManager = {
  name: string;
  description: string;
  options: object;
  default_member_permissions: bigint;
};
