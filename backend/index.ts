import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/test', (req, res) => {
    res.json({
        status: 'OK',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});