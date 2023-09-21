import mongoose from "mongoose";
import config from "../configurations/default";
import bcrypt from "bcrypt";

export interface UserInterface {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, require: true },
    name: { type: String, unique: false, require: true },
    password: { type: String, unique: false, require: true },
  },
  { timestamps: true }
);



const UserModel = mongoose.model("User", userSchema);

export default UserModel;
