import express from 'express';
import pool from './db/db';
import { ReplyObject } from './model/ReplyObject';
import { ReactionObject } from './model/ReactionObject';

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/api/get_posts', async (req, res) => {
    const task = await pool.query(`
        SELECT * FROM posts
        ORDER BY created_at DESC;
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

app.post('/api/get_state_reply_user', async (req, res) => {
    const { reply_id, username } = req.body;
    const reactionByReplyId = await pool.query<ReactionObject>(`
        SELECT rea.reply_id, rea.username, rea.type FROM replies rep 
        INNER JOIN reactions rea ON (rep.id = rea.reply_id)
        WHERE rea.reply_id = $1 AND rea.username = $2;
    `, [reply_id, username]);

    let reaction = reactionByReplyId.rows.length > 0 ? reactionByReplyId.rows[0].type : null;

    res.json({
        status: 'OK',
        data: JSON.stringify(
            reaction
        )
    });
});

app.post('/api/post_post', async (req, res) => {
    const { username, content } = req.body;

    const data = new Date();
    const currDate = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`;

    const task = await pool.query(`
        INSERT INTO posts (username, content, created_at) VALUES ($1, $2, $3) RETURNING *;
        `, [username, content, currDate]
    );

    const responseData = await pool.query(`
        SELECT * FROM posts
        ORDER BY created_at DESC;
    `);

    res.json({
        status: 'OK',
        data: JSON.stringify(
            responseData.rows
        )
    });
});

app.post('/api/delete_post', async (req, res) => {
    const { post_id } = req.body;

    const task = await pool.query(`
        DELETE FROM posts WHERE id = $1;
    `, [post_id]);

    const responseData = await pool.query(`
        SELECT * FROM posts
        ORDER BY created_at DESC;
    `);

    res.json({
        status: 'OK',
        data: JSON.stringify(
            responseData.rows
        )
    });
});

app.post('/api/post_reply', async (req, res) => {
    const { username, content, post_id } = req.body;

    const postReply = await pool.query(`
        INSERT INTO replies (username, content) VALUES ($1, $2) RETURNING *;
    `, [username, content]);

    const reply_id = postReply.rows[0].id;
    const task = await pool.query(`
        INSERT INTO post_have_replies (post_id, reply_id) VALUES ($1, $2);
        `, [post_id, reply_id]
    );

    const responseData = await pool.query(`
        SELECT r.username, r.id, r.content FROM replies r INNER JOIN post_have_replies p ON r.id = p.reply_id
        WHERE p.post_id = $1;
    `, [post_id]);

    res.json({
        status: 'OK',
        data: JSON.stringify(responseData.rows)
    });
});

app.post('/api/post_reaction', async (req, res) => {
    const { username, type, reply_id } = req.body;
    
    const task = await pool.query(`
        INSERT INTO reactions (username, type, reply_id) VALUES ($1, $2, $3);
    `, [username, type, reply_id]);

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
        data: JSON.stringify(reactionList)
    });


});

app.post('/api/delete_reaction', async (req, res) => {
    const { username, reply_id } = req.body;

    const task = await pool.query(`
        DELETE FROM reactions WHERE username = $1 AND reply_id = $2;
    `, [username, reply_id]);

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
        data: JSON.stringify(reactionList)
    });
});

app.post('/api/alter_reaction', async (req, res) => {
    const { username, type, reply_id } = req.body;
    
    const task = await pool.query(`
        UPDATE reactions
        SET type = $1
        WHERE username = $2 AND reply_id = $3;
    `, [type, username, reply_id]);

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
        data: JSON.stringify(reactionList)
    });
});

app.listen(PORT, () => {
    console.log(`Server running...`);
});