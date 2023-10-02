import mongoose from "mongoose";
import config from "../configurations/default";
import exp from "constants";
import logger from "../utils/logger";

async function connectToDataBase() {
  const dbURI: string = config.dbURI;
  logger.info(dbURI)
  await mongoose
    .connect(dbURI)
    .then(() => {
      logger.info("Connected To Database");
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });
}

export default connectToDataBase;


