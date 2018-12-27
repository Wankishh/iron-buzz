export enum states {
    START = 'start',
    PAUSED = 'pause',
    STOP = 'stop'
}

export enum Errors {

}

export interface Process {
    state: states.START | states.STOP | states.PAUSED,
    call_id: number,
    duration: number
}