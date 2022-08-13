import { Courses, Modules, PrismaClient, Teachers } from "@prisma/client";
import fakename from "../utils/fakename";

const prisma = new PrismaClient();

const teacherName = fakename('Professor', ` - ${new Date().toString()}`);

// Criando o relacionamento courses_modules não tendo nenhum dos dois registros:
async function main() {
  const result = await prisma.coursesModules.create({
    data: {
      course: {
        create: {
          name: fakename("Curso de"),
          description: fakename("Descrição do curso"),
          duration: 200,
          teacher: {
            connectOrCreate: {
              where: {
                name: teacherName,
              },
              create: {
                name: teacherName,
              },
            },
          },
        },
      },
      module: {
        create: {
          name: fakename("Curso de"),
          description: fakename("Descrição do curso"),
        },
      },
    },
  });

  console.log(result);
}

main();
