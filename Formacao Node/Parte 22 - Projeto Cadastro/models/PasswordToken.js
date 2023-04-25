const knex = require('../database/connection')
const User = require("./User")
const UIDGenerator = require('uid-generator');
 
class PasswordToken {
    async Create(email){
        const user = await User.FindByEmail(email)
        let uidgen = new UIDGenerator() // Default is a 128-bit token encoded in base58
        const token = await uidgen.generate()
        console.log(uidgen)
        if(user != undefined){
            try {
                await knex.insert({
                    userCodigo: user.codigo,
                    used: 0,
                    token: token
                }).table("passwordTokens")
                return {status: true, message: "Token enviado para o email " + email, token: token, user: user}
            }catch (error) {
                return {status: false, message: error}
            }
        }
        else{
            return {status: false, message: "O email passado não existe no banco"}
        }
    }

    async Validate(token){
        try {
            let result = await knex.select().where({token: token}).table("passwordTokens")
            if(result.length > 0){
                let tkUser = result[0]

                if(tkUser.used){
                    return {status: false, message: "Token já foi utilizado!"}
                }
                else{
                    return {status: true, message: "Token Válido", tkUser: tkUser}
                }
            }
            else{
                return {status: false, message: "Token Inválido"}
            }
        } catch (error) {
            return {status: false, message: error}
        }
    }

    async setUsed(token){
        try{
            await knex.update({used: 1}).where({token: token}).table("passwordTokens");
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }

    }
    
}

module.exports = new PasswordToken()