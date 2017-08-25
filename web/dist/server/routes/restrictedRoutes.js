"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cameraController_1 = require("./../controllers/cameraController");
const objectController_1 = require("./../controllers/objectController");
const loginController_1 = require("./../controllers/loginController");
const express_1 = require("express");
class RestrictedRouter {
    constructor() {
        this.cameraController = new cameraController_1.CameraController();
        this.objectControllers = new objectController_1.ObjectControllers();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.use(loginController_1.loginController.isLogin);
        this.router.delete('/camera/:id', this.cameraController.deleteCameraById);
        this.router.put('/camera/:id', this.cameraController.updateCameraById);
        this.router.delete('/object/:id', this.objectControllers.deleteObjectById);
        this.router.put('/object/:id', this.objectControllers.editObjectById);
        this.router.put('/mergeObjects', this.objectControllers.mergeObjects);
    }
    getRouter() {
        return this.router;
    }
}
exports.RestrictedRouter = RestrictedRouter;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/routes/restrictedRoutes.js.map