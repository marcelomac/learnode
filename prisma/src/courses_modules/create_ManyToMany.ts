import { Courses, Modules, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// função auxiliar para retornar um curso:
async function getCourse(): Promise<Courses> {
  const course = await prisma.courses.findFirst({
    take: -1, // -1 para retornar o último criado
  });
  return course!;
}

// função auxiliar para retornar um module:
async function getModule(): Promise<Modules> {
  const module = await prisma.courses.findFirst({
    take: -1, // -1 para retornar o último criado
  });
  return module!;
}

// Criando o relacionamento courses_modules tendo os dois Ids já criados:
async function main() {
  const result = await prisma.coursesModules.create({
    data: {
      fk_id_course: "16c9e79c-06f0-403b-a536-8cc4f29a92a5", //(await getCourse()).id,
      fk_id_module: "a99b0596-09f6-4922-99a0-3bec9344606c", //(await getModule()).id,
      // fk_id_course: (await getCourse().then()).id,
      // fk_id_module: (await getModule().then()).id,
    },
  });

  console.log(result);
}

main();
