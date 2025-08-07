import { useState } from "react";
import { Spinner } from "react-bootstrap";

interface PostInputBoxProps {
    handlePostSubmit: (content: string, username: string) => void,
    username: string
}

export function PostInputBox({ handlePostSubmit, username }: PostInputBoxProps) {
    const [postSectionValue, setPostSectionValue] = useState("");
    const [isPostLoading, setIsPostLoading] = useState(false);

    const firstLetter: string = username[0].toUpperCase();

    const handleClickSubmit = async () => {
        setIsPostLoading(true);
        await handlePostSubmit(postSectionValue, username);
        setPostSectionValue("");
        setIsPostLoading(false);
    }

    return (
        <div className="items-center w-full p-10 flex flex-col gap-3">
            <div className="flex flex-row gap-3 w-full items-center"> {/* photo and username, just use letter for now */}
                <div className="p-3 h-12 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                    <div className="text-2xl font-bold">{firstLetter}</div>
                </div>
                <p className="text-white text-xl justify-start">{username}</p>
            </div>
            <div className="w-full"> {/* post section */}
                <textarea
                    value={postSectionValue}
                    onChange={(e) => setPostSectionValue(e.target.value)}
                    placeholder='What are you thinking today!'
                    className="w-full aspect-[9/3] border-white border-2 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white"
                />
            </div>
            {
                isPostLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    <button
                        onClick={handleClickSubmit}
                        className="w-full bg-gray-900 rounded-lg text-white border-2 p-2 hover:bg-white hover:text-gray-900 transition-colors"
                    >
                        Post
                    </button>
                )
            }
        </div>
    )
}