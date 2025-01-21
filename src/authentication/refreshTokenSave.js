import user from "../../database/msd/user.js";

export const refreshTokenSave = async (userId,token) => {
    try {
    const isExistingUser = await user.findOne({userid:userId})
    if(isExistingUser){
        await user.updateOne({_id:isExistingUser._id},{$set:{refreshToken:token}})
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