import {Request, Response, NextFunction} from 'express';
import {APP_RESPONSES} from './../../appResponse';
export class ValidateObjectRequest {
   
    constructor() {
    }

    private checkEditBody (req: Request, res: Response, next: NextFunction) {
	    let type = req.body.type;
        let firstDetectedDate = req.body.first_detected_date;
            
        let status = APP_RESPONSES.development.incorrect_body_param.httpCode;
        let message = APP_RESPONSES.development.incorrect_body_param.body.message;
        
        if (type === undefined || firstDetectedDate === undefined) {
            res.status(status).json({error: message});
            return false;
        }

        if(isNaN(Date.parse(req.body.first_detected_date))) {
            res.status(status).json({error: message});
            return false;
        }

        if(type != 'people' && type != 'car'){
            res.status(status).json({error: message});
            return false;
        }
        return true;
    }
    
    private checkId(req: Request, res: Response, next: NextFunction) {
        let status = APP_RESPONSES.development.incorrect_object_id.httpCode;
        let message = APP_RESPONSES.development.incorrect_object_id.body.message;
	    if (req.params.id < 1 || !Number.isInteger(Number(req.params.id))) {
            res.status(status).json({error: message});
            return false;
        }
        req.params.id = Number.parseInt(req.params.id);
    	return true;
    }

    private checkQueryParams(req: Request, res: Response, next: NextFunction) {
        let status = APP_RESPONSES.development.incorrect_object_id.httpCode;
        let message = APP_RESPONSES.development.incorrect_object_id.body.message;
        let first = req.query.first;
        let second = req.query.second;
        if (first < 1 || !Number.isInteger(Number(first)) 
             || second < 1 || !Number.isInteger(Number(second)) ) {
            res.status(status).json({error: message});
            return false;
        }
        first = Number.parseInt(first);
        second = Number.parseInt(second);
    	return true;
    }
 
    public checkGetObjectById(req: Request, res: Response, next: NextFunction) {
 	    return this.checkId(req, res, next);
    }
    
    public checkEditObjectById(req: Request, res: Response, next: NextFunction) {    
        if (this.checkId(req, res, next)) {
            return this.checkEditBody(req, res, next);
            }
            return false;
        }

    public checkDeleteObjectById(req: Request, res: Response, next: NextFunction) {
 	    return this.checkId(req, res, next);
    }

    public checkMargeObjects(req: Request, res: Response, next: NextFunction) {
         return true;
             //this.checkQueryParams(req, res, next);
    }
    
}


/**
 * 
 * curl -X PUT --data '{"url":"images/kl.jpg","last_detected_date":"2017-08-08 16:25:06", "cameras_id":1, "traffic_id": "2"}' --header "Content-Type: application/json" "http://localhost:4300/object/1"
 * 
 * 
 */