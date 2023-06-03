// write unit test cases for users.Controllers.js in controllers folder
// use jest and supertest

// Path: __tests__/test_usres.js

const request = require("supertest");
const app = require("../app");
const db = require("../db");
const User = require("../models/users.Model");
const Course = require("../models/courses.Model");
const Content = require("../models/courseContent.Model");

describe("Test the user path", () => {
  beforeAll(async () => {
    await db.sync();
  });
  afterAll(async () => {
    await db.drop();
  });

  test("It should response the POST method", async () => {
    const response = await request(app).post("/users/register").send({
      email: "jamecog72@gmail.com",
      username: "jamecog72",
      password: "jamecog72",
      type: "student",
    });
    expect(response.statusCode).toBe(201);
  });
});
