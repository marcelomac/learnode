import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host:
        process.env.NODE_ENV!.trim() === "test" ? "localhost" : process.env.HOST,
      database:
        process.env.NODE_ENV!.trim() === "test"
          ? "fin_api_test"
          : defaultOptions.database,
    })
  );
};

/*
import { createConnection } from 'typeorm';

(async () => await createConnection())();

*/
