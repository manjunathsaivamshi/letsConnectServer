import { regUser } from '../authentication/regUser.js';
import { logInUser } from '../authentication/loginInUser.js';
import { generateTokens } from '../authentication/generateTokens.js';
import jwt from 'jsonwebtoken'
import express from 'express';

const router = express.Router();

router.post('/loginuser', async(req, res)=>{
    const userData = req.body
    const mongo = req.app.locals.mongo
        try{
            if(await logInUser(mongo,userData)){
                const accessToken = await generateTokens(mongo,userData.userid)
                res.status(200).json({
                    message: 'Success',
                    "accessToken":accessToken
                    });
            }
            else{
                res.status(200).json({
                    message: 'Fail'
                    });
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                    message: 'Fail'
                    });
        }
    
})

router.post('/reguser', async(req, res)=>{
    const userData = req.body
    const mongo = req.app.locals.mongo
        try{
            if(await regUser(mongo,userData)){
                res.status(200).json({
                    message: 'Success'
                    });
            }
            else{
                res.status(200).json({
                    message: 'Fail'
                    });
            }
        }
        catch(err){
            res.status(500).json({
                    message: 'Fail'
                    });
        }
    
})

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
    const { refreshToken,userid } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        // Generate a new access token
        const accessToken = jwt.sign({ username: userid }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    });
});


export default router