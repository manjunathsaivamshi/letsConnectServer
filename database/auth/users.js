export const usersCollection = (mongo) => {
    try{
        return(mongo.db('auth').collection('users'))
    }
    catch(err){
        console.log(err)
    }
}
