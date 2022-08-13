import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

var teacherName = `Professor ${Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 8)}`;
var courseName = `Curso de ${Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 8)}`;

async function main() {
  // adicinando um professor já existente:
  let course = await prisma.courses.create({
    data: {
      duration: 200,
      name: courseName,
      description: `Descrição do curso ${courseName}`,
      teacher: {
        create: {
          name: teacherName,
        },
      },
    },
  });
  console.log(course);
}

main();
