import { Pool } from "pg";

//lembrar de usar uma variavel local para a conncetionString
const connectionString = process.env.CONNECTION_PG;

const db = new Pool({connectionString});

export default db;