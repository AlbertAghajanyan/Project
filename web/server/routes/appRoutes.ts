import { CameraController } from "./../controllers/cameraController";
import { loginController } from "./../controllers/loginController";
import { ObjectControllers } from "./../controllers/objectController";
import { Router, Request } from 'express';

import * as multer from 'multer';
 
export class AppRouter {
    router: Router;
    private cameraController:CameraController;
    private objectControllers:ObjectControllers;

    constructor() {
        this.cameraController = new CameraController();
        this.objectControllers = new ObjectControllers();
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/cameras', this.cameraController.getCameras);
        this.router.get('/camera/:id', this.cameraController.getCameraById);  
        this.router.get('/cameraBy', this.cameraController.getCameraByNameOrLocation);

        this.router.get('/object/:id', this.objectControllers.getObjectById);   
        this.router.get('/objects', this.objectControllers.getObjectList);
        this.router.post('/search', this.objectControllers.searchObject);

        this.router.post('/login', loginController.login);
        
        this.router.post('/insert', this.objectControllers.insertObject);
        this.router.post('/insertImage',  this.objectControllers.uploadImages().array('images', 20), this.objectControllers.insertObjectImage);
    }

    public getRouter() {
        return this.router;
    }
}


