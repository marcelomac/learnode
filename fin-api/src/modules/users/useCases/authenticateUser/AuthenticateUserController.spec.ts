import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

describe("Authenticate User", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    // Criando um usuário
    await request(app).post("/api/v1/users").send({
      name: "User Supertest",
      email: "email@supertest.com",
      password: "12345",
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("shold be able to authenticate user", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "email@supertest.com",
      password: "12345",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("shold not be able to authenticate user with invalid email", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "email@WRONG_EMAIL.com",
      password: "12345",
    });

    expect(response.status).toBe(401);
  });

  it("shold not be able to authenticate user with invalid password", async () => {
    const response = await request(app).post("/api/v1/sessions").send({
      email: "email@supertest.com",
      password: "54321",
    });

    expect(response.status).toBe(401);
  });
});
