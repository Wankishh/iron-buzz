import { Model } from './Model';
import { QueryError, RowDataPacket, OkPacket} from 'mysql';


export class CallRates extends Model {
    constructor() {
        super();
    }

    public select(query: string, callback: any): any {
        this.conn.query(query, (err: QueryError, rows: RowDataPacket[]) => {
            return callback(err, rows);
        });
    }
}
