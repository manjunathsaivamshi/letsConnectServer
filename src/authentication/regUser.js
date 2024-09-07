import { usersCollection } from "../../database/auth/users";
import { encryptPass } from "./encryptPass";

export const regUser = async (userData) => {
    try {
    const userId = userData.userId
    const isExistingUser = await usersCollection.findOne({userid: userId})
    if(!isExistingUser){
        const hashedUserData = {...userData, pass:encryptPass(pass)}
        await usersCollection.insertOne(hashedUserData)
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