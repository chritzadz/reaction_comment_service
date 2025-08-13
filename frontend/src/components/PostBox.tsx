import { useEffect, useState } from "react";
import type { ReplyObject } from '../model/ReplyObject'
import { ReplyBox } from './ReplyBox'
import { ReplyInputBox } from "./ReplyInputBox";
import { PostEditBox } from "./PostEditBox";
import { Pencil, Trash, Heart, MessageCircle, Share } from "lucide-react";


interface PostBoxProps {
    id: string;
    username: string;
    content: string;
    created_at: string;
    curr_user: string;
    onDelete: (id: string) => void;
}

class Reply implements ReplyObject{
    id: string;
    username: string;
    content: string;
    
    constructor(id: string, username: string, content: string){
        this.id = id;
        this.username = username;
        this.content = content;
    }
}

export function PostBox({ id, username, content, created_at, curr_user, onDelete }: PostBoxProps) {
    const handleReplyClick = () => {
        setOpenReply(!openReply)
    }

    const handleDeleteClick = () => {
        onDelete(id);
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }

    const handleCancelClick = () => {
        setIsEditing(!isEditing);
    }

    const handleHover = () => {
        setIsHovering(!isHovering);
    }

    const handleReplySubmit = async (content: string) => {
        const response = await fetch(`/api/replies/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( new Reply("", username, content) ),
        });

        const data = await response.json();
        setReplies(data);
    }

    const handleChangeClick = async (newContent: string) => {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newContent
            }  
            ),
        });

        const data = await response.json();
        setContentValue(data.content)
        setIsEditing(!isEditing);
    }


    useEffect(() => { 
        const fetchReplies = async () => {
            const response = await fetch(`/api/replies/${id}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
            });
        
            const data = await response.json();
            setReplies(data);
        };
        fetchReplies();
    }, []);

    const [openReply, setOpenReply] = useState(false);
    const [replies, setReplies] = useState<ReplyObject[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [contentValue, setContentValue] = useState(content);
    const allowEditing = username == curr_user;
    const firstLetter: String = username[0].toUpperCase();

    return (
        <>
            { !isEditing && 
                <div className="w-full p-10 flex flex-col gap-3" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                    <div className="flex flex-row gap-3 w-full items-center">
                        <div className="flex flex-row gap-3 w-1/2 items-center"> {/* photo and username, just use letter for now */}
                            <div className="p-3 h-12 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                                <div className="text-2xl font-bold">{firstLetter}</div>
                            </div>
                            <p className="text-white text-xl justify-start">{username}</p>
                        </div>
                        {isHovering && allowEditing &&
                            <div className="w-1/2 flex flex-row justify-end gap-5">
                                <div className="w-1/12">
                                    <Trash size="full" color="red" onClick={handleDeleteClick}/>
                                </div>
                                <div className="w-1/12">
                                    <Pencil size="full" color="white"onClick={handleEditClick}/>
                                </div>                          
                            </div>
                        }
                    </div>
                    <div className="w-full flex flex-col gap-3"> {/* post section */}
                        <p className="w-full text-white rounded-md text-lg">{contentValue}</p>
                        <div className="flex w-full text-md text-white"> {/* date */}
                            <p>{created_at}</p>
                        </div>
                    </div>
                    <div className="w-full"> {/* comments and like icon and the count as well */}
                        <hr className="w-full border-white" />
                        <div className="w-full items-center justify-center flex flex-row p-2 gap-10">
                            <div className="h-10 aspect-square rounded-lg p-1 bg-gray-900" onClick={handleReplyClick}>
                                <MessageCircle size="full" color="white" />
                            </div>
                            <div className="h-10 aspect-square rounded-lg p-1 bg-gray-900" onClick={() => {}}>
                                <Heart size="full" color="white" />
                            </div>
                            <div className="h-10 aspect-square rounded-lg p-1 bg-gray-900" onClick={() => {}}>
                                <Share size="full" color="white" />
                            </div>
                        </div>
                        <hr className="w-full border-white" />
                    </div>
                    {openReply && 
                        <div className="w-full flex flex-col gap-3"> {/* replies section */}
                            <div>
                                <ReplyInputBox handleReplySubmit={handleReplySubmit} />
                                <hr className="w-full bg-white border-1 mt-2"></hr>
                            </div>
                            {replies.map((reply: ReplyObject) => (
                                <div key={reply.id}>
                                    <ReplyBox id={reply.id} username={reply.username} content={reply.content} curr_user={curr_user} />
                                    <hr className="w-full bg-white border-1 mt-2 mb-2"></hr>
                                </div>
                            ))}
                        </div>
                    }
                </div>   
            }
            { isEditing && 
                <PostEditBox username={username} content={content} created_at={created_at} onCancel={handleCancelClick} onSubmitChange={handleChangeClick} ></PostEditBox>
            }
        </>
    )
}