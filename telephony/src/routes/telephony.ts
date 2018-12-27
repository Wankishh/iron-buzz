import { Telephony } from '../controllers/Telephony';

export class TelephonyRoutes {
    public controller: Telephony;

    public routes(app: any): void { 
        this.controller = new Telephony();
        app.post('/start', this.controller.start.bind(this.controller));
        app.post('/stop', this.controller.stop.bind(this.controller));
        app.post('/pause', this.controller.pause.bind(this.controller));
        app.post('/resume', this.controller.resume.bind(this.controller));
    }
}