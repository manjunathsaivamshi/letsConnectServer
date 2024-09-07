import bcrypt from 'bcrypt'

export const comparePass = async (password, hash) => {
    try {
        return (await bcrypt.compare(password, hash));
    }
    catch(err){
        console.log(err);
    }
    
}
