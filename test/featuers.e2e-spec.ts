import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E tests', () => {
  let app: INestApplication;
  let tokenX: string;
  let tokenY: string;
  let articleId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // this test tests the ability of regiter a new user after thier provid their data
  // and checking for it's validation in the process stages, then we gonna hash the pass
  // and reply with user's token that will be used for any futuer oprations
  it('Guest user can register', async () => {
    const payload = {
      username: 'mm-675',
      firstName: 'ali',
      lastName: 'omar',
      password: 'fdfb32k',
    };
    const response = await request(app.getHttpServer())
      .post('/auth-user/register')
      .send(payload);
    console.log('Response Body:', response.body); // Log the error details

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token');
  });

  // after our user registered and signed up their can login in the futuer by their email and pass
  it('the registered user can login with their email and pass', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth-user/login')
      .send({ email: 'jknjnjn@gmail.com', password: 'vbe6sv' });

    console.log('Response Body:', response.body); // Log the error details

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('access_token');
    tokenX = response.body.access_token;
  });

  // here we are testing the fail cases where our app must return an error message in the following case
  it('Login fails with incorrect credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth-user/login')
      .send({ email: 'guest@', password: 'sxsxrd' });
    expect(response.status).toBe(401);
  });

  // here we are testing the public route for non-registered users who want to only read the articles published
  it('guest user can explore articles', async () => {
    const response = await request(app.getHttpServer()).get(
      '/artical/all?page=10&search=how cloud I be like sdfbnhds',
    );
    console.log('Response Body:', response.body); // Log the error details

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  // here we aer testing the case of non-registered gust permissions that can their do or not such as publish an article
  it('non-registered gust cannot publish an article', async () => {
    const response = await request(app.getHttpServer())
      .post('/artical/new-artical/userName/dfbsdb999999')
      .send({ title: 'New Article', body: 'hi im here at ...' });
    expect(response.status).toBe(401);
  });

  // here we are testing the publishing process of loggedin users
  it('Loggedin user can publish an article', async () => {
    const response = await request(app.getHttpServer())
      .post('/artical/new-artical/userName/refn34')
      .set('Authorization', `Bearer ${tokenX}`)
      .send({ title: 'how to be superman in one week', body: 'bla bla bla' });

    expect(response.status).toBe(201);
    articleId = response.body.id;
  });

  // testing the exception handling in artical.service specifically at addNewArtical()
  it('should throw an badreq exception fails without a body', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${tokenX}`)
      .send({ title: '', body: '' });

    expect(response.status).toBe(500);
  });

  // this test tests the following featuer where the front app provid the needed data to perfome the function
  // in UserSirvice
  it('Followign a user featuer', async () => {
    const paylod = { followerid: 3, followedid: 6 };
    const response = await request(app.getHttpServer())
      .post('/user/follow')
      .set('Authorization', `Bearer ${tokenX}`)
      .send(paylod);

    expect(response.status).toBe(201);
  });

  // the following test tests the ability of ownership of your articles to make it eidted only by you
  it('Authorization: User X cannot edit User Y`s article', async () => {
    const loginY = await request(app.getHttpServer())
      .post('/auth-user/login')
      .send({ email: 'jknjnjn@gmail.com', password: 'ddhbd56' });
    tokenY = loginY.body.access_token;

    const editResponse = await request(app.getHttpServer())
      .put(`/posts/${articleId}`)
      .set('Authorization', `Bearer ${tokenY}`)
      .send({ title: 'Unauthorized Edit' });
    console.log('Response Body:', editResponse.body); // Log the error details

    expect(editResponse.status).toBe(403);
  });
});
