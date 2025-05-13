import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
import server from '../src/server.js';

function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    });
    req.on('error', (err) => reject(err));
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

describe('Basic Tests', () => {
  let userId;

  afterAll((done) => {
    server.close(done);
  });

  test('POST /api/users - create new user', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/users',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    const payload = JSON.stringify({
      username: 'Alice',
      age: 25,
      hobbies: ['coding']
    });
    const response = await makeRequest(options, payload);
    expect(response.statusCode).toBe(201);
    const responseBody = JSON.parse(response.data);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.username).toBe('Alice');
    userId = responseBody.id;
  });

  test('GET /api/users/:userId - get new user', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `/api/users/${userId}`,
      method: 'GET'
    };
    const response = await makeRequest(options);
    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.data);
    expect(responseBody).toHaveProperty('id', userId);
  });

  test('DELETE /api/users/:userId - remove user', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `/api/users/${userId}`,
      method: 'DELETE'
    };
    const response = await makeRequest(options);
    expect(response.statusCode).toBe(204);
  });
});
