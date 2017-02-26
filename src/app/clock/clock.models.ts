export interface ClockValue {
    state: ClockState;
    hours: number;
    minutes: number;
}

export enum ClockState {
    hours,
    minutes
}
