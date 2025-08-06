import { useEffect, useState } from "react";

interface ReplyBoxProps {
    id: string;
    username: string;
    content: string;
}

export function ReplyBox({ id, username, content}: ReplyBoxProps) {
    const firstLetter: String = username[0].toUpperCase();
    const [reactionCount, setReactionCount] = useState<number[]>([0, 0, 0, 0, 0]); //{}
    const [mouseOn, setMouseOn] = useState(false)

    const handleHover = () => {
        setMouseOn(!mouseOn);
    }
    useEffect(() => {
     
        console.log({id, username, content})
        const fetchReactions = async () => {
            const response = await fetch('/api/get_reactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    reply_id: id
                }),
            });
        
            const data = await response.json();
            console.log(JSON.parse(data.data))
            setReactionCount(JSON.parse(data.data));
        };
    
        fetchReactions();
    }, []);

    return (
        <div className="w-full flex flex-col w-full gap-2 ml-10" onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <div className="flex flex-row gap-3 w-full items-center">
                <div className="flex flex-row gap-3 w-1/2 items-center"> {/* photo and username, just use letter for now */}
                    <div className="p-3 h-10 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                        <div className="text-lg font-bold">{firstLetter}</div>
                    </div>
                    <p className="text-white text-xl justify-start">{username}</p>
                </div>
                { mouseOn &&
                    <div className="w-full w-1/2 h-10 mr-10 flex flex-row gap-5 text-white justify-end pl-2 pr-5 font-bold">
                        <span>{reactionCount[0]}👍</span>
                        <span>{reactionCount[1]}❤️</span>
                        <span>{reactionCount[2]}😂</span>
                        <span>{reactionCount[3]}🙁</span>
                        <span>{reactionCount[4]}🙂</span>
                    </div>
                }
                
            </div>
           
            <div>
                <p className="text-white">{content}</p>
            </div>
        </div>
    )
}