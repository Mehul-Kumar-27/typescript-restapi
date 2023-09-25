import { Express, NextFunction, Request, Response } from "express";
import validate from "../middlewares/validate";
import { userSchema } from "../schema/user-schema";
import { createUserHandeller } from "../controllers/user_controller";
import { createSessionHandeller } from "../controllers/session.controller";
import { sessionSchema } from "../schema/session.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(userSchema), createUserHandeller);

  app.post("/api/sessions", validate(sessionSchema), createSessionHandeller);
}

export default routes;
