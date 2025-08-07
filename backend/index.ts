import express from 'express';
import pool from './db/db';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { ReplyObject } from './model/ReplyObject';
import { ReactionObject } from './model/ReactionObject';

interface ReactionRow {
    reply_id: number;
    username: string;
    type: 'like' | 'love' | 'haha' | 'sad' | 'angry';
}

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/api/get_posts', async (req, res) => {
    const task = await pool.query(`
        SELECT * FROM posts
        `);
    
    res.json({
        status: 'OK',
        data: JSON.stringify(
            task.rows
        )
    });
});

app.post('/api/get_replies', async (req, res) => {
    const { post_id } = req.body;

    const task = await pool.query<ReplyObject>(`
        SELECT r.username, r.id, r.content FROM replies r 
        INNER JOIN post_have_replies phr ON (r.id = phr.reply_id) 
        INNER JOIN posts p ON (p.id = phr.post_id) 
        WHERE post_id = $1;
    `, [post_id]);

    res.json({
        status: 'OK',
        data: JSON.stringify(
            task.rows
        )
    });
}); 

app.post('/api/get_reactions', async (req, res) => {
    const { reply_id } = req.body;
    const reactionByReplyId = await pool.query<ReactionObject>(`
        SELECT rea.reply_id, rea.username, rea.type FROM replies rep 
        INNER JOIN reactions rea ON (rep.id = rea.reply_id)
        WHERE rea.reply_id = $1;
    `, [reply_id]);

    let reactionList = [0, 0, 0, 0, 0] // [like, love, haha, sad, angry]
    reactionByReplyId.rows.forEach(reaction => {
        switch(reaction.type) {
            case 'like': reactionList[0] += 1; break;
            case 'love': reactionList[1] += 1; break;
            case 'haha': reactionList[2] += 1; break;
            case 'sad': reactionList[3] += 1; break;
            case 'angry': reactionList[4] += 1; break;
        }
    });

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