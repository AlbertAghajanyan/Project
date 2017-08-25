import { Response, Request, NextFunction } from 'express'; 
import { db } from "./../models/database";
import * as fs from 'fs'; 
import * as multer from 'multer';

export class NewObject {
    private type;
    private detectedDate;
    private cameraName;
    private folderName;
    private static imagesFolder = "./server/upload/images/";

    constructor() {
        this.type = "";
        this.detectedDate = "";
        this.cameraName = "";
        this.folderName = NewObject.imagesFolder + "folder";
    }

    createFolderWithObject(folderName) {
        if (!fs.existsSync(folderName)) {
            console.log(folderName);
            fs.mkdirSync(folderName);
        }
    }

    insertObjectOnDB() {
        return db.any('select count(*) from image')
            .then(data => {
                this.folderName = this.folderName + (++data[0].count);
                return db.any("insert into traffic(type, first_detected_date) values($1, $2) returning id", [this.type, this.detectedDate])
                    .then(data => {
                        let traficId = data[0].id;
                        return db.any("select id from cameras where cameras.camera_name = $1", this.cameraName)
                            .then(data => {
                                let cameraId = data[0].id;
                                return db.any("insert into image(url, last_detected_date, cameras_id, traffic_id) values($1, '2017-01-01 12:03:00'::timestamp, $2, $3)", [this.folderName, cameraId, traficId])
                                    .then(data => {
                                        this.createFolderWithObject(this.folderName);
                                    })
      

                            })
 
                    })

            })


    }

    isValid(): boolean {
        if (this.detectedDate && this.cameraName && this.type) {
            return true;
        }
        return false;
    }

    insertObject(req: Request, res: Response) {
        this.type = req.body.type;
        this.detectedDate = req.body.firstDetectedDate;
        this.cameraName = req.body.cameraName;
        if (this.isValid()) {
            this.insertObjectOnDB()
            .then(data => {
                res.status(200).json({
                    success: true,
                    folderName: this.folderName
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    status: "An unknown internal error occurred. db connection closed"
                })
            });
        } else {
            res.status(400).json({
                success: false,
                status: "Bad request !!!"
            })
        }
    }

    insertObjectImage(req: Request, res: Response) {
        if (!req.files || !req.query.folderName) {
            res.status(400).json({
                success: false,
                status: "Images or folder name not exists!"
            })   
        }  else {
            console.log(req.files);
            this.moveImages(req);
            res.status(200).json({
                success: true,
                status: "Images saved."
            })   
        }
    }

    public uploadImage() {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './server/upload/images')
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        })
        return multer({ storage: storage})
    }

    private moveImages(req: Request) {
        let name = "";
        for (let i = 0; i <  [].concat(req.files).length; ++i) {
            name = [].concat(req.files)[i].originalname;
            fs.rename(NewObject.imagesFolder + name, NewObject.imagesFolder  + req.query.folderName + "/" + name, function (err) {
                if (err)
                    console.error(err);
            });
        }
    }

}

