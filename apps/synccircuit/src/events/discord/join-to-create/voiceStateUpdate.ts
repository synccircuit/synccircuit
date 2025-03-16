import { ChannelType, Events, VoiceState } from "discord.js";
import Event from "@/classes/Event";
import IntegratedClient from "@/classes/IntegratedClient";
import joinToCreate from "@/mongo/schemas/joinToCreate";

export default class VoiceStateUpdate extends Event {
  constructor(client: IntegratedClient) {
    super(client, {
      name: Events.VoiceStateUpdate,
      once: false,
    });
  }

  override async execute(oldState: VoiceState, newState: VoiceState) {
    const data = await joinToCreate.findOne({ GuildID: oldState.guild.id });
    if (!data) return;

    if (newState.channelId === data.ChannelID) {
      const createChannel = await newState.guild.channels.create({
        name: `${newState.member?.user.displayName}'s Channel`,
        type: ChannelType.GuildVoice,
        parent: data.ParentID,
      });

      newState.member?.voice.setChannel(createChannel);

      const voiceStateUpdateListener = async () => {
        if (createChannel && createChannel.members.size === 0) {
          await createChannel.delete();
          this.client.removeListener(
            Events.VoiceStateUpdate,
            voiceStateUpdateListener
          );
        }
      };

      this.client.on(Events.VoiceStateUpdate, voiceStateUpdateListener);
    }
  }
}
