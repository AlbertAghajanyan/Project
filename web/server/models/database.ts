import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';
import { devProd } from "../config";

export class GetDataBase {
    private db:IDatabase<any>;

    constructor() {
        console.log("NODE: " + process.env.NODE_ENV);
        console.log("DB constructor called");
        this.initDevelopment();
    }

    initDevelopment() {
    const pgp:IMain = pgPromise ({ /* Initialization Options*/ });
        if (process.env.NODE_ENV == 'development') {
            this.db = pgp(devProd.development.db);
        } else if (process.env.NODE_ENV == 'development') {
            this.db = pgp(devProd.production.db);
        }
    }
    public getDBDevelopment() {
        return this.db;
    }
}

let database:any = new GetDataBase();
export let db = database.getDBDevelopment();





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

