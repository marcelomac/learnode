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
  let teacher = await prisma.teachers.create({
    data: {
      name: teacherName,
    },
  });

  console.log(teacher);

  // adicinando um professor já existente:
  let course = await prisma.courses.create({
    data: {
      duration: 200,
      name: courseName,
      description: courseName,
      teacher: {
        connect: {
          id: teacher.id,
        },
      },
    },
  });
  console.log(course);
}

main();
