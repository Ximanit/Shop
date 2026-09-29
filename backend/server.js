import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.js';
import customerRoutes from './routes/customer.js';
import employeeRoutes from './routes/employee.js';
import supplierRoutes from './routes/supplier.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/suppliers', supplierRoutes);

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000');
});
