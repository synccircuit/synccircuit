import { Schema, model } from "mongoose";

const warningSchema = new Schema(
  {
    GuildID: String,
    ID: Number,
    UserID: String,
    Reason: String,
    ModeratorID: String,
    Timestamp: { type: Date, default: Date.now },
  },
  { strict: true },
);

export default model("warningSchema", warningSchema);
