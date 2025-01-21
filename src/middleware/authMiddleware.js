import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { generateTokens } from '../authentication/generateTokens.js';

dotenv.config();

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, async (err) => {
        if (err instanceof jwt.TokenExpiredError) {
            const jwtDetails = jwt.verify(token, process.env.JWT_SECRET)
            if(await generateTokens(jwtDetails.userid, token) == "fail") return res.sendStatus(403);
            else next();
        };
        if(err) return res.sendStatus(403);
        next();
    });
};

