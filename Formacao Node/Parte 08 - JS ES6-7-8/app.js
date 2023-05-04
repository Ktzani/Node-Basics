//* ESCOPO -> nivel de acesso da minha variavel
//let -> escopo global, local e bloco
//var -> apenas escopo global e local
//Global: todo mundo pode usar o cara!
//Local: Só a funcao onde foi declarado pode usa-lo
//Bloco: Se for declarada dentro de um if, else if, while, for, switch, so podera ser acessador dentro daquele bloco {} 

//? PARAMETROS OPCIONAIS
function soma(a = 50, b = 20){
    console.log(a + b)
}
function soma(a, b = 20){
    console.log(a + b)
}
//Nao posso fazer isso. Os parametros opcionais tem que ser sempre os ultimos
function soma(a, b = 20, c){
    console.log(a + b)
}

//TODO JSON ENCURTADOS e SPREAD (...)
let nome1 = "Catiza"
let idade = 21
let empresa = {
    nomeEmpresa: "CatizaInc",
    cidade: "BH",
    site: "www.catizainc.com",
    email: "gabrielcatizani2001@hotmail.com"
}

let user1 = {
    nome1,
    idade,
    ...empresa //Copio e colo os campos de empresa dentro do user
}
console.log(user1)

//! DESESTRUTURAÇÃO
let user2 = {
    nome: "Gabriel",
    prof: "Deiber",
    pai: "Oza",
    curso: "Computação"
}

//Lembrar: Para o operador de desestruturaçao funcionar, é preciso ter o mesmo nome nas variaveis
let { nome, prof, pai} = user2;
let { curso } = user2;
console.log(nome)
console.log(prof)
console.log(pai)
console.log(curso)

//? ARROW FUNCTION 
//A arrow function so pode ser utilizada em duas situaçoes: quando eu tenho uma callback function (como no express) ou quando eu atrbibuo a uma variavel
let soma3 = a => {
    console.log(a)
}
let soma4 = (a, b, c) => {
    return a + b + c
}

//Esses casos so funcionam se a minha função possui apenas uma linha
let soma5 = (a, b, c) => console.log(a + b + c);
let soma6 = (a, b, c) => a + b + c;

//* FIND: verifica() cada um dos elementos do meu array em busca de uma condicao especifica. No primeiro caso que a funcao retorna verdadeiro,
//* retorno o elemento (usuario) encontrado e paro de buscar
let gabriel = {
    nome: "Catiza",
    idade: 21
} //verifica() => false

let robson = {
    nome: "Novato",
    idade: 22
} //verifica() => false

let pedro = {
    nome: "Lucas",
    idade: 23
} //verifica() => true

let users = [gabriel, robson, pedro]

let usuario = users.find(user => user.idade === 23); 

console.log(usuario)

//! Template literals 
let nomeCompleto = "Gabriel Catizani"
let sobre = "Cientista da computação"

//Posso quebrar linhas com template literals 
let frase = `Olá!! Me chamo ${nomeCompleto} e sou ${sobre}`

console.log(frase)

 