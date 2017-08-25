import {Request, Response, NextFunction} from 'express';
import * as bodyParser from 'body-parser';
import {db} from './database';
import {APP_RESPONSES} from '../appResponse';

export class Cameras {

    constructor() {
	}
	
	private nfStatus = APP_RESPONSES.development.not_found.httpCode;
    private nfMessage = APP_RESPONSES.development.not_found.body.message;
    private dbStatus = APP_RESPONSES.development.internal_error.httpCode;
    private dbMessage = APP_RESPONSES.development.internal_error.body.message;
    
	public getCameras (req: Request, res: Response) {
		db.query ('SELECT * FROM cameras')
		.then(data => {
			if(!data.length) {
				res.status(this.nfStatus).json({error:this.nfMessage});
				return;
			}
			res.send(JSON.stringify(data));
		})
		.catch(error => {
			res.status(this.dbStatus).json({error:this.dbMessage});
		});
	}

	public getCameraById (req: Request, res: Response) {
		let okStatus = APP_RESPONSES.development.internal_error.httpCode;
		if (req.params.id < 0) {
			res.status(400).json({message:'Bad request.'});
		} else {
			db.query ('SELECT * FROM cameras WHERE id=$1', req.params.id)
			.then(data => {
				if(!data.length) {
					res.status(this.nfStatus).json({error:this.nfMessage});
					return;
				}
				res.status(okStatus).json(JSON.stringify(data));
			})
			.catch(error => {
				res.status(this.dbStatus).json({error:this.dbMessage});
			});
		}
	}
	
	public deleteCameraById (req: Request, res: Response) {
		let delStatus = APP_RESPONSES.development.deleted.httpCode;
        let delMessage = APP_RESPONSES.development.deleted.body.message;
		if (req.params.id < 0) {
			res.status(400).json({message:'Bad request.'});
		} else {
			db.query ('DELETE FROM cameras WHERE id=$1', req.params.id)
			.then(data => {
				console.log(data);
				res.status(delStatus).json({message:delMessage});
			})
			.catch(error => {
				res.status(this.dbStatus).json({error:this.dbMessage});
			});
		}
	}

	public updateCameraById (req: Request, res: Response) {
		let editStatus = APP_RESPONSES.development.edited.httpCode;
        let editMessage = APP_RESPONSES.development.edited.body.message;
		const obj  = {
			id : req.params.id,
			name: req.body.cameraName,
			location: '(' + req.body.longitude + ',' + req.body.latitude + ')',
			online: req.body.online,
			description: req.body.description
		}
		
		//let query = "UPDATE cameras SET camera_name=" + obj.name + ", location='" + obj.location + ", online=" + obj.online + ", description=" + obj.description + " WHERE id=" + obj.id + ";";
		db.query ('UPDATE cameras SET camera_name=${name}, location = ${location}, online=${online}, description = ${description} WHERE id = ${id};', obj)
		.then(data => {
			res.status(editStatus).json({message:editMessage});
		})
		.catch(error => {
			res.status(this.dbStatus).json({error:this.dbMessage});
		});
		
	}

    public getCameraByNameOrLocation (req: Request, res: Response) {
        db.query ('SELECT * FROM cameras WHERE camera_name=$1 or (location[0] between $2-10 and $2+10 and location[1] between $3-10 and $3+10)', [req.query.name,req.query.lat,req.query.long])
            .then(data => {
                if(!data.length) {
                    res.status(404).json({message:'The requested resource was not found at the URL given.'});
                    return;
                }
                res.send(JSON.stringify(data));
                console.log('DATA:', data);
            })
            .catch(error => {
                res.status(500).json({message:'An unknown internal error occurred'});
            });
    }
}

