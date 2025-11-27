import pino from "pino";
import dotenv from "dotenv";

dotenv.config();

/**
 * A variable that handles the translation of time from one format, timezone, or representation to another.
 * It may be used to convert time strings to different locales, adjust timezones, or reformat time for display purposes.
 */
let translateTime
if (process.env.NODE_ENV == "dev") {
    translateTime = "SYS:HH:MM:ss"
} else {
    translateTime = "SYS:dd-mm-yyyy HH:MM:ss"
}

/**
 * Function to add a types field to the log object if the environment is set to development.
 * @param type
 */
function typeLogger(type: string): { type?: string } {
    if (process.env.NODE_ENV === "dev") {
        return { type };
    }
    return {};
}

/**
 * Logger instance configured using the Pino logging library.
 *
 * The logger is set up with a default log level of "info", which can be overridden
 * by setting the environment variable LOG_LEVEL. It uses the 'pino-pretty' transport
 * for log formatting, enabling colorized output and custom timestamp formatting.
 * Specific fields such as "pid" and "hostname" are excluded from the log output.
 */
const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: translateTime,
            ignore: "pid,hostname",
        },
    }
})

/**
 * Log functions with different styling and Discord webhook integration
 * @property success - Green [success] prefix + Discord webhook
 * @property log - Blue [info] prefix + Discord webhook
 * @property warn - Yellow [warn] prefix + Discord webhook
 * @property error - Red [error] prefix + Discord error webhook
 * @property important - Yellow text + Discord webhook
 * @property silentlog - Plain console log only
 */
export const otterlogs = {
    success: (message: string): void => {
        logger.info(typeLogger("success"), message);
    },
    log: (message: string): void => {
        logger.info(typeLogger("log"), message);
    },
    warn: (message: string): void => {
        logger.warn(typeLogger("warn"), message);
    },
    error: (message: string): void => {
        logger.error(typeLogger("error"), message);
    },
    important: (message: string): void => {
        logger.info(typeLogger("important"), message);
    },
    debug: (message: string): void => {
        if (process.env.NODE_ENV === "dev") {
            logger.info(typeLogger("debug"), message);
        }
    },
    silentlog: (message: string): void => {
        logger.debug(message);
    }
};