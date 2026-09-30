<template>
	<div class="app">
		<header class="header">
			<h1>🛒 Продуктовый магазин</h1>
			<p class="subtitle">Система управления данными</p>
		</header>

		<nav class="tabs">
			<button
				v-for="t in tabs"
				:key="t.id"
				:class="['tab-btn', { active: tab === t.id }]"
				@click="tab = t.id">
				{{ t.icon }} {{ t.name }}
			</button>
		</nav>

		<main class="content">
			<ProductTable v-if="tab === 'products'" />
			<CustomerTable v-if="tab === 'customers'" />
			<EmployeeTable v-if="tab === 'employees'" />
			<SupplierTable v-if="tab === 'suppliers'" />
		</main>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import ProductTable from './components/ProductTable.vue';
	import CustomerTable from './components/CustomerTable.vue';
	import EmployeeTable from './components/EmployeeTable.vue';
	import SupplierTable from './components/SupplierTable.vue';

	const tab = ref('products');

	const tabs = [
		{ id: 'products', name: 'Товары' },
		{ id: 'customers', name: 'Покупатели' },
		{ id: 'employees', name: 'Сотрудники' },
		{ id: 'suppliers', name: 'Поставщики' },
	];
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		font-family:
			'Segoe UI',
			system-ui,
			-apple-system,
			sans-serif;
		background: #f0f2f5;
		color: #1a1a1a;
	}

	.app {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		text-align: center;
		margin-bottom: 30px;
		padding: 25px 0;
	}

	.header h1 {
		font-size: 2.2rem;
		color: #1a73e8;
		margin-bottom: 6px;
	}

	.subtitle {
		color: #666;
		font-size: 1.05rem;
	}

	.tabs {
		display: flex;
		gap: 10px;
		margin-bottom: 25px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.tab-btn {
		padding: 10px 22px;
		border: none;
		border-radius: 30px;
		background: white;
		font-size: 15px;
		cursor: pointer;
		transition: all 0.2s;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
		color: #444;
	}

	.tab-btn:hover {
		background: #e8f0fe;
		color: #1a73e8;
	}

	.tab-btn.active {
		background: #1a73e8;
		color: white;
		box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
	}

	.content {
		background: white;
		border-radius: 16px;
		padding: 28px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
	}
</style>
