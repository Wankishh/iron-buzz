import { IB } from '../controllers/IB';

export class IBRoutes {
    public controller =  new IB();

    public routes(app: any): void { 
        app.post('/consume', this.controller.consume.bind(this.controller));
        app.get('', this.controller.getAll.bind(this.controller));
    }
}