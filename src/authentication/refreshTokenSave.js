import { usersCollection } from "../../database/auth/users.js";

export const refreshTokenSave = async (mongo,userId,token) => {
    try {
    const isExistingUser = await usersCollection(mongo).findOne({userid:userId})
    if(isExistingUser){
        await usersCollection(mongo).updateOne({_id:isExistingUser._id},{$set:{refreshToken:token}})
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