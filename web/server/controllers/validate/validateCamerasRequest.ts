import {Request, Response, NextFunction} from 'express';
import {APP_RESPONSES} from './../../appResponse';

export class ValidateCamerasRequest {
    constructor() {
         
    }   
    
    private checkId(req: Request, res: Response, next: NextFunction) {
        let status = APP_RESPONSES.development.incorrect_device_id.httpCode;
        let message = APP_RESPONSES.development.incorrect_device_id.body.message;
	    if (req.params.id < 1 || !Number.isInteger(Number(req.params.id))) {
            res.status(status).json({error: message});
            return false;
        }
        req.params.id = Number.parseInt(req.params.id);
    	return true;
    }
    
    private checkEditBody (req: Request, res: Response, next: NextFunction) {
	    let cameraName = req.body.cameraName;
        let longitude = req.body.longitude;
        let latitude = req.body.latitude;
        let online = req.body.online;
        let description = req.body.description;
        
        let status = APP_RESPONSES.development.incorrect_body_param.httpCode;
        let message = APP_RESPONSES.development.incorrect_body_param.body.message;

        if (cameraName === undefined || longitude === undefined 
            || latitude === undefined || online === undefined 
            || description === undefined) {
            
            res.status(status).json({error: message});
            return false;
        }
        if (cameraName === "" || description === "") {
            res.status(status).json({error: message});
            return false;
        }

        if (online !== true && online !== false) {
            res.status(status).json({error: message + online});
            return false;
        }

        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            res.status(status).json({error: message});
            return false;
        }
        return true;
    }


    public checkGetCameras(req: Request, res: Response, next: NextFunction) {
        return this.checkId(req, res, next);
    }

    public checkGetCameraById(req: Request, res: Response, next: NextFunction) {
        return this.checkId(req, res, next);
    }
    
    public checkDeleteCameraById(req: Request, res: Response, next: NextFunction) {    
        return this.checkId(req, res, next);
    }

    public checkUpdateCameraById(req: Request, res: Response, next: NextFunction) {
        if (this.checkId(req, res, next)) {
            return this.checkEditBody(req, res, next);
        }
        return false; 
    }
    

}

/**
 *curl -X PUT --data '{"cameraName":"Camera 1", "longitude":"5.56","latitude":"2.45","online":"true", "description":"ok"}' --header "Content-Type: application/json" "http://localhost:4300/camera/1"
 */