import { useState } from "react";
import { useNavigate } from "react-router";

function SignIn() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    
    const handleClick = () => {
        username.trim()
        console.log("username", username);
        navigate(`/home/${username}`);
    }

    return(
        <div className="justify-center items-center flex flex-col w-screen min-h-screen bg-gray-900">
            <div className="w-1/3 max-lg:w-1/2 max-md:w-2/3 max-sm:w-full p-10">
                <div className="bg-gray-800 rounded-lg p-8 border-2 border-gray-700">
                    <h1 className="text-white text-4xl font-bold text-center mb-8">Sign In</h1>
                    <form className="flex flex-col gap-6">
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 border-2 border-white bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-blue-500 text-lg"
                        />
                        <button 
                            type="submit" 
                            onClick={handleClick}
                            className="w-full bg-gray-900 border-2 hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
