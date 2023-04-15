class Filme{
    constructor(titulo = "", ano = 2000, genero = "", diretor = "", atores = [], duracao = "2 horas"){
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.diretor = diretor;
        this.atores = atores;
        this.duracao = duracao ;
    } 

    Reproduzir(){
        console.log("Reproduzindo...")
    }

    Pausar(){
        console.log("Pausado ||")
    }

    Avancar(){
        console.log("Avançar >>")
    }

    static Fechar(){
        console.log("Fechar  X")
    }
}

//Metodo estatico: eu chamo ele sem ter que instanciar a classe 
Filme.Fechar()

let vikings = new Filme("Vikings")

vikings.Reproduzir()