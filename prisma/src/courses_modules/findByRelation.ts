import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Buscar dados em tabelas N:N a partir da tabela pivô:
async function main() {
  const result = await prisma.coursesModules.findMany({
    
    // ATENÇÃO:
    // se precisar somente dos 'id', não usar 'include'
    // usar 'include' para retornar os dados dos models do relacionamento
    include: {
      course: true,
      module: true,
    },
  });

  console.log(JSON.stringify(result));
}

main();

// ---------------------------------------------------------
// Resultado:

// [
//   {
//     id: "fba9bd7a-3664-47a6-af0d-eacac3a8286e",
//     fk_id_course: "16c9e79c-06f0-403b-a536-8cc4f29a92a5",
//     fk_id_module: "a99b0596-09f6-4922-99a0-3bec9344606c",
//     created_at: "2022-07-19T11:55:48.932Z",
//     course: {
//       id: "16c9e79c-06f0-403b-a536-8cc4f29a92a5",
//       name: "Curso de  cbvrfkri",
//       description: "Curso de  cbvrfkri",
//       duration: 200,
//       created_at: "2022-07-18T15:06:23.596Z",
//       fk_id_teacher: "09dae657-bfbe-46b5-8f97-65ee72da0751",
//     },
//     module: {
//       id: "a99b0596-09f6-4922-99a0-3bec9344606c",
//       name: "Módulo fauottky",
//       description: "Descrição do módulo aztgykll",
//       created_at: "2022-07-19T11:41:07.604Z",
//     },
//   },
//   {
//     id: "679a65ed-3589-4ed8-ab20-d19389db3162",
//     fk_id_course: "ea03aaf7-21a7-4a3d-a262-611f77a5e75a",
//     fk_id_module: "a99b0596-09f6-4922-99a0-3bec9344606c",
//     created_at: "2022-07-19T12:02:52.601Z",
//     course: {
//       id: "ea03aaf7-21a7-4a3d-a262-611f77a5e75a",
//       name: "Curso de  chvueewu",
//       description: "Curso de  chvueewu",
//       duration: 200,
//       created_at: "2022-07-18T14:56:36.169Z",
//       fk_id_teacher: "fad45075-f2a8-441c-bd7b-ffc7d5176c93",
//     },
//     module: {
//       id: "a99b0596-09f6-4922-99a0-3bec9344606c",
//       name: "Módulo fauottky",
//       description: "Descrição do módulo aztgykll",
//       created_at: "2022-07-19T11:41:07.604Z",
//     },
//   },
// ];
