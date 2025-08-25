import type { LogBoxProp } from "../model/LogBoxProp";

export function LogBox({ name, manager }: LogBoxProp) {
    const logs: string[] = manager.show();

    return (
        <div className="w-full h-full">
            <div className="bg-gray-700 h-10 mx-5 mt-5 rounded-lg rounded-bl-none flex rounded-br-none items-center text-white px-2">
                <p>{name}</p>
            </div>
            <div className="bg-black h-screen mx-5 mb-5 rounded-lg rounded-tl-none rounded-tr-none flex flex-col overflow-y-auto">
                {
                    logs.map((log: string) => (
                        <div className="w-full px-3 text-white ">
                            <p>{log}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}