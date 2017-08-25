"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cameraController_1 = require("./../controllers/cameraController");
const loginController_1 = require("./../controllers/loginController");
const objectController_1 = require("./../controllers/objectController");
const express_1 = require("express");
class AppRouter {
    constructor() {
        this.cameraController = new cameraController_1.CameraController();
        this.objectControllers = new objectController_1.ObjectControllers();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/cameras', this.cameraController.getCameras);
        this.router.get('/camera/:id', this.cameraController.getCameraById);
        this.router.get('/cameraBy', this.cameraController.getCameraByNameOrLocation);
        this.router.get('/object/:id', this.objectControllers.getObjectById);
        this.router.get('/objects', this.objectControllers.getObjectList);
        this.router.post('/search', this.objectControllers.searchObject);
        this.router.post('/login', loginController_1.loginController.login);
        this.router.post('/insert', this.objectControllers.insertObject);
        this.router.post('/insertImage', this.objectControllers.uploadImages().array('images', 20), this.objectControllers.insertObjectImage);
    }
    getRouter() {
        return this.router;
    }
}
exports.AppRouter = AppRouter;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/routes/appRoutes.js.map