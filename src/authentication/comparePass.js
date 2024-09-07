import bcrypt from 'bcrypt'

export const comparePass = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    }
    catch(err){
        console.log(err);
    }
    
}
