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

// src/functions/deleteTodos.ts
var deleteTodos_exports = {};
__export(deleteTodos_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(deleteTodos_exports);

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

// src/functions/deleteTodos.ts
var handler = async (event) => {
  const { id } = event.pathParameters;
  await document.delete({
    TableName: "todos",
    Key: { id }
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo apagado com sucesso!"
    })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=deleteTodos.js.map
