import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const uri = process.env.DATABASE_URL;

if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

let client = null;

export const mongoClient = async () => {
    if (client) {
        return client;
    }

    try {
        client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
};
