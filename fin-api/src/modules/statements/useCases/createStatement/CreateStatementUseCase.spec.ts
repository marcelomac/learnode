import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { OperationType } from "../../entities/Statement";

let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementRepository: InMemoryStatementsRepository;
let user: ICreateUserDTO;

describe("Create statement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementRepository = new InMemoryStatementsRepository();

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementRepository
    );

    user = {
      name: "User Test 1",
      email: "user1@test.com",
      password: "12345",
    };
  });

  it("shold be able to create statement", async () => {
    const userCreated = await createUserUseCase.execute(user);

    const result = await createStatementUseCase.execute({
      user_id: userCreated.id!,
      type: "deposit" as OperationType,
      amount: 100,
      description: "Deposit of $100",
    });
    expect(result).toHaveProperty("id");
  });

  it("shold not be able to create statement with invalid user", async () => {
    expect(async () => {
      await createStatementUseCase.execute({
        user_id: "_INVALID_USER_ID_",
        type: "deposit" as OperationType,
        amount: 100,
        description: "Deposit of $100",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shold not be able to create statement with insufficient funds", async () => {
    expect(async () => {
      const userCreated = await createUserUseCase.execute(user);

      await createStatementUseCase.execute({
        user_id: userCreated.id!,
        type: "deposit" as OperationType,
        amount: 100,
        description: "Deposit of $100",
      });

      await createStatementUseCase.execute({
        user_id: userCreated.id!,
        type: "withdraw" as OperationType,
        amount: 500,
        description: "Withdraw of $500",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
