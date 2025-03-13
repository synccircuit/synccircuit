import { ChatInputCommandInteraction } from "discord.js";
import IntegratedClient from "../classes/IntegratedClient";

export type SubCommandStructure = {
  client: IntegratedClient;
  name: string;

  execute(interaction: ChatInputCommandInteraction): void;
};

export type SubCommandManager = {
  name: string;
};
