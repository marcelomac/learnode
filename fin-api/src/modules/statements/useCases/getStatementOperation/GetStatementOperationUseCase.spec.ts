import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { OperationType } from "../../entities/Statement";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementRepository: InMemoryStatementsRepository;
let user: ICreateUserDTO;

describe("Get Operation", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementRepository = new InMemoryStatementsRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementRepository
    );

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

  it("shold be able to get statement operation", async () => {
    const userCreated = await createUserUseCase.execute(user);

    const statement = await createStatementUseCase.execute({
      user_id: userCreated.id!,
      type: "deposit" as OperationType,
      amount: 100,
      description: "Deposit of $100",
    });

    const result = await getStatementOperationUseCase.execute({
      user_id: userCreated.id!,
      statement_id: statement.id!,
    });

    expect(result).toHaveProperty("id");
  });

  it("shold not be able to get statement operation with invalid user", async () => {
    expect(async () => {
      const userCreated = await createUserUseCase.execute(user);

      const statement = await createStatementUseCase.execute({
        user_id: userCreated.id!,
        type: "deposit" as OperationType,
        amount: 100,
        description: "Deposit of $100",
      });

      await getStatementOperationUseCase.execute({
        user_id: "_INVALID_USER_ID_",
        statement_id: statement.id!,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
