import { Request, Response } from 'express';
import { LogService } from '../service/LogService';

export class LogController {
    private logService: LogService;

    constructor() {
        this.logService = new LogService();
    }

    public async getReactionLogs(req: Request, res: Response): Promise<void> {
        const logs = await this.logService.getAllReactionLog();
        console.log(logs);
        res.json(logs);
    }
}

