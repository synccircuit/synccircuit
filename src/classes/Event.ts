import { Events } from "discord.js";
import IntegratedClient from "@/classes/IntegratedClient.js";
import type { EventManager, EventStructure } from "@/types/EventStructs.js";

export default class Event implements EventStructure {
  client: IntegratedClient;
  name: Events;
  once: boolean;

  constructor(client: IntegratedClient, on: EventManager) {
    this.client = client;
    this.name = on.name;
    this.once = on.once;
  }

  execute(..._args: any): void {}
}
