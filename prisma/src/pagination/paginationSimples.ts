import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findMany({
    skip: 0,  // número de registros iniciais a ignorar
    take: 2,  // número de registros a retornar por vez
  });
  console.log(result);
}

main();
