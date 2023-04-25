require('dotenv').config();
const User = require('../models/User')
const PasswordToken = require('../models/PasswordToken')
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")

let secret = process.env.JWT_SECRET

class UserController {
    async allUsers(req, res){
        const users = await User.FindAll()

        if(users != []){
            res.status(200)
            res.json(users)
        }
        else{
            res.status(404)
            res.json({error: 'Não há usuarios cadastrados no banco'})
        }
    }

    async findUser(req, res){
        const codigo = req.params.codigo
        const user = await User.FindByCodigo(codigo)
        if(user === undefined){
            res.status(404)
            res.json({error: "Usuario não existe"})
            return;
        }
        
        res.status(200)
        res.json(user)
    }

    async createUser(req, res) {
        let {email, password, name} = req.body

        if(!validator.isEmail(email)) {
            res.status(400)
            res.json({error: "O email é inválido."})
            return;
        }

        if(!validator.isAscii(name)) {
            res.status(400)
            res.json({error: "O nome é inválido."})
            return;
        }

        if(!validator.isAscii(password) || password.length < 6) {
            res.status(400)
            res.json({error: "A senha é inválida."})
            return;
        }

        const alreadyExistsEmail = await User.FindEmail(email)
        if(alreadyExistsEmail){
            res.status(406)
            res.json({error: "O email já está cadastrado."})
            return;
        }

        await User.New(email, password, name)
        res.status(200)
        res.send("Tudo OK!")
    }

    async editUser(req, res) {
        let {codigo, email, name, role} = req.body
        let result = await User.Update(codigo, email, name, role)

        if(result != undefined) {
            if(result.status === true){
                res.status(200)
            }
            else{
                
                res.status(406)
            }

            res.json({message: result.message})
            return
        }

        else{
            res.status(406)
            res.json({message: "Problemas no servidor. Aguarde"})
        }
        
    }

    async deleteUser(req, res) {
        let {codigo} = req.params
        let result = await User.Delete(codigo)

        if(result != undefined) {
            if(result.status === true){
                res.status(200)
            }
            else{
                res.status(404)
            }
            res.send(result.message)
            return
        }
        else{
            res.status(406)
            res.send("Ocorreu um erro no servidor!")
            return
        }
    }

    async login(req, res) {
        let {email, password} = req.body

        let user = await User.FindByEmail(email)
        if(user != undefined){
            let correctPass = await bcrypt.compare(password, user.password)
            if(correctPass){
                let token = jwt.sign({email: user.email, role: user.role}, secret)
                res.status(200)
                res.json({status: "Tudo OK", token: token})
            }
            else{
                res.status(406)
                res.json({error: "Senha incorreta"})
            }
        }

        else{
            res.status(406)
            res.json({error: "Usuário não encontrado"})
        }
    }

    async recoverPassword(req, res) {
        let email = req.body.email

        if(email != undefined){
            let result = await PasswordToken.Create(email)
            if(result.status === true){
                let transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD
                    }
                })

                try {
                    transporter.sendMail({
                        from: `${process.env.EMAIL_SENDER} <${process.env.EMAIL_USERNAME}>`,
                        to: email,
                        subject: "Recuperação de senha",
                        text: "Ola essa é seu email de recuperacao de senha. Pegue esse codigo ao qual te passamos e insira em nosso site para mudar sua senha",
                        html: `<p>Olá ${result.user.name},</p>
                            <p>Seja bem vindo(a),</p>
                            <p>Aqui se encontra o token que voce deve usar para recuperar sua senha: ${result.token}`
                    }, (error, info) => {
                        if(error) {
                            res.status(404)
                            res.send(error)
                            return
                        }
                        else {
                            console.log(info)
                            res.status(200)
                            res.send(`Token enviado para seu email ${result.user.name}`)
                        }
                    })
                } catch (error) {
                    res.status(404)
                    res.send(error)
                    return
                }
                
            }
            else{
                res.status(404)
            }
            res.send(result.message)
            return
        }

        else{
            res.send(406)
            res.send("Ocorreu um erro no servidor!")
            return
        }
    }

    async changePassword(req, res){
        let token = req.body.token
        let newPassword = req.body.password
        let validateResult;
        let changeResult
        if(token != undefined){
            validateResult = await PasswordToken.Validate(token)
        }
        else{
            res.status(404)
            res.send("É necessario o token para trocara senha")
            return
        }

        if(validateResult != undefined){
            if(validateResult.status === true){
                if(newPassword != undefined){
                    try{
                        await PasswordToken.setUsed(token)
                        let changeResult = await User.ChangePassword(newPassword, validateResult.tkUser.userCodigo, validateResult.tkUser.token)
                        res.status(200) 
                        res.send(changeResult.message)
                    }
                    catch(error){
                        res.status(406)
                        res.send(changeResult.message)
                        return
                    }
                }
                else{
                    res.status(404)
                    res.send("A nova senha é obrigatória")
                    return
                }
            }
            else{
                res.status(404)
                res.send(validateResult.message)
                return
            }
        }
        else{
            res.status(406)
            res.send("Ocorreu um erro no servidor!")
            return
        }
    }
}
   
module.exports = new  UserController();