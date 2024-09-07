import { mongoClient } from './database/dbConnect.js'

export const usersCollection = async () => {
    const mongo = await mongoClient()
    return (mongo.db('auth').collection('users'))
}
