const request = require('supertest');
const app = require('./server');

describe('Temperature API', () => {
  test('POST /temperature should add temperature', async () => {
    const response = await request(app)
      .post('/temperature')
      .send({ value: 23.5 })
      .set('Accept', 'application/json');
    expect(response.status).toBe(201);
    expect(response.text).toBe('Temperature added');
  });

  test('POST /temperature should return 400 for invalid data', async () => {
    const response = await request(app)
      .post('/temperature')
      .send({})
      .set('Accept', 'application/json');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid data: "value" is required');
  });

  test('GET /temperature should return temperature data', async () => {
    await request(app).post('/temperature').send({ value: 25.0 });
    const response = await request(app).get('/temperature');
    expect(response.status).toBe(200);
    expect(response.body).toContain(25.0);
  });
});