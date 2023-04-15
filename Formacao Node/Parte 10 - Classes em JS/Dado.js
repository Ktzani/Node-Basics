const { randomInt } = require("crypto")

class Dado {
    constructor(faces = "6", peso = "2g", jogo = ""){
        this.faces = faces
        this.peso = peso
        this.jogo = jogo
    }

    Rolar() {
        let valorCaido = randomInt(1, this.faces + 1)
        return valorCaido
    }

    MostraValorCaido() {
        let valorCaido = this.Rolar()
        console.log(`O seu dado caiu no valor ${valorCaido}`)
    }
}

let dado20Faces = new Dado(20, "10g", "RPG")

dado20Faces.MostraValorCaido()
