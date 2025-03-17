import { Collection } from "discord.js";
import Command from "@/classes/Command";
import Handlers from "@/classes/Handlers";
import SubCommand from "@/classes/SubCommand";
import Button from "@/classes/Button";

export type Bot = {
  importHandlers: Handlers;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  buttons: Collection<string, Button>;

  start(): void;
  createHandlers(): void;
};
