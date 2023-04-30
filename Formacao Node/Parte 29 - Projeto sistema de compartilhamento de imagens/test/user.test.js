const supertest = require('supertest');
const app = require('../src/app');

let request = supertest(app)

//Função que vai ser executada antes de qualquer teste rodar e é como se fosse uma função global em que 
//o que está dentro dela pode ser reutilizada em todos os testes. Como por exemplo, vou inserir um unico
//usuario no banco para ficar o reutilizando
beforeAll(() => {
    console.log("DEPOIS DE 12 ")
})


//Essa funçao é rodado ao final da switch de testes. Logo, quando todos meus testes forem concluidos, eu rodo a função afterAll. 
//Logo, eu coloco qualquer logica que desejo executar ao fim da minha switch, como por exemplo, deletar um usuario ao final do teste
afterAll(() => {

})


//Roda uma vez antes de cada teste dentro da minhas switch, ou seja, antes de cada teste ele é executado
beforeEach(() => {

}) 

//Mesma logica do beforeEach. A diferença é que ele roda apos cada teste ao inves de antes de cada teste
afterEach(() => {

}) 

describe("Cadastro de usuario", () => {
    test("Deve cadastrar o usuário com sucesso", () => {
        let time = Date.now() 
        let email = `${time}@gmail.com`
        let user = {name: "Victor", email, password: "123456"}

        return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(email)
            }).catch(err => {
                fail(err)
            })
    })

    test("Deve impedir que usuario cadastre com dados vazios", () => {
        let user = {name: "", email: "", password: ""}

        return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400)
            }).catch(err => {
                fail(err)
            })
    })

    test("Deve impedir que usuario se cadastre com e-email já cadastrado", () => {
        let time = Date.now() 
        let email = `${time}@gmail.com`
        let user = {name: "Victor", email, password: "123456"}

        return request.post("/user")
            .send(user)
            .then(async (res) => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.email).toEqual(email)

                return request.post("/user")
                    .send(user)
                    .then( res => {
                        expect(res.statusCode).toEqual(400)
                        expect(res.body.error).toEqual("E-mail já cadastrado!")
                    }).catch((err) => {
                        fail(err)
                    })
            }).catch(err => {
                fail(err)
            })
    })
})