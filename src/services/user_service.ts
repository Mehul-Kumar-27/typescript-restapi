import { Document } from "mongoose";
import UserModel, { UserInterface } from "../models/user_model";
import { omit } from "lodash";

export async function createUser(
  input: Document<
    Omit<UserInterface, "createdAt" | "updatedAt" | "comaparePassword">
  >
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validateUserPassowrd({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  } else {
    const isValid = await user.comparePasswords(password);
    if (!isValid) return false;

    return omit(user.toJSON(), "password");
  }
}

export async function getAllUsers() {
  try {
    const users = await UserModel.find();
    return users.map((user) => omit(user.toJSON(), "password"));
  } catch (e: any) {
    throw new Error(e);
  }
}
