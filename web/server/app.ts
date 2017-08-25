import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppRouter } from "./routes/appRoutes";
import { RestrictedRouter } from "./routes/restrictedRoutes";
let cookieParser = require('cookie-parser');
import * as compression from "compression";
import { Request, Response, NextFunction } from 'express';

class App {

    // ref to Express instance
    public express: express.Application;
    public appRouter: AppRouter;
    public restrictedRoutes: RestrictedRouter;
    
    //Run configuration methods on the Express instance.
    constructor() {
        //create new token when app started
        this.appRouter = new AppRouter();
        this.restrictedRoutes = new RestrictedRouter();
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(cookieParser('signed-with-secret-key'));
        this.express.use(compression());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        this.accessControll();
        this.express.use('/', this.appRouter.getRouter());
        this.express.use('/restricted', this.restrictedRoutes.getRouter())
    }

    private  accessControll() {
        this.express.use(function (req, res, next) {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Cookies');
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            // Pass to next layer of middleware
            const orderID = req.query.orderid

            next();
        });
    }

}

const  app = new App().express;
export { app };
