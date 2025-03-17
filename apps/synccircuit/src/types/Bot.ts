import { Collection } from "discord.js";
import Command from "@/classes/Command";
import Handlers from "@/classes/Handlers";
import SubCommand from "@/classes/SubCommand";
import Button from "@/classes/Button";
import ContextMenu from "@/classes/ContextMenu";

export type Bot = {
  importHandlers: Handlers;
  commands: Collection<string, Command>;
  subCommands: Collection<string, SubCommand>;
  buttons: Collection<string, Button>;
  contextMenus: Collection<string, ContextMenu>;

  start(): void;
  createHandlers(): void;
};
