import { Authors, PrismaClient } from "@prisma/client";
import fakename from "../utils/fakename";

const prisma = new PrismaClient();

// função auxiliar para retornar um autor:
async function getAuthor(): Promise<Authors> {
  const result = await prisma.authors.findFirst({
    take: -1, // -1 para retornar o último criado
  });
  return result!;
}

async function main() {
  

  //let result = await prisma.books.create({
  let prismaClient = prisma['books'];
  let result = await prismaClient.create({
    data: {
      name: fakename("Livro de"),
      author_id: (await getAuthor()).id,
    },
  });

  console.log(result);
}

main();
