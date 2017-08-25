"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const jToken = require("jsonwebtoken");
const moment = require("moment");
class Token {
    constructor() {
        this._secretKey = uuid.v4();
        //write to file secret key
        /*fs.writeFile("./server/secretKey", this._secretKey, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The secret key was saved on file!");
        }); */
    }
    createToken(id) {
        let claims = {
            sub: id,
            exp: moment().add(14, 'days').unix(),
            iat: moment().unix(),
            iss: 'https://intrusionDetector.am'
        };
        return jToken.sign(claims, this._secretKey);
    }
    verifyToken(token, callback) {
        return jToken.verify(token, this._secretKey, callback);
    }
}
let token = new Token();
exports.token = token;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/token.js.map