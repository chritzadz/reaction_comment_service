import { CommentBox } from "./components/CommentBox"
import { CommentInputBox } from "./components/CommentInputBox"

function App() {
  return (
    <div className="justify-center items-center flex flex-row w-screen min-h-screen bg-gray-900">
      <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full border">
      </div>
      <div className="comment-box w-3/5 max-lg:w-3/5 max-md:w-3/5 max-sm:w-full border">
        <CommentInputBox>
        </CommentInputBox>
        <hr className="w-full bg-white border-1"></hr>
        <CommentBox></CommentBox>
      </div>
      <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full border">
      </div>
    </div>
  )
}

export default App
