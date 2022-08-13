import { Courses, PrismaClient } from "@prisma/client";
import fakename from "../utils/fakename";

const prisma = new PrismaClient();

// função auxiliar para retornar um curso:
async function getCourse(): Promise<Courses> {
  const result = await prisma.courses.findFirst({
    take: -1, // -1 para retornar o último criado
  });
  return result!;
}

// Criando o module + course + course_module (n:n)
async function main() {
  const result = await prisma.modules.create({
    data: {
      name: fakename("Módulo"),
      description: fakename("Descrição do módulo"),
      coursesModules: {
        create: {
          course: {
            connect: {
              id: (await getCourse()).id,
            },
          },
        },
      },
    },
  });

  console.log(result);
}


main();
