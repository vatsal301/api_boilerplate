const logger = require("../logger");
const memberServices = require("../services/member.services");
const responseManager = require("../utility/responseManager");
const jwt = require("jsonwebtoken");
module.exports = {
  name: "onRequest",
  version: "1.0.0",
  register: async (server, options) => {
    server.ext("onRequest", async (request, h) => {
      try {
        logger.info(`${request.method.toUpperCase()} ${request.path}`);
        if (
          request.path === "/api/v1/login" ||
          request.path === "/api/v1/signin"
        ) {
          return h.continue;
        }
        const token = request.headers["token"]?.split(" ");
        console.log("token", token);
        if (!token) {
          throw new Error("Token is missing or improperly formate");
        }
        let decoded;
        try {
          decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        } catch (error) {
          if (error.name === "TokenExpiredError") {
            throw new Error("Token has expired. Please login again.");
          } else if ("JsonWebTokenError") {
            throw new Error("Invalid token. Please provide a valid token.");
          } else {
            throw new Error("Failed to authenticate token.");
          }
        }
        const memberData = memberServices.findByIdMember(decoded._id);
        if (!memberData) {
          throw new Error("Member not found. invalid token");
        }
        request.memberId = decoded._id;
        return h.continue;
      } catch (error) {
        if (
          error.message.toLowerCase().includes("token") ||
          error.message.includes("Member")
        ) {
          return responseManager.error(h, error.message, {}, 401).takeover();
        }
        return responseManager.error(
          h,
          "An unexpected error occurred. Please try again later.",
          {},
          500
        );
      }
    });
  },
};
