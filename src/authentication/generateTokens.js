import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { refreshTokenSave } from './refreshTokenSave.js';
import user from "../../database/msd/user.js";

dotenv.config();


export const generateTokens = async (userId, accessTokenByUser = null)=>{

    if(accessTokenByUser == null){
    const accessToken = jwt.sign({ userid: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
    if(await user.findOne({userid:userId, refreshToken:{$exists:false}})){
        const refreshToken = jwt.sign({ userid: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        await refreshTokenSave(userId,refreshToken);
    }
    return accessToken
    }
    else{
        if(await user.findOne({userid:userId, refreshToken:{$exists:false}})) return "fail";
        else{
            const refreshToken = await user.findOne({ userid: userId }, { refreshToken: 1 });
            if(jwt.verify(refreshToken,process.env.JWT_SECRET),(err)=>{
                if (err) return "fail";
            return jwt.sign({ userid: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
            });
        }  
    }
}