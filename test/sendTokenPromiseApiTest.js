let chai = require('chai')
let chaiHttp = require('chai-http')
var expect = require('expect')
let server = require('../app.js');
var expect = chai.expect;
chai.use(chaiHttp)


describe('sendTokenPromiseApi Test', () => {
    it('api get should return status 200 and a transaction hash', (done) => {
          chai.request(server)
          .post('/sendTokenPromiseApi')
          .set('content-type', 'application/x-www-form-urlencoded')
          .type('form')
          .send({ 
                password : "",
                tokenAmount: "1",
                toAddress :"0x63f435b55153A9AE2843216c2c6BE46701054cbd",
                fromAddress : "0xcD8E3E5B4a92cB8689Da99026f11624d59B45a5c",
                keyStore: "",
            })
          .end((err, res) => {
                expect(res).to.have.status(200);
                //console.log ( res.text )
            done();
          });
    });
});