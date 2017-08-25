"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const appResponse_1 = require("../appResponse");
class Cameras {
    constructor() {
        this.nfStatus = appResponse_1.APP_RESPONSES.development.not_found.httpCode;
        this.nfMessage = appResponse_1.APP_RESPONSES.development.not_found.body.message;
        this.dbStatus = appResponse_1.APP_RESPONSES.development.internal_error.httpCode;
        this.dbMessage = appResponse_1.APP_RESPONSES.development.internal_error.body.message;
    }
    getCameras(req, res) {
        database_1.db.query('SELECT * FROM cameras')
            .then(data => {
            if (!data.length) {
                res.status(this.nfStatus).json({ error: this.nfMessage });
                return;
            }
            res.send(JSON.stringify(data));
        })
            .catch(error => {
            res.status(this.dbStatus).json({ error: this.dbMessage });
        });
    }
    getCameraById(req, res) {
        let okStatus = appResponse_1.APP_RESPONSES.development.internal_error.httpCode;
        if (req.params.id < 0) {
            res.status(400).json({ message: 'Bad request.' });
        }
        else {
            database_1.db.query('SELECT * FROM cameras WHERE id=$1', req.params.id)
                .then(data => {
                if (!data.length) {
                    res.status(this.nfStatus).json({ error: this.nfMessage });
                    return;
                }
                res.status(okStatus).json(JSON.stringify(data));
            })
                .catch(error => {
                res.status(this.dbStatus).json({ error: this.dbMessage });
            });
        }
    }
    deleteCameraById(req, res) {
        let delStatus = appResponse_1.APP_RESPONSES.development.deleted.httpCode;
        let delMessage = appResponse_1.APP_RESPONSES.development.deleted.body.message;
        if (req.params.id < 0) {
            res.status(400).json({ message: 'Bad request.' });
        }
        else {
            database_1.db.query('DELETE FROM cameras WHERE id=$1', req.params.id)
                .then(data => {
                console.log(data);
                res.status(delStatus).json({ message: delMessage });
            })
                .catch(error => {
                res.status(this.dbStatus).json({ error: this.dbMessage });
            });
        }
    }
    updateCameraById(req, res) {
        let editStatus = appResponse_1.APP_RESPONSES.development.edited.httpCode;
        let editMessage = appResponse_1.APP_RESPONSES.development.edited.body.message;
        const obj = {
            id: req.params.id,
            name: req.body.cameraName,
            location: '(' + req.body.longitude + ',' + req.body.latitude + ')',
            online: req.body.online,
            description: req.body.description
        };
        //let query = "UPDATE cameras SET camera_name=" + obj.name + ", location='" + obj.location + ", online=" + obj.online + ", description=" + obj.description + " WHERE id=" + obj.id + ";";
        database_1.db.query('UPDATE cameras SET camera_name=${name}, location = ${location}, online=${online}, description = ${description} WHERE id = ${id};', obj)
            .then(data => {
            res.status(editStatus).json({ message: editMessage });
        })
            .catch(error => {
            res.status(this.dbStatus).json({ error: this.dbMessage });
        });
    }
    getCameraByNameOrLocation(req, res) {
        database_1.db.query('SELECT * FROM cameras WHERE camera_name=$1 or (location[0] between $2-10 and $2+10 and location[1] between $3-10 and $3+10)', [req.query.name, req.query.lat, req.query.long])
            .then(data => {
            if (!data.length) {
                res.status(404).json({ message: 'The requested resource was not found at the URL given.' });
                return;
            }
            res.send(JSON.stringify(data));
            console.log('DATA:', data);
        })
            .catch(error => {
            res.status(500).json({ message: 'An unknown internal error occurred' });
        });
    }
}
exports.Cameras = Cameras;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/models/cameras.js.map