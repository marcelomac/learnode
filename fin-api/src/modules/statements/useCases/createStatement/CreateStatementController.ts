import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateStatementUseCase } from "./CreateStatementUseCase";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { amount, description } = request.body;
    const { recipient_id } = request.params;
    const splittedPath = request.originalUrl.split("/");
    const type = splittedPath[
      splittedPath.indexOf("statements") + 1
    ] as OperationType;

    const createStatement = container.resolve(CreateStatementUseCase);

    const statement = await createStatement.execute({
      user_id,
      recipient_id,
      type,
      amount,
      description,
    });

    return response.status(201).json(statement);
  }
}
