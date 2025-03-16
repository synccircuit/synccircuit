import { Schema, model } from "mongoose";

const joinToCreateSchema = new Schema({
  GuildID: String,
  ChannelID: String,
  ParentID: String,
});

export default model("joinToCreateSchema", joinToCreateSchema);
