import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;
let token: string;

describe("Create statements", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    // Criando um usuário:
    await request(app).post("/api/v1/users").send({
      name: "User Supertest",
      email: "email@supertest.com",
      password: "12345",
    });

    // Criando a Sessão:
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "email@supertest.com",
      password: "12345",
    });
    token = responseToken.body.token;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("shold be able to create a statement of type deposit", async () => {
    const response = await request(app)
      .post("/api/v1/statements/deposit")
      .send({
        amount: 100,
        description: "deposit statement test",
        type: "deposit",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("shold be able to create a statement of type withdraw", async () => {
    const response = await request(app)
      .post("/api/v1/statements/withdraw")
      .send({
        amount: 90,
        description: "withdraw statement test",
        type: "withdraw",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
