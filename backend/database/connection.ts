import pgPromise, { IMain } from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp: IMain = pgPromise();

const databaseString = process.env.DATABASE_URL;

if (!databaseString) {
  throw new Error('Database URL is not defined');
}

const connection = pgp(databaseString);

export default connection;
