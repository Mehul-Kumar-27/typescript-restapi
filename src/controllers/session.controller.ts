import { NextFunction, Request, Response } from "express";
import { validateUserPassowrd } from "../services/user_service";
import { createSession } from "../services/session.services";
import config from "../configurations/default";
import { signJWT } from "../utils/jwt.utils";
import { verify } from "crypto";

export async function createSessionHandeller(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Validate The user password

  const user = await validateUserPassowrd(req.body);

  if (!user) {
    return res.status(401).send("Invalid User Email or Password");
  }

  // Create a session

  const session = await createSession(user.id, req.get("user-agent") || "");

  // create access tokens

  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: config.accessTokenTtl }
  );

  // Create refresh tokens

  const refrehTokenToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: config.accessTokenTtl }
  );

  return res.send({ accessToken, refrehTokenToken });
}
