import { CoursesModules, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// função auxiliar para retornar um course_module:
async function getCourseModule(): Promise<CoursesModules> {
  const course_module = await prisma.coursesModules.findFirst({
    take: -1, // -1 para retornar o último criado
  });
  return course_module!;
}

async function main() {
  const result = await prisma.coursesModules.delete({
    where: {
      id: (await getCourseModule()).id,
    },
  });

  console.log(JSON.stringify(result));
}

main();
