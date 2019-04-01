'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('Basic Mocha String Test', () => {
  it('should return number of charachters in a string', (done) => {
    chai.expect('Hello'.length).to.equal(5);
    done();
  });

  it('should return first charachter of the string', (done) => {
    chai.expect('Hello'.charAt(0)).to.equal('H');
    done();
  });
});

describe('Sample endpoint test', () => {
  describe('GET /ping', () => {
    it('should return status 200', (done) => {
      chai.request(app)
        .get('/ping')
        .end((err, res) => {
          res.should.have.status(200);
          done(err);
        });
    });
  });
});
