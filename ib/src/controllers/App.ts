import * as express from "express";
import { IBRoutes } from '../routes/ib'
import * as bodyParser from "body-parser";
import * as cors from "cors";

class App {

    public app: express.Application;
    public telRoutes: IBRoutes = new IBRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.telRoutes.routes(this.app);
    }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }
}

export default new App().app;