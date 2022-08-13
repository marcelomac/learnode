import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;
let user: ICreateUserDTO;

describe("Show a User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );

    user = {
      name: "User Test 1",
      email: "user1@test.com",
      password: "12345",
    };
  });

  it("shold not be show profile of user with invalid id", async () => {

    expect(async () => {
      await createUserUseCase.execute(user);

      await showUserProfileUseCase.execute('XXX_INVALID_USER_ID_XXX');
    }).rejects.toBeInstanceOf(AppError);
  });
});
