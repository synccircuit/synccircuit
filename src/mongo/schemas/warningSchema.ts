import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const warningSchema = new Schema(
  {
    GuildID: String,
    ID: {
      type: String,
      default: () => uuid(),
    },
    UserID: String,
    Reason: String,
    ModeratorID: String,
    Timestamp: { type: Date, default: Date.now },
  },
  { strict: true }
);

export default model("warningSchema", warningSchema);
