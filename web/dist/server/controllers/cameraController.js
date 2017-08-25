"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cameras_1 = require("./../models/cameras");
const validateCamerasRequest_1 = require("./validate/validateCamerasRequest");
const logger_1 = require("./../ServerLogs/logger");
let cameras = new cameras_1.Cameras();
let validate = new validateCamerasRequest_1.ValidateCamerasRequest();
let logger = new logger_1.ServerLogger();
class CameraController {
    constructor() { }
    getCameras(req, res, next) {
        // res.send("Get Cameras");
        logger.addInfo("Called get all cameras");
        cameras.getCameras(req, res);
    }
    getCameraById(req, res, next) {
        if (validate.checkGetCameraById(req, res, next)) {
            // res.send("Get Camera by id");
            logger.addInfo("Called get camera by id with id = " + req.params.id);
            cameras.getCameraById(req, res);
        }
    }
    getCamerasWithRange(req, res, next) {
        res.send("Get Camera with range");
    }
    deleteCameraById(req, res, next) {
        if (validate.checkDeleteCameraById(req, res, next)) {
            logger.addInfo("Called delete camera by id with id = " + req.params.id);
            cameras.deleteCameraById(req, res);
        }
    }
    updateCameraById(req, res, next) {
        if (validate.checkUpdateCameraById(req, res, next)) {
            logger.addInfo("Called edit camera by id with id = " + req.params.id);
            cameras.updateCameraById(req, res);
        }
    }
    getCameraByNameOrLocation(req, res, next) {
        logger.addInfo("Called search cameras");
        cameras.getCameraByNameOrLocation(req, res);
    }
}
exports.CameraController = CameraController;
const cameraController = new CameraController();
exports.default = cameraController;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/controllers/cameraController.js.map