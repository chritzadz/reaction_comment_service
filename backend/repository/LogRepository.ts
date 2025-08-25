import { Client } from 'pg';
import pool from '../db/db';
import { Log } from '../model/LogObject';
import { logObservable } from '../observer/LogObserver';

const client = new Client({
    connectionString: "postgres://postgres@localhost:5432/rc_service"
})

client.connect();

client.query('LISTEN log_channel');

client.on('notification', (msg) => {
  if (msg.channel === 'log_channel') {
    console.log('Received notification');
    logObservable.notifyAll();
  }
});

export class LogRepository {
    async getAllReactionLog(): Promise<Log[]> {
        try {
            const task = await pool.query(
                `
                SELECT * FROM logs
                WHERE log_type = 'reaction'
                ORDER BY log_time ASC;
                `
            );
            return task.rows;
        } catch (error){
            throw new Error("LogRepository -> " + error);
        }
    }
}

