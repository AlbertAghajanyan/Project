"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appResponse_1 = require("./../../appResponse");
class ValidateObjectRequest {
    constructor() {
    }
    checkEditBody(req, res, next) {
        let type = req.body.type;
        let firstDetectedDate = req.body.first_detected_date;
        let status = appResponse_1.APP_RESPONSES.development.incorrect_body_param.httpCode;
        let message = appResponse_1.APP_RESPONSES.development.incorrect_body_param.body.message;
        if (type === undefined || firstDetectedDate === undefined) {
            res.status(status).json({ error: message });
            return false;
        }
        if (isNaN(Date.parse(req.body.first_detected_date))) {
            res.status(status).json({ error: message });
            return false;
        }
        if (type != 'people' && type != 'car') {
            res.status(status).json({ error: message });
            return false;
        }
        return true;
    }
    checkId(req, res, next) {
        let status = appResponse_1.APP_RESPONSES.development.incorrect_object_id.httpCode;
        let message = appResponse_1.APP_RESPONSES.development.incorrect_object_id.body.message;
        if (req.params.id < 1 || !Number.isInteger(Number(req.params.id))) {
            res.status(status).json({ error: message });
            return false;
        }
        req.params.id = Number.parseInt(req.params.id);
        return true;
    }
    checkQueryParams(req, res, next) {
        let status = appResponse_1.APP_RESPONSES.development.incorrect_object_id.httpCode;
        let message = appResponse_1.APP_RESPONSES.development.incorrect_object_id.body.message;
        let first = req.query.first;
        let second = req.query.second;
        if (first < 1 || !Number.isInteger(Number(first))
            || second < 1 || !Number.isInteger(Number(second))) {
            res.status(status).json({ error: message });
            return false;
        }
        first = Number.parseInt(first);
        second = Number.parseInt(second);
        return true;
    }
    checkGetObjectById(req, res, next) {
        return this.checkId(req, res, next);
    }
    checkEditObjectById(req, res, next) {
        if (this.checkId(req, res, next)) {
            return this.checkEditBody(req, res, next);
        }
        return false;
    }
    checkDeleteObjectById(req, res, next) {
        return this.checkId(req, res, next);
    }
    checkMargeObjects(req, res, next) {
        return true;
        //this.checkQueryParams(req, res, next);
    }
}
exports.ValidateObjectRequest = ValidateObjectRequest;
/**
 *
 * curl -X PUT --data '{"url":"images/kl.jpg","last_detected_date":"2017-08-08 16:25:06", "cameras_id":1, "traffic_id": "2"}' --header "Content-Type: application/json" "http://localhost:4300/object/1"
 *
 *
 */ 
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/controllers/validate/validateObjectsRequest.js.map