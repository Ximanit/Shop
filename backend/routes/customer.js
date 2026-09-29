import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM "Покупатель" ORDER BY "idПокупатель"',
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post('/', async (req, res) => {
	const { ФИО, Паспортные_данные, Дата_рождения, Контактный_телефон } =
		req.body;
	try {
		const result = await pool.query(
			`INSERT INTO "Покупатель" ("ФИО", "Паспортные_данные", "Дата_рождения", "Контактный_телефон")
       VALUES ($1,$2,$3,$4) RETURNING *`,
			[ФИО, Паспортные_данные, Дата_рождения, Контактный_телефон],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { ФИО, Паспортные_данные, Дата_рождения, Контактный_телефон } =
		req.body;
	try {
		const result = await pool.query(
			`UPDATE "Покупатель" SET 
         "ФИО"=$1, "Паспортные_данные"=$2, "Дата_рождения"=$3, "Контактный_телефон"=$4
       WHERE "idПокупатель"=$5 RETURNING *`,
			[ФИО, Паспортные_данные, Дата_рождения, Контактный_телефон, id],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM "Покупатель" WHERE "idПокупатель" = $1', [
			req.params.id,
		]);
		res.json({ message: 'Удалено' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
