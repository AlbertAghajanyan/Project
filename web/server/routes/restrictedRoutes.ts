import { CameraController } from './../controllers/cameraController';
import { ObjectControllers } from './../controllers/objectController';
import { loginController } from './../controllers/loginController'

import { Router, Request, Response, NextFunction} from 'express';
 
export class RestrictedRouter {
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
        this.router.use(loginController.isLogin); 
        
        this.router.delete('/camera/:id', this.cameraController.deleteCameraById);   
        this.router.put('/camera/:id', this.cameraController.updateCameraById);   
    
        this.router.delete('/object/:id', this.objectControllers.deleteObjectById);   
        this.router.put('/object/:id', this.objectControllers.editObjectById);  
        this.router.put('/mergeObjects', this.objectControllers.mergeObjects);
    }


    public getRouter() {
        return this.router;
    }
}

