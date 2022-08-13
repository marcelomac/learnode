import { DynamoDB } from "aws-sdk";

const options = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "xxxx",
  secretAccessKey: "xxxx",
};

/**
 * A variável de ambiente IS_OFFLINE é definida como 'true' pelo plugin "serverless-dynamodb-local"
 */
const isOffline = () => {
  console.log("process.env.IS_OFFLINE: ", process.env.IS_OFFLINE);
  return process.env.IS_OFFLINE;
};

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
