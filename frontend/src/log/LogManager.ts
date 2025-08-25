import type { Log } from "../model/LogObject";

export interface LogManager{
    type: string
    show(): Log[];
    update(): void;
}