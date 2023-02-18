"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["INFO"] = 0] = "INFO";
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 1] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 2] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["QUIET"] = 4] = "QUIET";
})(LOG_LEVEL || (LOG_LEVEL = {}));
const Logger = {
    shouldLog(level) {
        let currentLogLevel = LOG_LEVEL.INFO;
        if (process.env.ENV === 'test') {
            currentLogLevel = LOG_LEVEL.QUIET;
        }
        if (process.env.LOG_LEVEL) {
            currentLogLevel = LOG_LEVEL.INFO;
        }
        return level >= currentLogLevel;
    },
    info(...args) {
        Logger.shouldLog(LOG_LEVEL.INFO) && console.info(...args);
    },
    log(...args) {
        Logger.shouldLog(LOG_LEVEL.DEBUG) && console.log(...args);
    },
    warn(...args) {
        Logger.shouldLog(LOG_LEVEL.WARN) && console.warn(...args);
    },
    error(...args) {
        Logger.shouldLog(LOG_LEVEL.ERROR) && console.error(...args);
    }
};
exports.default = Logger;
