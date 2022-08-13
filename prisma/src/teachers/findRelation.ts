import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let result = await prisma.courses.findMany({
    include: {
      teacher: true
    }
  });
  console.log(result);
}

main();
