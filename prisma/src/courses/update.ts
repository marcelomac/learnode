import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //update ou updateMany
  const result = await prisma.courses.update({
    where: {
      id: "29eafdcb-7c71-4e70-848a-f8b22f422383",
    },
    // dado a ser alterado:
    data: {
      duration: 110,
      description: "Curso de MS VsCode",
    },
  });
  console.log(result);
}

main();
