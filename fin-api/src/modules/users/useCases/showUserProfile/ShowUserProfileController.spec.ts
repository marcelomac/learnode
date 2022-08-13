import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

let connection: Connection;
let token: string;

describe("Show a User Profile", () => {
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

  it("shold be able to show a user profile", async () => {
    const response = await request(app)
      .get("/api/v1/profile")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("it should not be possible to show the profile of a non-existent user", async () => {
    const response = await request(app)
      .get("/api/v1/profile")
      .set({ Authorization: "Bearer INVALID_TOKEN" });

    expect(response.status).toBe(401);
  });
});
