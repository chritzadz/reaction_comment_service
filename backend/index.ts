import express from 'express';
import pool from './db/db';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/api/get_posts', async (req, res) => {
    const task = await pool.query('SELECT * FROM posts');
    
    res.json({
        status: 'OK',
        data: JSON.stringify(
            task.rows
        )
    });
});

app.post('/api/get_replies', (req, res) => {
    const { post_id } = req.body;

    const replyIds = post_have_replies
      .filter(relation => relation.post_id === post_id)
      .map(relation => relation.reply_id);
      
    const repliesForPost = replies.filter(reply => replyIds.includes(reply.id));

    res.json({
        status: 'OK',
        data: JSON.stringify(
            repliesForPost
        )
    });
}); 

app.post('/api/get_reactions', (req, res) => {
    const { reply_id } = req.body;

    console.log("reply_id", reply_id);
    const reactionByReplyId = reactions.filter(reaction => reaction.reply_id === reply_id);
    console.log(reactionByReplyId);

    let reactionList = [0, 0, 0, 0, 0] // [like, love, haha, sad, angry]
    for (let i = 0; i < reactionByReplyId.length; i++) {
        if (reactionByReplyId[i].type === 'like'){
            reactionList[0] += 1;
        }
        else if (reactionByReplyId[i].type === 'love'){
            reactionList[1] += 1;
        }
        else if (reactionByReplyId[i].type === 'haha'){
            reactionList[2] += 1;
        }
        else if (reactionByReplyId[i].type === 'sad'){
            reactionList[3] += 1;
        }
        else if (reactionByReplyId[i].type === 'angry'){
            reactionList[4] += 1;
        }
    }

    res.json({
        status: 'OK',
        data: JSON.stringify(
            reactionList
        )
    });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//comments
let posts = [
    {
        id: 1,
        username: 'user1',
        content: 'This is a posts',
        created_at: '2023-01-01'
    },
    {
        id: 2,
        username: 'user2',
        content: 'This is another posts',
        created_at: '2023-01-02'
    }
];

//replied have a composite primary keys -> to normalize we could seperate a new table for replied with, reply id, i iwll do it.
let post_have_replies = [
    {
        post_id: 1,
        reply_id: 1
    },
    {
        post_id: 1,
        reply_id: 2
    },
    {
        post_id: 2,
        reply_id: 3
    }
];

let replies = [
    {
        id: 1,
        username: 'user1',
        content: 'Amazing!'
    },
    {
        id: 2,
        username: 'user2',
        content: 'Waw!'
    },
    {
        id: 3,
        username: 'user2',
        content: 'Interesting!'
    }
];

//6 types of reactions [like, love, haha, sad, angry] primary keys should be: reply_id and username since one user can only react once to a reply
let reactions = [
    {
        reply_id: 1,
        username: 'user1',
        type: 'like',
        
    },
    {
        reply_id: 1,
        username: 'user2',
        type: 'like',
    },
    {
        reply_id: 2,
        username: 'user3',
        type: 'love',
    },
    {
        reply_id: 2,
        username: 'user4',
        type: 'sad',
    },
]