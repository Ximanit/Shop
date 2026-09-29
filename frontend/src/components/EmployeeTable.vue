<template>
	<div class="entity">
		<div class="entity-header">
			<h2>🧑‍💼 Сотрудники</h2>
			<button class="btn btn-primary" @click="showForm = !showForm">
				{{ showForm ? 'Скрыть форму' : '+ Добавить сотрудника' }}
			</button>
		</div>

		<transition name="fade">
			<div v-if="showForm" class="card form-card">
				<h3>{{ editId ? 'Редактирование сотрудника' : 'Новый сотрудник' }}</h3>

				<div class="form-grid">
					<div class="form-group">
						<label>ФИО</label>
						<input v-model="form.ФИО" placeholder="Петров Пётр Петрович" />
					</div>
					<div class="form-group">
						<label>Паспортные данные</label>
						<input v-model="form.Паспортные_данные" placeholder="4510 654321" />
					</div>
					<div class="form-group">
						<label>Должность</label>
						<input v-model="form.Должность" placeholder="Кассир / Кладовщик" />
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

		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>ФИО</th>
						<th>Паспорт</th>
						<th>Должность</th>
						<th style="width: 160px">Действия</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in items" :key="item.idСотрудник">
						<td>{{ item.idСотрудник }}</td>
						<td>
							<strong>{{ item.ФИО }}</strong>
						</td>
						<td>{{ item.Паспортные_данные }}</td>
						<td>
							<span class="badge">{{ item.Должность }}</span>
						</td>
						<td class="actions">
							<button
								class="btn-icon edit"
								@click="edit(item)"
								title="Изменить">
								✏️
							</button>
							<button
								class="btn-icon delete"
								@click="remove(item.idСотрудник)"
								title="Удалить">
								🗑️
							</button>
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
		ФИО: '',
		Паспортные_данные: '',
		Должность: '',
	});

	const load = async () => {
		const res = await axios.get('/api/employees');
		items.value = res.data;
	};

	const save = async () => {
		if (editId.value) {
			await axios.put(`/api/employees/${editId.value}`, form.value);
		} else {
			await axios.post('/api/employees', form.value);
		}
		cancel();
		load();
	};

	const edit = (item) => {
		editId.value = item.idСотрудник;
		form.value = { ...item };
		showForm.value = true;
	};

	const cancel = () => {
		editId.value = null;
		showForm.value = false;
		form.value = {
			ФИО: '',
			Паспортные_данные: '',
			Должность: '',
		};
	};

	const remove = async (id) => {
		if (confirm('Удалить этого сотрудника?')) {
			await axios.delete(`/api/employees/${id}`);
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
