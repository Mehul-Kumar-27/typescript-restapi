import { Request, Response } from "express";
import { createUser } from "../services/user_service";
import logger from "../utils/logger";

export async function createUserHandeller(req: Request, res: Response) {
  const user = await createUser(req.body)
    .then((user) => {})
    .catch((error) => {
      logger.error(error);
      res.status(500).json({ error: error.message });
    });
}
