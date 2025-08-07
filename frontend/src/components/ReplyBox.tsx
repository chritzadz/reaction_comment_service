import { useEffect, useState } from "react";

interface ReplyBoxProps {
    id: string;
    username: string;
    content: string;
}

export function ReplyBox({ id, username, content}: ReplyBoxProps) {
    const firstLetter: String = username[0].toUpperCase();
    const [reactionCount, setReactionCount] = useState<number[]>([0, 0, 0, 0, 0]); //{}
    const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
    const [mouseOn, setMouseOn] = useState(false)

    const handleHover = () => {
        setMouseOn(!mouseOn);
    }

    const handleAddReaction = async (type: string, reply_id: string, username: string) => {
        const response = await fetch('/api/post_reaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                type,
                reply_id
            }),
        });

        const data = await response.json();
        if (data.status === 'OK') {
            setReactionCount(JSON.parse(data.data));
        }
    }

    const handleDeleteReaction = async (reply_id: string, username: string) => {
        const response = await fetch('/api/delete_reaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                reply_id
            }),
        });

        const data = await response.json();
        if (data.status === 'OK') {
            setReactionCount(JSON.parse(data.data));
        }
    }

    const handleAlterReaction = async (type: string, reply_id: string, username: string) => {
        const response = await fetch('/api/alter_reaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                type,
                reply_id
            }),
        });

        const data = await response.json();
        if (data.status === 'OK') {
            setReactionCount(JSON.parse(data.data));
        }
    }

    const onReactionClick = (type: string) => {
        if (selectedReaction === type) {
            handleDeleteReaction(id, username);
            setSelectedReaction(null);
            return;
        } 
        else if (selectedReaction !== type && selectedReaction !== null) {
            handleAlterReaction(type, id, username);
            setSelectedReaction(type);
        }
        else if (selectedReaction === null) {
            handleAddReaction(type, id, username);
            setSelectedReaction(type);
        }
    }

    useEffect(() => {
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
    
        const fetchUserReaction = async () => {
            const response = await fetch('/api/get_state_reply_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reply_id: id,
                    username
                }),
            });

            const data = await response.json();
            setSelectedReaction(JSON.parse(data.data));
        };

        fetchReactions();
        fetchUserReaction();
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
                    <div className="w-full w-1/2 h-10 mr-10 flex flex-row gap-5 text-white justify-end pl-2 pr-5">
                        {
                            selectedReaction === "like" ? (
                                <span className="font-bold">
                                    {reactionCount[0]}<span onClick={() => {onReactionClick("like")}}>👍</span>
                                </span>
                            ) : (
                                <span>
                                    {reactionCount[0]}<span onClick={() => {onReactionClick("like")}}>👍</span>
                                </span>
                            )
                        }

                        {
                            selectedReaction === "love" ? (
                                <span className="font-bold">
                                    {reactionCount[1]}<span onClick={() => {onReactionClick("love")}}>❤️</span>
                                </span>
                            ) : (
                                <span>
                                    {reactionCount[1]}<span onClick={() => {onReactionClick("love")}}>❤️</span>
                                </span>
                            )
                        }

                        {
                            selectedReaction === "haha" ? (
                                <span className="font-bold">
                                    {reactionCount[2]}<span onClick={() => {onReactionClick("haha")}}>😂</span>
                                </span>
                            ) : (
                                <span>
                                    {reactionCount[2]}<span onClick={() => {onReactionClick("haha")}}>😂</span>
                                </span>
                            )
                        }

                        {
                            selectedReaction === "sad" ? (
                                <span className="font-bold">
                                    {reactionCount[3]}<span onClick={() => {onReactionClick("sad")}}>🙁</span>
                                </span>
                            ) : (
                                <span>
                                    {reactionCount[3]}<span onClick={() => {onReactionClick("sad")}}>🙁</span>
                                </span>
                            )
                        }

                        {
                            selectedReaction === "angry" ? (
                                <span className="font-bold">
                                    {reactionCount[4]}<span onClick={() => {onReactionClick("angry")}}>😡</span>
                                </span>
                            ) : (
                                <span>
                                    {reactionCount[4]}<span onClick={() => {onReactionClick("angry")}}>😡</span>
                                </span>
                            )
                        }
                    </div>
                }
            </div>
            <div>
                <p className="text-white">{content}</p>
            </div>
        </div>
    )
}