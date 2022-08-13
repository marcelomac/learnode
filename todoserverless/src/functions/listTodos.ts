import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClients";

export const handler: APIGatewayProxyHandler = async (event) => {
  // recebendo dados do corpo da requisição:
  const { user_id } = event.pathParameters;

  const response = await document
    .scan({
      TableName: "todos",
      FilterExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
    })
    .promise();

  console.log('response.Items.length: ', response.Items.length);
  const allTodos = response.Items;

  if (allTodos) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        user_id,
        todos: allTodos,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Todo não existe",
    }),
  };
};
