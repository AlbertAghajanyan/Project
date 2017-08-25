"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../token");
const database_1 = require("./../models/database");
const moment = require("moment");
const uuidv5 = require("uuid/v5");
class Login {
    constructor() {
    }
    ;
    login(req, res) {
        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        const hashedPass = uuidv5(req.body.password, MY_NAMESPACE);
        // 3ca6ada1-90f3-54a6-85f0-0696a9974fc0 - pass in db
        database_1.db.any('select id from users where users.email = $1 and users.password = $2', [req.body.userName, hashedPass])
            .then(userID => {
            let createdToken = token_1.token.createToken(userID[0].id); // create token with id
            console.log(createdToken);
            console.log(userID[0]);
            res.cookie('access_token', createdToken).status(200).json({
                success: true,
                status: "User authenticated...",
                token: "token created"
            });
        })
            .catch(err => {
            res.status(401).json({
                success: false,
                status: "User NOT authenticated..."
            });
        });
    }
    isLogin(req, res, next) {
        let reqToken = req.cookies['access_token'];
        if (!reqToken) {
            return res.json({
                success: false,
                message: 'No authentication token was provided in the request'
            });
        }
        else {
            token_1.token.verifyToken(reqToken, function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        status: 'The access token used in the request is incorrect'
                    });
                }
                else {
                    const now = moment().unix();
                    req.cookies['decodedToken'] = decoded;
                    if (now > decoded.exp) {
                        return res.status(401).json({
                            success: false,
                            status: 'The access token used in the request has expired'
                        });
                    }
                    else {
                        Login.isUserExistOnDB(decoded.id)
                            .then(data => {
                            next();
                        })
                            .catch(err => {
                            return res.status(401).json({
                                success: false,
                                status: 'Incorect token'
                            });
                        });
                    }
                }
            });
        }
    }
    static isUserExistOnDB(id) {
        return database_1.db.any('select * from users where users.id = $1', [id]);
    }
}
exports.login = new Login();
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/models/login.js.map