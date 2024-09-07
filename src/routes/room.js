import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',authenticateJWT,(req,res,err) =>{
    if(err) res.status(403)
    res.status(200).json({
        "message":"success"
    })
})

export default router