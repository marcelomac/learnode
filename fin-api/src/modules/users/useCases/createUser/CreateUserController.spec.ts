import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

describe("Create User", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("shold be able to create user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "User Supertest",
      email: "email@supertest.com",
      password: "12345",
    });

    expect(response.status).toBe(201);
  });
});
