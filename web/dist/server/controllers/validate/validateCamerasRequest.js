"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appResponse_1 = require("./../../appResponse");
class ValidateCamerasRequest {
    constructor() {
    }
    checkId(req, res, next) {
        let status = appResponse_1.APP_RESPONSES.development.incorrect_device_id.httpCode;
        let message = appResponse_1.APP_RESPONSES.development.incorrect_device_id.body.message;
        if (req.params.id < 1 || !Number.isInteger(Number(req.params.id))) {
            res.status(status).json({ error: message });
            return false;
        }
        req.params.id = Number.parseInt(req.params.id);
        return true;
    }
    checkEditBody(req, res, next) {
        let cameraName = req.body.cameraName;
        let longitude = req.body.longitude;
        let latitude = req.body.latitude;
        let online = req.body.online;
        let description = req.body.description;
        let status = appResponse_1.APP_RESPONSES.development.incorrect_body_param.httpCode;
        let message = appResponse_1.APP_RESPONSES.development.incorrect_body_param.body.message;
        if (cameraName === undefined || longitude === undefined
            || latitude === undefined || online === undefined
            || description === undefined) {
            res.status(status).json({ error: message });
            return false;
        }
        if (cameraName === "" || description === "") {
            res.status(status).json({ error: message });
            return false;
        }
        if (online !== true && online !== false) {
            res.status(status).json({ error: message + online });
            return false;
        }
        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            res.status(status).json({ error: message });
            return false;
        }
        return true;
    }
    checkGetCameras(req, res, next) {
        return this.checkId(req, res, next);
    }
    checkGetCameraById(req, res, next) {
        return this.checkId(req, res, next);
    }
    checkDeleteCameraById(req, res, next) {
        return this.checkId(req, res, next);
    }
    checkUpdateCameraById(req, res, next) {
        if (this.checkId(req, res, next)) {
            return this.checkEditBody(req, res, next);
        }
        return false;
    }
}
exports.ValidateCamerasRequest = ValidateCamerasRequest;
/**
 *curl -X PUT --data '{"cameraName":"Camera 1", "longitude":"5.56","latitude":"2.45","online":"true", "description":"ok"}' --header "Content-Type: application/json" "http://localhost:4300/camera/1"
 */ 
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/controllers/validate/validateCamerasRequest.js.map