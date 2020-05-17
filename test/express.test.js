const request = require('supertest');
const app = require('../app');

test('Login Test', (done) => {
    request(app)
        .post('/auth/login')
        .send({
            "email" : "arijit@gmail.com",
            "password" : "arijit"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        /* .expect('Content-Length', '15') */
        .expect(200)
        .expect()
        .end(function (err, res) {
            if (err) throw err;
            done();
        });
})