import { useNavigate } from "react-router-dom";
import type { LogServiceProp } from "../model/LogServiceProp";

function Admin() {
    let navigate = useNavigate();
    const handleServiceClick = (path: string) => {
        navigate(`/admin${path}`);
    }

    const logServices: LogServiceProp[] = [
        {
            name: "reaction logs", 
            path: "/reactionLogs" 
        },
        {
            name: "post logs", 
            path: "/postLogs" 
        }
    ]

    return(
        <div className="h-screen w-full flex flex-col items-center bg-amber-200">
            <h2 className="p-5 w-full justify-center items-center">Admin Panel</h2>
            <div className="w-full">
                <div className="m-10 bg-amber-400 flex flex-wrap gap-3 rounded-lg">
                {
                    logServices.map((logService: LogServiceProp) => (
                        <div className="w-1/8 items-center justify-center border border-black rounded-lg p-3 m-2 bg-amber-500 hover:bg-amber-600" onClick={() => handleServiceClick(logService.path)}>
                            {logService.name}
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default Admin;
