import { useState } from "react";
import heartIcon from '../assets/heart.png';
import chatBubble from '../assets/chat-bubble.png';
import { X, Check } from "lucide-react";

interface PostEditBoxProps {
    username: string;
    content: string;
    created_at: string;
    onCancel: () => void;
    onSubmitChange: (newContent: string) => void;
}

export function PostEditBox({ username, content, created_at, onCancel, onSubmitChange }: PostEditBoxProps) {
    const handleChangeClick = () => {
        onSubmitChange(editedContent);
    }

    const handleCancelClick = () => {
        onCancel();
    }

    const [editedContent, setEditedContent] = useState(content);
    const firstLetter: String = username[0].toUpperCase();

    return (
        <div className="w-full p-10 flex flex-col gap-3" onMouseEnter={() => {}} onMouseLeave={() => {}}>
            <div className="flex flex-row gap-3 w-full items-center">
                <div className="flex flex-row gap-3 w-1/2 items-center"> {/* photo and username, just use letter for now */}
                    <div className="p-3 h-12 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                        <div className="text-2xl font-bold">{firstLetter}</div>
                    </div>
                    <p className="text-white text-xl justify-start">{username}</p>
                </div>
                <div className="w-1/2 flex flex-row justify-end gap-5">
                    <div className="w-1/12">
                        <Check size="full" color="green" onClick={handleChangeClick}/>
                    </div>
                    <div className="w-1/12">
                        <X size="full" color="red" onClick={handleCancelClick}/>
                    </div>                          
                </div>
            </div>
            <div className="w-full flex flex-col gap-3"> {/* post section */}
                <textarea className="w-full text-white rounded-md text-lg bg-gray-800 p-3" 
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}>
                </textarea>
                <div className="flex w-full text-md text-white"> {/* date */}
                    <p>{created_at}</p>
                </div>
            </div>
            <div className="w-full"> {/* comments and like icon and the count as well */}
                <hr className="w-full border-white" />
                <div className="w-full items-center justify-center flex flex-row p-2 gap-10">
                    <div className="h-10 aspect-square rounded-lg border-2 p-1 bg-slate-500" onClick={() => {}}>
                        <img src={chatBubble} className=""></img>
                    </div>
                    <div className="h-10 aspect-square rounded-lg border-2 p-1 bg-slate-500" onClick={() => {}}>
                        <img src={heartIcon} className=""></img>
                    </div>
                </div>
                <hr className="w-full border-white" />
            </div>
        </div>
    )
}