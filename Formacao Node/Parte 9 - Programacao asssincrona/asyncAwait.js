//* ASYNC/AWAIT: 
//* Problema: o async/await possui um fluxo bloqueante, ou seja, enquanto ele nao termina de ser executado, eu nao consigo passar para as 
//* proximas linhas de codigo daquele bloco
//* OBS-IMP: ele funcionam apenas com Promises

function pegarUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {nome: "Catiza", idade: 21},
                {nome: "Robson", idade: 20},
                {nome: "Lucao", idade: 23}
            ])
        }, 3000)
    })
}

// pegarUsuarios().then(usuarios => {
//     console.log(usuarios)
// })
//OU
async function principal(){ 
    //Await so funciona em funcoes que possuem async junto da funcao
    let usuarios = await pegarUsuarios()
    console.log(usuarios)
}

principal();


//! DESAFIO 
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
                resolve({time: 6, to: "catiza", corpo, para}) //Promessa cumprida
            }
            else{
                reject("Fila cheia") //Promessa rejeitada
            }
        }, 4000)
    })
}

// async function emailTotalis(){
//     let id = await pegarId()
//     let email = await buscarEmailBanco(id)
//     enviarEmail("Olá, tudo bem?", email).then(({time, to, corpo, para}) => {
//         console.log(`
//             email: ${para}
//             -------------------
//             time: ${time}
//             -------------------
//             to: ${to}
//             -------------------
//             ${corpo}
//             -------------------
//         `)
//     }).catch( erro => {
//         console.log(erro)
//     })
// }

// emailTotalis();


//TODO Tratando quando promises sao rejeitadas dentro de um async/await utilizando try-catch. Nesse caso, quando a promise é rejeitada dentro 
//TODO do try, a rejeicao passa para dentro do catch
async function emailTotalis(){
    let id = await pegarId()
    let email = await buscarEmailBanco(id)

    try{
        await enviarEmail("Ola Gabriel", email)
        console.log("Email enviado com sucesso") // Se promise for rejeitada, eu nem chego nessa segunda linha
    }
    catch(erro){
        console.log(erro)
    }
}

emailTotalis()