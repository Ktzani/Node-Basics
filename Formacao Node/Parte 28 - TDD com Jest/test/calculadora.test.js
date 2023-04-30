let index = require('../index');

//Com o describe eu separo o teste em CATEGORIAS. O mais legal é que isso organiza muito o codigo
describe("Operações básicas", () => {

    // it() -> usado para quando é um teste em ingles it("Should do something")
    //Coloco um texto explico o que o teste vai testar
    test("Deve retornar o valor 10 ao somar 5 com 5", () => {
        let resultado = index.soma(5, 5)

        //toBe -> parecido com toEqual, porem esparasse que o dado passado seja do mesmo tipo do resultado
        expect(resultado).toEqual(10) //Resultado que é esperado
    })


    test("Deve retornar o valor 10 ao multiplar 2 por 5", () => {
        let resultado = index.mult(2, 5)

        expect(resultado).toEqual(10) //Resultado que é esperado
    })

})

// describe("Operações geometricas", () => {})