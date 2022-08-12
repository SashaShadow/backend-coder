import log4js from 'log4js';

log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console" },
      warnFile: { type: 'file', filename: 'warn.log' },
      errorFile: { type: 'file', filename: 'error.log' }
    },
    categories: {
      default: { appenders: ["miLoggerConsole"], level: "trace" },
      consola: { appenders: ["miLoggerConsole"], level: "debug" },
      archivo: { appenders: ["warnFile"], level: "warn" },
      archivo2: { appenders: ["errorFile"], level: "error" },
    }
   })

export const logger = log4js.getLogger();
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");
