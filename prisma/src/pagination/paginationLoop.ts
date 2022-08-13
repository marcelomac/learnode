import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let skip = 0;
  let take = 4;
  let pag = 0;
  let totalReg = await prisma.courses.count();

  function getTotalPag(take: number, totalReg: number) {
    let pag = Math.trunc(totalReg / take);
    pag += totalReg > pag * take ? 1 : 0;
    return pag;
  }

  const totalPag = getTotalPag(take, totalReg);

  for (var i = 1; i <= totalReg; i++) {
    const result = await prisma.courses.findMany({
      skip,
      take,
    });

    if (pag < totalPag) {
      pag++;
      skip = take * pag;
      console.log(result);
      console.log(`------Pág ${pag}/${totalPag}-------`);
    }
    else break;
  }
}

main();
