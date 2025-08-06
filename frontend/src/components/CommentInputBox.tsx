import { useState } from "react";

export function CommentInputBox() {
    const [commentSectionValue, setCommentSectionValue] = useState("");

    const username: String = "christianDumanauw";
    const firstLetter: String = username[0].toUpperCase();

    return (
        <div className="items-center w-full p-10 flex flex-col gap-3">
            <div className="flex flex-row gap-3 w-full items-center"> {/* photo and username, just use letter for now */}
                <div className="p-3 h-12 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                    <div className="text-2xl font-bold">{firstLetter}</div>
                </div>
                <p className="text-white text-xl justify-start">{username}</p>
            </div>
            <div className="w-full"> {/* comment section */}
                <textarea
                    value={commentSectionValue}
                    onChange={(e) => setCommentSectionValue(e.target.value)}
                    placeholder='What are you thinking today!'
                    className="w-full aspect-[9/3] border-white border-2 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white"
                />
            </div>
        </div>
    )
}