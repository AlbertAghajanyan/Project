import { Request, Response, NextFunction } from 'express';
import { Objects } from './../models/object';
import { NewObject } from './../models/insertObject' 
import { dtObjects } from './../models/dtobject';
import { ValidateObjectRequest } from './validate/validateObjectsRequest';

let object = new dtObjects();
let validate = new ValidateObjectRequest();

export class ObjectControllers {

    constructor() { }

    public getObjectList(req: Request, res: Response, next: NextFunction) {
        new Objects().getObjectList(req, res);
    }

    public searchObject(req: Request, res: Response, next: NextFunction) {
        new Objects().searchObject(req, res);
    }
 
    public insertObject(req: Request, res: Response, next: NextFunction) {
        new NewObject().insertObject(req, res);
    }

    public insertObjectImage(req: Request, res: Response, next: NextFunction) {
        new NewObject().insertObjectImage(req, res);
    }

    public uploadImages() {
        return new NewObject().uploadImage();
    }

    public getObjectById(req: Request, res: Response, next: NextFunction) {
        if (validate.checkGetObjectById(req, res, next)) {
	        object.getObjectById(req, res);
	    }
    }
    
    public editObjectById(req: Request, res: Response, next: NextFunction) {    
        if (validate.checkEditObjectById(req, res, next)) {
            object.editObjectById(req, res);
	    }
    }

    public deleteObjectById(req: Request, res: Response, next: NextFunction) {
        if (validate.checkDeleteObjectById(req, res, next)) {
            object.deleteObjectById(req, res);
	    }
    }

    public mergeObjects(req: Request, res: Response, next: NextFunction) {
        if (validate.checkMargeObjects(req, res, next)) {
            object.mergeObjects(req, res);
	    }
    }
}

