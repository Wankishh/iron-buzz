import { Model } from './Model';
import { QueryError, RowDataPacket, OkPacket} from 'mysql';
import {InserCallsInterface } from '../interfaces/insert-calls.interface'

export class Calls extends Model {

    private table: string = 'calls';
    constructor() {
        super();
    }

    public select(query: any, callback: any) {
        this.conn.query(query, (err: QueryError, rows: RowDataPacket[]) => {
            if (err) throw err;
            return callback(null, rows);
        });
    }

    public insert(data: InserCallsInterface, callback: any) {
        let query = `INSERT INTO ${this.table} SET ?`;
        this.conn.query(query, data, (err: QueryError, result: OkPacket) => {
            if (err) throw err;
            return callback(null, result);
        });
    }
}