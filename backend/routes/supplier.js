import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Получить всех поставщиков
router.get('/', async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT * FROM "Поставщик" ORDER BY "idПоставщик"',
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Добавить поставщика
router.post('/', async (req, res) => {
	const { Наименование_организации, Контактные_данные } = req.body;
	try {
		const result = await pool.query(
			`INSERT INTO "Поставщик" ("Наименование_организации", "Контактные_данные")
       VALUES ($1, $2) RETURNING *`,
			[Наименование_организации, Контактные_данные],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Изменить поставщика
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { Наименование_организации, Контактные_данные } = req.body;
	try {
		const result = await pool.query(
			`UPDATE "Поставщик" SET 
         "Наименование_организации" = $1, 
         "Контактные_данные" = $2
       WHERE "idПоставщик" = $3 RETURNING *`,
			[Наименование_организации, Контактные_данные, id],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Удалить поставщика
router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM "Поставщик" WHERE "idПоставщик" = $1', [
			req.params.id,
		]);
		res.json({ message: 'Поставщик удалён' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
