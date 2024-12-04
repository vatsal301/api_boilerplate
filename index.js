const Hapi = require("@hapi/hapi");
require("dotenv").config();
const logger = require("./logger");
const allRoute = require("./Routes/route");
const userRoute = require("./Routes/userRoute");
const sub_repositories = require("./worker/sub_repositoriesSearch");
const sub_contribution = require("./worker/sub_contribution");
const init = async () => {
  if (!process.env.PORT) throw new Error("PORT is not assign");
  const server = Hapi.server({
    port: process.env.PORT,
  });
  // server.ext("onRequest", (request, h) => {
  //   logger.info(`${request.method.toUpperCase()} ${request.path}`);
  //   return h.continue;
  // });
  await server.register(require("./plugins/onRequest"));
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response.isBoom) {
      logger.error(
        `${request.method.toUpperCase()} ${request.path} Error is: ${
          response.output.statusCode
        } - ${response.message}`
      );
    }
    return h.continue;
  });
  server.route(allRoute);
  server.route(userRoute);
  await require("./config/database")();
  await sub_repositories();
  await sub_contribution();
  await server.start();
  logger.info(`Server is Started at ${server.info.uri}`);
};

init();

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception is: ", error);
  process.exit(1);
});
