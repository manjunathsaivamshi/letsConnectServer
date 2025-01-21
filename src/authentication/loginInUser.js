import { comparePass } from "./comparePass.js";
import user from "../../database/msd/user.js";

export const logInUser = async (userData) => {
    try {
    const userId = userData.userid
    const reqPass = userData.password
    const isExistingUser = await user.findOne({userid:userId})
    if(isExistingUser && await comparePass(reqPass,isExistingUser.password)){
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