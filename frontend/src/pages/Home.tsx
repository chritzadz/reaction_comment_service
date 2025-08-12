import { useEffect, useState } from "react";
import { PostBox } from "../components/PostBox"
import { PostInputBox } from "../components/PostInputBox"
import type { PostObject } from '../model/PostObject';
import { Spinner } from 'react-bootstrap';
import { useParams } from "react-router";

class Post implements PostObject {
  id: string;
  username: string;
  content: string;
  created_at: string;
  constructor(id: string, username: string, content: string, created_at: string) {
    this.id = id;
    this.username = username;
    this.content = content;
    this.created_at = created_at;
  }
}

function Home() {
  const [posts, setPosts] = useState<PostObject[]>([]);
  let { username: usernameParam } = useParams();
  const [username, setUsername] = useState<string>(usernameParam || "");
  const [openReplyBox, setOpenReplyBox] = useState<boolean>(false);

  const handleReplyClick = () => {
    setOpenReplyBox(!openReplyBox);
  }

  const handlePostSubmit = async (content: string, username: string) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( new Post("", username, content, "") ),
    });

    const data = await response.json();
    console.log(data);
    setPosts(data);
  }

  const handleDeletePost = async (id: string) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => { 
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setPosts(data);
    };

    setUsername(username ?? "");
    fetchPosts();
  }, []);

  return (
    <div className="relative">
      <div className="justify-center items-center flex flex-row w-screen min-h-screen bg-gray-900 z-0">
        <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full">
        </div>
        <div className="comment-box w-3/5 max-lg:w-3/5 max-md:w-3/5 max-sm:w-full border">
          <PostInputBox username={username} handlePostSubmit={handlePostSubmit} />
          <hr className="w-full bg-white border-1"></hr>
          <div>
            {posts.length === 0 &&
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }
            {posts.map((post: Post) => (
              <div key={post.id}>
                <PostBox key={post.id} id={post.id} username={post.username} content={post.content} created_at={post.created_at} curr_user={username} onDelete={handleDeletePost} onReplyClick={() => handleReplyClick()} />
                <hr className="w-full bg-white border-1"></hr>
              </div>
            ))}
          </div>
        </div>
        <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full">
        </div>
      </div>
    </div>
  )
}

export default Home;
