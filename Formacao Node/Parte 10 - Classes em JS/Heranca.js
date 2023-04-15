// super.metodo() //Faz referencia a classe mae

class Animal {
    constructor(nome = "", peso = 10, idade = ""){
        this.nome = nome
        this.peso = peso
        this.idade = idade

    }

    contantoEstoque(){
        console.log("O estoque esta acabando")
    }

    metodoPai() {
        console.log("Oi eu sou um animal")
    } 
}

class Dog extends Animal {
    constructor(nome = "", peso = 10, idade = "", preco, raca) {
        super(nome,peso,idade) // Dessa maneira eu passo os valores dos atributos da classe mae para a classe filha e em seguida 
                               // crio novos atributos
        this.preco = preco
        this.raca = raca
    }

    Latir() {
        console.log("ROOF ROOF")
    }

    contantoEstoque(){
        console.log("Os cachorros estão acabando")
    }

    metodoFilho() {
        super.metodoPai()  //Faz referencia a classe mae
        console.log("E agora tambem sou um cachorro")
    }
}

let dog = new Dog("Fox", 15, 12, 5000, "Corgi")

dog.Latir()
dog.contantoEstoque()
dog.metodoFilho()

let animal = new Animal("Aline", 10, 5)