import { Courses, Modules, PrismaClient, Teachers } from "@prisma/client";

const prisma = new PrismaClient();

async function getCourse(): Promise<Courses> {
  const course = await prisma.courses.findFirst({
    take: -1, // -1 para retornar o último criado
  });
  return course!;
}

// Buscar dados em tabelas N:N:
async function main() {
  const result = await prisma.courses.findMany({
    where: {
      id: (await getCourse()).id,
    },
    include: {
      coursesModules: true,
    },
  });

  console.log(JSON.stringify(result));
}

main();

// ---------------------------------------------------------
// Resultado:
// [
//   {
//     id: "ea03aaf7-21a7-4a3d-a262-611f77a5e75a",
//     name: "Curso de  chvueewu",
//     description: "Curso de  chvueewu",
//     duration: 200,
//     created_at: "2022-07-18T14:56:36.169Z",
//     fk_id_teacher: "fad45075-f2a8-441c-bd7b-ffc7d5176c93",
//     coursesModules: [
//       {
//         id: "679a65ed-3589-4ed8-ab20-d19389db3162",
//         fk_id_course: "ea03aaf7-21a7-4a3d-a262-611f77a5e75a",
//         fk_id_module: "a99b0596-09f6-4922-99a0-3bec9344606c",
//         created_at: "2022-07-19T12:02:52.601Z",
//       },
//     ],
//   },
// ];
