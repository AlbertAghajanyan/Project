"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("./../models/object");
const insertObject_1 = require("./../models/insertObject");
const dtobject_1 = require("./../models/dtobject");
const validateObjectsRequest_1 = require("./validate/validateObjectsRequest");
let object = new dtobject_1.dtObjects();
let validate = new validateObjectsRequest_1.ValidateObjectRequest();
class ObjectControllers {
    constructor() { }
    getObjectList(req, res, next) {
        new object_1.Objects().getObjectList(req, res);
    }
    searchObject(req, res, next) {
        new object_1.Objects().searchObject(req, res);
    }
    insertObject(req, res, next) {
        new insertObject_1.NewObject().insertObject(req, res);
    }
    insertObjectImage(req, res, next) {
        new insertObject_1.NewObject().insertObjectImage(req, res);
    }
    uploadImages() {
        return new insertObject_1.NewObject().uploadImage();
    }
    getObjectById(req, res, next) {
        if (validate.checkGetObjectById(req, res, next)) {
            object.getObjectById(req, res);
        }
    }
    editObjectById(req, res, next) {
        if (validate.checkEditObjectById(req, res, next)) {
            object.editObjectById(req, res);
        }
    }
    deleteObjectById(req, res, next) {
        if (validate.checkDeleteObjectById(req, res, next)) {
            object.deleteObjectById(req, res);
        }
    }
    mergeObjects(req, res, next) {
        if (validate.checkMargeObjects(req, res, next)) {
            object.mergeObjects(req, res);
        }
    }
}
exports.ObjectControllers = ObjectControllers;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/controllers/objectController.js.map