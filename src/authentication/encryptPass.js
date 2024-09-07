import bcrypt from 'bcrypt'

// Hashing a password
export const encryptPass = async (password) => {
    const saltRounds = 10; // Cost factor
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}
