import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';

const app = express();
const PORT = 3001;

app.use(express.json());
//there should be a database connection here, say PostgreSQL for example but I cannot set it up because of company policy, for this example I will just return a static response
app.post('/api/get_posts', (req, res) => {
    res.json({
        status: 'OK',
        data: JSON.stringify(
            posts
        )
    });
});

app.post('/api/get_replies', (req, res) => {
    const { post_id } = req.body;

    const replyIds = post_have_replies
      .filter(relation => relation.post_id === post_id)
      .map(relation => relation.reply_id);
      
    const repliesForPost = replies.filter(reply => replyIds.includes(reply.reply_id));

    res.json({
        status: 'OK',
        data: JSON.stringify(
            repliesForPost
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
        content: 'This is a comment',
        created_at: '2023-01-01'
    },
    {
        id: 2,
        username: 'user2',
        content: 'This is another comment',
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

//
let replies = [
    {
        reply_id: 1,
        username: 'user1',
        content: 'Amazing!'
    },
    {
        reply_id: 2,
        username: 'user2',
        content: 'Waw!'
    },
    {
        reply_id: 3,
        username: 'user2',
        content: 'Interesting!'
    }
];