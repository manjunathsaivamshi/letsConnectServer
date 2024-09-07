import express from 'express'
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.get('/', async(req, res)=>{
    
    if(userCollection){
        console.log(await userCollection.find({}).toArray())
    }
})  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
