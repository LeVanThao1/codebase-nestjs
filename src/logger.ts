import { Logger } from "./modules/logger/logger"
import { LoggerService } from "./modules/logger/logger.service"

const logger = new Logger('MAIN')

export class MyLogger extends LoggerService {
  log(message: string) {
    logger.info(message)
    /* your implementation */
  }
  error(message: string, trace: string, context) {
    logger.error(message)
    /* your implementation */
  }
  warn(message: string) {
    logger.warn(message)
    /* your implementation */
  }
  debug(message: string) {
    logger.info(message)
    /* your implementation */
  }
  verbose(message: string) {
    logger.info(message)
    /* your implementation */
  }
}
