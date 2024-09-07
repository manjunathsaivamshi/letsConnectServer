import { usersCollection } from "../../database/auth/users.js";
import { comparePass } from "./comparePass.js";

export const logInUser = async (mongo,userData) => {
    try {
    const userId = userData.userid
    const reqPass = userData.pass
    const isExistingUser = await usersCollection(mongo).findOne({userid:userId})
    if(isExistingUser && await comparePass(reqPass,isExistingUser.pass)){
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