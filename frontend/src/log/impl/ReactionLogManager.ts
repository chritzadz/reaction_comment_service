import type { LogManager } from "../LogManager";

export default class ReactionLogManager implements LogManager{
    type: string;
    

    constructor(type: string){
        this.type = type;
    }

    show(): string[] {
        return [
            "username1 reacted [emoji] to reply 1",
            "username1 reacted [emoji] to reply 1"
        ]
    }
}