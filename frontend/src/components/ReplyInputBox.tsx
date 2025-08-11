import { useEffect, useState } from "react";

export function ReplyInputBox() {
    const [replyContent, setReplyContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitReply = async () => {
        const response = await fetch('/api/get_posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
        setReplyContent("");
    }

    return(
        <div className="rounded w-full round-white">
            <p>Input your reply!</p>
            <input type="text" placeholder="Type your reply..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
            <button onClick={onSubmitReply}>Reply</button>
        </div>
    )
}