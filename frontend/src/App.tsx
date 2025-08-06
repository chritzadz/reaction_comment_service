import { useEffect, useState } from "react";
import { CommentBox } from "./components/CommentBox"
import { CommentInputBox } from "./components/CommentInputBox"
import type { CommentObject } from './model/CommentObject';

function App() {
  const [comments, setComments] = useState<CommentObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch('/api/get_comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      let tempArray: CommentObject[] = []

      JSON.parse(data.data).map((comment: CommentObject) => {
        tempArray.push(comment);
      });
      setComments(tempArray);
      console.log(comments);
    };

    fetchComments();
  }, []);

  return (
    <div className="justify-center items-center flex flex-row w-screen min-h-screen bg-gray-900">
      <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full border">
      </div>
      <div className="comment-box w-3/5 max-lg:w-3/5 max-md:w-3/5 max-sm:w-full border">
        <CommentInputBox>
        </CommentInputBox>
        <hr className="w-full bg-white border-1"></hr>
        <div>
          {comments.map((comment: CommentObject) => (
            <CommentBox key={comment.id} id={comment.id} username={comment.username} content={comment.content} created_at={comment.created_at} />
          ))}
        </div>
      </div>
      <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full border">
      </div>
    </div>
  )
}

export default App
