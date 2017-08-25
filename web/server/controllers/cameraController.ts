import {Request, Response, NextFunction} from 'express';
import { Cameras } from './../models/cameras';  
import {ValidateCamerasRequest} from './validate/validateCamerasRequest';
import { ServerLogger } from "./../ServerLogs/logger";

let cameras = new Cameras();
let validate = new ValidateCamerasRequest();
let logger = new ServerLogger();
export class CameraController {
    constructor() {}
    public getCameras(req: Request, res: Response, next: NextFunction) {
        // res.send("Get Cameras");
        logger.addInfo("Called get all cameras");
        cameras.getCameras(req, res);
    }

    public getCameraById(req: Request, res: Response, next: NextFunction) {
        if (validate.checkGetCameraById(req, res, next)) {
            // res.send("Get Camera by id");
            logger.addInfo("Called get camera by id with id = " + req.params.id);
            cameras.getCameraById(req, res);
        }
    }

    public getCamerasWithRange(req: Request, res: Response, next: NextFunction) {
        res.send("Get Camera with range");
    }

    public deleteCameraById(req: Request, res: Response, next: NextFunction) {
        if (validate.checkDeleteCameraById(req, res, next)) {
            logger.addInfo("Called delete camera by id with id = " + req.params.id);
            cameras.deleteCameraById(req, res);
        }
    }

    public updateCameraById(req: Request, res: Response, next: NextFunction) {
        if (validate.checkUpdateCameraById(req, res, next)) {
            logger.addInfo("Called edit camera by id with id = " + req.params.id);
            cameras.updateCameraById(req, res);
        }
    }

    public getCameraByNameOrLocation(req: Request, res: Response, next: NextFunction) {
        logger.addInfo("Called search cameras");
        cameras.getCameraByNameOrLocation(req, res);
    }

}

const cameraController = new CameraController();
export default cameraController;
