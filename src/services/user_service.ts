import { Document } from "mongoose";
import UserModel, { UserInterface } from "../models/user_model";

export async function createUser(
  input: Document<Omit<UserInterface, "createdAt" | "updatedAt" | 'comaparePassword'>>
) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
