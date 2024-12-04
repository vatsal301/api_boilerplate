const mongoose = require("mongoose");
const logger = require("../logger");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/api-boilerplate"
    );
    logger.info(`Mongodb is Connected ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Error in mongodb connection ${err}`);
    process.exit(1);
  }
};

module.exports = dbConnection;
