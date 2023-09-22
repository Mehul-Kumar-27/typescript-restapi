import mongoose, { Document } from "mongoose";
import config from "../configurations/default";
import bcrypt from "bcrypt";

export interface UserInterface extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePasswords(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let user = this as UserInterface;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.saltWorkFactor);
  const hash = bcrypt.hashSync(user.password,  salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  let user = this as UserInterface;
  return bcrypt.compare(candidatePassword, user.password).catch((error) => {
    return false;
  });
};

const UserModel = mongoose.model<UserInterface>("User", userSchema);

export default UserModel;
