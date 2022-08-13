var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/functions/listTodos.ts
var listTodos_exports = {};
__export(listTodos_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(listTodos_exports);

// src/utils/dynamodbClients.ts
var import_aws_sdk = require("aws-sdk");
var options = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: "xxxx",
  secretAccessKey: "xxxx"
};
var isOffline = () => {
  console.log("process.env.IS_OFFLINE: ", process.env.IS_OFFLINE);
  return process.env.IS_OFFLINE;
};
var document = isOffline() ? new import_aws_sdk.DynamoDB.DocumentClient(options) : new import_aws_sdk.DynamoDB.DocumentClient();

// src/functions/listTodos.ts
var handler = async (event) => {
  const { user_id } = event.pathParameters;
  const response = await document.scan({
    TableName: "todos",
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();
  console.log("response.Items.length: ", response.Items.length);
  const allTodos = response.Items;
  if (allTodos) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        user_id,
        todos: allTodos
      })
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Todo n\xE3o existe"
    })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=listTodos.js.map
