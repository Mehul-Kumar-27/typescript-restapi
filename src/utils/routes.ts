import { Express, NextFunction, Request, Response } from "express";
import validate from "../middlewares/validate";
import { userSchema } from "../schema/user-schema";
import {
  createUserHandeller,
  getAllUsersHandeller,
} from "../controllers/user_controller";
import {
  createSessionHandeller,
  filndAllSessionHandeller,
} from "../controllers/session.controller";
import { sessionSchema } from "../schema/session.schema";
import requireUser from "../middlewares/requireUser";

function routes(app: Express) {
  app.get("/api/healthcheck", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(userSchema), createUserHandeller);
  app.get("/api/get-all-users", getAllUsersHandeller);
  app.post("/api/sessions", validate(sessionSchema), createSessionHandeller);
  app.get("/api/getUserSessions", requireUser, filndAllSessionHandeller);
}

export default routes;
