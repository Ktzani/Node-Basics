class Leitor{
    Ler(){
        console.log("Lendo.....")
    }
}

class Escritor {
    Escrever(dados){
        console.log("Escrevendo dados.....")
    }
}

class Criador{
    Criar(nome){
        console.log("Criando arquivos " + nome)
    }
}

class Destruidor{
    Deletar(nome){
        console.log("Deletando arquivo: " + nome)
    } 
}

class ManipuladorDeArquivo{
    constructor(nome){
        this.arquivo = nome
        this.leitor = new Leitor()
        this.escritor = new Escritor()
        this.criador = new Criador()
        this.destruidor = new Destruidor()
    }
}

class GerenciadorDeUsuarios{
    constructor(){
        this.criador = new Criador()
        this.escritor = new Escritor()
    }

    SalvarListaDeUsuarios(Lista){
        this.criador.Criar()
        this.escritor.Escrever("usuarios.txt")
    }
}

var manipulador = new ManipuladorDeArquivo("meuarquivo.txt")

manipulador.leitor.Ler()
manipulador.leitor.Escrever()
manipulador.leitor.Criador()
manipulador.leitor.Deletar()