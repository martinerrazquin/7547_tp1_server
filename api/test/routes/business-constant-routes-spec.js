'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../../src/app');
var { TripCostsService } = require('../../src/services');


chai.use(chaiHttp);

describe('BusinessConstant Routes Test', () => {

  before(() => {
    sinon.stub(TripCostsService, 'retrieve');
  });

  // var clock;

  beforeEach(() => {
    sinon.resetHistory();
  });

  after(() => {
    sinon.restore();
  });

  describe('GET /manage/constants/tripcosts', () => {

    it('should return 404 if not found', async() => {
      TripCostsService.retrieve.returns(null);

      var res = await chai.request(app)
        .get('/manage/constants/tripcosts');

      chai.assert.strictEqual(res.status, 404, 'status was not 404');
    });

  });


});
