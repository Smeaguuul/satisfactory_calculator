import postgres from 'postgres'

const sql = postgres('postgres://obscure:secure@192.168.1.131:5432/satisfactory_calculator') // will use psql environment variables

export default sql