import postgres from 'postgres'
import  'dotenv/config';

// console.log(process.env.POSTGRES)
const sql = postgres(process.env.POSTGRES) // Opretter forbindelsen med url'en givet i .env

export default sql