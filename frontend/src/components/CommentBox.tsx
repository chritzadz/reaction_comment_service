import { useState } from "react";
import heartIcon from '../assets/heart.png';
import chatBubble from '../assets/chat-bubble.png';

interface CommentBoxProps {
    id: string;
    username: string;
    content: string;
    created_at: string;
}

export function CommentBox({ id, username, content, created_at }: CommentBoxProps) {
    const firstLetter: String = username[0].toUpperCase();

    return (
        <div className="items-center w-full p-10 flex flex-col gap-3">
            <div className="flex flex-row gap-3 w-full items-center"> {/* photo and username, just use letter for now */}
                <div className="p-3 h-12 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                    <div className="text-2xl font-bold">{firstLetter}</div>
                </div>
                <p className="text-white text-xl justify-start">{username}</p>
            </div>
            <div className="w-full flex flex-col gap-3"> {/* comment section */}
                <p className="w-full text-white rounded-md text-lg">{content}</p>
                <div className="flex w-full text-md text-white"> {/* date */}
                    <p>{created_at}</p>
                </div>
            </div>
            <div className="w-full"> {/* comments and like icon and the count as well */}
                <hr className="w-full border-white" />
                <div className="w-full items-center justify-center flex flex-row p-2 gap-10">
                    <div className="h-10 aspect-square rounded-lg border-2 p-1 bg-slate-500">
                        <img src={chatBubble} className=""></img>
                    </div>
                    <div className="h-10 aspect-square rounded-lg border-2 p-1 bg-slate-500">
                        <img src={heartIcon} className=""></img>
                    </div>
                </div>
                <hr className="w-full border-white" />
            </div>
        </div>
    )
}