import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { Message } from './models/Message.js';
import { Chat } from './models/Chat.js';
import { URI, PORT } from './config/index.js';
import App from './routes/App.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("MongoDB Error: ", err));

app.use(App);

// Create an HTTP server based on the Express app
const server = createServer(app);

// Create a WebSocket server and bind it to the HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    })
    ws.on('message', async (data, isBinary) => {
        const message = isBinary ? data : data.toString();
        console.log('Received message:', message);
    })

    ws.send('Hello! Message from Server!!');

})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})