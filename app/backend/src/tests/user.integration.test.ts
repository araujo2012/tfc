import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import userModel from '../database/models/User';

import { Response } from 'superagent';
import IToken from '../interfaces/tokenContent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Route Post, /login/', () => {
  let chaiHttpResponse: Response;
  
  const loginUser = {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    // 'secret_user',
  };

  const loginInput = {
    email: loginUser.email,
    password: 'secret_user',
  };

  beforeEach(async () => {
    sinon
      .stub(userModel, 'findOne')
      .resolves(loginUser as userModel);
  });

  afterEach(()=>{
     (userModel.findOne as sinon.SinonStub).restore();
  });

  it('Quando inserido usuario valido, retorna status 200 contendo token', async () => {
    const response = await chai.request(app).post('/login').send(loginInput);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Quando password nao e enviado, retorna status 400 e menssagem de erro', async () => {
    const response = await chai.request(app).post('/login').send({ email: loginInput.email });
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });
});
