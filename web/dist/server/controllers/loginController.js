"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("./../models/login");
class LoginController {
    constructor() {
    }
    login(req, res, next) {
        login_1.login.login(req, res);
    }
    isLogin(req, res, next) {
        login_1.login.isLogin(req, res, next);
    }
}
let loginController = new LoginController();
exports.loginController = loginController;
//# sourceMappingURL=/home/abul/Desktop/PROJECT1/intrusion_detector/web/dist/server/controllers/loginController.js.map