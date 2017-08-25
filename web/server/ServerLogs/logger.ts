import { Logger, LoggerInstance, transports} from "winston";

export class ServerLogger {
  private logger: LoggerInstance;
  private logDir = "ServerLogs";
  constructor() {
    this.logger = new (Logger)({
      transports: [
        // new (transports.Console)(),
        new (transports.File)({ filename: "server.log"}),
      ],
    });
    // this.logger.info("info");
  }
  public addInfo(info: string) {
    this.logger.info(info);
  }

  public addWarning(warning: string) {
    this.logger.warn(warning);
  }

  public addError(debugInfo: string) {
    this.logger.debug(debugInfo);
  }
}

// let loger = new ServerLogger();

// loger.addInfo("info");
