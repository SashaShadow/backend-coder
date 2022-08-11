import express from "express";
import minimist from "minimist";
import "dotenv/config.js";
import log4js from 'log4js';

const options = {
    alias: {
      p: 'PORT',
    }
  }

log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console" },
      miLoggerFile: { type: 'file', filename: 'info.log' },
      miLoggerFile2: { type: 'file', filename: 'info2.log' }
    },
    categories: {
      default: { appenders: ["miLoggerConsole"], level: "trace" },
      consola: { appenders: ["miLoggerConsole"], level: "debug" },
      archivo: { appenders: ["miLoggerFile"], level: "warn" },
      archivo2: { appenders: ["miLoggerFile2"], level: "info" },
      todos: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "error" }
    }
   })

const logger = log4js.getLogger();
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");


const myArgs = minimist(process.argv.slice(2), options)
const app = express()

const PORT = myArgs.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`));

