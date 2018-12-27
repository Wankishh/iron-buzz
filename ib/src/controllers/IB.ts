import {Request, Response} from 'express';
import { Calls } from '../models/Calls';
const Joi = require("joi");

export class IB {

    public getAll(req: Request, res: Response) {
        let model = new Calls();
        const sql = 'SELECT * FROM calls';
        model.select(sql, (err:any, rows:any) => {
            if (err) return res.json({err: err});
            return res.status(200).json(rows);
        });
    }

    public consume(req: Request, res: Response): Response | [] {
        const schema = Joi.object().keys({
            call_id: Joi.number().positive().required(),
            price: Joi.number().positive().precision(3).required(),
            duration: Joi.number().positive().required()
        });

        const {error, value} = Joi.validate(req.body, schema);
        
        if(error) return res.status(422).json({msg: error.details[0].message});
        this.insertNewCall(value, (err: any, status: any) => {
            if (err) return res.status(400).json(err);
            return res.json(status.insertId);
        });
        
    }
    
    private insertNewCall(data: any, callback: any) {
        let model = new Calls();
        model.insert(data, (err:any , status:any) => {
            return callback(err, status);
        });
    }
}