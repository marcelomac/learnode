import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClients";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  await document
    .delete({
      TableName: "todos",
      Key: { id: id },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo apagado com sucesso!',
    }),
  };
};
