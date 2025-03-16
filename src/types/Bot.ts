import { Collection } from "discord.js";
import Command from "@/classes/Command";
import Handlers from "@/classes/Handlers";
import SubCommand from "@/classes/SubCommand";

export type Bot = {
  importHandlers: Handlers;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;

  start(): void;
  createHandlers(): void;
};
