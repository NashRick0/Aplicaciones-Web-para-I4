import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db';

import authRoutes from './routes/auth.routes';
import rolRoutes from './routes/rol.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));

app.use('/api/auth', authRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on", PORT);
    });
});