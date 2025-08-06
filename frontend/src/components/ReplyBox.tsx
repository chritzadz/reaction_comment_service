interface ReplyBoxProps {
    id: string;
    username: string;
    content: string;
}

export function ReplyBox({ id, username, content}: ReplyBoxProps) {
    const firstLetter: String = username[0].toUpperCase();

    return (
        <div className="w-full flex flex-col w-full gap-2 ml-10">
            <div className="flex flex-row gap-3 w-full items-center"> {/* photo and username, just use letter for now */}
                <div className="p-3 h-10 aspect-square bg-orange-600 flex justify-center items-center rounded-lg border-2"> {/* photo */}
                    <div className="text-lg font-bold">{firstLetter}</div>
                </div>
                <p className="text-white text-xl justify-start">{username}</p>
            </div>
            <div>
                <p className="text-white">{content}</p>
            </div>
        </div>
    )
}