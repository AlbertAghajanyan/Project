import { Request, Response, NextFunction } from 'express';
import { GetDataBase } from './database';
import * as bodyParser from 'body-parser';
import * as database from './database';
import { db } from './database';
import { APP_RESPONSES } from '../appResponse';

export class dtObjects {
    private count: Number; 
    constructor() {
    	this.count = new Number();
    }
    private nfStatus = APP_RESPONSES.development.not_found.httpCode;
    private nfMessage = APP_RESPONSES.development.not_found.body.message;
    private dbStatus = APP_RESPONSES.development.internal_error.httpCode;
    private dbMessage = APP_RESPONSES.development.internal_error.body.message;
    
    
    public getObjectById(req:Request, res:Response) {
        let okStatus = APP_RESPONSES.development.internal_error.httpCode;
        db.any('select * from image inner join traffic on image.traffic_id=traffic.id inner join cameras on image.cameras_id=cameras.id and image.id = $1',req.params.id)
            .then(data => {
                if(!data.length) {
                    res.status(this.nfStatus).json({error:this.nfMessage});
                    return;
                }
                res.status(okStatus).json(JSON.stringify(data));
                console.log('DATA:', data); // print data;
            })
            .catch(error => {
                res.status(this.dbStatus).json({error:this.dbMessage});
            });
    }

    public getObjectsCount() {
        db.any('select count(id) from image')
        .then(data => {
 		    let dataString = JSON.stringify(data);
		    let dataJson = JSON.parse(dataString);
            console.log(dataJson[0].count); 
		    this.count = Number(dataJson[0].count);
        })
        .catch(error => {
        
        });
    }
    public deleteObjectById(req:Request, res:Response) {
        let delStatus = APP_RESPONSES.development.deleted.httpCode;
        let delMessage = APP_RESPONSES.development.deleted.body.message;
        db.query('delete from traffic where id = $1',req.params.id)
            .then(data => {
                res.status(delStatus).json({message:delMessage});
            })
            .catch(error => {
                res.status(this.dbStatus).json({error:this.dbMessage});
            });
    }
    
    public editObjectById(req:Request, res:Response) {
        let editStatus = APP_RESPONSES.development.edited.httpCode;
        let editMessage = APP_RESPONSES.development.edited.body.message;
        db.query ("update  traffic set  type= $2, first_detected_date= timestamp $3 where id = $1", [req.params.id, req.body.type, req.body.first_detected_date])
            .then(data => {
                res.status(editStatus).json({message:editMessage});
            })
            .catch(error => {
                res.status(this.dbStatus).json({error:this.dbMessage});
            });
    }

    public mergeObjects(req:Request, res:Response) {
        let mergeStatus = APP_RESPONSES.development.merged.httpCode;
        let mergeMessage = APP_RESPONSES.development.merged.body.message;
        let objects = req.body.object;
        let mergedObjects = "(";
        for (let i = 1; i < objects.length - 1; ++i) {
            mergedObjects += objects[i] + ",";
        }
        mergedObjects += objects[objects.length - 1];
        mergedObjects += ")";

        
        let query = "update image set traffic_id=" + objects[0] + " where traffic_id in " + mergedObjects + " ;";
        let delQuery = 'delete from traffic where id in ' + mergedObjects;
        console.log(query);
        console.log(delQuery);
        db.query (query)
            .then(data => {
                 db.query(delQuery)
                .then(data => {
                    res.status(mergeStatus).json({message:mergeMessage});
                })
                .catch(error => {
                    res.status(this.dbStatus).json({error:this.dbMessage});
                });
            })
            .catch(error => {
                res.status(this.dbStatus).json({error:this.dbMessage});
            });
    }
} 
