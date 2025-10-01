// utils/logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: "info", // minimum level to log
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({ format: combine(colorize(), logFormat) }),
    new transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = logger;
