'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var sinon = require('sinon');
var app = require('../../src/app');
var { BusinessConstantService } = require('../../src/services');


chai.use(chaiHttp);

describe('BusinessConstant Routes Test', () => {

  before(() => {
    sinon.stub(BusinessConstantService, 'getByName');
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
      BusinessConstantService.getByName.returns(null);

      var res = await chai.request(app)
        .get('/manage/constants/tripcosts');

      chai.assert.strictEqual(res.status, 404, 'status was not 404');
    });

  });


});
