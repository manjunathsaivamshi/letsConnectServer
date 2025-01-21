import { encryptPass } from "./encryptPass.js";
import user from "../../database/msd/user.js";

export const regUser = async (userData) => {
    try {
    const userId = userData.userid
    const isExistingUser = await user.findOne({userid:userId})
    if(!isExistingUser){
        const hashedUserData = {...userData, password:await encryptPass(userData.password)}
        const newUser = user(hashedUserData);
        await newUser.save();
        return true
    }
    else{
        return false
    }
    }
    catch(err){
        console.log(err)
    }
}