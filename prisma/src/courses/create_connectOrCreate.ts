import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teacherName = `Professor ${Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 8)}`;

const courseName = `Curso de ${Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 8)}`;

const obj = {
  connectOrCreate: {
    where: {
      name: teacherName,
    },
    create: {
      name: teacherName,
    },
  },
};

async function main() {
  // adicinando um professor através do 'connectOrCreate':
  const course = await prisma.courses.create({
    data: {
      duration: 200,
      name: courseName,
      description: courseName,
      teacher: obj,
    },
  });
  console.log(course);
}

main();
