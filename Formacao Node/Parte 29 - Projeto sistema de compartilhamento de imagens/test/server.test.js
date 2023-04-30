const supertest = require('supertest');
const app = require('../src/app');

let request = supertest(app)

test("A aplicação deve responder na porta 8080", () => {
    return request.get('/').then(response => {
        expect(response.status).toBe(200)
    }).catch(err =>{
        fail(err)
    })
})