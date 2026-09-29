import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'shop', // ← название вашей БД
	password: 'ваш_пароль', // ← пароль
	port: 5432,
});

export default pool;
