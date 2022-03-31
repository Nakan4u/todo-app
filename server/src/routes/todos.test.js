const request = require('supertest');

const app = require('../app.js');
const { mongoConnect, mongoDisconnect } = require('../services/mongo.js');
const { setTestTodo, testTodo } = require('../models/todos.model.js');

const TODO_API = '/v1/todos';

describe('Tests', () => {

  beforeAll(async () => {
    await mongoConnect();
    await setTestTodo();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("API: '/todos'", () => {
    describe("Test GET method", () => {
      test('it should respond with 200 success', async () => {
        await request(app)
          .get(TODO_API)
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });

    describe("Test POST method", () => {
      test('it should respond with 201 created', async () => {
        const response = await request(app)
          .post(TODO_API)
          .send(testTodo)
          .expect('Content-Type', /json/)
          .expect(201);

        expect(response.body.ok).toBeTruthy();
      });
      test('it should respond with 400 error', async () => {
        const response = await request(app)
          .post(TODO_API)
          .send({})
          .expect('Content-Type', /json/)
          .expect(400);

        expect(response.body).toEqual({
          error: "missing required property"
        })
      });
    });

    describe("Test PUT method", () => {
      test('it should respond with 200 success', async () => {
        const response = await request(app)
          .put(TODO_API)
          .send(testTodo)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.ok).toBe(true);
      });
      test('it should respond with 400 error', async () => {
        const response = await request(app)
          .put(TODO_API)
          .send({})
          .expect('Content-Type', /json/)
          .expect(400);
        expect(response.body).toEqual({
          error: "missing required property"
        })
      });
      test('it should respond with 404 error', async () => {
        const notExistTodo = { id: '2', name: "test2", done: false, date: new Date() };
        const response = await request(app)
          .put(TODO_API)
          .send(notExistTodo)
          .expect('Content-Type', /json/)
          .expect(404);
        expect(response.body).toEqual({
          error: "todo not found"
        });
      });
    });

    describe("Test DELETE method", () => {
      test('it should respond with 200 success', async () => {
        const response = await request(app)
          .delete(`${TODO_API}/0`)
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body.ok).toBe(true);
      });
      test('it should respond with 404 error', async () => {
        const response = await request(app)
          .delete(`${TODO_API}/1234`)
          .expect('Content-Type', /json/)
          .expect(404);

        expect(response.body).toEqual({
          error: "todo not found"
        });
      });
    });
  });
});