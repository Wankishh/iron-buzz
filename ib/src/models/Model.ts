import {createConnection} from 'mysql';

export class Model {
    protected conn: any = null;

    private config: any = {
        host: 'localhost',
        database: 'ib',
        user: 'sa',
        password: 'sa'
    };

    constructor() {
        this.conn = createConnection(this.config);
        this.conn.connect((err: any) => {
            if (err) throw err;
            console.log(`Connection is made in IB Service`);
        });
    }
}