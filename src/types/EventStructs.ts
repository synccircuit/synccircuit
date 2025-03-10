import { Events } from "discord.js";
import IntegratedClient from "../classes/IntegratedClient";

export type EventStructure = {
  client: IntegratedClient;
  name: Events;
  once: boolean;
};

export type EventManager = {
  name: Events;
  once: boolean;
};
