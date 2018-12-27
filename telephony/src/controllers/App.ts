import * as express from "express";
import { TelephonyRoutes } from '../routes/telephony'
import * as bodyParser from "body-parser";

class App {

    public app: express.Application;
    public telRoutes: TelephonyRoutes = new TelephonyRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.telRoutes.routes(this.app);
    }

    private config() {
        this.app.use(bodyParser.json());
    }
}

export default new App().app;