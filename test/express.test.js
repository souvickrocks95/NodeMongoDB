const request = require('supertest');
const app = require('../app');
const testMongoConfig = require('../config/mongoConfig');

test('User Create Test', (done) => {
    request(app)
        .post('/users')
        .send({
            "name": "Sam",
            "email": "souvick123@mailinator.com",
            "password": "1234"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        /* .expect('Content-Length', '15') */
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
            done();
        });
})

test('Login Test', (done) => {
    request(app)
        .post('/auth/login')
        .send({
            "email": "souvick123@mailinator.com",
            "password": "1234"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        /* .expect('Content-Length', '15') */
        .expect(200)
        .end(function (err, res) {
            if (err) throw err;
            done();
        });
})

afterAll(async () => {
    testMongoConfig.stopServer();
});