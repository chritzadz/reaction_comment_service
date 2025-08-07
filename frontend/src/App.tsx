import { useEffect, useState } from "react";
import { PostBox } from "./components/PostBox"
import { PostInputBox } from "./components/PostInputBox"
import type { PostObject } from './model/PostObject';
import { Spinner } from 'react-bootstrap';

function App() {
  const [posts, setPosts] = useState<PostObject[]>([]);

  const handlePostSubmit = async (content: string, username: string) => {
    const response = await fetch('/api/post_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        username
      }),
    });

    const data = await response.json();
    setPosts(JSON.parse(data.data).map((post: PostObject) => ({
      id: post.id,
      username: post.username,
      content: post.content,
      created_at: post.created_at
    })));
  }

  const handleDeletePost = async (id: string) => {
    const response = await fetch('/api/delete_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_id: id
      }),
    });

    const data = await response.json();
    setPosts(JSON.parse(data.data).map((post: PostObject) => ({
      id: post.id,
      username: post.username,
      content: post.content,
      created_at: post.created_at
    })));
  }

  useEffect(() => { 
    const fetchPosts = async () => {
      const response = await fetch('/api/get_posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      let tempArray: PostObject[] = []

      JSON.parse(data.data).map((post: PostObject) => {
        tempArray.push(post);
      });
      setPosts(tempArray);
    };

    fetchPosts();
  }, []);

  return (
    <div className="justify-center items-center flex flex-row w-screen min-h-screen bg-gray-900">
      <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full">
      </div>
      <div className="comment-box w-3/5 max-lg:w-3/5 max-md:w-3/5 max-sm:w-full border">
        <PostInputBox handlePostSubmit={handlePostSubmit} />
        <hr className="w-full bg-white border-1"></hr>
        <div>
          {posts.length === 0 &&
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          {posts.map((post: PostObject) => (
            <div key={post.id}>
              <PostBox key={post.id} id={post.id} username={post.username} content={post.content} created_at={post.created_at} onDelete={handleDeletePost} />
              <hr className="w-full bg-white border-1"></hr>
            </div>
          ))}
        </div>
      </div>
      <div className="comment-box w-1/5 max-lg:w-1/5 max-md:w-1/5 max-sm:w-0 h-full">
      </div>
    </div>
  )
}

export default App
