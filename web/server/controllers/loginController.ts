import { Request, Response, NextFunction } from 'express';
import { login } from './../models/login'

class LoginController {

    constructor() {
    }
    
    public login(req: Request, res: Response, next: NextFunction) {
        login.login(req,res); 
    } 

    public isLogin(req: Request, res: Response, next: NextFunction) {
        login.isLogin(req, res, next);
    }
}

let loginController = new LoginController();

export { loginController };
