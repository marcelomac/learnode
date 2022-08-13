import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClients";
const { v4: uuidv4 } = require("uuid");

interface ITodo {
  title: string;
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  // recebendo dados do corpo da requisição:
  const { title, deadline } = JSON.parse(event.body) as ITodo;

  const id = uuidv4();
  const { user_id } = event.pathParameters;

  await document
    .put({
      TableName: "todos",
      Item: {
        id,
        user_id: user_id,
        title,
        done: false,
        deadline,
      },
    })
    .promise();

  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();
  // const response = await document
  //   .query({
  //     TableName: "todos",
  //     KeyConditionExpression: "id = :id",
  //     ExpressionAttributeValues: {
  //       ":id": id,
  //     },
  //   })
  //   .promise();

  console.log(response.Items.length);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo criado com sucesso!",
      todo: response.Items[0],
    }),
  };
};
