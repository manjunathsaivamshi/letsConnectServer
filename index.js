import express from 'express'
import dotenv from 'dotenv';
import { regUser } from './src/authentication/regUser.js';
import { logInUser } from './src/authentication/loginInUser.js';
import { mongoClient } from './database/dbConnect.js';

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 3000;
const mongo = await mongoClient()

app.get('/', async(req, res)=>{
    
    if(userCollection){
        console.log(await userCollection.find({}).toArray())
    }
}) 

app.post('/loginuser', async(req, res)=>{
    const userData = req.body
    if(userData.secretKey !== process.env.SECRET_KEY)
        res.status(403).json({
            message:'Forbidden'
        })
    else{
        try{
            if(await logInUser(mongo,userData)){
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
            console.log(err)
            res.status(500).json({
                    message: 'Fail'
                    });
        }
    }
    
})

app.post('/reguser', async(req, res)=>{
    const userData = req.body
    if(userData.secretKey !== process.env.SECRET_KEY)
        res.status(403).json({
            message:'Forbidden'
        })
    else{
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
    }
    
}) 

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
});
