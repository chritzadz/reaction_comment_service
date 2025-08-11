import { useEffect, useState } from "react";

interface ReplyInputBoxProps {
    handleReplySubmit: (content: string) => void;
}

export function ReplyInputBox({ handleReplySubmit }: ReplyInputBoxProps) {
    const [replyContent, setReplyContent] = useState("");

    return(
        <div className="w-full flex flex-row w-full gap-2 ml-10 pr-10">
            <input className="w-full bg-gray-800 p-1 rounded-lg border-2 border-white text-black text-base" placeholder="Type your reply..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button className="bg-gray-800 rounded-2xl border-2 border-white hover:bg-white hover:text-black text-white py-2 px-3 rounded " onClick={() => handleReplySubmit(replyContent)}>Reply</button>
        </div>
    )
}