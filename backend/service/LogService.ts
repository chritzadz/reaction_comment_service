import { Log } from "../model/LogObject";
import { Post } from "../model/PostObject";
import { LogRepository } from "../repository/LogRepository";

export class LogService {
    private logRepository: LogRepository;

    constructor() {
        this.logRepository = new LogRepository();
    }

    async getAllReactionLog(): Promise<Log[]> {
        try {
            const logs = await this.logRepository.getAllReactionLog();
            return logs
        } catch (error) {
            throw new Error("PostService -> " + error);
        }
    }    
}