import { PrismaClient } from "@prisma/client";
import fakename from "../utils/fakename";

const prisma = new PrismaClient();

async function main() {
  let result = await prisma.authors.create({
    data: {
      name: fakename('Dr. Ciclano'),
      books: {
        create: {
          name: fakename('Livro de'),
        },
      },
    },
  });

  console.log(result);
}

main();
