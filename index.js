import express from 'express'
import dotenv from 'dotenv';
import { PeerServer } from 'peer'
import cors from 'cors'
import http from 'http'
import { mongoClient } from './database/dbConnect.js';
import authRoutes from './src/routes/auth.js'
import roomRoutes from './src/routes/room.js'
import { Server as socketio } from 'socket.io';  // Correct import for Socket.IO
import { roomHandler } from './src/room/roomHandler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const allowedOrigins = [
  'http://localhost:5173'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Allowed headers
};


const peerServer = PeerServer({
  path: '/peerjs',
  allow_discovery: true,
});

if(peerServer) console.log(`Connected to Peer Server on port: 4500`)

app.locals.mongo = await mongoClient()

app.use(cors(corsOptions));
app.use(express.json()); 
app.use('/auth',authRoutes);
app.use('/room',roomRoutes);
app.use('/peerjs', peerServer);

const io = new socketio(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

io.on("connection", (socket) => {
    console.log("a user connected");
    roomHandler(socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
});
});


server.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
});
