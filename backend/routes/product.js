import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Получить все
router.get('/', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM "Товар" ORDER BY "idТовар"');
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Добавить
router.post('/', async (req, res) => {
	const {
		Наименование,
		Категория,
		Единица_измерения,
		Цена,
		Срок_годности,
		Количество_на_складе,
	} = req.body;
	try {
		const result = await pool.query(
			`INSERT INTO "Товар" 
       ("Наименование", "Категория", "Единица_измерения", "Цена", "Срок_годности", "Количество_на_складе")
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
			[
				Наименование,
				Категория,
				Единица_измерения,
				Цена,
				Срок_годности,
				Количество_на_складе,
			],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Изменить
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const {
		Наименование,
		Категория,
		Единица_измерения,
		Цена,
		Срок_годности,
		Количество_на_складе,
	} = req.body;
	try {
		const result = await pool.query(
			`UPDATE "Товар" SET 
         "Наименование"=$1, "Категория"=$2, "Единица_измерения"=$3, 
         "Цена"=$4, "Срок_годности"=$5, "Количество_на_складе"=$6
       WHERE "idТовар"=$7 RETURNING *`,
			[
				Наименование,
				Категория,
				Единица_измерения,
				Цена,
				Срок_годности,
				Количество_на_складе,
				id,
			],
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Удалить
router.delete('/:id', async (req, res) => {
	try {
		await pool.query('DELETE FROM "Товар" WHERE "idТовар" = $1', [
			req.params.id,
		]);
		res.json({ message: 'Удалено' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
