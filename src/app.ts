import express from "express";
import config from "./configurations/default";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./utils/routes";
import { error } from "console";
import deserializeUser from "../src/middlewares/desearilizeUser";

const port: string = config.port;
const app = express();
app.use(express.json());
app.use(deserializeUser);
app.listen(port, async () => {
  logger.info("Server Started !!");
  logger.info("Trying to connect to Database");

  await connect()
    .then(() => {
      routes(app);
    })
    .catch((error) => {
      logger.error(error);
    });
});
