import { PrismaClient } from "@prisma/client";
import fakename from "../utils/fakename";

const prisma = new PrismaClient();

async function main() {
  let result = await prisma.authors.create({
    data: {
      name: fakename('Fulano'),
      books: {
        createMany: {
          data: [
            {name: fakename('Livro de')},
            {name: fakename('Livro de')},
            {name: fakename('Livro de')},
          ]
        },
      },
    },
  });

  console.log(result);
}

main();
