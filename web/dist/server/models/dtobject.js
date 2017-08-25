"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const appResponse_1 = require("../appResponse");
class dtObjects {
    constructor() {
        this.nfStatus = appResponse_1.APP_RESPONSES.development.not_found.httpCode;
        this.nfMessage = appResponse_1.APP_RESPONSES.development.not_found.body.message;
        this.dbStatus = appResponse_1.APP_RESPONSES.development.internal_error.httpCode;
        this.dbMessage = appResponse_1.APP_RESPONSES.development.internal_error.body.message;
        this.count = new Number();
    }
    getObjectById(req, res) {
        let okStatus = appResponse_1.APP_RESPONSES.development.internal_error.httpCode;
        database_1.db.any('select * from image inner join traffic on image.traffic_id=traffic.id inner join cameras on image.cameras_id=cameras.id and image.id = $1', req.params.id)
            .then(data => {
            if (!data.length) {
                res.status(this.nfStatus).json({ error: this.nfMessage });
                return;
            }
            res.status(okStatus).json(JSON.stringify(data));
            console.log('DATA:', data); // print data;
        })
            .catch(error => {
            res.status(this.dbStatus).json({ error: this.dbMessage });
        });
    }
    getObjectsCount() {
        database_1.db.any('select count(id) from image')
            .then(data => {
            let dataString = JSON.stringify(data);
            let dataJson = JSON.parse(dataString);
            console.log(dataJson[0].count);
            this.count = Number(dataJson[0].count);
        })
            .catch(error => {
        });
    }
    deleteObjectById(req, res) {
        let delStatus = appResponse_1.APP_RESPONSES.development.deleted.httpCode;
        let delMessage = appResponse_1.APP_RESPONSES.development.deleted.body.message;
        database_1.db.query('delete from traffic where id = $1', req.params.id)
            .then(data => {
            res.status(delStatus).json({ message: delMessage });
        })
            .catch(error => {
            res.status(this.dbStatus).json({ error: this.dbMessage });
        });
    }
    editObjectById(req, res) {
        let editStatus = appResponse_1.APP_RESPONSES.development.edited.httpCode;
        let editMessage = appResponse_1.APP_RESPONSES.development.edited.body.message;
        database_1.db.query("update  traffic set  type= $2, first_detected_date= timestamp $3 where id = $1", [req.params.id, req.body.type, req.body.first_detected_date])
            .then(data => {
            res.status(editStatus).json({ message: editMessage });
        })
            .catch(error => {
            res.status(this.dbStatus).json({ error: this.dbMessage });
        });
    }
    mergeObjects(req, res) {
        let mergeStatus = appResponse_1.APP_RESPONSES.development.merged.httpCode;
        let mergeMessage = appResponse_1.APP_RESPONSES.development.merged.body.message;
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
        database_1.db.query(query)
            .then(data => {
            database_1.db.query(delQuery)
                .then(data => {
                res.status(mergeStatus).json({ message: mergeMessage });
            })
                .catch(error => {
                res.status(this.dbStatus).json({ error: this.dbMessage });
            });
        })
            .catch(error => {
            res.status(this.dbStatus).json({ error: this.dbMessage });
        });
    }
}
exports.dtObjects = dtObjects;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/models/dtobject.js.map