import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());
//there should be a database connection here, say PostgreSQL for example but I cannot set it up because of company policy, for this example I will just return a static response
app.post('/get_comments', (req, res) => {
    res.json({
        status: 'OK',
        data: JSON.stringify(comments)
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//comments
let comments = [
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
let comment_have_replies = [
    {
        comment_id: 1,
        reply_id: 1
    },
    {
        comment_id: 1,
        reply_id: 2
    },
    {
        comment_id: 2,
        reply_id: 1
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
        reply_id: 1,
        username: 'user2',
        content: 'Interesting!'
    }
];