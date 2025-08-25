import { WebSocketServer } from 'ws';
import { logObservable } from '../observer/LogObserver'

export function startWebSocket() {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on('connection', (ws) => {
      const observer = () => {
        ws.send(JSON.stringify({ type: 'log_update'}));
        console.log("SENT WEBSOCKET AN UPDATE");
      };
      logObservable.subscribe(observer);

      ws.on('close', () => {
        logObservable.unsubscribe(observer);
      });
    });
}
