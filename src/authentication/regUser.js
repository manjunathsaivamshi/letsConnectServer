import { usersCollection } from "../../database/auth/users.js";
import { encryptPass } from "./encryptPass.js";

export const regUser = async (mongo,userData) => {
    try {
    const userId = userData.userid
    const isExistingUser = await usersCollection(mongo).findOne({userid:userId})
    if(!isExistingUser){
        const hashedUserData = {...userData, pass:await encryptPass(userData.pass)}
        await usersCollection(mongo).insertOne(hashedUserData)
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