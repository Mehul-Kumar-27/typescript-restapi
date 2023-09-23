import mongoose from "mongoose";
import { UserInterface } from "./user_model";

export interface SessionInterface extends Document {
  user: UserInterface["_id"];
  valid: Boolean;
  userAgent: String;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: {type: String},
  },
  {
    timestamps: true,
  }
);


const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;