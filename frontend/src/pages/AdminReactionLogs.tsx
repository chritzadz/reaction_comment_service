import { LogBox } from "../components/LogBox";
import type { LogManager } from "../log/LogManager";

function AdminReactionLogs() {
    const manager: LogManager = {type: "reaction"};

    return(
        <div className="w-full flex flex-col items-center bg-amber-200">
            <LogBox name={"reaction logs"} manager={manager}></LogBox>
        </div>
    )
}

export default AdminReactionLogs;
