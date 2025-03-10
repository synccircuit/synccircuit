import { Collection } from "discord.js";
import Command from "../classes/Command";
import Handlers from "../classes/Handlers";

export type Bot = {
  importHandlers: Handlers;
  commands: Collection<string, Command>;

  start(): void;
  createHandlers(): void;
};
