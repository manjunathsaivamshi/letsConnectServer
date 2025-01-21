import { regUser } from '../authentication/regUser.js';
import { logInUser } from '../authentication/loginInUser.js';
import { generateTokens } from '../authentication/generateTokens.js';
import express from 'express';

const router = express.Router();

router.post('/loginuser', async(req, res)=>{
    const userData = req.body
        try{
            if(await logInUser(userData)){
                const accessToken = await generateTokens(userData.userid)
                res.status(200).json({
                    message: 'Success',
                    "accessToken":accessToken
                    });
            }
            else{
                res.status(403).json({
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
    console.log(userData)
        try{
            if(await regUser(userData)){
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

export default router