"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const fs = require("fs");
class ResponseObject {
    constructor() {
        this.type = new String();
        this.firstDetectedDate = new String();
        this.cameras = new Array();
        this.lastDetectedDate = new Array();
        this.images = new Array();
        this.imagesEncode = new Array();
    }
}
class Objects {
    constructor() {
        this.objectList = new Array();
    }
    imagesNames(folderName) {
        let imagesURL = new Array();
        if (fs.existsSync(folderName)) {
            imagesURL = fs.readdirSync(folderName);
            for (let i = 0; i < imagesURL.length; ++i) {
                imagesURL[i] = folderName + "/" + imagesURL[i];
            }
        }
        return imagesURL;
    }
    imagesEncode(images) {
        let imagesEncode = new Array();
        for (let image of images) {
            let original_data = fs.readFileSync(String(image));
            var base64Image = original_data.toString('base64');
            imagesEncode[imagesEncode.length] = base64Image;
        }
        return imagesEncode;
    }
    getObjectWithDBData(data) {
        let index = 0;
        this.objectList = new Array();
        for (let i = 0, objIndex = 0, trafficID = 0; i < data.length; ++objIndex) {
            this.objectList[objIndex] = new ResponseObject();
            this.objectList[objIndex].cameras = new Array();
            this.objectList[objIndex].lastDetectedDate = new Array();
            this.objectList[objIndex].images = new Array();
            this.objectList[objIndex].imagesEncode = new Array();
            this.objectList[objIndex].type = data[i].type;
            this.objectList[objIndex].firstDetectedDate = data[i].first_detected_date;
            this.objectList[objIndex].id = data[i].traffic_id;
            index = 0;
            trafficID = data[i].traffic_id;
            while (i < data.length && trafficID == data[i].traffic_id) {
                this.objectList[objIndex].cameras[index] = data[i].camera_name;
                this.objectList[objIndex].lastDetectedDate[index] = data[i].last_detected_date;
                this.objectList[objIndex].images = this.imagesNames(data[i].url);
                this.objectList[objIndex].imagesEncode = this.objectList[objIndex].imagesEncode.concat(this.imagesEncode(this.objectList[objIndex].images));
                ++i;
                ++index;
            }
        }
    }
    getObjectList(req, res) {
        let start = +(req.query.start >= 0 ? req.query.start : 0);
        let size = +(req.query.size >= 0 ? req.query.size : 10);
        database_1.db.any('select traffic.id from traffic order by traffic.id')
            .then(data => {
            let countObjects = data.length;
            let next = data[start].id;
            let last = (start + size) < data.length ? data[start + size].id : data[data.length - 1].id;
            database_1.db.any('select traffic.*, image.*, cameras.camera_name from image,cameras, traffic where image.traffic_id = traffic.id and traffic.id <= $2 and  traffic.id >= $1   and image.cameras_id = cameras.id  order by traffic.id', [next, last])
                .then(data => {
                this.getObjectWithDBData(data);
                res.send({ objects: this.objectList, count: countObjects });
            });
        })
            .catch(err => {
            res.status(500).json({
                message: 'An unknown inter nal error occurred'
            });
        });
    }
    validateSearch(req) {
        const obj = {
            camera_name: req.body.params.camera_name,
            type: req.body.params.type,
            from_date: req.body.params.from_date,
            to_date: req.body.params.to_date
        };
        if (!req.body.params.camera_name) {
            obj.camera_name = '%';
        }
        if (!req.body.params.type) {
            obj.type = "";
        }
        else if (req.body.params.type) {
            obj.type = "traffic.type = '" + req.body.params.type + "' and ";
        }
        /*if (!req.body.params.from_date) {
            obj.from_date = '2016-01-01 12:03:00';
        }
        if (!req.body.params.to_date) {
            obj.to_date = new Date().toISOString().slice(0,10) + " 12:03:00";
            console.log("to_date", obj.to_date)
        }*/
        return obj;
    }
    searchObject(req, res) {
        const obj = this.validateSearch(req);
        database_1.db.any('select traffic.*, image.*, cameras.camera_name from image,cameras, traffic where\
                image.traffic_id = traffic.id and cameras.id = image.cameras_id and \
                cameras.camera_name like $1 and ' + obj.type + 'traffic.first_detected_date\
                between $2 and $3', [obj.camera_name, obj.from_date, obj.to_date])
            .then(data => {
            this.getObjectWithDBData(data);
            res.send({ objects: this.objectList });
        })
            .catch(err => {
            res.status(500).json({
                message: 'An unknown inter nal error occurred'
            });
        });
    }
}
exports.Objects = Objects;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/models/object.js.map