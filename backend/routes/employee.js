import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Получить всех сотрудников
router.get('/', async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM "Сотрудник" ORDER BY "idСотрудник"',
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Добавить сотрудника
router.post('/', async (req, res) => {
	const { ФИО, Паспортные_данные, Должность } = req.body;
	try {
		const result = await pool.query(
			`INSERT INTO "Сотрудник" ("ФИО", "Паспортные_данные", "Должность")
       VALUES ($1, $2, $3) RETURNING *`,
			[ФИО, Паспортные_данные, Должность],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Изменить сотрудника
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { ФИО, Паспортные_данные, Должность } = req.body;
	try {
		const result = await pool.query(
			`UPDATE "Сотрудник" SET 
         "ФИО" = $1, 
         "Паспортные_данные" = $2, 
         "Должность" = $3
       WHERE "idСотрудник" = $4 RETURNING *`,
			[ФИО, Паспортные_данные, Должность, id],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Удалить сотрудника
router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM "Сотрудник" WHERE "idСотрудник" = $1', [
			req.params.id,
		]);
		res.json({ message: 'Сотрудник удалён' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
