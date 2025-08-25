import type { Log } from "../../model/LogObject";
import type { LogManager } from "../LogManager";

export default class ReactionLogManager implements LogManager{
    type: string;
    logs: Log[] = [];

    constructor(type: string){
        this.type = type;
    }

    show(): Log[] {
        return this.logs;
    }

    async update(): Promise<void> {
        //fetch from backend
        const response = await fetch('/api/logs/reaction', {
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
        })
        
        const data = await response.json();
        this.logs = data;
    }
}