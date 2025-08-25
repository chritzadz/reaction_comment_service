import express from 'express';
import { PostRoutes } from './route/PostRoute';
import { ReplyRoutes } from './route/ReplyRoute';
import { ReactionRoutes } from './route/ReactionRoute';
import { startWebSocket } from './websocket/wsServer';
import { LogRoutes } from './route/LogRoute';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api', PostRoutes);
app.use('/api', ReplyRoutes);
app.use('/api', ReactionRoutes);
app.use('/api', LogRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ 
        status: 'ERROR', 
        message: 'Internal Server Error' 
    });
})

startWebSocket();

app.listen(PORT, () => {
    console.log(`Server running... on http://localhost:${PORT}`);
});