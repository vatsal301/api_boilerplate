const winston = require("winston");

const logger = winston.createLogger({
  levels: { error: 0, info: 1 },
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.json(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

module.exports = logger;
