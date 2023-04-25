const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET

module.exports = function(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ')
        let token = bearer[1]

        try {
            let decoded = jwt.verify(token, secret)
            if(decoded.role === 1){
                next()
            }
            else{
                res.status(403)
                res.json({message: 'Você não tem permissão para acesso como administrador!'})
            }
        } catch (error) {
            res.status(403)
            res.json({message: 'Erro de autenticação!! Você não está Autenticado.'})
            return
        }
        
    }

    else{
        res.status(403)
        res.json({message: 'JTW token necessário'})
        return
    }
}