import {Document} from "mongoose";
import UserModel, { UserInterface } from "../models/user_model";


export async function createUser(input: Document<UserInterface>){
    try {
        return await UserModel.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}