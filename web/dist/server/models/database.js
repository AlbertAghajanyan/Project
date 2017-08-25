"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pgPromise = require("pg-promise");
const config_1 = require("../config");
class GetDataBase {
    constructor() {
        console.log("NODE: " + process.env.NODE_ENV);
        console.log("DB constructor called");
        this.initDevelopment();
    }
    initDevelopment() {
        const pgp = pgPromise({});
        if (process.env.NODE_ENV == 'development') {
            this.db = pgp(config_1.devProd.development.db);
        }
        else if (process.env.NODE_ENV == 'development') {
            this.db = pgp(config_1.devProd.production.db);
        }
    }
    getDBDevelopment() {
        return this.db;
    }
}
exports.GetDataBase = GetDataBase;
let database = new GetDataBase();
exports.db = database.getDBDevelopment();
/*
var fileName = 'server/models/config.json';
var jsonFile = require('jsonfile');
var fs=require('fs');
var data=fs.readFileSync('server/models/config.json');
var words=JSON.parse(data);
console.log(words);

jsonFile.readFile(fileName, function(err, jsonData) {
    if (err) {
        throw err;
    }
    development = jsonData.development;
    development.host = jsonData.development.host;
    development['port'] = jsonData.development.port;
    development['database'] = jsonData.development.database;
    development['user'] = jsonData.development.user;
    development['password'] = jsonData.development.password;
});
*/
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/models/database.js.map