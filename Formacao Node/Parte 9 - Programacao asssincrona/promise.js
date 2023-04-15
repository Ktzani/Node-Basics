
//? PROMISE -> callback sotisficada. É uma promessa que sera realizada no futuro. Pode ser cumprida ou rejeitada

function pegarId(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(12)
        }, 1500)
    })
}

function buscarEmailBanco(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("catiza@gmail.com")
        }, 2000)
    })
}

function enviarEmail(corpo, para) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var deuErro = false;
            if(!deuErro){
                //Para mandar parametro para promises, eu so posso mandar um parametro. Portanto, é importante mandar em json, objeto, array, etc
                resolve({time: 6, to: "catiza"}) //Promessa cumprida
            }
            else{
                reject("Fila cheia") //Promessa rejeitada
            }
        }, 4000)
    })
}

//GRANDE PROBLEMA: a aplicação fica uma bagunça e se perdemos no codigo. Evitar de colocar promises uma dentro da outra,
//ou seja, evitar PROMISES HELL
pegarId().then((id) => {
    buscarEmailBanco(id).then((email) => {
        enviarEmail("Ola meu caro! Tudo bom?").then(() => {
            console.log("Email enviado para o usuario com id: " + id + " e email: " + email)
        }).catch((erro) => {
            console.log(erro)
        })
    })
})