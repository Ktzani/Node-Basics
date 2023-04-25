const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const validator = require("validator")

class User{
    async New(email, password, name){
        try {
            //Hash -> senha crua modifidacada
            const hash = await bcrypt.hash(password, 10)
            await knex.insert({email: email, password: hash, name: name, role: 0}).table("users")
        } catch (error) {
            console.log(error) 
        }
    }

    async Update(codigo, email, name, role){
        let user = await this.FindByCodigo(codigo)
        let editUser = {}
        if(user != undefined){
            if(validator.isEmail(email) || email != undefined){
                if(email != user.email){
                    //Vejo se o novo email do usuario ja existe no banco
                    let alreadyExistsEmail = await this.FindEmail(email)
                    if(!alreadyExistsEmail){
                        editUser.email = email
                    }
                    else{
                        return {status: false, message: "Email já cadastrado"}
                    }
                } 
            }

            if(validator.isAscii(name) || name != undefined){
                if(name!= user.name){
                    editUser.name = name
                }
            }

            if(role != undefined){
                if(role != user.role){
                    editUser.role = role
                }
            }

            try {
                await knex.update(editUser).where({codigo: codigo}).table("users")
                return {status: true, message: "Atualização concluida com exito "}
            } catch (error) {
                return {status: false, message: error}
            }
        }
        else{
            return {status: false, message: "Usuário não existe"}
        }
    }

    async Delete(codigo){

        let user = await this.FindByCodigo(codigo)

        if(user != undefined){
            try{
                await knex.delete().where({codigo: codigo}).table("users")
                return {status: true, message: "Exclusão concluida com sucesso"}
            }
            catch(error){
                return {status: false, message: error}
            }
        }

        else{
            return {status: false, message: "Usuário não existe e por isso nao pode ser deletado"} 
        }
    }


    async FindByCodigo(codigo){
        try{
            const result = await knex.select(["users.codigo", "users.name", "users.email", "users.role"]).from("users").where({codigo: codigo})
            if(result.length > 0){
                return result[0]
            }
            else{
                return undefined
            }
        }
        catch(error){
            console.log(error)
            return undefined
        }
    }

    async FindByEmail(email){
        try {
            let result = await knex.select(["users.codigo", "users.name", "users.password", "users.email", "users.role",]).from("users").where({email: email})
        
            if(result.length > 0){
                return result[0]
            }
            else{
                return undefined
            }
            
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async FindAll(){
        try{
            const users = await knex.select(["users.codigo", "users.name", "users.email", "users.role"]).table("users")
            return users
        }catch(error){
            console.log(error)
            return [];
        }
    }

    async FindEmail(email){
        try {
            let result = await knex.select("*").from("users").where({email: email})

            console.log(result)

            if(result.length > 0){
                return true;
            }
            else{
                return false
            }

        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async ChangePassword(newPassword, codigo, token){
        const hashPass = await bcrypt.hash(newPassword, 10)
        try{    
            await knex.update({password: hashPass}).where({codigo: codigo}).table("users");
            return {status: false, message: "Mudança de senha concluida"}
        }catch(error){
            return {status: false, message: error}
        }
    }  
}

module.exports = new User();