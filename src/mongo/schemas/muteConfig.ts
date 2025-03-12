import { Schema, model } from "mongoose";

const muteConfigSchema = new Schema({
  GuildID: String,
  RoleID: String,
});

export default model("muteConfigSchema", muteConfigSchema);
