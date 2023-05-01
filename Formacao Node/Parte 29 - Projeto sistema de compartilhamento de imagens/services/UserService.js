const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
    async Create(user) {
        let password = user.password
        const salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)

        let newUser = new User({
            name: user.name,
            email: user.email,
            password: hash 
        })

        try{
            await newUser.save()
            return {status: true}
        }catch(err){
            console.log(err)
            return {status: false}
        }
    }

    async Delete (email) {
        try{
            await User.deleteOne({"email": email})
            return {status: true}
        }catch(err){
            console.log(err)
            return {status: false, error: err}
        }

    }

    async EmailExistente(email){

        try{
            let user = await User.findOne({"email": email})
            if(user != undefined){
                return {status: true, user: user, error: "E-mail já cadastrado!"}
            }
            else{
                return {status: false, user: undefined}
            }
        }catch(err){
            console.log(err)
            return {status: false, error: err}
        }


    }
}

module.exports = new UserService();