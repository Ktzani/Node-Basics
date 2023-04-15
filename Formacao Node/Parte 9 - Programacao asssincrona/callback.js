//! CALLBACK -> pegar uma função que sera chamada posteriormente dentro de alguma ação assincrona quando esta for concluida 
function enviarEmail(corpo, para, callback){
    setTimeout(() => {
        console.log(`
            Para: ${para} 
            --------------------------------
            ${corpo}
            --------------------------------
            De: Catiza       
        `)
        
        var deuErro = false

        if(deuErro) {
            callback(12, "IXAAA deu problema")
        }
        else{
            callback(12)
        }
    }, 2000)  
}

console.log("Envie seu email aqui: ")
enviarEmail("Oi", "Davi Cesar", (tempo, erro) => {

    if(erro == undefined){
        console.log(`Tempo: ${tempo}s`)
        console.log("Seu email foi enviado")
        console.log("TUDO OK")
    }
    else{
        console.log(`Ocorreu um erro: ${erro}`)
    }
     
})


  