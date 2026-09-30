import pg from 'pg';
const { Pool } = pg;
require('dotenv').config();

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	ssl: {
		rejectUnauthorized: false, // нужно для Render
	},
});

// Проверка подключения при запуске
pool
	.connect()
	.then((client) => {
		console.log('✅ Успешно подключились к PostgreSQL (Render)');
		client.release();
	})
	.catch((err) => {
		console.error('❌ Ошибка подключения к PostgreSQL:', err.message);
	});

export default pool;
