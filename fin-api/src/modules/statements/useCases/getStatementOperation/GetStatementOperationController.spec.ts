import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;
let token: string;

describe("Get Operation", () => {
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

  it("shold be able to get a operation", async () => {
    const responseStatement = await request(app)
      .post("/api/v1/statements/deposit")
      .send({
        amount: 100,
        description: "deposit statement test",
        type: "deposit",
      })
      .set({ Authorization: `Bearer ${token}` });

    const { id } = responseStatement.body;

    const response = await request(app)
      .get(`/api/v1/statements/${id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("type");
  });
});
