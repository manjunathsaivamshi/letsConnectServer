import express from 'express'
import dotenv from 'dotenv';
import { mongoClient } from './database/dbConnect.js';
import authRoutes from './src/routes/auth.js'
import roomRoutes from './src/routes/room.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth',authRoutes);
app.use('/room',roomRoutes);

app.locals.mongo = await mongoClient()



app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
});
