//Middleware -> função que está presente entre a requisição e a resposta e sempre sera executado quando passar por uma dessas ações (apenas nas rotas que
//possuirem esse middleware). Ele age entre a comunicação do usuário e da rota
function adminAuth(req, res, next){
    if(req.session.user != undefined){
        next(); //Após isso o usuario poderá acessar rotas que antes não era permitido
    }
    else{
        res.redirect("/login");
    }

    //next() -> usado para minha requisicao não ficar presa no meu middleware, ou seja, meu usuario precisa chegar na rota e para isso utilizamos o next
    //Logo, ele serve para passar a requisiçao do middleware para a rota que o usuario quer acessar. Por isso, chama-lo ao final do middleware
}


module.exports = adminAuth