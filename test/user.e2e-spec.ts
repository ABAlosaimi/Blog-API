import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './../src/user/user.module';
import { User } from 'src/user/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/my-profile (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/my-profile')
      .query({
        userId: 6,
      }) // Query parameters for the GET request
      .expect(200); // Ensure the endpoint returns a 200 status code

    // Assert the response structure or content
    expect(response.body).toEqual(
      expect.objectContaining({
        user: User,
      }),
    );
  });
});
