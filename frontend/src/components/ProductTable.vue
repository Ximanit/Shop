<template>
	<div class="entity">
		<div class="entity-header">
			<h2>Товары</h2>
			<button class="btn btn-primary" @click="showForm = !showForm">
				{{ showForm ? 'Скрыть форму' : '+ Добавить товар' }}
			</button>
		</div>

		<!-- Форма -->
		<transition name="fade">
			<div v-if="showForm" class="card form-card">
				<h3>{{ editId ? 'Редактирование товара' : 'Новый товар' }}</h3>

				<div class="form-grid">
					<div class="form-group">
						<label>Наименование</label>
						<input
							v-model="form.Наименование"
							placeholder="Например: Молоко 3.2%" />
					</div>
					<div class="form-group">
						<label>Категория</label>
						<input v-model="form.Категория" placeholder="Молочные продукты" />
					</div>
					<div class="form-group">
						<label>Единица измерения</label>
						<input v-model="form.Единица_измерения" placeholder="шт / кг" />
					</div>
					<div class="form-group">
						<label>Цена</label>
						<input v-model.number="form.Цена" type="number" placeholder="0" />
					</div>
					<div class="form-group">
						<label>Срок годности</label>
						<input v-model="form.Срок_годности" placeholder="2026-12-31" />
					</div>
					<div class="form-group">
						<label>Количество на складе</label>
						<input
							v-model.number="form.Количество_на_складе"
							type="number"
							placeholder="0" />
					</div>
				</div>

				<div class="form-actions">
					<button class="btn btn-primary" @click="save">
						{{ editId ? 'Сохранить изменения' : 'Добавить' }}
					</button>
					<button class="btn btn-secondary" @click="cancel">Отмена</button>
				</div>
			</div>
		</transition>

		<!-- Таблица -->
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Наименование</th>
						<th>Категория</th>
						<th>Ед.</th>
						<th>Цена</th>
						<th>Срок</th>
						<th>Остаток</th>
						<th style="width: 160px">Действия</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in items" :key="item.idТовар">
						<td>{{ item.idТовар }}</td>
						<td>
							<strong>{{ item.Наименование }}</strong>
						</td>
						<td>
							<span class="badge">{{ item.Категория }}</span>
						</td>
						<td>{{ item.Единица_измерения }}</td>
						<td>{{ item.Цена }} ₽</td>
						<td>{{ item.Срок_годности }}</td>
						<td>
							<span
								:class="['stock', item.Количество_на_складе < 20 ? 'low' : '']">
								{{ item.Количество_на_складе }}
							</span>
						</td>
						<td class="actions">
							<button
								class="btn-icon edit"
								@click="edit(item)"
								title="Изменить"></button>
							<button
								class="btn-icon delete"
								@click="remove(item.idТовар)"
								title="Удалить"></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import axios from 'axios';

	const items = ref([]);
	const editId = ref(null);
	const showForm = ref(false);

	const form = ref({
		Наименование: '',
		Категория: '',
		Единица_измерения: '',
		Цена: null,
		Срок_годности: '',
		Количество_на_складе: null,
	});

	const load = async () => {
		const res = await axios.get('https://shop-nyf7.onrender.com/api/products');
		items.value = res.data;
	};

	const save = async () => {
		if (editId.value) {
			await axios.put(
				`https://shop-nyf7.onrender.com/api/products/${editId.value}`,
				form.value,
			);
		} else {
			await axios.post(
				'https://shop-nyf7.onrender.com/api/products',
				form.value,
			);
		}
		cancel();
		load();
	};

	const edit = (item) => {
		editId.value = item.idТовар;
		form.value = { ...item };
		showForm.value = true;
	};

	const cancel = () => {
		editId.value = null;
		showForm.value = false;
		form.value = {
			Наименование: '',
			Категория: '',
			Единица_измерения: '',
			Цена: null,
			Срок_годности: '',
			Количество_на_складе: null,
		};
	};

	const remove = async (id) => {
		if (confirm('Удалить этот товар?')) {
			await axios.delete(`https://shop-nyf7.onrender.com/api/products/${id}`);
			load();
		}
	};

	onMounted(load);
</script>

<style scoped>
	.entity-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.entity-header h2 {
		font-size: 1.5rem;
		color: #1a1a1a;
	}

	.card {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 20px;
		margin-bottom: 25px;
	}

	.form-card h3 {
		margin-bottom: 16px;
		font-size: 1.15rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 16px;
		margin-bottom: 20px;
	}

	.form-group label {
		display: block;
		font-size: 13px;
		color: #555;
		margin-bottom: 5px;
	}

	.form-group input {
		width: 100%;
		padding: 9px 12px;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		font-size: 14px;
		transition: border 0.2s;
	}

	.form-group input:focus {
		outline: none;
		border-color: #1a73e8;
		box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
	}

	.form-actions {
		display: flex;
		gap: 10px;
	}

	.btn {
		padding: 9px 18px;
		border: none;
		border-radius: 8px;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #1a73e8;
		color: white;
	}

	.btn-primary:hover {
		background: #1557b0;
	}

	.btn-secondary {
		background: #e5e7eb;
		color: #374151;
	}

	.btn-secondary:hover {
		background: #d1d5db;
	}

	.table-wrapper {
		overflow-x: auto;
		border-radius: 12px;
		border: 1px solid #e5e7eb;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	th {
		background: #f1f5f9;
		padding: 12px 14px;
		text-align: left;
		font-weight: 600;
		color: #475569;
		border-bottom: 1px solid #e2e8f0;
	}

	td {
		padding: 12px 14px;
		border-bottom: 1px solid #f1f5f9;
	}

	tr:hover td {
		background: #f8fafc;
	}

	.badge {
		background: #e0f2fe;
		color: #0369a1;
		padding: 3px 10px;
		border-radius: 20px;
		font-size: 12px;
	}

	.stock.low {
		color: #dc2626;
		font-weight: 600;
	}

	.actions {
		display: flex;
		gap: 6px;
	}

	.btn-icon {
		background: none;
		border: none;
		font-size: 16px;
		cursor: pointer;
		padding: 4px 8px;
		border-radius: 6px;
		transition: background 0.2s;
	}

	.btn-icon.edit:hover {
		background: #e0f2fe;
	}

	.btn-icon.delete:hover {
		background: #fee2e2;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.25s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: translateY(-8px);
	}
</style>
