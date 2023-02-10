enum LOG_LEVEL {
  INFO,
  DEBUG,
  WARN,
  ERROR,
  QUIET
}

interface CustomLogger {
  shouldLog: (level: LOG_LEVEL) => boolean
  info: (...args: any[]) => void
  log: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}

const Logger: CustomLogger = {
  shouldLog (level) {
    let currentLogLevel = LOG_LEVEL.INFO
    if (process.env.ENV === 'test') {
      currentLogLevel = LOG_LEVEL.QUIET
    }
    if (process.env.LOG_LEVEL) {
      currentLogLevel = LOG_LEVEL.INFO
    }
    return level >= currentLogLevel
  },
  info (...args): void {
    Logger.shouldLog(LOG_LEVEL.INFO) && console.info(...args)
  },
  log (...args): void {
    Logger.shouldLog(LOG_LEVEL.DEBUG) && console.log(...args)
  },
  warn (...args) {
    Logger.shouldLog(LOG_LEVEL.WARN) && console.warn(...args)
  },
  error (...args) {
    Logger.shouldLog(LOG_LEVEL.ERROR) && console.error(...args)
  }
}

export default Logger
