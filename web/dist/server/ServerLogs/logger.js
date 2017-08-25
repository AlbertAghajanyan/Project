"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
class ServerLogger {
    constructor() {
        this.logDir = "ServerLogs";
        this.logger = new (winston_1.Logger)({
            transports: [
                // new (transports.Console)(),
                new (winston_1.transports.File)({ filename: "server.log" }),
            ],
        });
        // this.logger.info("info");
    }
    addInfo(info) {
        this.logger.info(info);
    }
    addWarning(warning) {
        this.logger.warn(warning);
    }
    addError(debugInfo) {
        this.logger.debug(debugInfo);
    }
}
exports.ServerLogger = ServerLogger;
// let loger = new ServerLogger();
// loger.addInfo("info");
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/ServerLogs/logger.js.map