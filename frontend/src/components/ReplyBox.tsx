import { useEffect, useState } from "react";
import type { ReactionObject } from "../model/ReactionObject";

interface ReplyBoxProps {
    id: string;
    username: string;
    content: string;
    curr_user: string;
}

class Reaction implements ReactionObject{
    reply_id: string;
    type: string;
    username: string;
    
    constructor(reply_id: string, type: string, username: string){
        this.reply_id = reply_id;
        this.type = type;
        this.username =username;
    }
}

export function ReplyBox({ id, username, content, curr_user}: ReplyBoxProps) {
    const firstLetter: String = username[0].toUpperCase();
    const [reactionCount, setReactionCount] = useState<number[]>([0, 0, 0, 0, 0]);
    const [selectedReaction, setSelectedReaction] = useState<string>(""); // "" is null
    const [mouseOn, setMouseOn] = useState(false)

    const handleHover = () => {
        setMouseOn(!mouseOn);
    }

    const handleAddReaction = async (type: string) => {
        const response = await fetch('/api/reactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new Reaction(id, type, curr_user)),
        });

        const data = await response.json();
        console.log(data)
        setReactionCount(data);
    }

    const handleDeleteReaction = async () => {
        const response = await fetch(`/api/reactions/${id}/${curr_user}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();
        setReactionCount(data);
    }

    const handleAlterReaction = async (type: string) => {
        const response = await fetch(`/api/reactions/${id}/${curr_user}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type
            }),
        });

        const data = await response.json();
        setReactionCount(data);
    }

    const onReactionClick = (type: string) => {
        if (selectedReaction === type) {
            handleDeleteReaction();
            setSelectedReaction("");
            return;
        } 
        else if (selectedReaction !== type && selectedReaction !== "") {
            handleAlterReaction(type);
            setSelectedReaction(type);
        }
        else if (selectedReaction === "") {
            handleAddReaction(type);
            setSelectedReaction(type);
        }
    }

    useEffect(() => {
        const fetchReactions = async () => {
            const response = await fetch(`/api/reactions/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            const data = await response.json();
            setReactionCount(data);
        };
    
        const fetchUserReaction = async () => {
            const response = await fetch(`/api/reactions/${id}/${curr_user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setSelectedReaction(data);
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