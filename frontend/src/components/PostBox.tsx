import { useEffect, useState } from "react";
import heartIcon from '../assets/heart.png';
import chatBubble from '../assets/chat-bubble.png';
import type { ReplyObject } from '../model/ReplyObject'
import { ReplyBox } from './ReplyBox'
import { ReplyInputBox } from "./ReplyInputBox";

interface PostBoxProps {
    id: string;
    username: string;
    content: string;
    created_at: string;
    curr_user: string;
    onDelete: (id: string) => void;
    onReplyClick: () => void;
}

export function PostBox({ id, username, content, created_at, curr_user, onDelete, onReplyClick }: PostBoxProps) {
    const handleReplyClick = () => {
        setOpenReply(!openReply)
    }

    const handleDeleteClick = () => {
        onDelete(id);
    }

    const handleReplySubmit = async (content: string) => {
        const response = await fetch('/api/post_reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: id,
                username: curr_user,
                content
            }),
        });

        const data = await response.json();

        if (data.status === 'OK') {
            let tempArray: ReplyObject[] = []  
            JSON.parse(data.data).map((reply: ReplyObject) => {
                tempArray.push(reply);
            });

            setReplies(tempArray);
        }
    }


    useEffect(() => { 
        const fetchReplies = async () => {
            const response = await fetch('/api/get_replies', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    post_id: id
                }),
            });
        
            const data = await response.json();
            
            let tempArray: ReplyObject[] = []
          
            JSON.parse(data.data).map((reply: ReplyObject) => {
                tempArray.push(reply);
            });
            setReplies(tempArray);
        };
    
        fetchReplies();
    }, []);

    const handleHover = () => {
        setIsHovering(!isHovering);
    }

    const [openReply, setOpenReply] = useState(false);
    const [replies, setReplies] = useState<ReplyObject[]>([]);
    const [isHovering, setIsHovering] = useState(false);

    const firstLetter: String = username[0].toUpperCase();

    return (
        <div className="w-full p-10 flex flex-col gap-3" onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <div className="flex flex-row gap-3 w-full items-center">
                <div className="flex flex-row gap-3 w-1/2 items-center"> {/* photo and username, just use letter for now */}
                    <div className="p-3 h-12 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                        <div className="text-2xl font-bold">{firstLetter}</div>
                    </div>
                    <p className="text-white text-xl justify-start">{username}</p>
                </div>
                {isHovering && (username === curr_user) &&
                    <div className="w-1/2 flex justify-end">
                        <button className="text-white border-2 border-white rounded-lg p-2 hover:bg-white hover:text-black" onClick={handleDeleteClick}>
                            Delete
                        </button>
                    </div>
                }
            </div>
            <div className="w-full flex flex-col gap-3"> {/* post section */}
                <p className="w-full text-white rounded-md text-lg">{content}</p>
                <div className="flex w-full text-md text-white"> {/* date */}
                    <p>{created_at}</p>
                </div>
            </div>
            <div className="w-full"> {/* comments and like icon and the count as well */}
                <hr className="w-full border-white" />
                <div className="w-full items-center justify-center flex flex-row p-2 gap-10">
                    <div className="h-10 aspect-square rounded-lg border-2 p-1 bg-slate-500" onClick={handleReplyClick}>
                        <img src={chatBubble} className=""></img>
                    </div>
                    <div className="h-10 aspect-square rounded-lg border-2 p-1 bg-slate-500" onClick={() => {}}>
                        <img src={heartIcon} className=""></img>
                    </div>
                </div>
                <hr className="w-full border-white" />
            </div>
            {openReply && 
                <div className="w-full flex flex-col gap-3"> {/* replies section */}
                    <ReplyInputBox handleReplySubmit={handleReplySubmit} />
                    {replies.map((reply: ReplyObject) => (
                        <div>
                            <ReplyBox key={reply.id} id={reply.id} username={reply.username} content={reply.content} />
                            <hr className="w-full bg-white border-1 mt-2 mb-2"></hr>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}