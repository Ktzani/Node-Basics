const supertest = require('supertest');
let app = require("../src/app")

//Intergracão automatica com o express a partir disso
const request = supertest(app)

//! IMPORTANTE: os expects sao como os assertions do C++ e assim como lá eu posso ter varios dentro de um mesmo teste 
// Trabalhando com promise no Jest, é necessario colocar o return ou async/await
test("A aplicação deve responder na porta 3131", async () => {
    return request.get("/").then(res => expect(res.statusCode).toEqual(200))
})

test("Deve retornar vermelho como cor favorita do catiza", async () => {
    return request.get("/cor/catiza").then(res => {
        expect(res.body.cor).toEqual("Vermelho")
        expect(res.statusCode).toEqual(200)
        expect(res.body.color).toEqual("Red")
    })
})