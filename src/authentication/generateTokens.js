import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { usersCollection } from "../../database/auth/users.js";
import { refreshTokenSave } from './refreshTokenSave.js';

dotenv.config();


export const generateTokens = async (mongo,userId)=>{
    const accessToken = jwt.sign({ username: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

    if(await usersCollection(mongo).findOne({userid:userId, refreshToken:{$exists:false}})){
        const refreshToken = jwt.sign({ username: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        await refreshTokenSave(mongo,userId,refreshToken);
    }
    else{
        const userRefreshToken = await usersCollection(mongo).findOne({userid:userId},{projection:{refreshToken:1}})
        if(!jwt.verify(userRefreshToken,process.env.JWT_SECRET))
            await refreshTokenSave(mongo,userId,refreshToken);
    }
    return accessToken 
}