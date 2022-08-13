import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // SELECT * FROM COURSES LIMIT 1

  const table = "courses";
  const fieldName = "duration";
  const fieldPeriod = "name";
  const valuePeriod = "Curso de  cbvrfkri";
  const prismaClient = prisma[table];

  console.log("prismaClient: ", prismaClient);


  let whereOptions = {}

  const result = await prismaClient.findFirst({
    take: 1,
    select: { [fieldName]: true },
    where: whereOptions,
    orderBy: { [fieldName]: "desc" },
  });

  // const result = await prismaClient.findFirst({
  //   take: 1,
  //   select: { [fieldName]: true },
  //   where: { [fieldPeriod]: `${valuePeriod}` },
  //   orderBy: { [fieldName]: "desc" },
  // });


  console.log("result: ", result);
}

main();
