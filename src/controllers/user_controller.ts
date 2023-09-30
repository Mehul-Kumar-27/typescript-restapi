import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/user_service";
import logger from "../utils/logger";
import { CreateUserInput } from "../schema/user-schema";

export async function createUserHandeller(req: Request, res: Response) {
  const user = await createUser(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).json({ error: error.message });
    });
}

export async function getAllUsersHandeller(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error: any) {
    logger.error(error);
    res.status(500).json({ error: error.message });
  }
}
