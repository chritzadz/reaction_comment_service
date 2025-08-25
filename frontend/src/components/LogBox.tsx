import { useEffect, useState } from "react";
import type { LogBoxProp } from "../model/LogBoxProp";
import type { Log } from "../model/LogObject";


export function LogBox({ name, manager }: LogBoxProp) {
    const [logs, setLogs] = useState<Log[]>(manager.show());

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080'); //for log communication
        ws.onopen = () => console.log('WebSocket connected');
        ws.onmessage = (event) => console.log('WebSocket message:', event.data);
        ws.onerror = (e) => console.error('WebSocket error', e);
        ws.onclose = () => console.log('WebSocket closed');
        
        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            console.log("EVENT DETECTED");
            if (data.type === 'log_update') { 
                console.log("UPDATE LOG");
                await manager.update();
                setLogs(manager.show());
            }
        }
    })

    useEffect(() => {
        const fetchLogs = async () => {
            await manager.update();
            setLogs(manager.show());
        };
        fetchLogs();
    }, []);

    return (
        <div className="w-full h-full">
            <div className="bg-gray-700 h-10 mx-5 mt-5 rounded-lg rounded-bl-none flex rounded-br-none items-center text-white px-2">
                <p>{name}</p>
            </div>
            <div className="bg-black h-screen mx-5 mb-5 rounded-lg rounded-tl-none rounded-tr-none flex flex-col overflow-y-auto">
                {
                    logs.map((log: Log) => (
                        <div className="w-full px-3 text-white ">
                            <p>{`[${log.log_time}] ${log.log_text}`}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}