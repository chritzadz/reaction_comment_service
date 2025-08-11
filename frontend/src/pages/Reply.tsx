import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ReplyInputBox } from "../components/ReplyInputBox";

function Reply() {
    let { username: usernameParam, post_id } = useParams();
    return(
        <div className="bg-gray-800 bg-opacity-50 w-full">
            <ReplyInputBox username={usernameParam} post_id={post_id} onClose={handleClose} handleReplySubmit={handleReplySubmit} />
        </div>
    )
}

export default Reply;
