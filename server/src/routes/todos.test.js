const request = require('supertest');
const app = require('../server');

const newTodo = {
  id: '12345qwerty',
  name: 'Hellow world!',
  date: new Date(),
  done: false,
}

describe("Test GET /todos", () => {
  test('it should respond with 200 success', async () => {
    const response = await request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toEqual(data.length);
  });
});

describe("Test POST /todos", () => {
  test('it should respond with 201 created', async () => {

    const response = await request(app)
      .post('/todos')
      .send(newTodo)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.name).toEqual(newTodo.name);

    const newTodoDate = newTodo.date.valueOf();
    const responseDate = new Date(response.body.date).valueOf();

    expect(newTodoDate).toEqual(responseDate);
  });
  test('it should respond with 400 error', async () => {
    const response = await request(app)
      .post('/todos')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toEqual({
      error: "Missing required name property"
    })
  });
});

describe("Test PUT /todos", () => {
  test('it should respond with 200 success', async () => {
    const response = await request(app)
      .put('/todos')
      .send(newTodo)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.ok).toBe(true);
  });
  test('it should respond with 404 error', async () => {
    const response = await request(app)
      .put('/todos')
      .send({})
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).toEqual({
      error: "todo not found"
    });
  });
});

describe("Test DELETE /todos", () => {
  test('it should respond with 200 success', async () => {
    const response = await request(app)
      .delete('/todos/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.ok).toBe(true);
  });
  test('it should respond with 404 error', async () => {
    const response = await request(app)
      .delete('/todos/null')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toEqual({
      error: "todo not found"
    });
  });
});