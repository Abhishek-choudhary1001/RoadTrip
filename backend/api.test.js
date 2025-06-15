// api.test.js
const request = require('supertest');
const app = require('./server');

test('GET /api/weather returns 200', async () => {
  const res = await request(app).get('/api/weather?city=Agra');
  expect(res.statusCode).toBe(200);
});

test('POST /api/register returns 201', async () => {
  const res = await request(app)
    .post('/api/register')
    .send({ username: 'test', password: 'test123' });
  expect(res.statusCode).toBe(201);
});
