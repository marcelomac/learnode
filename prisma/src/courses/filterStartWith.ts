import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let result = await prisma.courses.findMany({
    where: {
      name: {
        startsWith: "curso de",
        mode: "insensitive",
      },
    },
  });
  console.log(result);
}

main();
