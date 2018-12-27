import { Request, Response, NextFunction } from 'express';
import { Process, states } from '../types/types';

import * as request from 'request';
import { CallRates } from '../models/CallRates'
import { IBConfig } from '../config/IBConfig';

const Joi = require("joi");

export class Telephony {

    protected process: Process = {
        state: states.STOP,
        call_id: 0,
        duration: 0
    }

    public start(req: Request, res: Response, next: NextFunction): Response | [] {
        const { error, value } = this.validateStart(req.body);
        if (error) return res.status(422).send({ err: error.details[0].message });
        
        this.process.state = states.START;
        this.process.call_id = new Date().getSeconds() + new Date().getMilliseconds();
        this.process.duration = Math.floor((Math.random() * 1000));        

        this.calcRateAndSendRequest((err: any, response: any) => {
            if (err) return res.json({err: "Server error"});
            
            let result = {
                status: response.affectedRows ? "success" : "failure",
            };

            return res.json({ data: result });
        });        
    }

    public stop(req: Request, res: Response): Response {
        if (this.process.state === states.START || this.process.state === states.PAUSED) {
            this.process.state = states.STOP;

            return res.json({ data: {msg: "process has beed stopped"} });
        }
        return res.status(400).json({ err: 'The process is already stopped' });
    }

    public pause(req: Request, res: Response): Response {

        if (this.process.state == states.STOP) {
            return res.json({ err: 'There is not active proccess to pause' });
        }

        this.process.state = states.PAUSED;

        return res.json({
            data: {
                msg: 'Process has been paused'
            }
        });
    }

    public resume(req: Request, res: Response): Response {
        if (this.process.state === states.PAUSED) {
            this.process.state = states.START;
            return res.json({
                msg: 'The process has been resumed'
            });
        }
        return res.status(400).json({ err: 'The process cant be resumed, cuz its stopped or is already started' });
    }

    private validateStart(startObject: object) {
        const schema = Joi.object().keys({
            url: Joi.string().uri().required()
        });

        return Joi.validate(startObject, schema);
    }

    private calcRateAndSendRequest(callback: any) {
        let model = new CallRates();
        let duration = this.process.duration;

        const sql = `SELECT rate FROM call_rates WHERE duration_from <= ${duration} AND duration_to >= ${duration} LIMIT 1;`;
        model.select(sql, (err: any, rows: any) => {
            let price = duration * rows[0].rate;

            this.insertTheFinishedData({
                call_id: this.process.call_id,
                price: price, 
                duration: this.process.duration
            }, (error: any, response: any) => {
                return callback(error, response);
            });
        });
    }

    /** this method is called after the process is stopped */
    private insertTheFinishedData(data: any, callback: any) {
        request({
            url: `${IBConfig.host + IBConfig.consume}`,
            method: "POST",
            json: true,
            body: data
        }, (error, response, body) => {
            return callback(error, body);
        });
    }
}