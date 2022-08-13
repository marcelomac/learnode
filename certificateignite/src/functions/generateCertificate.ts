import { APIGatewayProxyHandler } from "aws-lambda";
import * as handlebars from "handlebars";
import { join } from "path";
import { readFileSync } from "fs";
import dayjs from "dayjs";
import { S3 } from "aws-sdk";

/**
 * ERRO importanto como:
 * import * as chromium from "chrome-aws-lambda";
 * para corrigir:
 * adicionado em "tsconfig.json" a alinha ' "esModuleInterop": true, '
 */
import chromium from "chrome-aws-lambda";

import { document } from "../utils/dynamodbClients";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate {
  id: string;
  name: String;
  grade: string;
  medal: string;
  date: string;
}

// process.cwd(): raiz do projeto
const compileTemplate = async (data: ITemplate) => {
  const filePath = join(process.cwd(), "src", "templates", "certificate.hbs");
  const html = readFileSync(filePath, "utf-8");

  return handlebars.compile(html)(data);
};

/**
 * APIGatewayProxyHandler: retorna uma Promise<void>
 * @param event
 * @returns
 */
export const handler: APIGatewayProxyHandler = async (event) => {
  // recebendo dados do corpo da requisição:
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  const response = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  // verificar se o user já existe:
  const userAlreadyExists = response.Items[0];

  if (!userAlreadyExists) {
    await document
      .put({
        TableName: "users_certificate",
        Item: {
          id,
          name,
          grade,
          created_at: new Date().getTime(),
        },
      })
      .promise();
  }

  const medalPath = join(process.cwd(), "src", "templates", "selo.png");
  const medal = readFileSync(medalPath, "base64");

  const data: ITemplate = {
    id,
    name,
    grade,
    date: dayjs().format("DD/MM/YYYY"),
    medal,
  };

  // gera o template compilado:
  const content = await compileTemplate(data);

  // simula a criação de uma página no browser:
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage();

  await page.setContent(content);

  const pdf = await page.pdf({
    format: "a4",
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    path: process.env.IS_OFFLINE ? "./certificate.pdf" : null,
  });

  await browser.close();

  // Salvar no AWS S3:
  const s3 = new S3();

  await s3
    .putObject({
      Bucket: "certificatesignite2022",
      Key: `${id}.pdf`,
      ACL: "public-read",
      Body: pdf,
      ContentType: "aplication/pdf",
    })
    .promise();

  /**
   * DynamoDB (NoSQL) retorna um array:
   */
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificado criado com sucesso!",
      url: `https://certificatesignite2022.s3.amazonaws.com/${id}.pdf`,
    }),
  };
};
