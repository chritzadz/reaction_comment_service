import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";

interface ReplyInputBoxProps {
    handleReplySubmit: (content: string) => void;
}

export function ReplyInputBox({ handleReplySubmit }: ReplyInputBoxProps) {
    const onReplyClick = async () => {
        setIsLoading(true);
        setReplyContent("");
        await handleReplySubmit(replyContent);
        setIsLoading(false);
    }

    const [replyContent, setReplyContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return(
        <div className="w-full flex flex-row w-full gap-2 ml-10 pr-10">
            <input className="w-full bg-gray-800 p-1 rounded-lg border-2 border-white text-black text-base text-white" placeholder="Type your reply..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            {isLoading ? 
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
                : 
            <button className="bg-gray-800 rounded-2xl border-2 border-white hover:bg-white hover:text-black text-white py-2 px-3 rounded " onClick={onReplyClick}>Reply</button>
            }
        </div>
    )
}